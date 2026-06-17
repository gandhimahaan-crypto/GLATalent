import { BarChart3, Brain, Briefcase, Building2, ClipboardList, FileText, GraduationCap, History, Home, Settings, ShieldCheck, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useUiStore } from "../../stores/uiStore";

const icons = {
  Dashboard: Home,
  "My Profile": Users,
  "My Filled Data": FileText,
  "AI Predictions": Brain,
  "Placement History": History,
  Settings,
  Overview: Home,
  Students: GraduationCap,
  "Batch Analytics": BarChart3,
  "At-Risk Students": ClipboardList,
  Reports: ClipboardList,
  "User Management": Users,
  Departments: Building2,
  "Placement Records": Briefcase,
  Recruiters: GraduationCap,
  "AI Model Monitoring": Brain,
  "Platform Settings": ShieldCheck,
};

export function Sidebar({ type = "student" }) {
  const open = useUiStore((state) => state.sidebarOpen);
  const close = useUiStore((state) => state.closeSidebar);
  const facultyNav = [["Overview", "/faculty/dashboard"], ["Students", "/faculty/students"], ["Batch Analytics", "/faculty/batch-analytics"], ["At-Risk Students", "/faculty/at-risk-students"], ["Reports", "/faculty/reports"], ["Settings", "/faculty/settings"]];
  const adminNav = [["Overview", "/admin/dashboard"], ["User Management", "/admin/users"], ["Departments", "/admin/departments"], ["Placement Records", "/admin/placement-records"], ["Recruiters", "/admin/recruiters"], ["AI Model Monitoring", "/admin/ai-model-monitoring"], ["Reports", "/admin/reports"], ["Platform Settings", "/admin/platform-settings"]];
  const nav = type === "admin"
    ? adminNav
    : type === "faculty"
      ? facultyNav
      : [["Dashboard", "/student/dashboard"], ["My Profile", "/student/onboarding"], ["My Filled Data", "/student/filled-data"], ["AI Predictions", "/student/predictions"], ["Placement History", "/placement/history"], ["Settings", "/student/settings"]];

  return (
    <aside className={cn("sidebar", open && "open")}>
      {type === "student" && (
        <div className="sidebar-context">
          <strong>Student Dashboard</strong>
          <span>Placement Intelligence Platform</span>
        </div>
      )}
      {nav.map(([label, to]) => {
        const Icon = icons[label] || Home;
        return (
          <NavLink key={label} to={to} onClick={close} className={({ isActive }) => cn("nav-item", isActive && "active")}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
}
