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
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow mb-3">
          <span className="h-px w-6 bg-chili-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="section-title text-balance">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-masala-500 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
