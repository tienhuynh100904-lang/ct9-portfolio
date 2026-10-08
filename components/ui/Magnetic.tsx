"use client";

import { motion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pulls its child toward the pointer while hovered (mouse only). */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 200, damping: 14, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
}
