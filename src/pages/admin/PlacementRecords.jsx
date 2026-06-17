import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { Table } from "../../components/ui/Table";
import { placementRecords } from "./adminData";

export function PlacementRecords() {
  const rows = placementRecords.map((record) => ({
    Company: record.company,
    Role: record.role,
    Domain: record.domain,
    Package: record.package,
    Year: record.year,
    Offers: record.offers,
  }));

  return (
    <PageWrapper sidebar="admin">
      <div className="page-head"><h1>Placement Records</h1><Button>Add Record</Button></div>
      <div className="top-tools"><Input placeholder="Search companies or roles" /><Select><option>All years</option><option>2025</option><option>2024</option><option>2023</option></Select><Button variant="secondary">Import CSV</Button></div>
      <Card><Table columns={["Company", "Role", "Domain", "Package", "Year", "Offers"]} rows={rows} /></Card>
    </PageWrapper>
  );
}
