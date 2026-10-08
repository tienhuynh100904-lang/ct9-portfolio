"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { L, Lang } from "./content";

const STORAGE_KEY = "ct9-lang";
const listeners = new Set<() => void>();
let memory: Lang | null = null;

function readLang(): Lang {
  if (memory) return memory;
  try {
    return localStorage.getItem(STORAGE_KEY) === "vi" ? "vi" : "en";
  } catch {
    return "en";
  }
}

function writeLang(lang: Lang) {
  memory = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage can be unavailable (private mode); the in-memory value still works.
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T>(value: L<T>) => T;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(<T,>(value: L<T>) => value[lang], [lang]);
  const value = useMemo(() => ({ lang, setLang: writeLang, t }), [lang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
