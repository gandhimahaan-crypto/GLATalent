import { MonoBarChart } from "../../components/charts/BarChart";
import { MonoLineChart } from "../../components/charts/LineChart";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { useDashboardStats } from "../../hooks/usePredictions";

export function AdminDashboard() {
  const { data: stats, isLoading, error } = useDashboardStats();
  const students = stats?.students || [];
  const rows = students.slice(0, 9).map((student, index) => ({
    Rank: index + 1, "Student Name": student.name, "Roll No.": student.rollNo, CGPA: student.cgpa,
    "Readiness Score": `${student.readiness}/100`, "Predicted Domain": student.domain,
    "Risk Level": <Badge tone={student.risk === "High" ? "danger" : student.risk === "Medium" ? "warning" : "success"}>{student.risk}</Badge>,
    Action: <a>View Profile</a>,
  }));

  if (isLoading) {
    return (
      <PageWrapper sidebar="admin">
        <Card><p>Loading data...</p></Card>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper sidebar="admin">
        <Card><h2>Unable to load data.</h2><p>{error.message}</p></Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper sidebar="admin">
      <div className="page-head"><h1>Institution Analytics</h1></div>
      <section className="grid four">{stats?.metrics?.length ? stats.metrics.map(([value, label]) => <Card className="metric" key={label}><h2>{value}</h2><p>{label}</p></Card>) : <Card><p>No data available yet.</p></Card>}</section>
      <section className="grid two"><Card><h2>Domain Distribution</h2>{stats?.domains?.length ? <MonoBarChart data={stats.domains} xKey="name" yKey="value" /> : <p>No data available yet.</p>}</Card><Card><h2>Batch Readiness Distribution</h2>{stats?.readinessDistribution?.length ? <MonoBarChart data={stats.readinessDistribution} xKey="range" yKey="students" /> : <p>No data available yet.</p>}</Card></section>
      <Card><h2>At-Risk Students</h2>{rows.length ? <><Table columns={["Rank", "Student Name", "Roll No.", "CGPA", "Readiness Score", "Predicted Domain", "Risk Level", "Action"]} rows={rows} /><div className="pagination">Prev <strong>1</strong> 2 3 Next</div></> : <p>No data available yet.</p>}</Card>
      <Card><h2>Year-wise Placement Trend</h2>{stats?.placementTrend?.length ? <MonoLineChart data={stats.placementTrend} lines={["rate"]} /> : <p>No data available yet.</p>}</Card>
      <section className="grid three">{(stats?.summaryCards || []).map(([value, label]) => <Card key={label}><span className="caption">{label}</span>{value.includes(",") ? <p>{value}</p> : <h2>{value}</h2>}</Card>)}</section>
    </PageWrapper>
  );
}
