import { useState } from "react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useRecommendations } from "../../hooks/useRecommendations";
import { cn } from "../../utils/cn";

export function Recommendations() {
  const [filter, setFilter] = useState("All");
  const { data: recommendations = [], isLoading, error } = useRecommendations();
  const cards = recommendations.filter((item) => filter === "All" || item[0] === filter.slice(0, -1));

  if (isLoading) {
    return (
      <PageWrapper>
        <Card><p>Loading recommendations...</p></Card>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Card><h2>Unable to load recommendations</h2><p>{error.message}</p></Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="page-head"><h1>Recommendations</h1></div>
      <div className="filter-bar">
        {["All", "Courses", "Certifications", "Projects"].map((chip) => <button key={chip} className={cn("chip", filter === chip && "active")} onClick={() => setFilter(chip)}>{chip}</button>)}
      </div>
      <section className="grid two">
        {cards.length ? cards.map(([category, title, source, reason, time, priority]) => (
          <Card key={title}>
            <span className="caption">{category}</span>
            <h2>{title}</h2>
            <p>{source}</p>
            <p><em>{reason}</em></p>
            <div className="badge-row"><Badge>{time}</Badge><Badge tone={priority === "Critical" ? "danger" : "default"}>{priority}</Badge></div>
            <div className="actions"><Button variant="ghost">Save</Button><Button variant="secondary">View Course →</Button></div>
          </Card>
        )) : <Card><h2>No recommendations found</h2><p>Try another filter or submit more profile details.</p></Card>}
      </section>
    </PageWrapper>
  );
}
