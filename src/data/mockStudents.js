export const students = [
  { id: "1", name: "Aarav Sharma", rollNo: "GLA22CS041", branch: "CSE", batch: "2026", cgpa: 8.1, readiness: 68, domain: "Software Development", status: "Active", risk: "Medium" },
  { id: "2", name: "Ananya Verma", rollNo: "GLA22CS083", branch: "CSE", batch: "2026", cgpa: 8.7, readiness: 82, domain: "Data Science", status: "Placed", risk: "Low" },
  { id: "3", name: "Rohan Gupta", rollNo: "GLA22EC019", branch: "ECE", batch: "2026", cgpa: 6.4, readiness: 42, domain: "Cloud", status: "At-Risk", risk: "High" },
  { id: "4", name: "Priya Singh", rollNo: "GLA22CS112", branch: "CSE", batch: "2026", cgpa: 7.6, readiness: 64, domain: "AI/ML", status: "Active", risk: "Medium" },
  { id: "5", name: "Kabir Khan", rollNo: "GLA22IT054", branch: "IT", batch: "2026", cgpa: 7.2, readiness: 59, domain: "Cybersecurity", status: "Active", risk: "Medium" },
  { id: "6", name: "Meera Joshi", rollNo: "GLA22CS074", branch: "CSE", batch: "2026", cgpa: 9.0, readiness: 88, domain: "Software Development", status: "Placed", risk: "Low" },
  { id: "7", name: "Dev Patel", rollNo: "GLA22ME031", branch: "ME", batch: "2026", cgpa: 6.8, readiness: 47, domain: "Consulting", status: "At-Risk", risk: "High" },
  { id: "8", name: "Nisha Agarwal", rollNo: "GLA22CS129", branch: "CSE", batch: "2026", cgpa: 8.0, readiness: 73, domain: "Software Development", status: "Active", risk: "Low" },
  { id: "9", name: "Ishaan Bansal", rollNo: "GLA22IT091", branch: "IT", batch: "2026", cgpa: 7.0, readiness: 53, domain: "Cloud", status: "Active", risk: "Medium" },
  { id: "10", name: "Sanya Kapoor", rollNo: "GLA22CS155", branch: "CSE", batch: "2026", cgpa: 8.4, readiness: 79, domain: "AI/ML", status: "Active", risk: "Low" },
];

export const currentStudent = {
  ...students[0],
  completeness: 78,
  email: "aarav.sharma@gla.ac.in",
  phone: "+91 98765 43210",
  skills: ["React", "JavaScript", "DSA", "SQL", "Git"],
  profiles: { github: "aarav-codes", leetcode: "aaravsharma", linkedin: "linkedin.com/in/aaravsharma", hackerrank: "" },
};
