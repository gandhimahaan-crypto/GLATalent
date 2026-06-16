import { Outlet } from 'react-router-dom'
import { BarChart2, FileText, LayoutDashboard, Settings, Users } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

const navItems = [
  { path: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/admin/students', label: 'Students', icon: Users },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/admin/reports', label: 'Reports', icon: FileText },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  return <><Navbar /><Sidebar navItems={navItems} title="Admin Portal" /><Outlet /></>
}
