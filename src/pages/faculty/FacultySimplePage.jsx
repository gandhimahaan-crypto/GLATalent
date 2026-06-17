import { PageWrapper } from "../../components/layout/PageWrapper";
import { Card } from "../../components/ui/Card";

export function FacultySimplePage({ title, description }) {
  return (
    <PageWrapper sidebar="faculty">
      <div className="page-head"><h1>{title}</h1></div>
      <Card>
        <h2>{title}</h2>
        <p>{description}</p>
      </Card>
    </PageWrapper>
  );
}
