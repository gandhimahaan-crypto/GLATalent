import { useState } from 'react'
import { FileUp, Plus } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import ProgressBar from '../../components/ui/ProgressBar'
import TagInput from '../../components/ui/TagInput'
import Table from '../../components/ui/Table'
import PageWrapper from '../../components/layout/PageWrapper'
import { useStudentStore } from '../../stores/studentStore'
import styles from './Onboarding.module.css'

const steps = ['Personal Info', 'Academic Background', 'Digital Profiles', 'Skills & Certs', 'Projects & Achiev.', 'Resume Upload']

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const profile = useStudentStore((state) => state.profile)
  return (
    <PageWrapper title="Profile Onboarding" subtitle="Complete your student forecast inputs">
      <div className={styles.stack}>
        <Card><ProgressBar value={Math.round(((step + 1) / steps.length) * 100)} label={steps[step]} /><div className={styles.steps}>{steps.map((item, index) => <button key={item} className={index === step ? styles.active : ''} onClick={() => setStep(index)}>{index + 1}</button>)}</div></Card>
        <Card>
          {step === 0 && <FormGrid fields={['Name', 'Roll No.', 'Birthplace', 'Parent Occupations']} />}
          {step === 1 && <><FormGrid fields={['10th %', '12th %', 'CGPA', 'Attendance']} /><Table columns={[{ key: 'sem', label: 'Sem' }, { key: 'English', label: 'English' }, { key: 'Aptitude', label: 'Aptitude' }, { key: 'DSA', label: 'DSA' }, { key: 'Immersion', label: 'Immersion' }]} rows={profile.semesterMarks} /></>}
          {step === 2 && <FormGrid fields={['GitHub', 'LeetCode', 'LinkedIn', 'HackerRank']} />}
          {step === 3 && <><TagInput tags={profile.skills} /><Table columns={[{ key: 'name', label: 'Name' }, { key: 'issuer', label: 'Issuer' }, { key: 'date', label: 'Date' }]} rows={[{ name: 'AWS Cloud Practitioner', issuer: 'AWS', date: '2025' }]} /></>}
          {step === 4 && <><Button variant="secondary" size="sm"><Plus size={15} /> Add Item</Button><Table columns={[{ key: 'type', label: 'Type' }, { key: 'title', label: 'Title' }, { key: 'impact', label: 'Impact' }]} rows={profile.projects.map((title) => ({ type: 'Project', title, impact: 'High' }))} /></>}
          {step === 5 && <div className={styles.upload}><FileUp size={34} /><h3>Upload resume PDF</h3><p>Drag and drop your resume, parse it, and preview extracted skills.</p><Button>Parse Resume</Button></div>}
        </Card>
      </div>
    </PageWrapper>
  )
}

function FormGrid({ fields }) {
  return <div className={styles.formGrid}>{fields.map((field) => <Input key={field} label={field} placeholder={field} />)}</div>
}
