import { NavLink } from 'react-router-dom'
import { useUiStore } from '../../stores/uiStore'
import styles from './Sidebar.module.css'

export default function Sidebar({ navItems, title }) {
  const open = useUiStore((state) => state.sidebarOpen)
  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>
      <p className={styles.title}>{title}</p>
      <nav className={styles.nav}>
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink key={path} to={path} className={({ isActive }) => isActive ? styles.active : ''}>
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
