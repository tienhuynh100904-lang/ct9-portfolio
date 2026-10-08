"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { nav, profile, ui } from "@/lib/content";
import { useHcmClock } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const clock = useHcmClock();
  const [year, time] = clock ? clock.split("|") : ["", "--:--"];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const bigY = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);

  const nameWords = t(profile.nameLines)[0].split(" ");
  const bigText = `${nameWords[nameWords.length - 1]} ${t(profile.nameLines)[1]}`;

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/[0.06] bg-ink-2 pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-x-10 lg:flex lg:flex-row lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative size-12 overflow-hidden rounded-xl ring-1 ring-white/10">
              <Image src="/images/Logo_Portfolio.png" alt="CT9" fill sizes="48px" className="object-cover" />
            </span>
            <div>
              <p className="font-display font-medium">{t(profile.name)}</p>
              <p className="text-sm text-muted">Full-stack · Mobile Developer</p>
            </div>
          </div>

          <ul className="grid grid-cols-3 gap-x-8 gap-y-3 text-sm md:order-3 md:col-span-2 md:flex md:flex-wrap md:gap-x-8 lg:order-none lg:grid lg:gap-x-10">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-muted transition hover:text-volt">
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => lenis?.scrollTo(0, { duration: 2 })}
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/15 py-2 pl-5 pr-2 text-sm transition hover:border-volt"
          >
            {t(ui.backToTop)}
            <span className="grid size-9 place-items-center rounded-full bg-volt text-black transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp className="size-4" />
            </span>
          </button>
        </div>
      </div>

      <div className="relative mt-12 select-none overflow-hidden lg:mt-16" aria-hidden="true">
        <motion.p
          style={{ y: bigY }}
          className="text-chrome whitespace-nowrap pt-[0.3em] text-center font-display text-[12.5vw] font-bold uppercase leading-[0.85] tracking-[-0.04em] opacity-90 [mask-image:linear-gradient(to_bottom,#000_30%,transparent_95%)]"
        >
          {bigText}
        </motion.p>
      </div>

      <div className="relative border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 font-mono text-[11px] text-muted sm:text-xs md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8 md:px-8">
          <p>
            © {year || "—"} {profile.brand} ({t(profile.name)}) · {t(ui.rights)}
          </p>
          <p className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-volt" />
              <span className="relative inline-flex size-1.5 rounded-full bg-volt" />
            </span>
            {t(ui.localTime)} · HCMC {time} (GMT+7)
          </p>
          <p>{t(ui.builtWith)}</p>
        </div>
      </div>
    </footer>
  );
}
