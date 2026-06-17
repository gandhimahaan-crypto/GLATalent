import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { platformSettings } from "./adminData";

export function PlatformSettings() {
  const rows = platformSettings.map((item) => ({
    Area: item.area,
    Setting: item.setting,
    Status: <Badge tone={item.status === "Review" ? "warning" : "success"}>{item.status}</Badge>,
    Action: <Button variant="secondary">Configure</Button>,
  }));

  return (
    <PageWrapper sidebar="admin">
      <div className="page-head"><h1>Platform Settings</h1></div>
      <Card><h2>System Controls</h2><Table columns={["Area", "Setting", "Status", "Action"]} rows={rows} /></Card>
    </PageWrapper>
  );
}
