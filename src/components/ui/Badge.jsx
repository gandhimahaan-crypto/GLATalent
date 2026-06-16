import styles from './Badge.module.css'

export default function Badge({ variant = 'default', children }) {
  const key = String(variant).toLowerCase()
  return <span className={`${styles.badge} ${styles[key] || styles.default}`}>{children}</span>
}
