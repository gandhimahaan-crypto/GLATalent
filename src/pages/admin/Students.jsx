import { useNavigate } from 'react-router-dom'
import { Download } from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import ProgressBar from '../../components/ui/ProgressBar'
import Table from '../../components/ui/Table'
import PageWrapper from '../../components/layout/PageWrapper'
import { students } from '../../data/mockStudents'
import styles from './Students.module.css'

export default function Students() {
  const navigate = useNavigate()
  return (
    <PageWrapper title="Students" subtitle="Search, filter, sort, and export student records">
      <div className={styles.stack}>
        <Card><div className={styles.filters}><Input placeholder="Search by name or roll no." /><select><option>All domains</option></select><select><option>All risks</option></select><Button><Download size={15} /> Export CSV</Button></div></Card>
        <Table onRowClick={(row) => navigate(`/admin/students/${row.id}`)} columns={[{ key: 'name', label: 'Name' }, { key: 'rollNo', label: 'Roll No.' }, { key: 'branch', label: 'Branch' }, { key: 'cgpa', label: 'CGPA' }, { key: 'readiness', label: 'Readiness', render: (row) => <ProgressBar value={row.readiness} /> }, { key: 'domain', label: 'Domain' }, { key: 'status', label: 'Status', render: (row) => <Badge variant={row.status}>{row.status}</Badge> }]} rows={students} />
      </div>
    </PageWrapper>
  )
}
