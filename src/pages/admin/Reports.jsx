import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import PageWrapper from '../../components/layout/PageWrapper'
import { departmentRows } from '../../data/mockStudents'
import styles from './Reports.module.css'

const reportTypes = ['Batch Placement Forecast Report', 'At-Risk Students Report', 'Department Comparison Report', 'Individual Student Report']

export default function Reports() {
  const [selected, setSelected] = useState(reportTypes[0])
  return (
    <PageWrapper title="Reports" subtitle="Generate and export placement intelligence reports">
      <div className={styles.stack}>
        <div className={styles.grid}>{reportTypes.map((item) => <button className={selected === item ? styles.active : ''} key={item} onClick={() => setSelected(item)}>{item}</button>)}</div>
        <Card><div className={styles.filters}><select><option>Batch 2026</option></select><select><option>All Departments</option></select><input type="date" /><Button>Generate Report</Button></div></Card>
        <Table columns={[{ key: 'department', label: 'Department' }, { key: 'students', label: 'Students' }, { key: 'cgpa', label: 'Avg CGPA' }, { key: 'readiness', label: 'Avg Readiness' }, { key: 'place', label: 'Place %' }]} rows={departmentRows} />
        <div className={styles.actions}><Button variant="secondary">Export as CSV</Button><Button variant="secondary">Export as PDF</Button></div>
      </div>
    </PageWrapper>
  )
}
