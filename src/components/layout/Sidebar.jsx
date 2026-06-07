import { BarChart3, Brain, Briefcase, ClipboardList, FileText, GraduationCap, History, Home, Settings, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useUiStore } from "../../stores/uiStore";

const icons = { Dashboard: Home, "My Profile": Users, "My Filled Data": FileText, "AI Predictions": Brain, "Placement History": History, Settings, Overview: Home, Students: GraduationCap, "Batch Analytics": BarChart3, "At-Risk Students": ClipboardList, "Placement Intelligence": Briefcase, Reports: ClipboardList };

export function Sidebar({ type = "student" }) {
  const open = useUiStore((state) => state.sidebarOpen);
  const close = useUiStore((state) => state.closeSidebar);
  const nav = type === "admin"
    ? [["Overview", "/admin/dashboard"], ["Students", "/admin/students"], ["Batch Analytics", "/admin/dashboard"], ["At-Risk Students", "/admin/dashboard"], ["Placement Intelligence", "/placement/history"], ["Reports", "/admin/dashboard"], ["Settings", "/admin/dashboard"]]
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
