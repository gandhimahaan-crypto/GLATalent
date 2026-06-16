import Badge from '../../../components/ui/Badge'
import styles from './StudentComponents.module.css'

export default function RoadmapTimeline({ items }) {
  return (
    <div className={styles.timeline}>
      {items.map((item) => (
        <div className={styles.timelineItem} key={item.title}>
          <span className={styles.dot} />
          <div>
            <div className={styles.timelineTop}>
              <h4>{item.title}</h4>
              <Badge variant={item.priority}>{item.priority}</Badge>
              <span>{item.time}</span>
            </div>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
