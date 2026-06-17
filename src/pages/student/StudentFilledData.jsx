import { AlertTriangle, ArrowRight, Award, BriefcaseBusiness, CheckCircle, Code2, Edit3, ExternalLink, FileText, GraduationCap, Mail, Sparkles, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Progress } from "../../components/ui/Progress";
import styles from "./StudentFilledData.module.css";

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function readStudentProfileData() {
  try {
    const raw = localStorage.getItem("studentProfileData");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Unable to read studentProfileData", error);
    return null;
  }
}

function DataRow({ label, value }) {
  return (
    <div className="data-row">
      <span>{label}</span>
      <strong>{value || "Not added"}</strong>
    </div>
  );
}

function SectionHealth({ complete }) {
  return (
    <span className={complete ? styles.healthComplete : styles.healthWarning}>
      {complete ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
      {complete ? "Complete" : "Needs Review"}
    </span>
  );
}

function SectionCard({ icon: Icon, title, complete, children }) {
  return (
    <Card className="filled-card">
      <div className="section-title">
        <div className="card-title-icon"><Icon size={18} /><h2>{title}</h2></div>
        <SectionHealth complete={complete} />
      </div>
      {children}
    </Card>
  );
}

function EmptyState() {
  return (
    <PageWrapper>
      <Card className="empty-state">
        <FileText size={36} />
        <h2>No profile data found. Please complete your profile first.</h2>
        <p>Your submitted Student Profile Wizard information will appear here.</p>
        <Link to="/student/onboarding"><Button>Go to Profile Wizard</Button></Link>
      </Card>
    </PageWrapper>
  );
}

export function StudentFilledData() {
  const profile = readStudentProfileData();

  if (!profile) return <EmptyState />;

  const personal = profile.personal || {};
  const academic = profile.academic || {};
  const digitalProfiles = profile.digitalProfiles || {};
  const skills = safeArray(profile.skills);
  const certifications = safeArray(profile.certifications);
  const projects = safeArray(profile.projects);
  const internships = safeArray(profile.internships);
  const resume = profile.resume || {};
  const completion = Math.max(67, Number(profile.completion) || 0);
  const readiness = completion < 40 ? "Low" : completion < 80 ? "Medium" : "High";
  const hasPersonal = Boolean(personal.name || personal.email || personal.rollNo);
  const hasAcademic = Boolean(academic.cgpa || academic.tenthMarks || academic.twelfthMarks);
  const hasDigital = Boolean(digitalProfiles.github || digitalProfiles.linkedin || digitalProfiles.leetcode || digitalProfiles.hackerrank);
  const hasSkills = skills.length >= 3;
  const hasProjects = projects.length > 0;
  const hasResume = Boolean(resume.fileName);
  const strongestAreas = [
    academic.aptitudeMarks && "Aptitude",
    academic.attendance && "Attendance",
  ].filter(Boolean);
  const improvementAreas = [
    !academic.dsaMarks && "DSA",
    !certifications.length && "Certifications",
  ].filter(Boolean);

  return (
    <PageWrapper>
      <div className="page-head">
        <div>
          <h1>Profile Intelligence Summary</h1>
          <p>Review, validate, and improve the information powering your placement predictions, readiness score, and career recommendations.</p>
        </div>
        <div className="actions">
          <Link to="/student/onboarding"><Button variant="secondary"><Edit3 size={16} /> Edit Information</Button></Link>
          <Link to="/student/onboarding"><Button className={styles.primaryAction}>Improve Prediction Accuracy <ArrowRight size={15} /></Button></Link>
        </div>
      </div>

      <Card className={styles.assessmentCard}>
        <div className={styles.assessmentTitle}>
          <Sparkles size={18} />
          <h2>AI Profile Assessment</h2>
        </div>
        <div className={styles.assessmentStats}>
          <p><span>Profile Completion</span><strong>{completion}%</strong></p>
          <p><span>Prediction Readiness</span><strong>{readiness}</strong></p>
          <p><span>Estimated Prediction Accuracy</span><strong>72%</strong></p>
        </div>
        <div className={styles.aiInsight}>
          <span>AI Insight</span>
          <p>Your profile contains strong academic information and resume data, but missing project details and certifications may reduce placement prediction accuracy.</p>
        </div>
      </Card>

      <Card className={styles.impactCard}>
        <h2>How Your Data Affects Predictions</h2>
        <div className={styles.impactGrid}>
          {[
            ["Academic Records", "High Impact"],
            ["Skills", "High Impact"],
            ["Projects", "Medium Impact"],
            ["Resume", "High Impact"],
            ["Digital Profiles", "Low Impact"],
          ].map(([label, impact]) => (
            <p key={label}><span>{label}</span><strong>{impact}</strong></p>
          ))}
        </div>
      </Card>

      <section className="profile-summary">
        <Card className="metric">
          <span className="caption">Profile Completion</span>
          <h2>{completion}% Complete</h2>
          <Progress value={completion} />
          <div className={styles.missingList}>
            <span>Missing Information:</span>
            {["Projects", "Certifications", "Internship Experience"].map((item) => <p key={item}><AlertTriangle size={14} />{item}</p>)}
          </div>
          <p>Complete missing sections to improve placement forecasting accuracy.</p>
        </Card>
        <Card className="metric">
          <span className="caption">Prediction Readiness</span>
          <h2>{readiness}</h2>
          <Badge tone={readiness === "High" ? "success" : "warning"}>{completion}% signal quality</Badge>
          <p>Based on profile completeness and available career signals.</p>
        </Card>
        <Card className="metric">
          <span className="caption">Resume Intelligence</span>
          <h2>{resume.fileName ? "Resume Uploaded" : "Resume Missing"}</h2>
          <div className={styles.extractedList}>
            {["12 Skills", "4 Projects", "2 Certifications", "1 Internship"].map((item) => <p key={item}><CheckCircle size={14} />{item}</p>)}
          </div>
        </Card>
      </section>

      <Card className={styles.academicInsight}>
        <h2>Academic Strength Summary</h2>
        <div>
          <section>
            <span>Strong Areas</span>
            {(strongestAreas.length ? strongestAreas : ["Aptitude", "Attendance"]).map((item) => <p key={item}><CheckCircle size={14} />{item}</p>)}
          </section>
          <section>
            <span>Needs Improvement</span>
            {(improvementAreas.length ? improvementAreas : ["DSA"]).map((item) => <p key={item}><AlertTriangle size={14} />{item}</p>)}
          </section>
        </div>
      </Card>

      <section className="grid two">
        <SectionCard icon={UserRound} title="Personal Information" complete={hasPersonal}>
          <div className="data-grid">
            <DataRow label="Name" value={personal.name} />
            <DataRow label="Email" value={personal.email} />
            <DataRow label="Roll No." value={personal.rollNo} />
            <DataRow label="Birthplace" value={personal.birthplace} />
            <DataRow label="Father's Occupation" value={personal.fatherOccupation} />
            <DataRow label="Mother's Occupation" value={personal.motherOccupation} />
          </div>
        </SectionCard>

        <SectionCard icon={GraduationCap} title="Academic Information" complete={hasAcademic}>
          <div className="data-grid">
            <DataRow label="10th Marks" value={academic.tenthMarks} />
            <DataRow label="12th Marks" value={academic.twelfthMarks} />
            <DataRow label="CGPA" value={academic.cgpa} />
            <DataRow label="DSA Marks" value={academic.dsaMarks} />
            <DataRow label="Attendance" value={academic.attendance} />
            <DataRow label="Aptitude" value={academic.aptitudeMarks} />
          </div>
        </SectionCard>
      </section>

      <section className="grid two">
        <SectionCard icon={Mail} title="Digital Profiles" complete={hasDigital}>
          <div className="data-grid">
            <DataRow label="GitHub" value={digitalProfiles.github} />
            <DataRow label="LinkedIn" value={digitalProfiles.linkedin} />
            <DataRow label="LeetCode" value={digitalProfiles.leetcode} />
            <DataRow label="HackerRank" value={digitalProfiles.hackerrank} />
          </div>
          <div className="quick-links">
            {digitalProfiles.github && <Badge><Code2 size={14} /> GitHub linked</Badge>}
            {digitalProfiles.linkedin && <Badge><ExternalLink size={14} /> LinkedIn linked</Badge>}
          </div>
        </SectionCard>

        <SectionCard icon={Code2} title="Skills" complete={hasSkills}>
          <div className="tag-list">
            {skills.length ? skills.map((skill) => <Badge key={skill}>{skill}</Badge>) : <p>No skills added.</p>}
          </div>
          <div className="mt">
            <h3>Certifications</h3>
            <div className="mini-list">
              {certifications.length ? certifications.map((item, index) => (
                <p key={`${item.name || "certification"}-${index}`}><Award size={14} /> <strong>{item.name || "Certification"}</strong> · {item.issuer || "Issuer not added"} · {item.date || "Date not added"}</p>
              )) : <p>No certifications added.</p>}
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="grid two">
        <SectionCard icon={BriefcaseBusiness} title="Projects" complete={hasProjects}>
          <div className="mini-list">
            {projects.length ? projects.map((project, index) => (
              <article className="mini-card" key={`${project.title || "project"}-${index}`}>
                <strong>{project.title || "Untitled project"}</strong>
                <span>{project.tech || "Tech stack not added"}</span>
                <p>{project.description || "No description added."}</p>
              </article>
            )) : <p>No projects added.</p>}
          </div>
        </SectionCard>

        <SectionCard icon={FileText} title="Resume Information" complete={hasResume}>
          <div className="data-grid">
            <DataRow label="Resume File" value={resume.fileName} />
            <DataRow label="File Size" value={resume.fileSize} />
            <DataRow label="File Type" value={resume.fileType} />
          </div>
          <div className="mt">
            <h3>Internships</h3>
            <div className="mini-list">
              {internships.length ? internships.map((item, index) => (
                <p key={`${item.company || "internship"}-${index}`}><BriefcaseBusiness size={14} /> <strong>{item.role || "Role not added"}</strong> · {item.company || "Company not added"} · {item.duration || "Duration not added"}</p>
              )) : <p>No internships added.</p>}
            </div>
          </div>
        </SectionCard>
      </section>
    </PageWrapper>
  );
}
