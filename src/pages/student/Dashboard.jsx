import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'
import PageWrapper from '../../components/layout/PageWrapper'
import { prediction, roadmap, skillScores, subjectScores } from '../../data/mockPredictions'
import { useAuthStore } from '../../stores/authStore'
import { useStudentStore } from '../../stores/studentStore'
import PredictionCards from './components/PredictionCards'
import RoadmapTimeline from './components/RoadmapTimeline'
import SkillRadarChart from './components/SkillRadarChart'
import SubjectBarChart from './components/SubjectBarChart'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const profile = useStudentStore((state) => state.profile)
  const user = useAuthStore((state) => state.user)
  const studentName = user?.name || 'Student'
  const studentEmail = user?.email || ''

  return (
    <PageWrapper title="Student Dashboard" subtitle="AI placement forecast and readiness plan">
      <div className={styles.stack}>
        <Card className={styles.profileHeader}>
          <div><h2>{studentName}</h2><p>{studentEmail} · Student · Profile setup pending</p><ProgressBar value={profile.profileComplete} label="Profile complete" /></div>
          <Button>Update Profile</Button>
        </Card>
        <PredictionCards prediction={prediction} />
        <div className={styles.twoCol}>
          <Card><h3>Subject Performance</h3><SubjectBarChart data={subjectScores} /></Card>
          <Card><h3>Skill Gap Analysis</h3><SkillRadarChart data={skillScores} /></Card>
        </div>
        <Card><h3>Personalized Roadmap</h3><RoadmapTimeline items={roadmap} /></Card>
      </div>
    </PageWrapper>
  )
}
