import styles from './Skeleton.module.css'

export default function Skeleton({ height = 16 }) {
  return <div className={styles.skeleton} style={{ height }} />
}
