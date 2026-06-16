import { useState } from 'react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import PageWrapper from '../../components/layout/PageWrapper'
import { recommendations } from '../../data/mockRecommendations'
import styles from './Recommendations.module.css'

const filters = ['All', 'Courses', 'Certifications', 'Projects']

export default function Recommendations() {
  const [filter, setFilter] = useState('All')
  const items = filter === 'All' ? recommendations : recommendations.filter((item) => item.category === filter)
  return (
    <PageWrapper title="Recommendations" subtitle="Courses, certifications, and projects prioritized by AI">
      <div className={styles.stack}>
        <div className={styles.filters}>{filters.map((item) => <button className={filter === item ? styles.active : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className={styles.grid}>{items.map((item) => <Card key={item.id}><p>{item.category}</p><h3>{item.title}</h3><span>{item.platform}</span><em>{item.reason}</em><div><Badge variant="gla">{item.time}</Badge><Badge variant={item.priority}>{item.priority}</Badge></div><footer><Button variant="ghost" size="sm">Save</Button><Button variant="secondary" size="sm">View</Button></footer></Card>)}</div>
      </div>
    </PageWrapper>
  )
}
