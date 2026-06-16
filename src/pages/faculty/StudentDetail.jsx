import { useParams } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'
import PageWrapper from '../../components/layout/PageWrapper'
import { facultyStudents } from '../../data/mockStudents'
import styles from './StudentDetail.module.css'

export default function StudentDetail() {
  const { id } = useParams()
  const student = facultyStudents.find((item) => item.id === id) || facultyStudents[0]
  return (
    <PageWrapper title={student.name} subtitle={`${student.rollNo} · ${student.branch} · ${student.batch}`}>
      <div className={styles.stack}>
        <Card><div className={styles.header}><div className={styles.avatar}>{student.name.split(' ').map((part) => part[0]).join('')}</div><div><h2>{student.name}</h2><Badge variant={student.status}>{student.status}</Badge></div></div></Card>
        <Card><h3>Overview</h3><ProgressBar label="Readiness" value={student.readiness} /><p>CGPA: {student.cgpa} · Attendance: {student.attendance}% · Domain: {student.domain}</p></Card>
        <Card><h3>Mentor Notes</h3><textarea placeholder="Add a note..." /><Button>Save Note</Button><p className={styles.note}>Prof. Meera · Reviewed roadmap and assigned DSA practice.</p></Card>
      </div>
    </PageWrapper>
  )
}
