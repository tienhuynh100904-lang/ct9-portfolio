"use client";

import { Briefcase, FingerprintPattern, QrCode, Scale } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { experience, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const workIcons = { scale: Scale, attendance: FingerprintPattern, qr: QrCode };

export function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="relative py-20 md:py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="02" label={t(ui.experienceLabel)} title={t(ui.experienceTitle)} intro={t(ui.experienceIntro)} />

        {experience.map((job) => (
          <Reveal key={job.id}>
            <SpotlightCard className="p-6 sm:p-8 lg:p-11">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-volt text-black">
                      <Briefcase className="size-6" />
                    </span>
                    {job.current && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-volt/25 bg-volt/[0.06] px-3 py-1 text-xs font-medium text-volt">
                        <span className="relative flex size-2">
                          <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-volt" />
                          <span className="relative inline-flex size-2 rounded-full bg-volt" />
                        </span>
                        {t(ui.current)}
                      </span>
                    )}
                  </div>
                  <p className="mt-6 font-mono text-xs text-volt lg:mt-8">{t(job.period)}</p>
                  <h3 className="text-chrome mt-3 pt-1 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.1] tracking-tight">
                    {t(job.role)}
                  </h3>
                  <p className="mt-6 leading-relaxed text-muted">{t(job.summary)}</p>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-volt">{t(ui.beyondErp)}</p>
                  <ul className="mt-5 space-y-3">
                    {job.work.map((w, i) => {
                      const Icon = workIcons[w.icon];
                      return (
                        <li key={w.icon}>
                          <Reveal delay={0.1 + i * 0.08}>
                            <div className="group/work flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition duration-500 hover:border-volt/30 hover:bg-volt/[0.04] sm:p-5">
                              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-volt transition-all duration-500 group-hover/work:rotate-[-8deg] group-hover/work:border-volt group-hover/work:bg-volt group-hover/work:text-black">
                                <Icon className="size-5" />
                              </span>
                              <div className="min-w-0">
                                <h4 className="font-display font-medium">{t(w.title)}</h4>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(w.desc)}</p>
                                <ul className="mt-3 flex flex-wrap gap-1.5">
                                  {w.tags.map((tag) => (
                                    <li key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-fg/70">
                                      {tag}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Reveal>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
