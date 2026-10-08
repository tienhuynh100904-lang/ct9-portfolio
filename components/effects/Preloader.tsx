"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { markIntroDone } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";
import { useScrollLock } from "@/lib/scroll-lock";
import { EASE_IN_OUT } from "@/lib/utils";

export function Preloader() {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const clip = useTransform(progress, (v) => `inset(${100 - v}% 0 0 0)`);
  const bar = useTransform(progress, [0, 100], [0, 1]);

  useScrollLock(visible);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timeout = 0;
    const controls = animate(progress, 100, {
      duration: reduce ? 0.3 : 2,
      ease: EASE_IN_OUT,
      onComplete: () => {
        timeout = window.setTimeout(() => {
          setVisible(false);
          markIntroDone();
        }, 250);
      },
    });
    return () => {
      controls.stop();
      window.clearTimeout(timeout);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-ink p-6 md:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: EASE_IN_OUT }}
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />

          <motion.div
            className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <span>{profile.brand} / Portfolio</span>
            <span className="hidden sm:inline">{t(profile.location)}</span>
          </motion.div>

          <motion.div
            className="relative mx-auto select-none font-display text-[32vw] font-bold leading-none tracking-tighter md:text-[20vw]"
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            <span className="text-outline">{profile.brand}</span>
            <motion.span className="absolute inset-0 text-volt" style={{ clipPath: clip }}>
              {profile.brand}
            </motion.span>
          </motion.div>

          <motion.div
            className="relative flex items-end justify-between"
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.3em] text-muted">
              <div className="text-fg">{t(profile.name)}</div>
              <div>Full-stack · Mobile Developer</div>
            </div>
            <motion.span className="font-display text-5xl font-light tabular-nums text-fg md:text-7xl">{counter}</motion.span>
          </motion.div>

          <motion.div className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-volt" style={{ scaleX: bar }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
