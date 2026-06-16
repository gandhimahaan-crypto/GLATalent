import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import BarChartWrapper from '../../components/charts/BarChartWrapper'
import LineChartWrapper from '../../components/charts/LineChartWrapper'
import PageWrapper from '../../components/layout/PageWrapper'
import { placementTrend } from '../../data/mockPlacements'
import { students } from '../../data/mockStudents'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const atRisk = students.filter((student) => student.risk !== 'Low')
  return (
    <PageWrapper title="Institution Overview" subtitle="Placement forecast intelligence across GLA University">
      <div className={styles.stack}>
        <div className={styles.kpis}>{['Total Students 847', 'Avg Readiness 64/100', 'Predicted Place % 71%', 'Avg Package Rs. 5.4L'].map((kpi) => <Card key={kpi} className={styles.kpi}><strong>{kpi}</strong></Card>)}</div>
        <div className={styles.twoCol}><Card><h3>Domain Distribution</h3><BarChartWrapper data={[{ name: 'Software', value: 340 }, { name: 'Data', value: 186 }, { name: 'Cloud', value: 135 }, { name: 'Cyber', value: 84 }, { name: 'Consulting', value: 68 }, { name: 'AI/ML', value: 54 }]} /></Card><Card><h3>Readiness Histogram</h3><BarChartWrapper data={[{ name: '0-20', value: 45 }, { name: '20-40', value: 98 }, { name: '40-60', value: 234 }, { name: '60-80', value: 312 }, { name: '80-100', value: 158 }]} /></Card></div>
        <Card><h3>Students Needing Intervention <Badge variant="danger">{atRisk.length}</Badge></h3><Table columns={[{ key: 'rank', label: 'Rank', render: (_, index) => index }, { key: 'name', label: 'Name' }, { key: 'rollNo', label: 'Roll' }, { key: 'cgpa', label: 'CGPA' }, { key: 'readiness', label: 'Readiness' }, { key: 'domain', label: 'Domain' }, { key: 'risk', label: 'Risk', render: (row) => <Badge variant={row.risk}>{row.risk}</Badge> }, { key: 'action', label: 'Action', render: () => <Button size="sm" variant="secondary">View Profile</Button> }]} rows={atRisk} /></Card>
        <div className={styles.threeCol}><Card><h3>Placement Trend</h3><LineChartWrapper data={placementTrend} /></Card><Card><h3>Top Companies</h3><ol><li>TCS</li><li>Infosys</li><li>Deloitte</li><li>Amazon</li></ol></Card><Card><h3>Demanded Domains</h3><ol><li>Software 41%</li><li>Data 22%</li><li>Cloud 16%</li></ol></Card></div>
      </div>
    </PageWrapper>
  )
}
