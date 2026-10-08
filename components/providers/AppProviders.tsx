"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { LangProvider } from "@/lib/i18n";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <ReactLenis root options={{ lerp: 0.09, anchors: true, stopInertiaOnNavigate: true }}>
          {children}
        </ReactLenis>
      </MotionConfig>
    </LangProvider>
  );
}
