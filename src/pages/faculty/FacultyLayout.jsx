import { Outlet } from 'react-router-dom'
import { ClipboardList, LayoutDashboard, Settings, Users } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

const navItems = [
  { path: '/faculty/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/faculty/students', label: 'My Students', icon: Users },
  { path: '/faculty/mentoring', label: 'Mentoring', icon: ClipboardList },
  { path: '/faculty/settings', label: 'Settings', icon: Settings },
]

export default function FacultyLayout() {
  return <><Navbar /><Sidebar navItems={navItems} title="Faculty Portal" /><Outlet /></>
}
