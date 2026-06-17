import { PageWrapper } from "../../components/layout/PageWrapper";
import { Card } from "../../components/ui/Card";
import { Progress } from "../../components/ui/Progress";
import { Table } from "../../components/ui/Table";
import { modelMonitoring } from "./adminData";

const modelSignals = [
  { signal: "Academic completeness", score: 89 },
  { signal: "Skill profile coverage", score: 82 },
  { signal: "Placement history freshness", score: 86 },
  { signal: "Recruiter demand mapping", score: 78 },
];

export function AIModelMonitoring() {
  const signalRows = modelSignals.map((item) => ({
    Signal: item.signal,
    Score: <Progress value={item.score} label={`${item.score}%`} />,
  }));

  return (
    <PageWrapper sidebar="admin">
      <div className="page-head"><h1>AI Model Monitoring</h1></div>
      <section className="grid five">{modelMonitoring.map(([label, value]) => <Card className="metric" key={label}><h2>{value}</h2><p>{label}</p></Card>)}</section>
      <Card><h2>Data Quality Signals</h2><Table columns={["Signal", "Score"]} rows={signalRows} /></Card>
    </PageWrapper>
  );
}
