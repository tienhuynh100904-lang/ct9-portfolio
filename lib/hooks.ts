"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/** Id of the section currently crossing the middle band of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");

  useEffect(() => {
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);

  return active;
}

/** Subscribes to a CSS media query. Always `false` during server render. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/* ---------- Intro (preloader) state shared between components ---------- */

let introDone = false;
const introListeners = new Set<() => void>();

export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  introListeners.forEach((fn) => fn());
}

export function useIntroDone() {
  return useSyncExternalStore(
    (fn) => {
      introListeners.add(fn);
      return () => {
        introListeners.delete(fn);
      };
    },
    () => introDone,
    () => false,
  );
}

/* ---------- Live clock for Ho Chi Minh City ---------- */

const clockFormat = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
  });

/** Returns `"YYYY|HH:MM"` in Asia/Ho_Chi_Minh, or `""` on the server. */
export function useHcmClock() {
  return useSyncExternalStore(
    (fn) => {
      const id = window.setInterval(fn, 15_000);
      return () => window.clearInterval(id);
    },
    () => {
      const parts = clockFormat().formatToParts(new Date());
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
      return `${get("year")}|${get("hour")}:${get("minute")}`;
    },
    () => "",
  );
}
