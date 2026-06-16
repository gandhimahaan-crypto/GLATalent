import styles from './StudentComponents.module.css'

export default function ReadinessGauge({ value = 68, size = 140 }) {
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const sweep = circumference * 0.75
  const offset = sweep - (Math.max(0, Math.min(100, value)) / 100) * sweep

  return (
    <svg className={styles.gauge} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e0e0e0" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${sweep} ${circumference}`} transform={`rotate(135 ${size / 2} ${size / 2})`} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--gla-orange)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${sweep} ${circumference}`} strokeDashoffset={offset} transform={`rotate(135 ${size / 2} ${size / 2})`} />
      <text x="50%" y="48%" textAnchor="middle" className={styles.gaugeValue}>{value}</text>
      <text x="50%" y="62%" textAnchor="middle" className={styles.gaugeLabel}>/100</text>
    </svg>
  )
}
