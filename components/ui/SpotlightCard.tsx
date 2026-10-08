"use client";

import { motion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card with a pointer-following radial glow and optional 3D tilt. */
export function SpotlightCard({
  children,
  className,
  tilt = false,
  glow = "rgba(200, 255, 46, 0.11)",
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    if (tilt && e.pointerType === "mouse") {
      rotateY.set((px / r.width - 0.5) * 10);
      rotateX.set(-(py / r.height - 0.5) * 10);
    }
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={cn(
        "group/spot relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/70 transition-colors duration-500 hover:border-white/15",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 60%)` }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
