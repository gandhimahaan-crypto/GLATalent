import { cn } from "../../utils/cn";

export function Badge({ children, tone = "default", className }) {
  return <span className={cn("badge", tone !== "default" && `badge-${tone}`, className)}>{children}</span>;
}
