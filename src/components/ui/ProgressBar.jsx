import styles from './ProgressBar.module.css'

export default function ProgressBar({ value = 0, label }) {
  return (
    <div className={styles.wrap}>
      {label && <div className={styles.meta}><span>{label}</span><strong>{value}%</strong></div>}
      <div className={styles.track}><div className={styles.fill} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>
    </div>
  )
}
