import { MonoBarChart } from "../../components/charts/BarChart";
import { MonoLineChart } from "../../components/charts/LineChart";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { useDashboardStats } from "../../hooks/usePredictions";

export function FacultyDashboard() {
  const { data: stats, isLoading, error } = useDashboardStats();
  const students = stats?.students || [];
  const rows = students.slice(0, 6).map((student, index) => ({
    Rank: index + 1,
    "Student Name": student.name,
    "Roll No.": student.rollNo,
    CGPA: student.cgpa,
    "Readiness Score": `${student.readiness}/100`,
    "Predicted Domain": student.domain,
    "Risk Level": <Badge tone={student.risk === "High" ? "danger" : student.risk === "Medium" ? "warning" : "success"}>{student.risk}</Badge>,
  }));

  if (isLoading) {
    return (
      <PageWrapper sidebar="faculty">
        <Card><p>Loading faculty dashboard...</p></Card>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper sidebar="faculty">
        <Card><h2>Unable to load dashboard.</h2><p>{error.message}</p></Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper sidebar="faculty">
      <div className="page-head"><h1>Faculty Overview</h1></div>
      <section className="grid four">{stats?.metrics?.map(([value, label]) => <Card className="metric" key={label}><h2>{value}</h2><p>{label}</p></Card>)}</section>
      <section className="grid two">
        <Card><h2>Batch Readiness Distribution</h2><MonoBarChart data={stats?.readinessDistribution || []} xKey="range" yKey="students" /></Card>
        <Card><h2>Placement Rate Forecast</h2><MonoLineChart data={stats?.placementTrend || []} lines={["rate"]} /></Card>
      </section>
      <Card><h2>Students Needing Faculty Attention</h2>{rows.length ? <Table columns={["Rank", "Student Name", "Roll No.", "CGPA", "Readiness Score", "Predicted Domain", "Risk Level"]} rows={rows} /> : <p>No student data available.</p>}</Card>
    </PageWrapper>
  );
}
