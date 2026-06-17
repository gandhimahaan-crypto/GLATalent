import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { Progress } from "../../components/ui/Progress";
import { Table } from "../../components/ui/Table";
import { useStudents } from "../../hooks/useStudent";

export function FacultyStudents() {
  const { data: students = [], isLoading, error } = useStudents();
  const rows = students.map((student) => ({
    Name: student.name,
    "Roll No.": student.rollNo,
    Branch: student.branch,
    CGPA: student.cgpa,
    "Readiness Score": <Progress value={student.readiness} label={`${student.readiness}`} />,
    "Predicted Domain": student.domain,
    Status: <Badge tone={student.status === "Placed" ? "success" : student.status === "At-Risk" ? "danger" : "default"}>{student.status}</Badge>,
  }));

  if (isLoading) {
    return (
      <PageWrapper sidebar="faculty">
        <Card><p>Loading students...</p></Card>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper sidebar="faculty">
        <Card><h2>Unable to load students</h2><p>{error.message}</p></Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper sidebar="faculty">
      <div className="page-head"><h1>Students</h1></div>
      <div className="top-tools"><Input placeholder="Search students" /><Select><option>Filter by Domain</option><option>Software Development</option><option>Data Science</option></Select><Button variant="secondary">Export CSV</Button></div>
      <Card>{rows.length ? <><Table columns={["Name", "Roll No.", "Branch", "CGPA", "Readiness Score", "Predicted Domain", "Status"]} rows={rows} /><div className="pagination">Prev <strong>1</strong> 2 3 Next</div></> : <p>No students found.</p>}</Card>
    </PageWrapper>
  );
}
