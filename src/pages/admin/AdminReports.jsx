import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { reportExports } from "./adminData";

export function AdminReports() {
  const rows = reportExports.map((report) => ({
    Report: report.report,
    Scope: report.scope,
    Format: report.format,
    Cadence: report.cadence,
    Action: <Button variant="secondary">Export</Button>,
  }));

  return (
    <PageWrapper sidebar="admin">
      <div className="page-head"><h1>Reports</h1><Button>Generate Report</Button></div>
      <Card><h2>Institution-Level Exports</h2><Table columns={["Report", "Scope", "Format", "Cadence", "Action"]} rows={rows} /></Card>
    </PageWrapper>
  );
}
