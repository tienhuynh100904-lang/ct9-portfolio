"use client";

import { cn } from "@/lib/utils";
import { Reveal, SplitReveal } from "./Reveal";

export function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-volt">
        <span>{index}</span>
        <span className="h-px w-10 bg-volt/50" />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  intro,
  className,
  compact,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("max-w-4xl", compact ? "mb-8 md:mb-10" : "mb-10 md:mb-14 lg:mb-20", className)}>
      <SectionLabel index={index} label={label} />
      <h2
        className={cn(
          "mt-5 font-display font-semibold leading-[1.08] tracking-tight",
          compact ? "text-[clamp(1.75rem,3.6vw,3rem)]" : "text-[clamp(2rem,5vw,4.25rem)]",
        )}
      >
        <SplitReveal text={title} wordClassName="text-chrome" />
      </h2>
      {intro && (
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
