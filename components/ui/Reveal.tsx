"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn, EASE_OUT } from "@/lib/utils";

/** Fades + lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked slide-up. Re-plays when `text` changes (e.g. language switch). */
export function SplitReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  play,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** Controls playback manually; defaults to playing once in view. */
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = play ?? inView;
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          {/* Padding lives on the inner span so gradient-clipped text still covers stacked diacritics. */}
          <span className="-mb-[0.18em] -mt-[0.3em] inline-block overflow-hidden align-bottom">
            <motion.span
              className={cn("inline-block pb-[0.18em] pt-[0.3em] will-change-transform", wordClassName)}
              initial={{ y: "115%" }}
              animate={{ y: show ? "0%" : "115%" }}
              transition={{ duration: 0.95, ease: EASE_OUT, delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
