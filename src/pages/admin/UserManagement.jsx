import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { Table } from "../../components/ui/Table";
import { userAccounts } from "./adminData";

export function UserManagement() {
  const rows = userAccounts.map((account) => ({
    Name: account.name,
    Email: account.email,
    Role: <Badge tone={account.role === "Admin" ? "warning" : "default"}>{account.role}</Badge>,
    Department: account.department,
    Status: <Badge tone={account.status === "Active" ? "success" : "warning"}>{account.status}</Badge>,
  }));

  return (
    <PageWrapper sidebar="admin">
      <div className="page-head"><h1>User Management</h1><Button>Add User</Button></div>
      <div className="top-tools"><Input placeholder="Search users" /><Select><option>All roles</option><option>Students</option><option>Faculty</option><option>Admins</option></Select><Button variant="secondary">Export Users</Button></div>
      <Card><Table columns={["Name", "Email", "Role", "Department", "Status"]} rows={rows} /></Card>
    </PageWrapper>
  );
}
