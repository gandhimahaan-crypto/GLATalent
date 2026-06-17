import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileSearch,
  GraduationCap,
  Menu,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import styles from "./Landing.module.css";

const navLinks = [
  ["How It Works", "#how-it-works"],
  ["AI Engine", "#ai-engine"],
  ["Features", "#features"],
  ["Roles", "#roles"],
];

const glaContactUrl = "https://www.gla.ac.in/contact-us";

const previewMetrics = [
  ["Placement Probability", "86%", "+12% readiness lift"],
  ["Expected Package", "6.8 LPA", "projected range"],
  ["Readiness Score", "82/100", "placement ready"],
  ["Best Fit Domain", "Data Analytics", "highest match"],
];

const trustBadges = [
  "Trusted by GLA University",
  "Built for Students, Faculty & Administration",
  "AI-Powered Placement Intelligence",
];

const steps = [
  ["01", "Create Profile", "Students add academics, skills, projects, resumes, and certifications into one employability profile."],
  ["02", "AI Analysis", "The platform studies readiness signals, domain fit, skill depth, and placement benchmarks."],
  ["03", "Placement Forecast", "Students and teams see probability, expected package, readiness score, and best-fit domain."],
  ["04", "Career Roadmap", "Action plans turn skill gaps into focused preparation tasks, projects, and resume improvements."],
];

const inputs = ["Academic Data", "Skills", "Projects", "Resume", "Certifications"];

const outputs = [
  "Readiness Score",
  "Placement Probability",
  "Expected Package",
  "Best Fit Domain",
  "Skill Gap Analysis",
];

const features = [
  [BrainCircuit, "AI Placement Prediction", "Forecast placement probability, expected package, and best-fit domains from real readiness signals."],
  [BarChart3, "Readiness Analytics", "Convert academic, skill, resume, and project data into a clear employability score."],
  [Route, "Personalized Roadmaps", "Give every learner a focused preparation path based on gaps, strengths, and target roles."],
  [UsersRound, "Faculty Monitoring", "Help mentors track student readiness, progress patterns, and intervention needs at batch level."],
  [FileSearch, "Resume Intelligence", "Evaluate resume structure, skills evidence, project quality, and placement relevance."],
  [TrendingUp, "Placement Benchmarking", "Compare readiness against historical outcomes, recruiter signals, and institutional trends."],
];

const roles = [
  ["Student", GraduationCap, ["Placement Prediction", "Skill Gap Analysis", "Career Roadmap", "Resume Intelligence"]],
  ["Faculty", ClipboardCheck, ["Student Tracking", "Readiness Monitoring", "Academic Insights", "Mentorship Support"]],
  ["Administrator", Building2, ["Institution Analytics", "Placement Forecasting", "Batch Performance", "Recruiter Intelligence"]],
];

const placementInsights = [
  [TrendingUp, "Placement Trends", "Track year-wise placement performance and demand cycles."],
  [Building2, "Recruiter Demand", "Understand which roles and companies are hiring similar profiles."],
  [BarChart3, "Package Growth", "Compare package movement across domains and batches."],
  [Route, "Domain Evolution", "Spot emerging placement domains before drive season."],
  [ClipboardCheck, "Company Tier Distribution", "Benchmark Tier 1, Tier 2, MNC, and service outcomes."],
];

const aiForecasts = [
  ["Placement Probability", "64%"],
  ["Expected Package", "₹5.4L – ₹7.8L"],
  ["Readiness Score", "57/100"],
  ["Best Fit Domain", "Software Development"],
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brandGroup} aria-label="GLATalentForecast.AI home">
        <img src="/gla-logo.png" alt="GLA University" className={styles.brandLogo} />
        <span className={styles.brandText}>
          <strong>GLATalentForecast.AI</strong>
          <span>Placement Intelligence</span>
        </span>
      </Link>

      <nav className={styles.navLinks} aria-label="Primary navigation">
        {navLinks.map(([label, href]) => (
          <a href={href} key={label}>{label}</a>
        ))}
      </nav>

      <div className={styles.navActions}>
        <Link to="/login" className={styles.navLogin}>Log in</Link>
        <Link to="/login" className={styles.navLaunch}>Launch Dashboard</Link>
        <button className={styles.menuButton} onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          <Menu size={20} />
        </button>
      </div>

      {open && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          {navLinks.map(([label, href]) => (
            <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>Launch Dashboard</Link>
        </nav>
      )}
    </header>
  );
}

function DemoPreview() {
  return (
    <aside className={styles.demoCard} aria-label="Demo forecast preview">
      <div className={styles.demoHeader}>
        <div>
          <span>Demo Forecast Preview</span>
          <h2>Placement Readiness Snapshot</h2>
        </div>
        <ShieldCheck size={30} />
      </div>

      <div className={styles.probabilityPanel}>
        <div>
          <span>Overall Forecast</span>
          <strong>86%</strong>
        </div>
        <div className={styles.ring} aria-hidden="true">
          <svg viewBox="0 0 72 72" focusable="false">
            <circle className={styles.ringTrack} cx="36" cy="36" r="27" />
            <circle className={styles.ringProgress} cx="36" cy="36" r="27" />
          </svg>
        </div>
      </div>

      <div className={styles.previewGrid}>
        {previewMetrics.map(([label, value, note]) => (
          <div className={styles.previewTile} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </div>
        ))}
      </div>

      <div className={styles.domainBars} aria-label="Domain fit preview">
        <div><span>Analytics</span><i style={{ width: "88%" }} /></div>
        <div><span>Software</span><i style={{ width: "74%" }} /></div>
        <div><span>Consulting</span><i style={{ width: "63%" }} /></div>
      </div>
    </aside>
  );
}

function SectionHeader({ label, title, text }) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        {label && <span>{label}</span>}
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function Landing() {
  return (
    <div className={styles.page} id="top">
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>GLA University AI Placement Platform</p>
            <h1>
              <span>PREDICT.</span>
              <span>PREPARE.</span>
              <span>PLACE.</span>
            </h1>
            <p className={styles.subheadline}>Built for Every Student.</p>
            <p className={styles.heroText}>
              GLATalentForecast.AI helps students, faculty, and institutions forecast placement outcomes, identify skill gaps, and improve employability using AI-powered analytics.
            </p>
            <div className={styles.heroActions}>
              <Link to="/login" className={styles.primaryAction}>Launch Dashboard<ArrowRight size={18} /></Link>
              <a href="#how-it-works" className={styles.secondaryAction}>See How It Works</a>
            </div>
            <div className={styles.trustBadges}>
              {trustBadges.map((badge) => (
                <span key={badge}><CheckCircle2 size={16} />{badge}</span>
              ))}
            </div>
          </div>

          <DemoPreview />
        </section>

        <section className={styles.section} id="how-it-works">
          <SectionHeader
            label="HOW IT WORKS"
            title="How Placement Intelligence Works"
            text="A clear workflow that turns student inputs into forecasted outcomes and preparation actions."
          />
          <div className={styles.stepsRow}>
            {steps.map(([number, title, description], index) => (
              <article className={styles.stepCard} key={title}>
                <span className={styles.stepNumber}>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                {index < steps.length - 1 && <ArrowRight className={styles.stepArrow} size={24} aria-hidden="true" />}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.engineSection} id="ai-engine">
          <SectionHeader
            label="AI ENGINE"
            title="From Student Data To Placement Intelligence"
            text="Structured profile data flows through the AI intelligence engine and returns decision-ready placement insights."
          />
          <div className={styles.engineFlow}>
            <div className={styles.flowColumn}>
              <h3>Inputs</h3>
              {inputs.map((item) => <span key={item}>{item}</span>)}
            </div>
            <ArrowRight className={styles.flowArrow} size={30} aria-hidden="true" />
            <div className={styles.engineCore}>
              <Sparkles size={28} />
              <strong>AI Intelligence Engine</strong>
              <p>Analyzes readiness, domain fit, historical benchmarks, and recruiter demand signals.</p>
            </div>
            <ArrowRight className={styles.flowArrow} size={30} aria-hidden="true" />
            <div className={styles.flowColumn}>
              <h3>Outputs</h3>
              {outputs.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className={styles.section} id="features">
          <SectionHeader
            label="FEATURES"
            title="Forecasting For Real Placement Action"
            text="Purpose-built tools for prediction, preparation, monitoring, and institutional placement strategy."
          />
          <div className={styles.featuresGrid}>
            {features.map(([Icon, title, description]) => (
              <article className={styles.featureCard} key={title}>
                <div className={styles.iconBox}><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.rolesSection} id="roles">
          <SectionHeader label="ROLES" title="Built For Every Role" text="Students, mentors, and institution leaders get the intelligence they need without losing focus." />
          <div className={styles.roleGrid}>
            {roles.map(([role, Icon, items]) => (
              <article className={styles.roleCard} key={role}>
                <div className={styles.roleTop}>
                  <Icon size={28} />
                  <h3>{role}</h3>
                </div>
                <ul>
                  {items.map((item) => (
                    <li key={item}><CheckCircle2 size={16} />{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="placement-insights">
          <SectionHeader
            label="PLACEMENT INSIGHTS"
            title="Learn From Previous Placement Outcomes"
            text="Historical placement intelligence helps students make better preparation decisions based on real placement outcomes."
          />
          <div className={styles.insightsGrid}>
            {placementInsights.map(([Icon, title, description]) => (
              <article className={styles.insightCard} key={title}>
                <div className={styles.lineIcon}><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.aiInsightsSection}>
          <SectionHeader label="AI PLACEMENT INSIGHTS" title="AI-Powered Placement Insights" text="A focused forecast snapshot that converts readiness data into immediate placement action." />
          <div className={styles.aiForecastGrid}>
            {aiForecasts.map(([label, value]) => (
              <article className={`${styles.aiForecastCard} ${label === "Best Fit Domain" ? styles.domainCard : ""}`} key={label}>
                <span>{label}</span>
                <strong className={styles.insightValue}>{value}</strong>
              </article>
            ))}
          </div>
          <div className={styles.aiRecommendation}>
            <Sparkles size={24} />
            <p>Improving DSA proficiency and completing one industry-recognized certification could increase placement probability by <strong>14%</strong>.</p>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div>
            <span className={styles.ctaLabel}>CALL TO ACTION</span>
            <h2>Ready to Transform Placement Outcomes?</h2>
            <p>Help students make smarter placement decisions with AI-powered forecasting, readiness analytics, and employability intelligence.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link to="/login" className={styles.primaryAction}>Launch Dashboard<ArrowRight size={18} /></Link>
            <a href={glaContactUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryAction}>
              Contact Team<ExternalLink size={16} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogoRow}>
            <img
              src="/gla-logo.png"
              alt="GLA University"
              className={styles.footerLogoImg}
            />
            <div>
              <p className={styles.footerWordmark}>GLATalentForecast.AI</p>
              <p className={styles.footerTagline}>A GLA University Initiative</p>
            </div>
          </div>
          <p className={styles.footerDesc}>
            AI-powered placement intelligence platform helping students predict,
            prepare, and place with confidence.
          </p>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>Product</p>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#engine">AI Engine</a>
          <a href="#roles">Roles</a>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>Portals</p>
          <a href="/login">Student Portal</a>
          <a href="/login">Faculty Portal</a>
          <a href="/login">Admin Portal</a>
          <a href="/login">Launch Dashboard</a>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>Institution</p>
          <a href="https://student.glauniversity.in/" target="_blank" rel="noopener noreferrer">About GLA</a>
          <a href={glaContactUrl} target="_blank" rel="noopener noreferrer">Contact</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 GLATalentForecast.AI · A GLA University Initiative · Mathura, U.P.</p>
        <p>Placement Intelligence Platform · Made in India 🇮🇳</p>
      </div>
    </footer>
  );
}
