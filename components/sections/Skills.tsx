"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { skillGroups, softSkills, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn, EASE_OUT } from "@/lib/utils";

// Mobile: even rows (4 / 3 / 2 / 4 per row). Tablet: 8-item groups span the full width in one row,
// languages + databases sit side by side. Desktop: the 12-column bento.
const layout: Record<string, { span: string; cols: string }> = {
  frameworks: { span: "md:col-span-2 lg:col-span-7", cols: "grid-cols-4 md:grid-cols-8 lg:grid-cols-4" },
  languages: { span: "lg:col-span-5", cols: "grid-cols-3" },
  databases: { span: "lg:col-span-5", cols: "grid-cols-2 sm:grid-cols-4 md:grid-cols-2" },
  tools: { span: "md:col-span-2 lg:col-span-7", cols: "grid-cols-4 md:grid-cols-8 lg:grid-cols-4" },
};

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } };
const tile: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="relative py-20 md:py-28 lg:py-40">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent)]"
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="02" label={t(ui.skillsLabel)} title={t(ui.skillsTitle)} intro={t(ui.skillsIntro)} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.06} className={layout[group.id].span}>
              <SpotlightCard className="h-full p-5 sm:p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-medium sm:text-xl lg:text-2xl">{t(group.title)}</h3>
                    <p className="mt-1.5 text-sm text-muted">{t(group.desc)}</p>
                  </div>
                  <span className="font-mono text-sm text-volt">{String(group.items.length).padStart(2, "0")}</span>
                </div>
                <motion.ul
                  variants={list}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  className={cn("mt-5 grid gap-2 sm:gap-3 lg:mt-7", layout[group.id].cols)}
                >
                  {group.items.map((item) => (
                    <motion.li key={item.name} variants={tile}>
                      <div className="group/tile relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] px-1 py-3.5 transition duration-500 hover:-translate-y-1.5 hover:border-volt/40 hover:bg-volt/[0.05] sm:gap-3 sm:rounded-2xl sm:px-2 sm:py-5 lg:py-6">
                        <span className="absolute inset-x-6 -bottom-6 h-10 rounded-full bg-volt/0 blur-2xl transition duration-500 group-hover/tile:bg-volt/30" />
                        <Image
                          src={item.icon}
                          alt=""
                          width={44}
                          height={44}
                          className={cn(
                            "relative size-8 transition duration-500 group-hover/tile:-rotate-6 group-hover/tile:scale-115 sm:size-9 lg:size-11",
                            item.invert && "invert",
                          )}
                        />
                        <span className="relative text-center text-[10.5px] font-medium leading-tight text-muted transition-colors group-hover/tile:text-fg sm:text-xs lg:text-sm">
                          {item.name}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal className="md:col-span-2 lg:col-span-12">
            <SpotlightCard className="p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
                <h3 className="shrink-0 font-display text-xl font-medium md:text-2xl">{t(ui.softSkills)}</h3>
                <ul className="flex flex-wrap gap-2">
                  {t(softSkills).map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] text-fg/85 sm:px-4 sm:py-2 sm:text-sm transition duration-300 hover:-translate-y-0.5 hover:border-volt hover:bg-volt hover:text-black"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
