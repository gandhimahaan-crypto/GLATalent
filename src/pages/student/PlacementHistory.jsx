import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import LineChartWrapper from '../../components/charts/LineChartWrapper'
import PageWrapper from '../../components/layout/PageWrapper'
import { placements, placementTrend } from '../../data/mockPlacements'
import styles from './PlacementHistory.module.css'

export default function PlacementHistory({ studentView = true }) {
  const columns = [
    { key: 'company', label: 'Company' },
    { key: 'role', label: 'Role' },
    { key: 'domain', label: 'Domain' },
    { key: 'package', label: 'Package', render: (row) => `Rs. ${row.package}L` },
    { key: 'tier', label: 'Tier', render: (row) => <Badge variant="gla">{row.tier}</Badge> },
    { key: 'batch', label: 'Batch' },
  ]
  return (
    <PageWrapper title="Placement History" subtitle="Historical outcomes and package benchmarks" actions={studentView && <Button>Compare with my profile</Button>}>
      <div className={styles.stack}>
        <Card><div className={styles.filters}><select><option>All Years</option></select><select><option>All Domains</option></select><select><option>All Tiers</option></select><input type="range" min="3" max="20" defaultValue="8" /></div></Card>
        <div className={styles.stats}>{['Total Placed: 1,248', 'Avg Package: Rs. 6.4L', 'Highest Package: Rs. 18L', 'Top Company: TCS'].map((item) => <Card key={item}><strong>{item}</strong></Card>)}</div>
        <Table columns={columns} rows={placements} />
        <Card><h3>Package Trend</h3><LineChartWrapper data={placementTrend} lines={['Software', 'Data', 'Cloud']} /></Card>
      </div>
    </PageWrapper>
  )
}
