import { students } from "./mockStudents";

// Temporary mock data. Replace with backend API response later.
export const predictionRules = {
  domains: ["Software Development", "Cloud", "Data Science"],
  companyTiers: ["Tier 1", "Tier 2", "Service"],
  basePackageLpa: 3.8,
};

// Demo placement data only. Replace with backend API response later.
export const mockPlacementHistory = {
  label: "Demo placement history data",
  stats: [
    ["624", "Total Placed"],
    ["₹6.4L", "Avg Package"],
    ["₹24L", "Highest Package"],
    ["Infosys", "Top Company"],
  ],
  placements: [
    { student: "Student #001", company: "TCS Digital", role: "System Engineer", domain: "Software Development", package: "₹7.2L", year: 2025 },
    { student: "Student #002", company: "Infosys", role: "Specialist Programmer", domain: "Software Development", package: "₹9.5L", year: 2025 },
    { student: "Student #003", company: "Cognizant", role: "Data Analyst", domain: "Data Science", package: "₹6.1L", year: 2024 },
    { student: "Student #004", company: "Wipro", role: "Cloud Associate", domain: "Cloud", package: "₹5.8L", year: 2024 },
    { student: "Student #005", company: "Accenture", role: "ASE", domain: "Consulting", package: "₹4.5L", year: 2023 },
    { student: "Student #006", company: "Capgemini", role: "Cyber Analyst", domain: "Cybersecurity", package: "₹6.8L", year: 2025 },
    { student: "Student #007", company: "HCLTech", role: "AI Engineer Trainee", domain: "AI/ML", package: "₹8.0L", year: 2025 },
    { student: "Student #008", company: "Tech Mahindra", role: "Developer", domain: "Software Development", package: "₹5.2L", year: 2023 },
  ],
  packageTrendByDomain: [
    { year: "2021", software: 4.2, data: 4.6, cloud: 4.4 },
    { year: "2022", software: 4.8, data: 5.2, cloud: 5.0 },
    { year: "2023", software: 5.4, data: 5.9, cloud: 5.7 },
    { year: "2024", software: 6.1, data: 6.5, cloud: 6.2 },
    { year: "2025", software: 6.8, data: 7.2, cloud: 7.0 },
  ],
};

export const mockDashboardStats = {
  metrics: [
    ["847", "Total Students"],
    ["64/100", "Avg Readiness Score"],
    ["71%", "Predicted Placement Rate"],
    ["₹5.4L", "Avg Expected Package"],
  ],
  domains: [
    { name: "Software Development", value: 312 },
    { name: "Data Science", value: 146 },
    { name: "Cloud", value: 118 },
    { name: "Cybersecurity", value: 76 },
    { name: "Consulting", value: 91 },
    { name: "AI/ML", value: 110 },
  ],
  readinessDistribution: [
    { range: "0-20", students: 18 },
    { range: "20-40", students: 97 },
    { range: "40-60", students: 248 },
    { range: "60-80", students: 344 },
    { range: "80-100", students: 140 },
  ],
  placementTrend: [
    { year: "2021", rate: 58, package: 4.1 },
    { year: "2022", rate: 62, package: 4.4 },
    { year: "2023", rate: 66, package: 4.9 },
    { year: "2024", rate: 69, package: 5.1 },
    { year: "2025", rate: 71, package: 5.4 },
  ],
  summaryCards: [
    ["+11% YoY", "Average Package Trend"],
    ["TCS Digital, Infosys, Accenture", "Top Hiring Companies"],
    ["Software Development", "Most Demanded Domain"],
  ],
  students,
};

export const mockUserSettings = {
  accountInfo: {
    name: "Student User",
    email: "student@gla.ac.in",
    role: "Student",
    studentId: "GLA22CS041",
  },
  notifications: {
    emailAlerts: true,
    placementUpdates: true,
    recommendationAlerts: false,
    weeklySummary: true,
  },
  profileVisibility: {
    visibleToRecruiters: true,
    visibleToPlacementCell: true,
    showAcademicDetails: true,
    showDigitalProfiles: false,
  },
  preferences: {
    theme: "System",
    language: "English",
    dashboardDensity: "Comfortable",
  },
  security: {
    twoFactorAuth: false,
    loginAlerts: true,
    passwordLastChanged: "Not updated yet",
  },
  privacy: {
    allowAnalytics: true,
    allowProfileBenchmarking: true,
    allowDataExport: true,
    allowAccountDeletionRequest: false,
  },
};
