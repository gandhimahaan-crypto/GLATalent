import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { ArcGauge } from "../../components/charts/ArcGauge";
import { MonoBarChart } from "../../components/charts/BarChart";
import { MonoRadarChart } from "../../components/charts/RadarChart";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { usePredictions } from "../../hooks/usePredictions";
import { useStudent } from "../../hooks/useStudent";
import { useAuthStore } from "../../stores/authStore";
import styles from "./Dashboard.module.css";

export function StudentDashboard() {
  const user = useAuthStore((state) => state.user);
  const { data: student, isLoading: isStudentLoading, error: studentError } = useStudent();
  const { data: prediction, isLoading: isPredictionLoading, error: predictionError, fetchStatus: predictionFetchStatus } = usePredictions();
  const firstName = user?.name?.split(" ")[0] || "Pushkar";
  const completeness = user?.email ? 24 : student?.completeness || 0;
  const isLoading = isStudentLoading || isPredictionLoading;
  const error = studentError || predictionError;

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

  if ((predictionFetchStatus === "idle" && !prediction) || !prediction || Object.keys(prediction).length === 0) {
    return (
      <PageWrapper>
        <Card className="empty-state">
          <h2>Please complete your profile to generate predictions.</h2>
          <p>Your dashboard prediction cards will appear after the Student Profile Wizard is submitted.</p>
          <Link to="/student/onboarding"><Button>Go to Profile Wizard</Button></Link>
        </Card>
      </PageWrapper>
    );
  }

  const placementProbability = 64;
  const readinessScore = 57;
  const expectedPackage = "₹5.4L – ₹7.8L";
  const bestFitDomain = "Software Development";
  const topDomains = [
    { name: "Software Development", value: 82 },
    { name: "Cloud Engineering", value: 74 },
    { name: "Data Science", value: 68 },
  ];
  const subjectPerformance = prediction.subjectPerformance || [];
  const strongestSubject = subjectPerformance.reduce((best, item) => (!best || item.score > best.score ? item : best), null);
  const weakestSubject = subjectPerformance.reduce((weakest, item) => (!weakest || item.score < weakest.score ? item : weakest), null);
  const topSkillGaps = ["DSA", "System Design", "Aptitude"];

  return (
    <PageWrapper>
      <div className={styles.dashboard}>
        <section className={styles.summary}>
          <div>
            <p className={styles.eyebrow}>Student Placement Dashboard</p>
            <h1>Welcome Back, {firstName}</h1>
            <div className={styles.profileProgress}>
              <span>Profile Completion: {completeness}%</span>
              <div><i style={{ width: `${completeness}%` }} /></div>
            </div>
          </div>
          <Link to="/student/onboarding" className={styles.updateLink}>Update Profile<ArrowRight size={14} /></Link>
        </section>

        <section className={styles.priorityGrid} aria-label="Priority placement metrics">
          <article className={styles.metricCard}>
            <span>Placement Probability</span>
            <strong className={styles.orangeText}>{placementProbability}%</strong>
            <p>Moderate Confidence</p>
          </article>
          <article className={styles.metricCard}>
            <span>Expected Package</span>
            <strong className={styles.blueText}>{expectedPackage}</strong>
            <p>Annual CTC estimate</p>
          </article>
          <article className={styles.metricCard}>
            <span>Readiness Score</span>
            <strong className={styles.orangeText}>{readinessScore} / 100</strong>
            <p>Placement readiness</p>
          </article>
          <article className={styles.metricCard}>
            <span>Best Fit Domain</span>
            <strong className={styles.blueText}>{bestFitDomain}</strong>
            <p>{prediction.bestFitDomain?.confidence || 82}% domain match</p>
          </article>
        </section>

        <section className={styles.insightCard}>
          <div className={styles.cardTitle}>
            <Sparkles size={18} />
            <h2>AI Career Insight</h2>
          </div>
          <p>Based on your current profile, you are best suited for Software Development roles. Improving DSA and Core CS subjects could increase your placement probability by approximately 12–18%.</p>
        </section>

        <section className={styles.gridTwo}>
          <Card className={styles.profileCard}>
            <div className={styles.sectionHead}>
              <h2>Profile Completion</h2>
              <strong>{completeness}% Complete</strong>
            </div>
            <div className={styles.profileProgress}>
              <div><i style={{ width: `${completeness}%` }} /></div>
            </div>
            <div className={styles.missingList}>
              <span>Missing:</span>
              {["Resume Upload", "Internship Experience", "Technical Certifications", "Project Portfolio"].map((item) => (
                <p key={item}><CheckCircle size={14} />{item}</p>
              ))}
            </div>
            <Link to="/student/onboarding" className={styles.cardCta}>Complete Profile<ArrowRight size={14} /></Link>
          </Card>

          <Card className={styles.domainsCard}>
            <div className={styles.sectionHead}>
              <h2>Top Domain Recommendations</h2>
              <span>Ranked by match</span>
            </div>
            <div className={styles.domainList}>
              {topDomains.map(({ name, value }, index) => (
                <div className={styles.domainRow} key={name}>
                  <div>
                    <strong>#{index + 1} {name}</strong>
                    <span>{value}% Match</span>
                  </div>
                  <div className={styles.cleanProgress}><i style={{ width: `${value}%` }} /></div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className={styles.gridThree}>
          <Card className={styles.readinessCard}>
            <div className={styles.sectionHead}>
              <h2>Readiness Score</h2>
            </div>
            <div className={styles.readinessGauge}>
              <ArcGauge value={readinessScore} />
              <p>Current Level:<strong>Intermediate</strong></p>
            </div>
          </Card>

          <Card className={styles.companyCard}>
            <h2>Eligible Company Categories</h2>
            <div className={styles.eligibilityList}>
              <p><CheckCircle size={15} />Service Companies</p>
              <p><CheckCircle size={15} />Tier-2 Product Companies</p>
              <p><AlertTriangle size={15} />Tier-1 Product Companies <span>(Needs Improvement)</span></p>
            </div>
          </Card>

          <Card className={styles.roadmapCard}>
            <h2>Next Best Actions</h2>
            {prediction.roadmap?.slice(0, 3).map(([title, description, priority]) => (
              <div className={styles.actionItem} key={title}>
                <strong>{title}</strong>
                <p>{description}</p>
                <span>{priority}</span>
              </div>
            ))}
          </Card>
        </section>

        <section className={styles.gridTwo}>
          <Card>
            <div className={styles.sectionHead}>
              <h2>Subject Performance</h2>
            </div>
            <div className={styles.subjectStats}>
              <p><span>Strongest Subject</span><strong>{strongestSubject?.subject || "DBMS"}</strong></p>
              <p><span>Needs Improvement</span><strong>{weakestSubject?.subject || "DSA"}</strong></p>
            </div>
            {subjectPerformance.length ? <MonoBarChart data={subjectPerformance} xKey="subject" yKey="score" layout="vertical" /> : <p>No subject performance data available.</p>}
          </Card>
          <Card>
            <div className={styles.sectionHead}>
              <h2>Skill Gap Analysis</h2>
            </div>
            {prediction.skillGapAnalysis?.length ? <MonoRadarChart data={prediction.skillGapAnalysis} /> : <p>No skill gap data available.</p>}
            <div className={styles.skillGaps}>
              <span>Top Skill Gaps</span>
              <div>{topSkillGaps.map((gap) => <strong key={gap}>{gap}</strong>)}</div>
            </div>
          </Card>
        </section>
      </div>
    </PageWrapper>
  );
}
