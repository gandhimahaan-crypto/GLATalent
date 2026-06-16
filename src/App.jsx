import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import Landing from './pages/landing/Landing'
import Login from './pages/auth/Login'
import StudentLayout from './pages/student/StudentLayout'
import StudentDashboard from './pages/student/Dashboard'
import StudentProfile from './pages/student/Profile'
import StudentOnboarding from './pages/student/Onboarding'
import StudentRecommendations from './pages/student/Recommendations'
import StudentPlacements from './pages/student/PlacementHistory'
import StudentSettings from './pages/student/Settings'
import FacultyLayout from './pages/faculty/FacultyLayout'
import FacultyDashboard from './pages/faculty/Dashboard'
import FacultyStudents from './pages/faculty/Students'
import FacultyStudentDetail from './pages/faculty/StudentDetail'
import FacultyMentoring from './pages/faculty/Mentoring'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminStudents from './pages/admin/Students'
import AdminStudentDetail from './pages/admin/StudentDetail'
import AdminAnalytics from './pages/admin/Analytics'
import AdminReports from './pages/admin/Reports'

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="onboarding" element={<StudentOnboarding />} />
          <Route path="recommendations" element={<StudentRecommendations />} />
          <Route path="placements" element={<StudentPlacements />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>
        <Route path="/faculty" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="students" element={<FacultyStudents />} />
          <Route path="students/:id" element={<FacultyStudentDetail />} />
          <Route path="mentoring" element={<FacultyMentoring />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="students/:id" element={<AdminStudentDetail />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
