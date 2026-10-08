"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type CursorState = { variant: "default" | "hover" | "label"; label?: string };

export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  if (!fine || reduce) return null;
  return <Cursor />;
}

const INTERACTIVE = "[data-cursor], a, button, [role='button'], summary, label";

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [state, setState] = useState<CursorState>({ variant: "default" });
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      const label = el?.dataset.cursor;
      setState((prev) => {
        const next: CursorState = !el ? { variant: "default" } : label ? { variant: "label", label } : { variant: "hover" };
        return prev.variant === next.variant && prev.label === next.label ? prev : next;
      });
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  const ringScale = state.variant === "label" ? 1 : state.variant === "hover" ? 0.6 : 0.4;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div
        className="absolute left-0 top-0 -ml-[44px] -mt-[44px] size-[88px]"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className={cn(
            "grid size-full place-items-center rounded-full border-2 transition-colors duration-300",
            state.variant === "label"
              ? "border-volt bg-volt text-black"
              : state.variant === "hover"
                ? "border-volt bg-volt/10"
                : "border-white/50",
          )}
          animate={{ scale: pressed ? ringScale * 0.85 : ringScale }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <motion.span
            className="font-mono text-[11px] font-semibold uppercase tracking-widest"
            animate={{ opacity: state.variant === "label" ? 1 : 0 }}
          >
            {state.label}
          </motion.span>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] size-[6px] rounded-full bg-volt"
        style={{ x, y }}
        animate={{ opacity: visible && state.variant !== "label" ? 1 : 0 }}
      />
    </div>
  );
}
