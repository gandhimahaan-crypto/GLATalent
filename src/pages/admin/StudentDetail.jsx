import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Tabs } from "../../components/ui/Tabs";
import { Textarea } from "../../components/ui/Input";
import { useStudent } from "../../hooks/useStudent";

export function StudentDetail() {
  const { id } = useParams();
  const { data: student, isLoading, error } = useStudent(id);
  const [tab, setTab] = useState("Overview");
  const [note, setNote] = useState("");
  const [flaggedOverride, setFlaggedOverride] = useState(null);

  if (isLoading) {
    return (
      <PageWrapper sidebar="admin">
        <Card><p>Loading student profile...</p></Card>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper sidebar="admin">
        <Card><h2>Unable to load student</h2><p>{error.message}</p></Card>
      </PageWrapper>
    );
  }

  if (!student) {
    return (
      <PageWrapper sidebar="admin">
        <Card><h2>Student not found</h2><p>Choose a student from the list and try again.</p></Card>
      </PageWrapper>
    );
  }

  const flagged = flaggedOverride ?? student.status === "At-Risk";

  return (
    <PageWrapper sidebar="admin">
      <div className="detail-head">
        <div className="profile-photo">{student.name.split(" ").map((part) => part[0]).join("")}</div>
        <div><h1>{student.name}</h1><p>{student.rollNo} · {student.branch} · Batch {student.batch}</p></div>
        <Button variant={flagged ? "primary" : "secondary"} onClick={() => setFlaggedOverride(!flagged)}>Flag as At-Risk</Button>
      </div>
      <Tabs tabs={["Overview", "Academic", "Skills", "Digital Profiles", "Predictions"]} active={tab} onChange={setTab} />
      <section className="grid two">
        <Card><h2>{tab}</h2><p>CGPA {student.cgpa}. Readiness score {student.readiness}/100. Predicted domain is {student.domain}.</p><div className="badge-row"><Badge>{student.branch}</Badge><Badge tone={student.risk === "High" ? "danger" : student.risk === "Medium" ? "warning" : "success"}>{student.risk}</Badge></div></Card>
        <Card><h2>Mentor Note</h2><Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add note" /><Button className="mt">Add Note</Button></Card>
      </section>
    </PageWrapper>
  );
}
