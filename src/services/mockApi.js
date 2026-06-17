import { currentStudent } from "../data/mockStudents";
import { mockDashboardStats, mockPlacementHistory } from "../data/mockData";

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockStudentProfile = currentStudent;

export const mockPrediction = {
  placementProbability: 0,
  readinessScore: 0,
  expectedPackage: "Profile required",
  bestFitDomain: { name: "Profile required" },
};

export const mockRecommendations = [
  ["Course", "Data Structures Interview Track", "Coursera", "Bridges your DSA skill gap", "4 weeks", "Critical"],
  ["Certification", "AWS Cloud Practitioner", "AWS Skill Builder", "Improves service and cloud eligibility", "3 weeks", "Recommended"],
  ["Project", "Full-stack Placement Portal", "GitHub", "Adds deployment-ready product evidence", "2 weeks", "Critical"],
  ["Course", "Business Communication for Engineers", "Udemy", "Strengthens interview communication", "10 hours", "Recommended"],
  ["Certification", "MongoDB Associate Developer", "MongoDB University", "Supports backend profile depth", "2 weeks", "Optional"],
  ["Project", "LeetCode Pattern Notebook", "GitHub", "Improves coding consistency", "1 week", "Recommended"],
  ["Course", "React Advanced Patterns", "Frontend Masters", "Builds frontend specialization", "12 hours", "Optional"],
  ["Certification", "HackerRank Problem Solving", "HackerRank", "Signals aptitude readiness", "5 hours", "Recommended"],
  ["Project", "Resume Parser with NLP", "GitHub", "Aligns with AI placement products", "3 weeks", "Critical"],
];

export async function getMockStudentProfile() {
  await wait();
  return mockStudentProfile;
}

export async function updateMockStudentProfile(data) {
  await wait();
  return { ...mockStudentProfile, ...data };
}

export async function getMockPrediction() {
  await wait();
  return null;
}

export async function submitMockPredictionData(data) {
  await wait();
  return { ...mockPrediction, submittedData: data };
}

export async function getMockRecommendations() {
  await wait();
  return mockRecommendations;
}

export async function getMockPlacementHistory() {
  await wait();
  return mockPlacementHistory;
}

export async function getMockDashboardStats() {
  await wait();
  return mockDashboardStats;
}
