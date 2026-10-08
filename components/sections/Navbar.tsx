"use client";

import { useLenis } from "lenis/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { nav, profile, ui, type Lang } from "@/lib/content";
import { useActiveSection, useIntroDone } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";
import { useScrollLock } from "@/lib/scroll-lock";
import { cn, EASE_IN_OUT, EASE_OUT } from "@/lib/utils";

export function Navbar() {
  const { t } = useLang();
  const ready = useIntroDone();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pendingTarget = useRef<string | null>(null);
  const active = useActiveSection(nav.map((n) => n.id));

  useScrollLock(open);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
    setScrolled(y > 24);
  });

  // Mobile menu links scroll only after the menu has closed and the scroll lock is released.
  useEffect(() => {
    if (open || !pendingTarget.current) return;
    lenis?.scrollTo(pendingTarget.current);
    pendingTarget.current = null;
  }, [open, lenis]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -110 : 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <div className="mx-auto max-w-7xl px-3 pt-3 md:px-6">
          <div
            className={cn(
              "flex h-16 items-center justify-between rounded-2xl border px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 md:px-4",
              scrolled || open
                ? "glass shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
                : "border-transparent bg-transparent",
            )}
          >
            <a href="#home" className="group flex items-center gap-3" aria-label="Huynh Cong Tien — home">
              <span className="relative size-10 overflow-hidden rounded-xl ring-1 ring-white/10 transition duration-500 group-hover:rotate-[-8deg] group-hover:ring-volt/60">
                <Image src="/images/Logo_Portfolio.png" alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span className="hidden font-display text-sm font-medium leading-tight sm:block">
                {t(profile.name)}
                <span className="block font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-muted">Developer</span>
              </span>
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
                {nav.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                        active === item.id ? "text-black" : "text-muted hover:text-fg",
                      )}
                    >
                      {active === item.id && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-volt"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{t(item.label)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <LangToggle id="desktop" />
              <a
                href="#contact"
                className="group hidden items-center gap-1.5 rounded-full bg-fg px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-volt md:inline-flex"
              >
                {t(ui.letsTalk)}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={t(ui.menu)}
                className="grid size-11 place-items-center rounded-xl border border-white/10 text-fg transition hover:border-volt hover:text-volt lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE_OUT }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      pendingTarget.current = `#${item.id}`;
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-3xl font-medium sm:text-4xl",
                      active === item.id ? "text-volt" : "text-fg",
                    )}
                  >
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    {t(item.label)}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-auto flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex gap-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-white/10 text-muted transition hover:border-volt hover:text-volt"
                  >
                    <BrandIcon name={s.key} className="size-4" />
                  </a>
                ))}
              </div>
              <LangToggle id="mobile" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LangToggle({ id }: { id: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="flex rounded-full border border-white/10 bg-white/[0.03] p-1 font-mono text-xs">
      {(["en", "vi"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn("relative rounded-full px-2.5 py-1.5 uppercase transition-colors", lang === l ? "text-black" : "text-muted hover:text-fg")}
        >
          {lang === l && (
            <motion.span
              layoutId={`lang-${id}`}
              className="absolute inset-0 rounded-full bg-fg"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  );
}
