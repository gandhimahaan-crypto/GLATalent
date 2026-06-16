import { useUiStore } from '../../stores/uiStore'
import styles from './PageWrapper.module.css'

export default function PageWrapper({ title, subtitle, actions, children }) {
  const open = useUiStore((state) => state.sidebarOpen)
  return (
    <main className={`${styles.page} ${open ? styles.withSidebar : ''}`}>
      {(title || subtitle || actions) && (
        <div className={styles.header}>
          <div>
            {title && <h1>{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      {children}
    </main>
  )
}
