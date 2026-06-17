export const adminMetrics = [
  ["847", "Total Students"],
  ["64", "Total Faculty"],
  ["8", "Total Departments"],
  ["71%", "Predicted Placement Rate"],
  ["64/100", "Average Readiness Score"],
  ["115", "At-Risk Students"],
  ["46", "Total Recruiters"],
  ["624", "Total Placement Offers"],
];

export const userAccounts = [
  { name: "Aarav Sharma", email: "aarav.sharma@gla.ac.in", role: "Student", department: "CSE", status: "Active" },
  { name: "Dr. Meera Sinha", email: "meera.sinha@gla.ac.in", role: "Faculty", department: "CSE", status: "Active" },
  { name: "Dr. Rajiv Menon", email: "rajiv.menon@gla.ac.in", role: "Faculty", department: "ECE", status: "Active" },
  { name: "Admin User", email: "admin@gla.ac.in", role: "Admin", department: "Institution", status: "Active" },
  { name: "Rohan Gupta", email: "rohan.gupta@gla.ac.in", role: "Student", department: "ECE", status: "Review" },
];

export const departmentAnalytics = [
  { department: "CSE", readiness: 74, probability: 78, package: 6.2, skillGap: "DSA depth" },
  { department: "IT", readiness: 69, probability: 73, package: 5.7, skillGap: "Cloud projects" },
  { department: "ECE", readiness: 61, probability: 64, package: 4.9, skillGap: "Coding practice" },
  { department: "ME", readiness: 58, probability: 59, package: 4.4, skillGap: "Aptitude" },
  { department: "MBA", readiness: 67, probability: 70, package: 5.1, skillGap: "Analytics tools" },
];

export const placementRecords = [
  { company: "TCS Digital", role: "System Engineer", domain: "Software Development", package: "INR 7.2L", year: 2025, offers: 84 },
  { company: "Infosys", role: "Specialist Programmer", domain: "Software Development", package: "INR 9.5L", year: 2025, offers: 52 },
  { company: "Cognizant", role: "Data Analyst", domain: "Data Science", package: "INR 6.1L", year: 2024, offers: 39 },
  { company: "Wipro", role: "Cloud Associate", domain: "Cloud", package: "INR 5.8L", year: 2024, offers: 44 },
  { company: "Accenture", role: "ASE", domain: "Consulting", package: "INR 4.5L", year: 2023, offers: 96 },
];

export const recruiters = [
  { company: "TCS Digital", tier: "Tier 1", domains: "Software, Cloud", demand: "High", status: "Active" },
  { company: "Infosys", tier: "Tier 1", domains: "Software, Data", demand: "High", status: "Active" },
  { company: "Cognizant", tier: "Tier 2", domains: "Data, Consulting", demand: "Medium", status: "Active" },
  { company: "Wipro", tier: "Tier 2", domains: "Cloud, Security", demand: "Medium", status: "Planning" },
  { company: "Accenture", tier: "Service", domains: "Consulting, Software", demand: "High", status: "Active" },
];

export const modelMonitoring = [
  ["Model Confidence", "87%"],
  ["Prediction Accuracy", "92%"],
  ["Data Quality Score", "84%"],
  ["Last Updated", "June 5, 2026"],
  ["Dataset Coverage", "91%"],
];

export const reportExports = [
  { report: "Institution Placement Summary", scope: "All departments", format: "PDF / CSV", cadence: "Monthly" },
  { report: "Student Readiness Report", scope: "Batch 2026", format: "CSV", cadence: "Weekly" },
  { report: "Recruiter Demand Alignment", scope: "Active drives", format: "PDF", cadence: "Biweekly" },
  { report: "At-Risk Student Intervention", scope: "Faculty groups", format: "CSV", cadence: "Weekly" },
];

export const platformSettings = [
  { area: "Roles & Permissions", setting: "Admin, Faculty, Student access boundaries", status: "Configured" },
  { area: "Notification Rules", setting: "At-risk alerts and report reminders", status: "Enabled" },
  { area: "Prediction Thresholds", setting: "High risk below 50 readiness", status: "Active" },
  { area: "Visibility Settings", setting: "Recruiter and placement-cell profile access", status: "Review" },
];
