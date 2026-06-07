import { cn } from "../../utils/cn";

export function Card({ children, className }) {
  return <section className={cn("card", className)}>{children}</section>;
}
