"use client";

import { ArrowDown, ArrowRight, Download, Trophy } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { HeroCanvas } from "@/components/effects/HeroCanvas";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { Magnetic } from "@/components/ui/Magnetic";
import { profile, projects, ui } from "@/lib/content";
import { useIntroDone } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";
import { cn, EASE_OUT } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT, delay } }),
};

export function Hero() {
  const { t, lang } = useLang();
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const state = ready ? "show" : "hidden";

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 110]);

  // Pointer position normalised to -0.5..0.5 for parallax, plus raw px for the glow.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 20 });
  const smy = useSpring(my, { stiffness: 70, damping: 20 });
  const glowX = useSpring(useMotionValue(-1000), { stiffness: 90, damping: 22 });
  const glowY = useSpring(useMotionValue(-1000), { stiffness: 90, damping: 22 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX}px ${glowY}px, rgba(200,255,46,0.10), transparent 65%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    glowX.set(e.clientX - r.left);
    glowY.set(e.clientY - r.top);
  };

  const nameLines = t(profile.nameLines);

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pb-20 lg:pb-24 lg:pt-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_78%)]">
        <HeroCanvas />
      </div>
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: glow }} />
      <div aria-hidden="true" className="absolute -left-40 top-1/4 -z-10 size-[520px] rounded-full bg-volt/[0.07] blur-[120px]" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 -z-10 size-[480px] rounded-full bg-[#7c8cff]/[0.07] blur-[120px]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.15fr_0.85fr] md:gap-6 md:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate={state} custom={0.1}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-volt/25 bg-volt/[0.06] py-1.5 pl-2.5 pr-4 text-xs font-medium text-volt sm:text-sm">
              <span className="relative flex size-2">
                <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-volt" />
                <span className="relative inline-flex size-2 rounded-full bg-volt" />
              </span>
              {t(ui.openToWork)}
              <span className="hidden text-volt/60 sm:inline md:hidden lg:inline">· {t(profile.location)}</span>
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={state}
            custom={0.2}
            className="mt-7 font-mono text-sm uppercase tracking-[0.3em] text-muted"
          >
            {t(ui.hello)}
          </motion.p>

          <h1
            key={lang}
            className={cn(
              "mt-3 font-display text-[clamp(2.6rem,13vw,4.2rem)] font-bold uppercase tracking-[-0.02em] md:text-[clamp(2.6rem,6.3vw,5.6rem)]",
              // Stacked Vietnamese capitals (Ế, Ỳ) need room so marks don't touch the line above.
              lang === "vi" ? "leading-[1.14]" : "leading-[0.98]",
            )}
            aria-label={t(profile.name)}
          >
            {nameLines.map((line, li) => (
              <span key={line} aria-hidden="true" className="block">
                <AnimatedChars text={line} play={ready} baseDelay={0.3 + li * 0.18} />
                {li === nameLines.length - 1 && (
                  <motion.span
                    className="inline-block text-volt"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={ready ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1.1, type: "spring", stiffness: 300, damping: 12 }}
                  >
                    .
                  </motion.span>
                )}
              </span>
            ))}
          </h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={state}
            custom={0.75}
            className="mt-6 flex flex-wrap items-baseline gap-x-3 font-display text-xl font-light text-fg sm:text-2xl lg:text-3xl"
          >
            <span className="text-muted">{t(ui.iBuild)}</span>
            <RotatingWords words={t(ui.roles)} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={state}
            custom={0.9}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base lg:text-lg"
          >
            {t(ui.heroDesc)}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate={state} custom={1.05} className="mt-8 grid max-w-md grid-cols-2 gap-3 lg:flex lg:max-w-none lg:flex-wrap lg:items-center lg:gap-4">
            <Magnetic className="w-full lg:w-auto">
              <a
                href="#work"
                className="group relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-full bg-volt py-2.5 pl-4 pr-2 text-[13px] sm:pl-5 sm:pr-2.5 sm:text-sm font-semibold text-black lg:inline-flex lg:w-auto lg:justify-start lg:gap-3 lg:py-4 lg:pl-7 lg:pr-5 lg:text-base shadow-[0_0_40px_-8px_rgba(200,255,46,0.6)] transition-shadow hover:shadow-[0_0_60px_-6px_rgba(200,255,46,0.85)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative whitespace-nowrap">{t(ui.viewWork)}</span>
                <span className="relative grid size-7 shrink-0 place-items-center sm:size-8 rounded-full bg-black text-volt transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="size-4" />
                </span>
              </a>
            </Magnetic>
            <Magnetic className="w-full lg:w-auto">
              <a
                href={profile.cvUrl}
                download={profile.cvFileName}
                className="group flex h-full w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-3 py-3 text-[13px] font-medium sm:px-4 sm:text-sm text-fg transition hover:border-white/40 hover:bg-white/5 lg:inline-flex lg:w-auto lg:gap-3 lg:px-6 lg:py-4 lg:text-base"
              >
                <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                {t(ui.downloadCv)}
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul variants={fadeUp} initial="hidden" animate={state} custom={1.2} className="mt-8 flex items-center gap-2">
            {profile.socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-white/10 text-muted transition duration-300 hover:-translate-y-1 hover:border-volt hover:bg-volt hover:text-black"
                >
                  <BrandIcon name={s.key} className="size-[18px]" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.4 }}
          className="relative"
        >
          <Portrait mx={smx} my={smy} />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-subtle transition-colors hover:text-volt lg:flex"
      >
        {t(ui.scroll)}
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-current">
          <motion.span
            className="mt-2 h-2 w-1 rounded-full bg-volt"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="size-3" />
      </motion.a>
    </section>
  );
}

function AnimatedChars({ text, play, baseDelay }: { text: string; play: boolean; baseDelay: number }) {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, ci) => {
            const delay = baseDelay + charIndex++ * 0.035;
            return (
              // The gradient is painted via background-clip, so the glyph box itself must reach up
              // to the Vietnamese stacked diacritics (Ế, Ỳ) or they render cut off.
              <span key={ci} className="-mb-[0.1em] -mt-[0.34em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="text-chrome inline-block pb-[0.1em] pt-[0.34em]"
                  initial={{ y: "110%", rotate: 8 }}
                  animate={play ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 8 }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block w-[0.3em]" />}
        </span>
      ))}
    </>
  );
}

function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => i + 1), 2600);
    return () => window.clearInterval(id);
  }, []);

  const word = words[index % words.length];

  return (
    <span className="relative inline-flex max-w-full shrink-0 overflow-hidden pb-1 align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="inline-block whitespace-nowrap font-normal text-volt"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
      <motion.span
        aria-hidden="true"
        className="ml-1 inline-block w-[3px] self-stretch bg-volt"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
      />
    </span>
  );
}

function Portrait({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const { t } = useLang();
  const award = projects.find((p) => p.award)?.award;
  const imgX = useTransform(mx, (v) => v * -14);
  const imgY = useTransform(my, (v) => v * -10);
  const backX = useTransform(mx, (v) => v * 18);
  const backY = useTransform(my, (v) => v * 14);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] sm:max-w-[360px] md:max-w-[340px] lg:max-w-[460px]">
      {/* Orbit rings */}
      <motion.div style={{ x: backX, y: backY }} className="absolute inset-0">
        <div
          className="animate-spin-slower absolute left-1/2 top-[46%] aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(200,255,46,0.7) 50deg, transparent 110deg, rgba(255,255,255,0.35) 210deg, transparent 280deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))",
          }}
        />
        <div className="animate-spin-slow absolute left-1/2 top-[46%] aspect-square w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10 [animation-direction:reverse]" />
      </motion.div>

      {/* Card behind the cut-out */}
      <div className="absolute inset-x-[5%] bottom-0 top-[20%] overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-surface-2 via-surface to-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
        <div className="absolute -bottom-24 left-1/2 size-[90%] -translate-x-1/2 rounded-full bg-volt/25 blur-[90px]" />
        <span className="text-outline absolute -right-3 top-3 select-none font-display text-[5rem] font-bold leading-none opacity-70 sm:text-[6rem] lg:text-[7.5rem]">
          {profile.brand}
        </span>
      </div>

      {/* Cut-out portrait pops out above the card */}
      <motion.div style={{ x: imgX, y: imgY }} className="absolute inset-x-[5%] bottom-0 top-0">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)]">
          <Image
            src="/images/avatar.webp"
            alt={t(profile.name)}
            fill
            preload
            sizes="(min-width: 1024px) 440px, 360px"
            className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </div>
      </motion.div>

      {/* Floating badges at different depths */}
      <FloatBadge mx={mx} my={my} depth={34} className="-left-1 top-[30%] sm:-left-[8%] sm:top-[24%]" delay={0}>
        <TechIcon src="/icons/tech/flutter.svg" /> Flutter
      </FloatBadge>
      <FloatBadge mx={mx} my={my} depth={22} className="-right-1 top-[14%] sm:-right-[4%] sm:top-[12%] md:-right-[10%] md:top-[5%] lg:-right-[4%] lg:top-[12%]" delay={1.2}>
        <TechIcon src="/icons/tech/spring.svg" /> Spring Boot
      </FloatBadge>
      <FloatBadge mx={mx} my={my} depth={40} className="right-0 top-[52%] hidden sm:-right-[9%] sm:block" delay={0.6}>
        <TechIcon src="/icons/tech/react.svg" /> React · Next.js
      </FloatBadge>
      {award && (
        <FloatBadge mx={mx} my={my} depth={28} className="-left-1 bottom-[6%] max-w-[210px] sm:-left-[12%] sm:max-w-[230px]" delay={1.8}>
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-volt text-black sm:size-8 sm:rounded-xl">
            <Trophy className="size-3.5 sm:size-4" />
          </span>
          <span className="text-left text-[11px] leading-tight sm:text-xs">{t(award)}</span>
        </FloatBadge>
      )}
    </div>
  );
}

function FloatBadge({
  children,
  className,
  mx,
  my,
  depth,
  delay,
}: {
  children: ReactNode;
  className?: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  delay: number;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={cn("absolute z-10", className)}>
      <div
        className="glass animate-float flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-2 sm:text-sm text-fg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function TechIcon({ src }: { src: string }) {
  return <Image src={src} alt="" width={20} height={20} className="size-4 sm:size-5" />;
}
