import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart2,
  BrainCircuit,
  FileSearch,
  Menu,
  Route,
  TrendingUp,
  AtSign,
  GitBranch,
  Link as LinkIcon,
  Users,
} from "lucide-react";
import styles from "./Landing.module.css";
import { getPrediction } from "../services/api";

const navLinks = [
  ["Features", "#features"],
  ["How It Works", "#how-it-works"],
];

const features = [
  [BrainCircuit, "AI Placement Prediction", "Predicts best-fit domain, expected salary range, and placement probability using multi-model ML analysis."],
  [BarChart2, "Readiness Analytics", "Generates a 0-100 readiness score based on academics, skills, projects, and digital presence."],
  [Route, "Personalized Roadmaps", "Delivers step-by-step preparation plans with course, certification, and project recommendations."],
  [Users, "Institution Dashboard", "Batch-level analytics, at-risk student alerts, domain distribution, and placement forecasting for administrators."],
  [FileSearch, "Resume Intelligence", "Parses and scores student resumes, extracting skills and experience to enrich prediction models."],
  [TrendingUp, "Placement Benchmarking", "Compares student profiles against historical placement data to set realistic expectations and goals."],
];

const steps = [
  ["Step 01", "Build Student Profile", "Students enter academic records, skills, certifications, projects, and link digital profiles like GitHub and LeetCode."],
  ["Step 02", "AI Analyzes Data", "Four specialized ML models process academic, behavioral, skill, and historical data simultaneously."],
  ["Step 03", "Predictions Generated", "Domain fit, salary range, readiness score, company tier eligibility, and skill gaps are calculated instantly."],
  ["Step 04", "Act on Insights", "Students follow personalized roadmaps. Institutions identify at-risk students and optimize training programs."],
];

function ProgressBar({ value, showLabel = false }) {
  return (
    <div className={styles.progressBlock}>
      {showLabel && <div className={styles.progressLabel}><span>Predicted placement rate</span><strong>{value}%</strong></div>}
      <div className={styles.progressTrack}><span style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function DashboardPreview() {
  const { data: prediction, isLoading } = useQuery({
    queryKey: ["landing-prediction-preview"],
    queryFn: getPrediction,
  });

  const cards = [
    ["Best Fit Domain", prediction?.bestFitDomain?.name || "Profile needed"],
    ["Expected Package", prediction?.expectedPackage || "Profile needed"],
    ["Placement Probability", prediction ? `${prediction.placementProbability}%` : "Profile needed"],
    ["Readiness Score", prediction ? `${prediction.readinessScore} / 100` : "Profile needed"],
    ["Company Tier", prediction?.companyTier?.slice(0, 2).join(" · ") || "Profile needed"],
    ["Top Domain Match", prediction?.topDomains?.[0] ? `${prediction.topDomains[0].name} ${prediction.topDomains[0].value}%` : "Profile needed"],
  ];

  return (
    <div className={styles.previewFrame}>
      <div className={styles.previewLabel}>Live prediction preview</div>
      <div className={styles.dashboardPreview}>
        <div className={styles.browserBar}>
          <div className={styles.browserDots}><span /><span /><span /></div>
          <div className={styles.urlBar} />
        </div>
        <div className={styles.previewBody}>
          {isLoading && <p className={styles.previewStatus}>Loading prediction preview...</p>}
          <div className={styles.previewGrid}>
            {cards.map(([label, value]) => (
              <div className={styles.previewCard} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className={styles.profileRow}>
            <span>Profile Completeness</span>
            <ProgressBar value={78} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brandGroup} aria-label="GLATalentForecast.AI home">
        <img src="/gla-logo.png" alt="GLA University" className={styles.brandLogo} />
        <span className={styles.brandDivider} />
        <span className={styles.wordmark}>GLATalentForecast.AI</span>
      </Link>
      <nav className={styles.navLinks}>
        {navLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
      </nav>
      <div className={styles.navActions}>
        <Link to="/login" className={styles.ghostButton}>Log in</Link>
        <Link to="/login" className={styles.primaryButton}>Get Started Free<ArrowRight size={14} /></Link>
        <button className={styles.hamburger} onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          <Menu size={20} />
        </button>
      </div>
      {open && (
        <nav className={styles.mobileMenu}>
          {navLinks.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
      )}
    </header>
  );
}

export default function Landing() {
  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.pill}>AI-Powered Placement Intelligence</span>
          <h1 className={styles.heroHeading}>Predict. Prepare. Place.<span>Built for Every Student.</span></h1>
          <p className={styles.heroText}>GLATalentForecast.AI helps students, faculty, and placement teams make smarter career decisions through placement forecasting, skill-gap analysis, and employability intelligence.</p>
          <div className={styles.heroCTA}>
            <Link to="/login" className={styles.largePrimary}>Launch Dashboard<ArrowRight size={14} /></Link>
            <a href="#how-it-works" className={styles.largeSecondary}>See How It Works</a>
          </div>
          <div className={styles.trustRow}>
            <span><i className={styles.trustDot} />Trusted by GLA University</span>
            <span><i className={styles.trustDot} />Built for Students &amp; Placement Teams</span>
            <span><i className={styles.trustDot} />AI-Powered Employability Intelligence</span>
          </div>
        </div>
        <DashboardPreview />
      </section>

      <section className={styles.section} id="features">
        <SectionHeader eyebrow="Platform Features" heading="Everything your institution needs" subtext="From raw student data to actionable placement intelligence - all in one platform." />
        <div className={styles.featuresGrid}>
          {features.map(([Icon, title, description]) => (
            <article className={styles.featureCard} key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.howSection} id="how-it-works">
        <div className={styles.inner}>
          <SectionHeader eyebrow="How It Works" heading="From data to placement in 4 steps" />
          <div className={styles.stepsGrid}>
            {steps.map(([number, title, description]) => (
              <article className={styles.stepCard} key={number}>
                <span>{number}</span>
                <hr />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner} id="pricing">
        <div>
          <h2>Ready to transform placement outcomes?</h2>
          <p>Join 50+ institutions using GLATalentForecast.AI to predict, prepare, and place every student.</p>
          <div className={styles.heroCTA}>
            <Link to="/login" className={styles.largePrimary}>Get Started Free</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeader({ eyebrow, heading, subtext }) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{heading}</h2>
      {subtext && <p>{subtext}</p>}
    </div>
  );
}

function Footer() {
  const columns = [
    ["Product", ["Features", "How It Works", "For Students", "For Institutions", "Pricing"]],
    ["Company", ["About", "Blog", "Careers", "Press", "Contact"]],
    ["Support", ["Documentation", "Help Center", "Privacy Policy", "Terms of Service", "Status"]],
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <div className={styles.footerBrand}>GLATalentForecast.AI</div>
          <p>AI-powered student talent intelligence and placement forecasting for educational institutions.</p>
          <div className={styles.socials}>
            <a href="#top" aria-label="LinkedIn"><LinkIcon size={18} /></a>
            <a href="#top" aria-label="Twitter"><AtSign size={18} /></a>
            <a href="#top" aria-label="GitHub"><GitBranch size={18} /></a>
          </div>
        </div>
        {columns.map(([heading, links]) => (
          <div className={styles.footerColumn} key={heading}>
            <h3>{heading}</h3>
            {links.map((link) => <a href="#top" key={link}>{link}</a>)}
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <span className={styles.footerCopy}>© 2025 GLATalentForecast.AI. All rights reserved.</span>
        <div className={styles.footerInstitution}>
          <span className={styles.footerInstitutionLabel}>A GLA University initiative</span>
          <img
            src="/gla-logo.png"
            alt="GLA University, Mathura"
            className={styles.footerLogo}
          />
        </div>
      </div>
    </footer>
  );
}
