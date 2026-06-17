import { ArrowRight, Bell, BrainCircuit, Database, Eye, LockKeyhole, Palette, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { getUserSettings, updateUserSettings } from "../../services/api";
import styles from "./Settings.module.css";

function SettingsRow({ label, description, checked, onChange }) {
  return (
    <label className="settings-row">
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input type="checkbox" checked={Boolean(checked)} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

function SettingsCard({ icon: Icon, title, children }) {
  return (
    <Card className="settings-card">
      <div className="card-title-icon"><Icon size={18} /><h2>{title}</h2></div>
      {children}
    </Card>
  );
}

function ImpactRow({ label, description, impact, checked, onChange }) {
  return (
    <label className="settings-row">
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <span className={styles.impactControls}>
        <em>{impact}</em>
        <input type="checkbox" checked={Boolean(checked)} onChange={(event) => onChange(event.target.checked)} />
      </span>
    </label>
  );
}

export function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        setIsLoading(true);
        const data = await getUserSettings();
        if (isMounted) setSettings(data);
      } catch {
        if (isMounted) setError("Unable to load settings.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateSection = (section, field, value) => {
    setSuccessMessage("");
    setSettings((current) => ({
      ...current,
      [section]: {
        ...(current?.[section] || {}),
        [field]: value,
      },
    }));
  };

  const saveSettings = async () => {
    if (!settings) return;

    try {
      setIsSaving(true);
      setError("");
      const updated = await updateUserSettings(settings);
      setSettings(updated);
      setSuccessMessage("Settings updated successfully.");
    } catch {
      setError("Unable to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <Card><p>Loading settings...</p></Card>
      </PageWrapper>
    );
  }

  if (error && !settings) {
    return (
      <PageWrapper>
        <Card><h2>Unable to load settings.</h2><p>Please refresh the page and try again.</p></Card>
      </PageWrapper>
    );
  }

  if (!settings) {
    return (
      <PageWrapper>
        <Card><h2>No settings available yet.</h2><p>Your preferences will appear here once settings are available.</p></Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <p>Manage your account, prediction preferences, privacy controls, and placement intelligence settings.</p>
        </div>
        <Button className={styles.saveButton} type="button" disabled={isSaving} onClick={saveSettings}>{isSaving ? "Saving..." : "Save Preferences"}<ArrowRight size={15} /></Button>
      </div>

      {successMessage && <Card><p>{successMessage}</p></Card>}
      {error && <Card><p className="upload-error">{error}</p></Card>}

      <Card className={styles.statusCard}>
        <div>
          <h2>Profile Status</h2>
          <Link to="/student/filled-data">View Profile Intelligence Summary <ArrowRight size={14} /></Link>
        </div>
        <div className={styles.statusGrid}>
          <p><span>Profile Completion</span><strong>67%</strong></p>
          <p><span>Prediction Readiness</span><strong>Medium</strong></p>
          <p><span>Resume Status</span><strong>Uploaded</strong></p>
          <p><span>Placement Visibility</span><strong>Enabled</strong></p>
        </div>
      </Card>

      <section className="grid two">
        <SettingsCard icon={UserRound} title="Account Info">
          <div className="form-grid">
            <label>Name<Input value={settings.accountInfo?.name || ""} onChange={(event) => updateSection("accountInfo", "name", event.target.value)} /></label>
            <label>Email<Input value={settings.accountInfo?.email || ""} onChange={(event) => updateSection("accountInfo", "email", event.target.value)} /></label>
            <label>Role<Input value={settings.accountInfo?.role || ""} onChange={(event) => updateSection("accountInfo", "role", event.target.value)} /></label>
            <label>Student ID<Input value={settings.accountInfo?.studentId || ""} onChange={(event) => updateSection("accountInfo", "studentId", event.target.value)} /></label>
            <label>Department<Input value={settings.accountInfo?.department || "CSE"} onChange={(event) => updateSection("accountInfo", "department", event.target.value)} /></label>
            <label>Batch<Input value={settings.accountInfo?.batch || "2026"} onChange={(event) => updateSection("accountInfo", "batch", event.target.value)} /></label>
            <label>Current CGPA<Input value={settings.accountInfo?.cgpa || "8.0"} onChange={(event) => updateSection("accountInfo", "cgpa", event.target.value)} /></label>
          </div>
        </SettingsCard>

        <SettingsCard icon={Palette} title="Platform Preferences">
          <div className="form-grid">
            <label>Theme<Select value={settings.preferences?.theme || "System"} onChange={(event) => updateSection("preferences", "theme", event.target.value)}><option>System</option><option>Light</option><option>Dark</option></Select></label>
            <label>Language<Select value={settings.preferences?.language || "English"} onChange={(event) => updateSection("preferences", "language", event.target.value)}><option>English</option><option>Hindi</option></Select></label>
            <label>Dashboard Density<Select value={settings.preferences?.dashboardDensity || "Comfortable"} onChange={(event) => updateSection("preferences", "dashboardDensity", event.target.value)}><option>Comfortable</option><option>Compact</option></Select></label>
            <label>Default Landing Page<Select value={settings.preferences?.defaultLandingPage || "Dashboard"} onChange={(event) => updateSection("preferences", "defaultLandingPage", event.target.value)}><option>Dashboard</option><option>AI Predictions</option><option>Placement History</option><option>Profile Summary</option></Select></label>
          </div>
        </SettingsCard>
      </section>

      <section className="grid two">
        <SettingsCard icon={BrainCircuit} title="Placement Intelligence Preferences">
          <SettingsRow label="Receive AI Career Recommendations" description="Get personalized role and preparation recommendations." checked={settings.placementIntelligence?.careerRecommendations ?? true} onChange={(value) => updateSection("placementIntelligence", "careerRecommendations", value)} />
          <SettingsRow label="Receive Skill Gap Alerts" description="Notify me when weak skills reduce placement readiness." checked={settings.placementIntelligence?.skillGapAlerts ?? true} onChange={(value) => updateSection("placementIntelligence", "skillGapAlerts", value)} />
          <SettingsRow label="Receive Placement Readiness Updates" description="Receive updates when your readiness score changes." checked={settings.placementIntelligence?.readinessUpdates ?? true} onChange={(value) => updateSection("placementIntelligence", "readinessUpdates", value)} />
          <SettingsRow label="Receive New Recruiter Match Notifications" description="Alert me when recruiters match my profile signals." checked={settings.placementIntelligence?.recruiterMatches ?? true} onChange={(value) => updateSection("placementIntelligence", "recruiterMatches", value)} />
        </SettingsCard>

        <SettingsCard icon={Database} title="Prediction Preferences">
          <ImpactRow label="Use Resume Data in Predictions" description="Include resume-derived skills and experience." impact="High Impact" checked={settings.predictionControls?.resumeData ?? true} onChange={(value) => updateSection("predictionControls", "resumeData", value)} />
          <ImpactRow label="Use Academic Performance in Predictions" description="Use CGPA, marks, and attendance signals." impact="High Impact" checked={settings.predictionControls?.academicPerformance ?? true} onChange={(value) => updateSection("predictionControls", "academicPerformance", value)} />
          <ImpactRow label="Use Skill Assessments in Predictions" description="Include coding, aptitude, and domain skill evidence." impact="High Impact" checked={settings.predictionControls?.skillAssessments ?? true} onChange={(value) => updateSection("predictionControls", "skillAssessments", value)} />
          <ImpactRow label="Use Project Portfolio in Predictions" description="Use project quality and deployment evidence." impact="Medium Impact" checked={settings.predictionControls?.projectPortfolio ?? true} onChange={(value) => updateSection("predictionControls", "projectPortfolio", value)} />
        </SettingsCard>
      </section>

      <section className="grid two">
        <SettingsCard icon={Bell} title="Notifications">
          <SettingsRow label="Email Alerts" description="Receive important account and profile updates." checked={settings.notifications?.emailAlerts} onChange={(value) => updateSection("notifications", "emailAlerts", value)} />
          <SettingsRow label="Placement Updates" description="Get notified about placement drives and deadlines." checked={settings.notifications?.placementUpdates} onChange={(value) => updateSection("notifications", "placementUpdates", value)} />
          <SettingsRow label="Recommendation Alerts" description="Receive new preparation suggestions." checked={settings.notifications?.recommendationAlerts} onChange={(value) => updateSection("notifications", "recommendationAlerts", value)} />
          <SettingsRow label="Weekly Summary" description="Send a weekly readiness and activity summary." checked={settings.notifications?.weeklySummary} onChange={(value) => updateSection("notifications", "weeklySummary", value)} />
          <SettingsRow label="Recruiter Match Alerts" description="Receive notifications when recruiters match your profile." checked={settings.notifications?.recruiterMatchAlerts ?? true} onChange={(value) => updateSection("notifications", "recruiterMatchAlerts", value)} />
          <SettingsRow label="Placement Forecast Updates" description="Receive updates when your prediction score changes." checked={settings.notifications?.forecastUpdates ?? true} onChange={(value) => updateSection("notifications", "forecastUpdates", value)} />
          <SettingsRow label="Internship Opportunity Alerts" description="Receive internship recommendations based on profile data." checked={settings.notifications?.internshipAlerts ?? false} onChange={(value) => updateSection("notifications", "internshipAlerts", value)} />
        </SettingsCard>

        <SettingsCard icon={Eye} title="Profile Visibility">
          <SettingsRow label="Visible to Recruiters" description="Allow recruiters to view eligible profile details." checked={settings.profileVisibility?.visibleToRecruiters} onChange={(value) => updateSection("profileVisibility", "visibleToRecruiters", value)} />
          <SettingsRow label="Visible to Placement Cell" description="Allow placement officers to review your profile." checked={settings.profileVisibility?.visibleToPlacementCell} onChange={(value) => updateSection("profileVisibility", "visibleToPlacementCell", value)} />
          <SettingsRow label="Show Academic Details" description="Include marks and CGPA in shared profile views." checked={settings.profileVisibility?.showAcademicDetails} onChange={(value) => updateSection("profileVisibility", "showAcademicDetails", value)} />
          <SettingsRow label="Show Digital Profiles" description="Share GitHub, LinkedIn, and coding profiles." checked={settings.profileVisibility?.showDigitalProfiles} onChange={(value) => updateSection("profileVisibility", "showDigitalProfiles", value)} />
          <SettingsRow label="Allow Anonymous Benchmarking" description="Allow profile to be included in placement trend analysis." checked={settings.profileVisibility?.anonymousBenchmarking ?? true} onChange={(value) => updateSection("profileVisibility", "anonymousBenchmarking", value)} />
          <SettingsRow label="Allow AI Model Training" description="Allow profile data to improve future placement forecasting models." checked={settings.profileVisibility?.aiModelTraining ?? false} onChange={(value) => updateSection("profileVisibility", "aiModelTraining", value)} />
        </SettingsCard>
      </section>

      <section className="grid two">
        <SettingsCard icon={LockKeyhole} title="Security">
          <div className={styles.securityList}>
            <button type="button">Change Password</button>
            <button type="button">Two-Factor Authentication</button>
            <button type="button">Active Sessions</button>
            <button type="button">Recent Login Activity</button>
          </div>
          <SettingsRow label="Two-Factor Authentication" description="Add an extra verification step during login." checked={settings.security?.twoFactorAuth} onChange={(value) => updateSection("security", "twoFactorAuth", value)} />
          <SettingsRow label="Login Alerts" description="Notify me when my account is accessed." checked={settings.security?.loginAlerts} onChange={(value) => updateSection("security", "loginAlerts", value)} />
          <div className="data-row"><span>Password Last Changed</span><strong>{settings.security?.passwordLastChanged || "Not updated yet"}</strong></div>
          <Badge>Frontend-only setting</Badge>
        </SettingsCard>

        <SettingsCard icon={ShieldCheck} title="Data & Privacy">
          <SettingsRow label="Allow Analytics" description="Help improve readiness analytics with anonymized usage." checked={settings.privacy?.allowAnalytics} onChange={(value) => updateSection("privacy", "allowAnalytics", value)} />
          <SettingsRow label="Allow Profile Benchmarking" description="Compare your profile against anonymized placement trends." checked={settings.privacy?.allowProfileBenchmarking} onChange={(value) => updateSection("privacy", "allowProfileBenchmarking", value)} />
          <SettingsRow label="Allow Data Export" description="Enable exporting your profile data in the future." checked={settings.privacy?.allowDataExport} onChange={(value) => updateSection("privacy", "allowDataExport", value)} />
          <SettingsRow label="Account Deletion Request" description="Mark interest in account deletion workflow." checked={settings.privacy?.allowAccountDeletionRequest} onChange={(value) => updateSection("privacy", "allowAccountDeletionRequest", value)} />
        </SettingsCard>
      </section>
    </PageWrapper>
  );
}
