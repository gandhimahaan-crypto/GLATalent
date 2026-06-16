import { useNavigate } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import ProgressBar from '../../components/ui/ProgressBar'
import Table from '../../components/ui/Table'
import PageWrapper from '../../components/layout/PageWrapper'
import { facultyStudents } from '../../data/mockStudents'
import styles from './Students.module.css'

export default function Students() {
  const navigate = useNavigate()
  return (
    <PageWrapper title="My Students" subtitle="Assigned student list with risk and readiness filters">
      <div className={styles.stack}>
        <Card><div className={styles.filters}><Input placeholder="Search students" /><select><option>All risks</option></select><select><option>Sort by readiness</option></select></div></Card>
        <Table onRowClick={(row) => navigate(`/faculty/students/${row.id}`)} columns={[{ key: 'name', label: 'Name' }, { key: 'rollNo', label: 'Roll No.' }, { key: 'cgpa', label: 'CGPA' }, { key: 'readiness', label: 'Readiness', render: (row) => <ProgressBar value={row.readiness} /> }, { key: 'domain', label: 'Domain' }, { key: 'risk', label: 'Risk', render: (row) => <Badge variant={row.risk}>{row.risk}</Badge> }]} rows={facultyStudents} />
      </div>
    </PageWrapper>
  )
}
