import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import BarChartWrapper from '../../components/charts/BarChartWrapper'
import LineChartWrapper from '../../components/charts/LineChartWrapper'
import PageWrapper from '../../components/layout/PageWrapper'
import { placementTrend } from '../../data/mockPlacements'
import { departmentRows } from '../../data/mockStudents'
import styles from './Analytics.module.css'

export default function Analytics() {
  return (
    <PageWrapper title="Analytics" subtitle="Placement trends, domains, departments, and company tiers">
      <div className={styles.stack}>
        <div className={styles.twoCol}><Card><h3>Placement Rate</h3><LineChartWrapper data={placementTrend} /></Card><Card><h3>Average Package</h3><LineChartWrapper data={placementTrend} lines={['Data']} /></Card></div>
        <div className={styles.twoCol}><Card><h3>Students per Domain</h3><BarChartWrapper data={[{ name: 'Software', value: 340 }, { name: 'Data', value: 186 }, { name: 'Cloud', value: 135 }]} /></Card><Card><h3>Avg Package per Domain</h3><BarChartWrapper data={[{ name: 'Software', value: 7.2 }, { name: 'Data', value: 8.1 }, { name: 'Cloud', value: 7.4 }]} /></Card></div>
        <Table columns={[{ key: 'department', label: 'Department' }, { key: 'students', label: 'Students' }, { key: 'cgpa', label: 'Avg CGPA' }, { key: 'readiness', label: 'Avg Readiness' }, { key: 'place', label: 'Predicted Place%' }]} rows={departmentRows} />
        <Card><h3>Company Tier Distribution</h3><div className={styles.tiers}><span>Tier 1 18%</span><span>Tier 2 27%</span><span>MNC 24%</span><span>Service 31%</span></div></Card>
      </div>
    </PageWrapper>
  )
}
