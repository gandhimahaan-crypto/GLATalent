import { MonoBarChart } from "../../components/charts/BarChart";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { departmentAnalytics } from "./adminData";

export function DepartmentAnalytics() {
  const rows = departmentAnalytics.map((item) => ({
    Department: item.department,
    "Readiness Score": `${item.readiness}/100`,
    "Placement Probability": `${item.probability}%`,
    "Average Package": `INR ${item.package}L`,
    "Primary Skill Gap": item.skillGap,
  }));

  return (
    <PageWrapper sidebar="admin">
      <div className="page-head"><h1>Department Analytics</h1></div>
      <section className="grid two">
        <Card><h2>Readiness by Department</h2><MonoBarChart data={departmentAnalytics} xKey="department" yKey="readiness" /></Card>
        <Card><h2>Placement Probability</h2><MonoBarChart data={departmentAnalytics} xKey="department" yKey="probability" /></Card>
      </section>
      <Card><h2>Department Comparison</h2><Table columns={["Department", "Readiness Score", "Placement Probability", "Average Package", "Primary Skill Gap"]} rows={rows} /></Card>
    </PageWrapper>
  );
}
