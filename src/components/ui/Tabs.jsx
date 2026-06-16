import styles from './Tabs.module.css'

export default function Tabs({ tabs, active, onChange }) {
  return <div className={styles.tabs}>{tabs.map((tab) => <button key={tab} className={tab === active ? styles.active : ''} onClick={() => onChange(tab)}>{tab}</button>)}</div>
}
