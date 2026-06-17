import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import { Login } from "./pages/auth/Login";
import { AIPredictions } from "./pages/student/AIPredictions";
import { StudentDashboard } from "./pages/student/Dashboard";
import { Onboarding } from "./pages/student/Onboarding";
import { SettingsPage } from "./pages/student/Settings";
import { StudentFilledData } from "./pages/student/StudentFilledData";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { StudentList } from "./pages/admin/StudentList";
import { StudentDetail } from "./pages/admin/StudentDetail";
import { PlacementHistory } from "./pages/placement/History";
import { FacultyDashboard } from "./pages/faculty/Dashboard";
import { FacultyStudents } from "./pages/faculty/Students";
import { FacultySimplePage } from "./pages/faculty/FacultySimplePage";
import { UserManagement } from "./pages/admin/UserManagement";
import { DepartmentAnalytics } from "./pages/admin/DepartmentAnalytics";
import { PlacementRecords } from "./pages/admin/PlacementRecords";
import { RecruiterManagement } from "./pages/admin/RecruiterManagement";
import { AIModelMonitoring } from "./pages/admin/AIModelMonitoring";
import { AdminReports } from "./pages/admin/AdminReports";
import { PlatformSettings } from "./pages/admin/PlatformSettings";
import { useAuthStore } from "./stores/authStore";

const roleHome = {
  student: "/student/dashboard",
  faculty: "/faculty/dashboard",
  admin: "/admin/dashboard",
};

function RoleRoute({ allowedRole, children }) {
  const role = useAuthStore((state) => state.role);

  if (role !== allowedRole) {
    return <Navigate to={roleHome[role] || "/login"} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/onboarding" element={<RoleRoute allowedRole="student"><Onboarding /></RoleRoute>} />
      <Route path="/student/filled-data" element={<RoleRoute allowedRole="student"><StudentFilledData /></RoleRoute>} />
      <Route path="/student/predictions" element={<RoleRoute allowedRole="student"><AIPredictions /></RoleRoute>} />
      <Route path="/student/dashboard" element={<RoleRoute allowedRole="student"><StudentDashboard /></RoleRoute>} />
      <Route path="/student/settings" element={<RoleRoute allowedRole="student"><SettingsPage /></RoleRoute>} />
      <Route path="/placement/history" element={<RoleRoute allowedRole="student"><PlacementHistory /></RoleRoute>} />
      <Route path="/faculty/dashboard" element={<RoleRoute allowedRole="faculty"><FacultyDashboard /></RoleRoute>} />
      <Route path="/faculty/students" element={<RoleRoute allowedRole="faculty"><FacultyStudents /></RoleRoute>} />
      <Route path="/faculty/batch-analytics" element={<RoleRoute allowedRole="faculty"><FacultySimplePage title="Batch Analytics" description="Review cohort trends, domain readiness, and academic signals across the current batch." /></RoleRoute>} />
      <Route path="/faculty/at-risk-students" element={<RoleRoute allowedRole="faculty"><FacultySimplePage title="At-Risk Students" description="Monitor students who need mentoring, skill support, or placement-readiness intervention." /></RoleRoute>} />
      <Route path="/faculty/reports" element={<RoleRoute allowedRole="faculty"><FacultySimplePage title="Reports" description="Access faculty-level placement summaries, readiness exports, and batch progress reports." /></RoleRoute>} />
      <Route path="/faculty/settings" element={<RoleRoute allowedRole="faculty"><FacultySimplePage title="Settings" description="Manage faculty dashboard preferences and notification settings." /></RoleRoute>} />
      <Route path="/admin/dashboard" element={<RoleRoute allowedRole="admin"><AdminDashboard /></RoleRoute>} />
      <Route path="/admin/users" element={<RoleRoute allowedRole="admin"><UserManagement /></RoleRoute>} />
      <Route path="/admin/departments" element={<RoleRoute allowedRole="admin"><DepartmentAnalytics /></RoleRoute>} />
      <Route path="/admin/placement-records" element={<RoleRoute allowedRole="admin"><PlacementRecords /></RoleRoute>} />
      <Route path="/admin/recruiters" element={<RoleRoute allowedRole="admin"><RecruiterManagement /></RoleRoute>} />
      <Route path="/admin/ai-model-monitoring" element={<RoleRoute allowedRole="admin"><AIModelMonitoring /></RoleRoute>} />
      <Route path="/admin/reports" element={<RoleRoute allowedRole="admin"><AdminReports /></RoleRoute>} />
      <Route path="/admin/platform-settings" element={<RoleRoute allowedRole="admin"><PlatformSettings /></RoleRoute>} />
      <Route path="/admin/students" element={<RoleRoute allowedRole="admin"><StudentList /></RoleRoute>} />
      <Route path="/admin/students/:id" element={<RoleRoute allowedRole="admin"><StudentDetail /></RoleRoute>} />
      <Route path="/admin/placement-intelligence" element={<RoleRoute allowedRole="admin"><Navigate to="/admin/placement-records" replace /></RoleRoute>} />
    </Routes>
  );
}
