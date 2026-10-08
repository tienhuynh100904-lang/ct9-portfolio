"use client";

import { BrainCircuit, GraduationCap, MapPin, PanelsTopLeft, Server, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, SectionLabel } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { profile, services, stats, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const serviceIcons = { mobile: Smartphone, server: Server, layout: PanelsTopLeft, brain: BrainCircuit };

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="01" label={t(ui.aboutLabel)} title={t(ui.aboutTitle)} />

        <ScrollLitText text={t(ui.aboutText)} />

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12 lg:mt-28">
          <Reveal className="md:col-span-6 lg:col-span-5">
            <SpotlightCard className="h-full p-6 md:p-7 lg:p-9">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-volt text-black">
                    <GraduationCap className="size-6" />
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                    HUIT
                  </span>
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-volt lg:mt-8">{t(ui.education)}</p>
                <h3 className="mt-3 font-display text-lg font-medium leading-snug sm:text-xl lg:text-2xl">{t(ui.university)}</h3>
                <p className="mt-3 text-fg/90">{t(ui.degree)}</p>
                <p className="mt-1 text-sm text-muted">{t(ui.degreeNote)}</p>
                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-2 border-t border-white/[0.06] pt-6 text-sm text-muted">
                    <MapPin className="size-4 text-volt" />
                    {t(profile.location)}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:col-span-6 lg:col-span-7">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <SpotlightCard className="h-full p-5 sm:p-6 lg:p-8">
                  <Counter to={s.value} suffix={s.suffix} className="text-chrome font-display text-[2rem] font-semibold tabular-nums sm:text-4xl md:text-[2.6rem] lg:text-6xl" />
                  <p className="mt-3 text-[13px] leading-snug text-muted sm:text-sm lg:mt-4 lg:text-base">{t(s.label)}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-24 lg:mt-32">
          <SectionLabel index="+" label={t(ui.whatIDo)} className="mb-8" />
          <div className="grid gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Reveal key={s.icon} delay={i * 0.08}>
                  <SpotlightCard tilt className="h-full p-6 lg:p-7">
                    <div className="flex items-start justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-volt transition-all duration-500 group-hover/spot:rotate-[-8deg] group-hover/spot:border-volt group-hover/spot:bg-volt group-hover/spot:text-black">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-medium lg:mt-10">{t(s.title)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{t(s.desc)}</p>
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <li key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-fg/70">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollLitText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="max-w-5xl font-display text-[clamp(1.35rem,3vw,2.6rem)] font-light leading-[1.4] tracking-tight">
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline">
        {children}
      </motion.span>{" "}
    </>
  );
}
