import { Route, Routes } from "react-router-dom";
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/onboarding" element={<Onboarding />} />
      <Route path="/student/filled-data" element={<StudentFilledData />} />
      <Route path="/student/predictions" element={<AIPredictions />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/settings" element={<SettingsPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<StudentList />} />
      <Route path="/admin/students/:id" element={<StudentDetail />} />
      <Route path="/placement/history" element={<PlacementHistory />} />
    </Routes>
  );
}
