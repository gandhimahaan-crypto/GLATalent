import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { MonoBarChart } from "../../components/charts/BarChart";
import { MonoLineChart } from "../../components/charts/LineChart";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { Table } from "../../components/ui/Table";
import { getPlacementHistory } from "../../services/api";
import styles from "./History.module.css";

export function PlacementHistory() {
  const [range, setRange] = useState(8);
  const { data: history, isLoading, error } = useQuery({
    queryKey: ["placement-history"],
    queryFn: getPlacementHistory,
  });

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

  const placements = history?.placements || [];
  const metrics = [
    ["624", "Students Placed", "Last 5 Years"],
    ["₹6.4L", "Average Package", "+8% YoY Growth"],
    ["₹24L", "Highest Package", "Product Role Placement"],
    ["Infosys", "Top Recruiter", "132 Offers"],
  ];
  const recruiters = [
    ["Infosys", "132 Offers"],
    ["TCS Digital", "96 Offers"],
    ["Accenture", "84 Offers"],
    ["Cognizant", "78 Offers"],
  ];
  const distribution = [
    { domain: "Software Development", placements: 312 },
    { domain: "Cloud", placements: 118 },
    { domain: "Data Science", placements: 146 },
    { domain: "Consulting", placements: 91 },
    { domain: "Others", placements: 64 },
  ];
  const rows = placements.map((p, index) => ({
    Company: p.company,
    Role: p.role,
    Domain: p.domain,
    Package: p.package,
    Tier: index % 3 === 1 ? "Tier-2 Product" : index % 3 === 2 ? "Service" : "Product",
    Year: p.year,
  }));

  return (
    <PageWrapper>
      <div className="page-head">
        <div>
          <h1>Placement Outcomes Intelligence</h1>
          <p>Analyze historical placement outcomes, recruiter trends, and benchmark your profile against previously placed students.</p>
        </div>
        <Button className={styles.primaryAction}>Compare My Placement Potential <ArrowRight size={15} /></Button>
      </div>

      <Card className={styles.benchmarkCard}>
        <div>
          <h2>How You Compare</h2>
          <p>Current Placement Alignment: <strong>Tier-2 Product &amp; Service Companies</strong></p>
        </div>
        <div className={styles.benchmarkGrid}>
          <p><span>Your Predicted Package</span><strong>₹5.4L – ₹7.8L</strong><i /></p>
          <p><span>Average Placement Package</span><strong>₹6.4L</strong><i /></p>
          <p><span>Top 25% Students</span><strong>₹9.8L+</strong><i /></p>
        </div>
      </Card>

      <div className="top-tools"><Select><option>Year</option><option>2025</option></Select><Select><option>Domain</option></Select><Select><option>Company Tier</option></Select><label className="range-label">Package Range<Input type="range" min="3" max="20" value={range} onChange={(event) => setRange(event.target.value)} /></label></div>

      <section className="grid four">
        {metrics.map(([value, label, detail]) => (
          <Card className={styles.metricCard} key={label}>
            <span>{label}</span>
            <h2>{value}</h2>
            <p>{detail}</p>
          </Card>
        ))}
      </section>

      <section className={styles.gridTwo}>
        <Card>
          <h2>Students With Similar Profiles</h2>
          <div className={styles.similarStats}>
            <p><span>Average Package</span><strong>₹7.1L</strong></p>
            <p><span>Placement Rate</span><strong>81%</strong></p>
            <p><span>Most Common Domain</span><strong>Software Development</strong></p>
          </div>
          <div className={styles.recruiterList}>
            <span>Most Common Recruiters</span>
            {["Infosys", "TCS Digital", "Accenture", "Cognizant"].map((company) => <p key={company}><CheckCircle size={14} />{company}</p>)}
          </div>
        </Card>

        <Card>
          <h2>Top Recruiters Hiring Your Domain</h2>
          <div className={styles.rankedList}>
            {recruiters.map(([company, offers], index) => (
              <p key={company}><strong>#{index + 1} {company}</strong><span>{offers}</span></p>
            ))}
          </div>
        </Card>
      </section>

      <section className={styles.gridTwo}>
        <Card>
          <h2>Placement Distribution by Domain</h2>
          <MonoBarChart data={distribution} xKey="domain" yKey="placements" layout="vertical" />
        </Card>

        <Card className={styles.aiCard}>
          <div className={styles.aiTitle}><Sparkles size={18} /><h2>Profile Comparison Insights</h2></div>
          <div className={styles.insightList}>
            <p><CheckCircle size={15} />You score higher than 62% of placed students in Aptitude.</p>
            <p><AlertTriangle size={15} />You score lower than 48% of placed students in DSA.</p>
            <p><CheckCircle size={15} />Students with similar profiles commonly secured Software Development roles.</p>
          </div>
        </Card>
      </section>

      <Card className={styles.trendCard}>
        <div className={styles.sectionHead}>
          <div>
            <h2>Package Growth Trends</h2>
            <p>Software Development, Cloud, and Data Science packages show steady growth across recent batches.</p>
          </div>
          <div className={styles.legend}>
            <span><i />Software Development</span>
            <span><i />Cloud</span>
            <span><i />Data Science</span>
          </div>
        </div>
        <div className={styles.keyInsights}>
          <p><strong>Cloud</strong> roles show strong upward movement in 2025.</p>
          <p><strong>Software Development</strong> remains the broadest placement path.</p>
        </div>
        {history?.packageTrendByDomain?.length ? <MonoLineChart data={history.packageTrendByDomain} lines={["software", "cloud", "data"]} colors={["#111111", "#1f5f99", "#f26a2e"]} /> : <p>No data available yet.</p>}
      </Card>

      <Card>
        <h2>Placement Outcomes</h2>
        {placements.length ? <Table columns={["Company", "Role", "Domain", "Package", "Tier", "Year"]} rows={rows} /> : <p>No data available yet.</p>}
      </Card>
    </PageWrapper>
  );
}
