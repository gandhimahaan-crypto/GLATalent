import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ProgressBar from '../../components/ui/ProgressBar'
import Table from '../../components/ui/Table'
import BarChartWrapper from '../../components/charts/BarChartWrapper'
import PageWrapper from '../../components/layout/PageWrapper'
import { facultyStudents } from '../../data/mockStudents'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const atRisk = facultyStudents.filter((student) => student.risk !== 'Low')
  return (
    <PageWrapper title="Welcome, Prof. Meera Sinha" subtitle="Section: CS-A 2026">
      <div className={styles.stack}>
        <div className={styles.kpis}>{['Total Students 62', 'Avg Readiness 64/100', 'At-Risk Count 8', 'Ready to Place 71%'].map((kpi) => <Card key={kpi}><strong>{kpi}</strong></Card>)}</div>
        <Card><h3><Badge variant="danger">Alert</Badge> {atRisk.length} students need immediate attention</h3><Table columns={[{ key: 'name', label: 'Name' }, { key: 'cgpa', label: 'CGPA' }, { key: 'readiness', label: 'Readiness' }, { key: 'attendance', label: 'Attendance', render: (row) => `${row.attendance}%` }, { key: 'risk', label: 'Risk', render: (row) => <Badge variant={row.risk}>{row.risk}</Badge> }, { key: 'action', label: 'Action', render: () => <Button size="sm" variant="secondary">View Profile</Button> }]} rows={atRisk} /></Card>
        <div className={styles.twoCol}><Card><h3>Domain Distribution</h3><BarChartWrapper data={[{ name: 'Software', value: 24 }, { name: 'Data', value: 14 }, { name: 'Cloud', value: 11 }, { name: 'Cyber', value: 7 }]} /></Card><Card><h3>Readiness Buckets</h3>{[3, 7, 18, 24, 10].map((value, index) => <ProgressBar key={index} label={`${index * 20}-${(index + 1) * 20}`} value={value * 4} />)}</Card></div>
        <Card><h3>Recent Activity</h3><p className={styles.muted}>Aarav updated DSA scores · Nisha added a portfolio project · Kabir received a mentor note</p></Card>
      </div>
    </PageWrapper>
  )
}
