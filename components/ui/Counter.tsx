"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT } from "@/lib/utils";

export function Counter({ to, suffix, className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 2.2, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{text}</motion.span>
      {suffix && <span className="text-volt">{suffix}</span>}
    </span>
  );
}
