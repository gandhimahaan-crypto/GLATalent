import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Tabs from '../../components/ui/Tabs'
import TagInput from '../../components/ui/TagInput'
import Table from '../../components/ui/Table'
import PageWrapper from '../../components/layout/PageWrapper'
import { prediction, roadmap, skillScores, subjectScores } from '../../data/mockPredictions'
import { recommendations } from '../../data/mockRecommendations'
import { students } from '../../data/mockStudents'
import PredictionCards from '../student/components/PredictionCards'
import RoadmapTimeline from '../student/components/RoadmapTimeline'
import SkillRadarChart from '../student/components/SkillRadarChart'
import SubjectBarChart from '../student/components/SubjectBarChart'
import styles from './StudentDetail.module.css'

const tabs = ['Overview', 'Academic', 'Skills', 'Digital Profiles', 'Predictions', 'Recommendations']

export default function StudentDetail() {
  const [active, setActive] = useState('Overview')
  const { id } = useParams()
  const student = students.find((item) => item.id === id) || students[0]
  return (
    <PageWrapper title={student.name} subtitle={`${student.rollNo} · ${student.branch} · ${student.batch}`} actions={<><Button variant="secondary">Flag At-Risk</Button><Button>Export Profile</Button></>}>
      <div className={styles.stack}>
        <Card><div className={styles.header}><div className={styles.avatar}>{student.name.split(' ').map((part) => part[0]).join('')}</div><Badge variant={student.status}>{student.status}</Badge></div></Card>
        <Tabs tabs={tabs} active={active} onChange={setActive} />
        <Card>
          {active === 'Overview' && <div className={styles.info}><p>CGPA: {student.cgpa}</p><p>Attendance: {student.attendance}%</p><p>Domain: {student.domain}</p><p>Risk: {student.risk}</p></div>}
          {active === 'Academic' && <><Table columns={[{ key: 'sem', label: 'Sem' }, { key: 'English', label: 'English' }, { key: 'Aptitude', label: 'Aptitude' }, { key: 'DSA', label: 'DSA' }, { key: 'Immersion', label: 'Immersion' }]} rows={students[0].semesterMarks} /><SubjectBarChart data={subjectScores} /></>}
          {active === 'Skills' && <><TagInput tags={students[0].skills} /><Table columns={[{ key: 'title', label: 'Name' }, { key: 'issuer', label: 'Issuer' }]} rows={students[0].certifications.map((title) => ({ title, issuer: 'Verified' }))} /></>}
          {active === 'Digital Profiles' && <Table columns={[{ key: 'platform', label: 'Platform' }, { key: 'username', label: 'Username' }, { key: 'status', label: 'Status' }]} rows={Object.entries(students[0].digital).map(([platform, username]) => ({ platform, username, status: 'Connected' }))} />}
          {active === 'Predictions' && <><PredictionCards prediction={prediction} /><SkillRadarChart data={skillScores} /></>}
          {active === 'Recommendations' && <RoadmapTimeline items={[...roadmap, ...recommendations.map((item) => ({ title: item.title, description: item.reason, priority: item.priority, time: item.time }))]} />}
        </Card>
        <Card><h3>Mentor Notes</h3><textarea placeholder="Save admin note..." /><Button>Save Note</Button><p className={styles.note}>Prof. Meera · Roadmap reviewed for placement drive readiness.</p></Card>
      </div>
    </PageWrapper>
  )
}
