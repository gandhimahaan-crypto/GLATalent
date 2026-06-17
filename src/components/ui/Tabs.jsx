import { cn } from "../../utils/cn";

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button key={tab} className={cn("tab", active === tab && "active")} onClick={() => onChange(tab)}>
          {tab}
        </button>
      ))}
    </div>
  );
}
