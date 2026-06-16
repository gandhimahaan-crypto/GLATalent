import { LogOut, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <button className={styles.iconButton} onClick={toggleSidebar} aria-label="Toggle sidebar"><Menu size={18} /></button>
        <Link to="/" className={styles.logoMark}>GLA<span>TalentForecast.AI</span></Link>
      </div>
      <div className={styles.userArea}>
        {user?.role === 'student' && <Link to="/" className={styles.publicLink}>← Public Website</Link>}
        <span>{user?.name || 'Guest'}</span>
        {user && <button className={styles.iconButton} onClick={handleLogout} aria-label="Logout"><LogOut size={18} /></button>}
      </div>
    </header>
  )
}
