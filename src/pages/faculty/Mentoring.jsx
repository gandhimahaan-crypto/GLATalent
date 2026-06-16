import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'
import PageWrapper from '../../components/layout/PageWrapper'
import { facultyStudents } from '../../data/mockStudents'
import { roadmap } from '../../data/mockPredictions'
import RoadmapTimeline from '../student/components/RoadmapTimeline'
import styles from './Mentoring.module.css'

export default function Mentoring() {
  const [student, setStudent] = useState(facultyStudents[0])
  return (
    <PageWrapper title="Mentoring" subtitle="Assign roadmap steps and save faculty notes">
      <div className={styles.grid}>
        <Card>{facultyStudents.map((item) => <button className={student.id === item.id ? styles.active : ''} key={item.id} onClick={() => setStudent(item)}><strong>{item.name}</strong><ProgressBar value={item.readiness} /></button>)}</Card>
        <Card><h3>{student.name}</h3><RoadmapTimeline items={roadmap} /><textarea placeholder="Add mentoring note..." /><Button>Save Note</Button></Card>
      </div>
    </PageWrapper>
  )
}
