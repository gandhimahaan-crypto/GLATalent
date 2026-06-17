import { cn } from "../../utils/cn";

export function Button({ children, variant = "primary", className, ...props }) {
  return (
    <button className={cn("btn", `btn-${variant}`, className)} {...props}>
      {children}
    </button>
  );
}
