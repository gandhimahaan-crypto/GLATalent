import { Outlet } from 'react-router-dom'
import { BookOpen, History, LayoutDashboard, Settings, Star, User } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

const navItems = [
  { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/student/profile', label: 'My Profile', icon: User },
  { path: '/student/onboarding', label: 'Onboarding', icon: BookOpen },
  { path: '/student/recommendations', label: 'Recommendations', icon: Star },
  { path: '/student/placements', label: 'Placement History', icon: History },
  { path: '/student/settings', label: 'Settings', icon: Settings },
]

export default function StudentLayout() {
  return <><Navbar /><Sidebar navItems={navItems} title="Student Portal" /><Outlet /></>
}
