import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useUiStore } from "../../stores/uiStore";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { user } = useAuthStore();
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const displayUser = user || { name: "Guest User", initials: "GU" };
  const isAdmin = displayUser.role === "admin";
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="navbar">
      <button className="icon-btn mobile-only" onClick={toggleSidebar} aria-label="Open menu"><Menu size={18} /></button>
      <div className={styles.navBrand}>
        <img
          src="/gla-logo.png"
          alt="GLA University"
          className={styles.navLogo}
        />
        <span className={styles.wordmark} aria-label="GLA TalentForecast.AI">
          <span className={styles.wordmarkGla}>GLA</span>{" "}
          <span className={styles.wordmarkName}>TalentForecast</span>
          <span className={styles.wordmarkAi}>.AI</span>
        </span>
      </div>
      <div className="nav-user">
        <Link to="/" className={styles.publicLink}>← Public Website</Link>
        {isAdmin && <span className={styles.adminBadge}>Admin • GLA System Administrator</span>}
        <div className={styles.profileMenu}>
          <button className={styles.profileButton} onClick={() => setProfileOpen((value) => !value)} type="button" aria-expanded={profileOpen}>
            <span className="avatar">{displayUser.initials}</span>
            <span className={styles.profileName}>{displayUser.name}</span>
            <ChevronDown size={14} />
          </button>
          {profileOpen && (
            <div className={styles.profileDropdown}>
              <strong>{displayUser.name}</strong>
              <span>{displayUser.email || "student@gla.ac.in"}</span>
              <span>{isAdmin ? "GLA System Administrator" : "Placement readiness dashboard"}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
