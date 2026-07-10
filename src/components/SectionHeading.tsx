import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "editorial-heading",
        align === "center" && "editorial-heading--center",
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow">{eyebrow}</span>
      )}
      <div className="editorial-heading__copy">
        <h2 className="section-title text-balance">{title}</h2>
        {subtitle && <p className="editorial-heading__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
