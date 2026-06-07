import axios from "axios";
import { mockDashboardStats, mockPlacementHistory, mockUserSettings, predictionRules } from "../data/mockData";
import {
  getMockRecommendations,
  getMockStudentProfile,
  submitMockPredictionData,
  updateMockStudentProfile,
} from "./mockApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const MOCK_DELAY_MS = 450;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const savedAuth = getSavedAuth();
    const token = savedAuth.token || localStorage.getItem("auth-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(normalizeApiError(error))
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(normalizeApiError(error))
);

function getSavedAuth() {
  try {
    return JSON.parse(localStorage.getItem("gla-auth") || "{}");
  } catch {
    return {};
  }
}

function normalizeApiError(error) {
  if (error.response) {
    return {
      message: error.response.data?.message || "The server returned an error.",
      status: error.response.status,
      details: error.response.data,
    };
  }

  if (error.request) {
    return {
      message: "API server is unavailable. Showing mock data for now.",
      status: 0,
      details: error.request,
    };
  }

  return {
    message: error.message || "Something went wrong while preparing the API request.",
    status: null,
    details: error,
  };
}

async function withMockFallback(realRequest, mockRequest, label) {
  try {
    return await realRequest();
  } catch (error) {
    console.warn(`[API fallback] ${label}: ${error.message}`);
    return mockRequest();
  }
}

function delay(ms = MOCK_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mockApiResponse(data) {
  await delay();
  return data;
}

function readLocalStorageJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`Unable to read ${key}`, error);
    return null;
  }
}

export function getStudentProfile() {
  return withMockFallback(
    () => apiClient.get("/student/profile"),
    getMockStudentProfile,
    "getStudentProfile"
  );
}

export function updateStudentProfile(data) {
  return withMockFallback(
    () => apiClient.put("/student/profile", data),
    () => updateMockStudentProfile(data),
    "updateStudentProfile"
  );
}

export function getPrediction() {
  return getAIPredictions(readLocalStorageJson("studentProfileData"));
}

export function submitPredictionData(data) {
  return withMockFallback(
    () => apiClient.post("/prediction", data),
    () => submitMockPredictionData(data),
    "submitPredictionData"
  );
}

export function getRecommendations() {
  return withMockFallback(
    () => apiClient.get("/recommendations"),
    getMockRecommendations,
    "getRecommendations"
  );
}

export function getPlacementHistory() {
  // TODO: Replace with apiClient.get("/placement/history") when backend is ready.
  return mockApiResponse(mockPlacementHistory);
}

export function getDashboardStats() {
  return mockApiResponse(mockDashboardStats);
}

function toNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildPredictionFromProfile(profileData) {
  if (!profileData) return null;

  const academic = profileData.academic || {};
  const skills = Array.isArray(profileData.skills) ? profileData.skills : [];
  const projects = Array.isArray(profileData.projects) ? profileData.projects : [];
  const certifications = Array.isArray(profileData.certifications) ? profileData.certifications : [];
  const cgpa = toNumber(academic.cgpa, 0);
  const dsa = toNumber(academic.dsaMarks, 0);
  const aptitude = toNumber(academic.aptitudeMarks, 0);
  const english = toNumber(academic.englishMarks, 0);
  const attendance = toNumber(academic.attendance, 0);
  const profileCompletion = toNumber(profileData.completion, 0);
  const skillScore = clamp(skills.length * 8, 0, 100);
  const projectScore = clamp(projects.length * 18, 0, 100);
  const certificationScore = clamp(certifications.length * 18, 0, 100);
  const academicScore = clamp(cgpa * 10, 0, 100);
  const readinessScore = Math.round((academicScore * 0.25) + (dsa * 0.2) + (aptitude * 0.15) + (skillScore * 0.15) + (projectScore * 0.15) + (profileCompletion * 0.1));
  const placementProbability = clamp(Math.round((readinessScore * 0.7) + (attendance * 0.15) + (english * 0.15)), 0, 96);
  const bestFitDomain = skills.some((skill) => /aws|cloud|devops/i.test(skill))
    ? "Cloud"
    : skills.some((skill) => /python|data|ml|ai/i.test(skill))
      ? "Data Science"
      : predictionRules.domains[0];
  const confidence = clamp(Math.round(readinessScore + skills.length * 2), 35, 94);
  const lowerPackage = Math.max(predictionRules.basePackageLpa, 2.8 + readinessScore / 22).toFixed(1);
  const upperPackage = (Number(lowerPackage) + 2.4 + projects.length * 0.35 + certifications.length * 0.25).toFixed(1);

  // TODO: Replace this frontend estimate with backend ML/API response later.
  return {
    bestFitDomain: {
      name: bestFitDomain,
      confidence,
    },
    expectedPackage: `₹${lowerPackage}L - ₹${upperPackage}L`,
    placementProbability,
    readinessScore,
    companyTier: readinessScore >= 75 ? predictionRules.companyTiers : predictionRules.companyTiers.slice(1),
    topDomains: predictionRules.domains.map((name, index) => ({
      name,
      value: clamp(confidence - index * 10 + (name === bestFitDomain ? 6 : 0), 35, 95),
    })),
    subjectPerformance: [
      { subject: "English", score: english },
      { subject: "Aptitude", score: aptitude },
      { subject: "DSA", score: dsa },
      { subject: "Attendance", score: attendance },
      { subject: "CGPA", score: academicScore },
    ],
    skillGapAnalysis: [
      { skill: "DSA", value: dsa },
      { skill: "Communication", value: english },
      { skill: "Domain Knowledge", value: skillScore },
      { skill: "Projects", value: projectScore },
      { skill: "Certifications", value: certificationScore },
      { skill: "Profile Completion", value: profileCompletion },
    ],
    roadmap: [
      dsa < 70 && ["Improve DSA score", "Practice structured problem sets and revise core patterns.", "Critical", "3 weeks"],
      projects.length < 2 && ["Add one deployable project", "Build and publish a project with README, screenshots, and live URL.", "Critical", "2 weeks"],
      certifications.length < 1 && ["Add a relevant certification", "Complete one certification aligned with your preferred role.", "Recommended", "3 weeks"],
      english < 75 && ["Practice interview communication", "Work on concise project explanations and HR interview answers.", "Recommended", "2 weeks"],
    ].filter(Boolean),
  };
}

export function getAIPredictions(profileData) {
  // TODO: Replace with apiClient.post("/prediction", profileData) when backend ML API is ready.
  return mockApiResponse(buildPredictionFromProfile(profileData));
}

export async function getUserSettings() {
  const savedSettings = readLocalStorageJson("userSettings");
  return mockApiResponse(savedSettings || mockUserSettings);
}

export async function updateUserSettings(data) {
  localStorage.setItem("userSettings", JSON.stringify(data));
  return mockApiResponse(data);
}
