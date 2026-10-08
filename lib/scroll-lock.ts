"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

let locks = 0;

/** Pauses Lenis + native scrolling while `active`. Nested locks (modal → lightbox) are counted. */
export function useScrollLock(active: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!active) return;
    locks += 1;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      locks -= 1;
      if (locks === 0) {
        lenis?.start();
        document.documentElement.style.overflow = "";
      }
    };
  }, [active, lenis]);
}
