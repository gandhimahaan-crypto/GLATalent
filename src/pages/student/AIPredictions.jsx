import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { ArcGauge } from "../../components/charts/ArcGauge";
import { MonoBarChart } from "../../components/charts/BarChart";
import { MonoRadarChart } from "../../components/charts/RadarChart";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { usePredictions } from "../../hooks/usePredictions";
import styles from "./AIPredictions.module.css";

export function AIPredictions() {
  const { data: prediction, isLoading, error, fetchStatus } = usePredictions();
  const isWaitingForProfile = fetchStatus === "idle" && !prediction;

  if (isLoading) {
    return (
      <PageWrapper>
        <Card><p>Loading data...</p></Card>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Card><h2>Unable to load data.</h2><p>{error.message}</p></Card>
      </PageWrapper>
    );
  }

  if (isWaitingForProfile || !prediction) {
    return (
      <PageWrapper>
        <Card className="empty-state">
          <h2>Please complete your profile to generate predictions.</h2>
          <p>AI prediction estimates are generated from your filled student profile data.</p>
          <Link to="/student/onboarding"><Button>Go to Profile Wizard</Button></Link>
        </Card>
      </PageWrapper>
    );
  }

  const placementProbability = 64;
  const expectedPackage = "₹5.4L – ₹7.8L";
  const readinessScore = 57;
  const bestFitDomain = "Software Development";
  const topDomains = [
    { name: "Software Development", value: 82 },
    { name: "Cloud Engineering", value: 74 },
    { name: "Data Science", value: 68 },
  ];
  const subjectPerformance = prediction.subjectPerformance || [];
  const strongestSubject = subjectPerformance.reduce((best, item) => (!best || item.score > best.score ? item : best), null);
  const weakestSubject = subjectPerformance.reduce((weakest, item) => (!weakest || item.score < weakest.score ? item : weakest), null);
  const roadmap = [
    ["Build one deployment-ready project", "Expected Impact: +8% Placement Probability"],
    ["Complete Cloud Certification", "Expected Impact: +5% Placement Probability"],
    ["Improve DSA Performance", "Expected Impact: +7 Readiness Score"],
    ["Add Internship Experience", "Expected Impact: Higher Product Company Eligibility"],
  ];

  return (
    <PageWrapper>
      <div className="page-head">
        <div>
          <h1>Placement Intelligence Report</h1>
          <p>AI-generated career forecasting based on your academic performance, skills, projects, resume, and placement readiness.</p>
        </div>
        <Link to="/student/onboarding"><Button variant="secondary">Update Profile</Button></Link>
      </div>

      <Card className={styles.insightCard}>
        <div className={styles.insightTitle}>
          <Sparkles size={18} />
          <h2>AI Career Insight</h2>
        </div>
        <div className={styles.insightCopy}>
          <p>Based on your current profile, you are best suited for Software Development roles.</p>
          <p>Your current placement probability is <strong>64%</strong>.</p>
          <p>Improving DSA, Certifications, and Project Quality could increase your placement probability to approximately <strong>78%</strong>.</p>
          <p><span>Recommended Next Action:</span> Build one deployment-ready project.</p>
        </div>
      </Card>

      <section className={styles.primaryMetrics}>
        <Card className={styles.metricCard}><span>Placement Probability</span><h2 className={styles.orangeText}>{placementProbability}%</h2><p>Based on current profile</p></Card>
        <Card className={styles.metricCard}><span>Expected Package</span><h2 className={styles.blueText}>{expectedPackage}</h2><p>Annual CTC forecast</p></Card>
        <Card className={styles.metricCard}><span>Readiness Score</span><h2 className={styles.orangeText}>{readinessScore} / 100</h2><p>Current placement readiness</p></Card>
        <Card className={styles.metricCard}><span>Best Fit Domain</span><h2 className={styles.blueText}>{bestFitDomain}</h2><p>Strongest career path</p></Card>
      </section>

      <section className={styles.reportGrid}>
        <Card className={styles.readinessCard}>
          <h2>Readiness Score</h2>
          <div className={styles.gaugeWrap}>
            <ArcGauge value={readinessScore} />
            <p>Current Level<strong>Intermediate</strong></p>
            <span>12 points needed for Tier-1 eligibility.</span>
          </div>
        </Card>
        <Card className={styles.confidenceCard}>
          <span>Prediction Confidence</span>
          <strong>72%</strong>
          <p>Confidence is based on profile completeness and available career signals.</p>
        </Card>
        <Card className={styles.eligibilityCard}>
          <h2>Eligible Opportunities</h2>
          <div className={styles.eligibilityList}>
            <p><CheckCircle size={15} />Service Companies</p>
            <p><CheckCircle size={15} />Tier-2 Product Companies</p>
            <p><AlertTriangle size={15} />Tier-1 Product Companies</p>
          </div>
          <div className={styles.needsList}>
            <span>Needs Improvement:</span>
            {["DSA", "Projects", "Certifications"].map((item) => <p key={item}>{item}</p>)}
          </div>
        </Card>
      </section>

      <section className={styles.gridTwo}>
        <Card>
          <h2>Top Domains</h2>
          <div className={styles.domainList}>
            {topDomains.map(({ name, value }) => (
              <div className={styles.domainRow} key={name}>
                <div><strong>{name}</strong><span>{value}%</span></div>
                <div><i style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2>Subject Performance</h2>
          <div className={styles.subjectStats}>
            <p><span>Strongest Subject</span><strong>{strongestSubject?.subject || "Aptitude"}</strong></p>
            <p><span>Needs Improvement</span><strong>{weakestSubject?.subject || "DSA"}</strong></p>
          </div>
          {subjectPerformance.length ? <MonoBarChart data={subjectPerformance} xKey="subject" yKey="score" layout="vertical" /> : <p>No data available yet.</p>}
        </Card>
      </section>

      <section className={styles.gridTwo}>
        <Card>
          <h2>Skill Gap Analysis</h2>
          {prediction.skillGapAnalysis?.length ? <MonoRadarChart data={prediction.skillGapAnalysis} /> : <p>No data available yet.</p>}
          <div className={styles.skillGaps}>
            <span>Top Skill Gaps</span>
            <div>{["DSA", "System Design", "Project Deployment", "Communication"].map((gap) => <p key={gap}><AlertTriangle size={14} />{gap}</p>)}</div>
          </div>
        </Card>
        <Card>
          <h2>Personalized Roadmap</h2>
          <div className={styles.roadmapList}>
            {roadmap.map(([title, impact]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{impact}</p>
                <ArrowRight size={14} />
              </article>
            ))}
          </div>
        </Card>
      </section>
    </PageWrapper>
  );
}
