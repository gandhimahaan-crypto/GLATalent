import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  FileSearch,
  GraduationCap,
  LineChart,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import styles from './Landing.module.css'

const proofPoints = [
  'Trusted by GLA University',
  'Built for Students, Faculty & Administration',
  'AI-Powered Placement Intelligence',
]

const previewStats = [
  ['Placement Probability', '73%', TrendingUp],
  ['Expected Package', 'Rs. 5.4L-7.8L', CircleDollarSign],
  ['Readiness Score', '68/100', ClipboardCheck],
  ['Best Fit Domain', 'Software Development', Target],
]

const processSteps = [
  [GraduationCap, 'Create Profile', 'Students add academic, skills, resume, project, and digital profile signals.'],
  [Brain, 'AI Analysis', 'The engine evaluates readiness, skill gaps, role fit, and placement likelihood.'],
  [BarChart3, 'Placement Forecast', 'Students and mentors see probability, package range, and domain fit.'],
  [BookOpenCheck, 'Career Roadmap', 'Personalized actions turn prediction into preparation momentum.'],
]

const inputSignals = ['Academic Data', 'Projects', 'Skills', 'Resume', 'Certifications']
const outputSignals = ['Readiness Score', 'Placement Probability', 'Expected Package', 'Best Fit Domain', 'Skill Gap Analysis']

const features = [
  [Sparkles, 'AI Placement Prediction', 'Predict placement probability, package range, and domain fit.'],
  [LineChart, 'Readiness Analytics', 'Track employability readiness using academic and skill indicators.'],
  [BookOpenCheck, 'Personalized Roadmaps', 'Receive actionable recommendations to improve outcomes.'],
  [Users, 'Faculty Monitoring', 'Monitor student progress and identify intervention opportunities.'],
  [FileSearch, 'Resume Intelligence', 'Extract and analyze skills, projects, and certifications.'],
  [Building2, 'Placement Benchmarking', 'Compare profiles against historical placement outcomes.'],
]

const roles = [
  ['Student', ['Placement Prediction', 'Skill Gap Analysis', 'Career Roadmap', 'Resume Intelligence']],
  ['Faculty', ['Student Tracking', 'Readiness Monitoring', 'Academic Insights', 'Mentorship Support']],
  ['Administrator', ['Institution Analytics', 'Placement Forecasting', 'Batch Performance', 'Recruiter Intelligence']],
]

const insightMetrics = [
  ['64%', 'Placement Probability'],
  ['Rs. 5.4L-7.8L', 'Expected Package'],
  ['57/100', 'Readiness Score'],
  ['Software Development', 'Best Fit Domain'],
]

const placementItems = [
  ['Placement Trends', 'Track year-wise placement performance and demand cycles.'],
  ['Recruiter Demand', 'Understand which roles and companies are hiring similar profiles.'],
  ['Package Growth', 'Compare package movement across domains and batches.'],
  ['Domain Evolution', 'Spot emerging placement domains before drive season.'],
  ['Company Tier Distribution', 'Benchmark Tier 1, Tier 2, MNC, and service outcomes.'],
]

const impact = [
  ['10,000+', 'Student Profiles'],
  ['92%', 'Prediction Accuracy'],
  ['150+', 'Recruiter Signals'],
  ['847+', 'Placement Records'],
  ['Rs. 24L', 'Highest Historical Package'],
]

export default function Landing() {
  return (
    <main className={styles.page}>
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.brand}>
            <img src="/gla-logo.png" alt="GLA University" className={styles.logo} />
            <span>TalentForecast.AI</span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#roles">Portals</a>
            <a href="#insights">Insights</a>
          </div>
          <div className={styles.navActions}>
            <Link to="/login" className={styles.loginButton}>Log In</Link>
            <Link to="/login" className={styles.launchButton}>Launch Dashboard <ArrowRight size={17} /></Link>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>AI-POWERED PLACEMENT INTELLIGENCE</p>
            <h1>
              <span>PREDICT.</span>
              <span>PREPARE.</span>
              <span>PLACE.</span>
            </h1>
            <p className={styles.subhead}>Built for Every Student.</p>
            <p className={styles.description}>
              GLATalentForecast.AI helps students, faculty, and institutions forecast placement outcomes,
              identify skill gaps, and improve employability using AI-powered analytics.
            </p>
            <div className={styles.heroActions}>
              <Link to="/login"><Button size="lg">Launch Dashboard <ArrowRight size={18} /></Button></Link>
              <a href="#how"><Button size="lg" variant="secondary">See How It Works</Button></a>
            </div>
            <div className={styles.proofList}>
              {proofPoints.map((point) => (
                <span key={point}><CheckCircle2 size={16} />{point}</span>
              ))}
            </div>
          </div>

          <div className={styles.previewWrap}>
            <div className={styles.previewPanel}>
              <div className={styles.previewTop}>
                <div>
                  <p>Demo Forecast Preview</p>
                  <h2>Live Placement Intelligence</h2>
                </div>
                <span>Live AI View</span>
              </div>
              <div className={styles.searchBar}>
                <Search size={18} />
                <span>Analyze placement readiness</span>
                <button aria-label="Run forecast"><ArrowRight size={18} /></button>
              </div>
              <div className={styles.previewGrid}>
                {previewStats.map(([label, value, Icon]) => (
                  <article key={label}>
                    <Icon size={19} />
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>
              <div className={styles.recommendation}>
                <p>AI Recommendation</p>
                <strong>AI-generated recommendations based on academic performance, skills, projects, and placement trends.</strong>
                <div><span style={{ width: '72%' }} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="how">
        <p className={styles.eyebrow}>HOW IT WORKS</p>
        <div className={styles.sectionHeader}>
          <h2>How Placement Intelligence Works</h2>
          <p>Transform student data into actionable placement intelligence.</p>
        </div>
        <div className={styles.process}>
          {processSteps.map(([Icon, title, text], index) => (
            <article key={title}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
              {index < processSteps.length - 1 && <ChevronRight className={styles.stepArrow} size={24} />}
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.flowSection}`}>
        <div className={styles.sectionHeader}>
          <h2>From Student Data to Placement Intelligence</h2>
        </div>
        <div className={styles.flow}>
          <div className={styles.signalGrid}>
            {inputSignals.map((signal) => <span key={signal}>{signal}</span>)}
          </div>
          <ArrowRight size={28} className={styles.flowArrow} />
          <div className={styles.engine}>
            <Brain size={34} />
            <strong>AI Intelligence Engine</strong>
          </div>
          <ArrowRight size={28} className={styles.flowArrow} />
          <div className={styles.signalGrid}>
            {outputSignals.map((signal) => <span key={signal}>{signal}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.section} id="features">
        <p className={styles.eyebrow}>PLATFORM FEATURES</p>
        <div className={styles.featureHeader}>
          <h2>
            <span>FEATURE-RICH</span>
            <span>FORECASTING FOR</span>
            <span>REAL PLACEMENT</span>
            <span>ACTION.</span>
          </h2>
        </div>
        <div className={styles.featureGrid}>
          {features.map(([Icon, title, text]) => (
            <article key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="roles">
        <div className={styles.sectionHeader}>
          <h2>Built For Every Role</h2>
        </div>
        <div className={styles.roleGrid}>
          {roles.map(([role, items]) => (
            <article key={role}>
              <h3>{role}</h3>
              {items.map((item) => <span key={item}>{item}</span>)}
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.insights}`} id="insights">
        <div className={styles.sectionHeader}>
          <h2>AI-Powered Placement Insights</h2>
        </div>
        <div className={styles.insightGrid}>
          {insightMetrics.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
        <div className={styles.insightCard}>
          <ShieldCheck size={24} />
          <p>
            Improving DSA proficiency and completing one industry-recognized certification could increase
            placement probability by 14%.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Learn From Previous Placement Outcomes</h2>
          <p>
            Historical placement intelligence helps students make better preparation decisions based on
            real placement outcomes.
          </p>
        </div>
        <div className={styles.placementGrid}>
          {placementItems.map(([title, text]) => (
            <article key={title}>
              <Network size={22} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.impact}`}>
        <div className={styles.sectionHeader}>
          <h2>Trusted Across The Placement Ecosystem</h2>
        </div>
        <div className={styles.impactGrid}>
          {impact.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>Ready to Transform Placement Outcomes?</h2>
        <p>Predict. Prepare. Place.</p>
        <span>Built for Students, Faculty, and Institutions.</span>
        <div>
          <Link to="/login"><Button size="lg">Launch Dashboard <ArrowRight size={18} /></Button></Link>
          <Link to="/login"><Button size="lg" variant="secondary">Login</Button></Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong><span>GLA</span>TalentForecast.AI</strong>
          <p>AI-Powered Placement Intelligence Platform</p>
        </div>
        <div>
          <h3>Features</h3>
          <a href="#how">How It Works</a>
          <Link to="/login">Student Portal</Link>
          <Link to="/login">Faculty Portal</Link>
          <Link to="/login">Admin Portal</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <p>GLA University</p>
          <p>Mathura, Uttar Pradesh</p>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 GLATalentForecast.AI</span>
          <span>A GLA University Initiative</span>
        </div>
      </footer>
    </main>
  )
}
