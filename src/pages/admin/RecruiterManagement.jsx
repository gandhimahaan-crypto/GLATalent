import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { Table } from "../../components/ui/Table";
import { recruiters } from "./adminData";

export function RecruiterManagement() {
  const rows = recruiters.map((recruiter) => ({
    Company: recruiter.company,
    Tier: recruiter.tier,
    Domains: recruiter.domains,
    Demand: <Badge tone={recruiter.demand === "High" ? "success" : "warning"}>{recruiter.demand}</Badge>,
    Status: <Badge tone={recruiter.status === "Active" ? "success" : "default"}>{recruiter.status}</Badge>,
  }));

  return (
    <PageWrapper sidebar="admin">
      <div className="page-head"><h1>Recruiter Management</h1><Button>Add Recruiter</Button></div>
      <div className="top-tools"><Input placeholder="Search recruiters" /><Select><option>All tiers</option><option>Tier 1</option><option>Tier 2</option><option>Service</option></Select><Button variant="secondary">Export Demand</Button></div>
      <Card><Table columns={["Company", "Tier", "Domains", "Demand", "Status"]} rows={rows} /></Card>
    </PageWrapper>
  );
}
