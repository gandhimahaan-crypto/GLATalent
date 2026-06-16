import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import styles from './Login.module.css'

const roles = ['Student', 'Faculty', 'Admin']

const metrics = [
  ['10,000+', 'Student Profiles'],
  ['92%', 'Prediction Accuracy'],
  ['150+', 'Recruiter Signals'],
]

export default function Login() {
  const [role, setRole] = useState('Student')
  const [studentEmail, setStudentEmail] = useState('')
  const [studentPassword, setStudentPassword] = useState('')
  const [studentError, setStudentError] = useState('')
  const [facultyEmail, setFacultyEmail] = useState('')
  const [facultyPassword, setFacultyPassword] = useState('')
  const [facultyError, setFacultyError] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const formByRole = {
    Student: {
      email: studentEmail,
      password: studentPassword,
      error: studentError,
      setEmail: setStudentEmail,
      setPassword: setStudentPassword,
      setError: setStudentError,
    },
    Faculty: {
      email: facultyEmail,
      password: facultyPassword,
      error: facultyError,
      setEmail: setFacultyEmail,
      setPassword: setFacultyPassword,
      setError: setFacultyError,
    },
    Admin: {
      email: adminEmail,
      password: adminPassword,
      error: adminError,
      setEmail: setAdminEmail,
      setPassword: setAdminPassword,
      setError: setAdminError,
    },
  }

  const activeForm = formByRole[role]

  function submit(event) {
    event.preventDefault()
    const selectedRole = role.toLowerCase()

    if (selectedRole === 'student') {
      const validCollegeEmail = activeForm.email.trim().toLowerCase().endsWith('@gla.ac.in')

      if (!validCollegeEmail) {
        activeForm.setError('Please use a valid college email ID (e.g., yourname@gla.ac.in)')
        return
      }
    }

    if (selectedRole === 'admin') {
      const validEmail = activeForm.email.trim() === 'GLAadmin@gla.ac.in'
      const validPassword = activeForm.password === 'adminofgla0101'

      if (!validEmail || !validPassword) {
        activeForm.setError('Invalid admin credentials. Please try again.')
        return
      }
    }

    activeForm.setError('')
    login(selectedRole, activeForm.email)
    navigate(`/${selectedRole}/dashboard`)
  }

  return (
    <main className={styles.page}>
      <section className={styles.left}>
        <Link to="/" className={styles.logoLink}>
          <img src="/gla-logo.png" alt="GLA University" />
        </Link>

        <div className={styles.brandBlock}>
          <h1 className={styles.wordmark}>
            <span className={styles.gla}>GLA</span>
            <span className={styles.talent}>Talent</span>
            <span className={styles.forecast}>Forecast</span>
            <span className={styles.ai}>.AI</span>
          </h1>
          <p className={styles.platform}>Placement Intelligence Platform</p>
        </div>

        <div className={styles.copy}>
          <h2>
            <span>Predict. Prepare. Place.</span>
            <span>Built for Every Student.</span>
          </h2>
          <p>
            AI-powered employability forecasting, placement prediction, recruiter demand insights, and
            skill-gap analysis designed for GLA University students and placement teams.
          </p>
        </div>

        <div className={styles.metrics}>
          {metrics.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.right}>
        <form className={styles.card} onSubmit={submit}>
          <div className={styles.cardHeader}>
            <h2>Welcome Back</h2>
            <p>Sign in to access your placement intelligence dashboard</p>
          </div>

          <div className={styles.roleTabs} aria-label="Select role">
            {roles.map((item) => (
              <button
                type="button"
                key={item}
                className={role === item ? styles.active : ''}
                onClick={() => {
                  setRole(item)
                  formByRole[item].setError('')
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <label className={styles.field}>
            <span>GLA Email Address</span>
            <input
              type="email"
              placeholder={role === 'Admin' ? 'GLAadmin@gla.ac.in' : 'student@gla.ac.in'}
              value={activeForm.email}
              onChange={(event) => {
                activeForm.setEmail(event.target.value)
                activeForm.setError('')
              }}
            />
            {role === 'Student' && activeForm.error && (
              <p className={styles.error}>{activeForm.error}</p>
            )}
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              placeholder="Password"
              value={activeForm.password}
              onChange={(event) => {
                activeForm.setPassword(event.target.value)
                activeForm.setError('')
              }}
            />
            {role === 'Admin' && activeForm.error && (
              <p className={styles.error}>{activeForm.error}</p>
            )}
          </label>

          <button className={styles.signIn} type="submit">
            Sign In <ArrowRight size={18} />
          </button>

          <button className={styles.forgot} type="button">Forgot password?</button>

          <div className={styles.cardFooter}>
            <span>Trusted by GLA University</span>
            <span>Built for Students, Faculty & Placement Teams</span>
          </div>
        </form>
      </section>
    </main>
  )
}
