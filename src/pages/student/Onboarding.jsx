import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { AddRemoveTable } from "../../components/forms/AddRemoveTable";
import { FileUpload } from "../../components/forms/FileUpload";
import { StepWizard } from "../../components/forms/StepWizard";
import { TagInput } from "../../components/forms/TagInput";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { submitPredictionData, updateStudentProfile } from "../../services/api";
import styles from "./Onboarding.module.css";

const labels = ["Personal", "Academic", "Digital", "Skills", "Projects", "Resume"];

const initialFormData = {
  personal: {
    name: "",
    email: "",
    rollNo: "",
    birthplace: "",
    fatherOccupation: "",
    motherOccupation: "",
  },
  academic: {
    tenthMarks: "",
    tenthSchoolLocation: "",
    twelfthMarks: "",
    twelfthSchoolLocation: "",
    cgpa: "",
    attendance: "",
    semester: "Semester 1",
    englishMarks: "",
    aptitudeMarks: "",
    immersionMarks: "",
    dsaMarks: "",
  },
  digitalProfiles: {
    github: "",
    leetcode: "",
    linkedin: "",
    hackerrank: "",
  },
  certification: {
    name: "",
    issuer: "",
    date: "",
    link: "",
    platform: "",
    courseName: "",
    courseDate: "",
  },
  resume: null,
};

export function Onboarding() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [skills, setSkills] = useState(["React", "SQL"]);
  const [projects, setProjects] = useState([{ title: "", tech: "", description: "", github: "", live: "" }]);
  const [achievements, setAchievements] = useState([{ title: "", type: "", date: "", description: "" }]);
  const [internships, setInternships] = useState([{ company: "", role: "", duration: "", description: "" }]);
  const [submitMessage, setSubmitMessage] = useState("");
  const updateSection = (section, field, value) => {
    setFormData((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
  };

  const buildProfileData = () => {
    const certification = formData.certification.name || formData.certification.courseName
      ? [{
          name: formData.certification.name || formData.certification.courseName,
          issuer: formData.certification.issuer || formData.certification.platform,
          date: formData.certification.date || formData.certification.courseDate,
          link: formData.certification.link,
        }]
      : [];
    const nonEmptyProjects = projects.filter((project) => Object.values(project).some(Boolean));
    const nonEmptyInternships = internships.filter((internship) => Object.values(internship).some(Boolean));
    const filledSections = [
      formData.personal.name || formData.personal.rollNo,
      formData.academic.cgpa || formData.academic.tenthMarks || formData.academic.twelfthMarks,
      formData.digitalProfiles.github || formData.digitalProfiles.linkedin,
      skills.length,
      nonEmptyProjects.length,
      formData.resume?.fileName,
    ].filter(Boolean).length;

    return {
      ...formData,
      skills,
      certifications: certification,
      achievements: achievements.filter((item) => Object.values(item).some(Boolean)),
      projects: nonEmptyProjects,
      internships: nonEmptyInternships,
      completion: Math.round((filledSections / labels.length) * 100),
      status: "Profile Submitted",
      submittedAt: new Date().toISOString(),
    };
  };

  const profileMutation = useMutation({
    mutationFn: async () => {
      const profileData = buildProfileData();
      localStorage.setItem("studentProfileData", JSON.stringify(profileData));
      window.dispatchEvent(new Event("studentProfileDataChanged"));
      const profile = await updateStudentProfile(profileData);
      await submitPredictionData(profileData);
      return profile;
    },
    onSuccess: () => {
      setSubmitMessage("Profile saved. Prediction data submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["student"] });
      queryClient.invalidateQueries({ queryKey: ["predictions"] });
      navigate("/student/filled-data");
    },
  });

  const handleNext = () => {
    if (step < labels.length - 1) {
      setStep(step + 1);
      return;
    }

    profileMutation.mutate();
  };

  const getFilledSections = () => {
    const nonEmptyProjects = projects.filter((project) => Object.values(project).some(Boolean));
    return [
      formData.personal.name || formData.personal.rollNo || formData.personal.email,
      formData.academic.cgpa || formData.academic.tenthMarks || formData.academic.twelfthMarks,
      formData.digitalProfiles.github || formData.digitalProfiles.linkedin,
      skills.length,
      nonEmptyProjects.length,
      formData.resume?.fileName,
    ].filter(Boolean).length;
  };

  const completion = Math.max(24, Math.round((getFilledSections() / labels.length) * 100));
  const confidence = Math.min(100, Math.round(30 + completion / 2));
  const sectionStatus = [
    ["Personal Information", Boolean(formData.personal.name || formData.personal.rollNo || formData.personal.email)],
    ["Academic Information", Boolean(formData.academic.cgpa || formData.academic.tenthMarks || formData.academic.twelfthMarks)],
    ["Skills", Boolean(skills.length)],
    ["Projects", projects.some((project) => Object.values(project).some(Boolean))],
    ["Resume", Boolean(formData.resume?.fileName)],
  ];

  return (
    <PageWrapper>
      <div className={styles.onboardingPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Build Your Placement Profile</h1>
            <p>Complete your profile to unlock accurate AI-powered placement predictions, readiness scoring, and career insights.</p>
          </div>
        </div>

        <section className={styles.topGrid}>
          <Card className={styles.completionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Profile Completion</h2>
                <strong>{completion}% Complete</strong>
              </div>
              <span>More profile data = More accurate predictions.</span>
            </div>
            <div className={styles.progressTrack}><i style={{ width: `${completion}%` }} /></div>
            <div className={styles.missingGrid}>
              <span>Missing Sections:</span>
              {sectionStatus.map(([label, complete]) => (
                <p className={complete ? styles.complete : styles.missing} key={label}>
                  {complete ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                  {label}
                </p>
              ))}
            </div>
          </Card>

          <Card className={styles.confidenceCard}>
            <span>Prediction Confidence</span>
            <strong>{confidence}%</strong>
            <p>Complete additional sections to improve prediction accuracy.</p>
          </Card>
        </section>

        <Card className={styles.wizardCard}>
          <StepWizard step={step} labels={labels} />
        {step === 0 && <div className="form-grid"><Input placeholder="Full name" value={formData.personal.name} onChange={(event) => updateSection("personal", "name", event.target.value)} /><Input placeholder="Email" value={formData.personal.email} onChange={(event) => updateSection("personal", "email", event.target.value)} /><Input placeholder="Roll number" value={formData.personal.rollNo} onChange={(event) => updateSection("personal", "rollNo", event.target.value)} /><Input placeholder="Birthplace city" value={formData.personal.birthplace} onChange={(event) => updateSection("personal", "birthplace", event.target.value)} /><Input placeholder="Father's occupation" value={formData.personal.fatherOccupation} onChange={(event) => updateSection("personal", "fatherOccupation", event.target.value)} /><Input placeholder="Mother's occupation" value={formData.personal.motherOccupation} onChange={(event) => updateSection("personal", "motherOccupation", event.target.value)} /></div>}
        {step === 1 && <div className="form-grid"><Input placeholder="10th marks (%)" value={formData.academic.tenthMarks} onChange={(event) => updateSection("academic", "tenthMarks", event.target.value)} /><Input placeholder="10th school location" value={formData.academic.tenthSchoolLocation} onChange={(event) => updateSection("academic", "tenthSchoolLocation", event.target.value)} /><Input placeholder="12th marks (%)" value={formData.academic.twelfthMarks} onChange={(event) => updateSection("academic", "twelfthMarks", event.target.value)} /><Input placeholder="12th school location" value={formData.academic.twelfthSchoolLocation} onChange={(event) => updateSection("academic", "twelfthSchoolLocation", event.target.value)} /><Input placeholder="Overall CGPA" value={formData.academic.cgpa} onChange={(event) => updateSection("academic", "cgpa", event.target.value)} /><Input placeholder="Overall attendance (%)" value={formData.academic.attendance} onChange={(event) => updateSection("academic", "attendance", event.target.value)} /><Select value={formData.academic.semester} onChange={(event) => updateSection("academic", "semester", event.target.value)}>{[1,2,3,4,5,6,7,8].map((n) => <option key={n}>Semester {n}</option>)}</Select><Input placeholder="English marks" value={formData.academic.englishMarks} onChange={(event) => updateSection("academic", "englishMarks", event.target.value)} /><Input placeholder="Aptitude & Reasoning marks" value={formData.academic.aptitudeMarks} onChange={(event) => updateSection("academic", "aptitudeMarks", event.target.value)} /><Input placeholder="Immersion/Training marks" value={formData.academic.immersionMarks} onChange={(event) => updateSection("academic", "immersionMarks", event.target.value)} /><Input placeholder="DSA marks" value={formData.academic.dsaMarks} onChange={(event) => updateSection("academic", "dsaMarks", event.target.value)} /></div>}
        {step === 2 && <div className="form-grid">{[["GitHub username", "github"], ["LeetCode username", "leetcode"], ["LinkedIn profile URL", "linkedin"], ["HackerRank username", "hackerrank"]].map(([label, field]) => <label key={field}>{label}<Input placeholder={label} value={formData.digitalProfiles[field]} onChange={(event) => updateSection("digitalProfiles", field, event.target.value)} /><span className="status-dot"><i className={formData.digitalProfiles[field] ? "ok" : ""} />{formData.digitalProfiles[field] ? "Connected" : "Not added"}</span></label>)}</div>}
        {step === 3 && <div className="stack"><TagInput tags={skills} setTags={setSkills} /><div className="form-grid"><Input placeholder="Certification name" value={formData.certification.name} onChange={(event) => updateSection("certification", "name", event.target.value)} /><Input placeholder="Issuing body" value={formData.certification.issuer} onChange={(event) => updateSection("certification", "issuer", event.target.value)} /><Input type="date" value={formData.certification.date} onChange={(event) => updateSection("certification", "date", event.target.value)} /><Input placeholder="Link" value={formData.certification.link} onChange={(event) => updateSection("certification", "link", event.target.value)} /><Input placeholder="Platform" value={formData.certification.platform} onChange={(event) => updateSection("certification", "platform", event.target.value)} /><Input placeholder="Course name" value={formData.certification.courseName} onChange={(event) => updateSection("certification", "courseName", event.target.value)} /><Input type="date" value={formData.certification.courseDate} onChange={(event) => updateSection("certification", "courseDate", event.target.value)} /></div></div>}
        {step === 4 && <div className="stack"><AddRemoveTable title="Projects" rows={projects} setRows={setProjects} fields={["title", "tech", "description", "github", "live"]} /><AddRemoveTable title="Achievements" rows={achievements} setRows={setAchievements} fields={["title", "type", "date", "description"]} /><AddRemoveTable title="Internships" rows={internships} setRows={setInternships} fields={["company", "role", "duration", "description"]} /></div>}
        {step === 5 && (
          <div className={styles.resumeSection}>
            <div className={styles.resumeIntro}>
              <div>
                <Sparkles size={18} />
                <h2>Resume Intelligence</h2>
              </div>
              <p>Upload your resume to automatically extract:</p>
              <div>
                {["Skills", "Projects", "Certifications", "Technologies", "Experience"].map((item) => (
                  <span key={item}><CheckCircle size={14} />{item}</span>
                ))}
              </div>
            </div>
            <FileUpload onFileChange={(resume) => setFormData((current) => ({ ...current, resume }))} />
            {formData.resume && (
              <div className={styles.extractedInfo}>
                <span>Extracted information</span>
                <p><strong>Skills:</strong> React, SQL, JavaScript</p>
                <p><strong>Projects:</strong> Portfolio and academic project references detected</p>
                <p><strong>Technologies:</strong> Web development, databases, version control</p>
                <p><strong>Experience:</strong> Resume uploaded and queued for AI analysis</p>
              </div>
            )}
          </div>
        )}
        {profileMutation.isError && <p className="caption">Unable to submit profile: {profileMutation.error.message}</p>}
        {submitMessage && <p className="caption">{submitMessage}</p>}
        <div className="wizard-actions">
          <Button className={styles.secondaryButton} variant="secondary" type="button" disabled={step === 0 || profileMutation.isPending} onClick={() => setStep(step - 1)}><ArrowLeft size={14} />Previous</Button>
          <Button className={styles.primaryButton} type="button" disabled={profileMutation.isPending} onClick={handleNext}>{step === 5 ? profileMutation.isPending ? "Generating..." : "Generate My Predictions" : "Continue"}<ArrowRight size={14} /></Button>
        </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
