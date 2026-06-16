import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Tabs from '../../components/ui/Tabs'
import TagInput from '../../components/ui/TagInput'
import PageWrapper from '../../components/layout/PageWrapper'
import { useAuthStore } from '../../stores/authStore'
import { useStudentStore } from '../../stores/studentStore'
import styles from './Profile.module.css'

const tabs = ['Personal', 'Academic', 'Skills', 'Digital', 'Projects']

export default function Profile() {
  const [active, setActive] = useState('Personal')
  const profile = useStudentStore((state) => state.profile)
  const user = useAuthStore((state) => state.user)
  const studentName = user?.name || 'Student'

  return (
    <PageWrapper title="My Profile" subtitle="Read-only student record with editable sections">
      <div className={styles.stack}>
        <Tabs tabs={tabs} active={active} onChange={setActive} />
        <Card>
          <div className={styles.sectionTop}><h3>{active}</h3><Button variant="secondary" size="sm">Edit</Button></div>
          {active === 'Personal' && <Info rows={[['Name', studentName], ['Roll No.', profile.rollNo], ['Birthplace', profile.birthplace], ['Parent occupations', profile.parentOccupations]]} />}
          {active === 'Academic' && <Info rows={[['CGPA', profile.cgpa], ['Attendance', `${profile.attendance}%`], ['Branch', profile.branch], ['Batch', profile.batch]]} />}
          {active === 'Skills' && <><TagInput tags={profile.skills} /><Info rows={[['Certifications', profile.certifications.join(', ')], ['Courses', profile.courses.join(', ')]]} /></>}
          {active === 'Digital' && <Info rows={Object.entries(profile.digital)} />}
          {active === 'Projects' && <Info rows={profile.projects.map((project, index) => [`Project ${index + 1}`, project])} />}
        </Card>
      </div>
    </PageWrapper>
  )
}

function Info({ rows }) {
  return <div className={styles.info}>{rows.map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}</div>
}
