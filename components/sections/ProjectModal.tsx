"use client";

import { ArrowRight, ArrowUpRight, CircleCheck, Trophy, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { Lightbox } from "@/components/ui/Lightbox";
import { Portal } from "@/components/ui/Portal";
import { allTech, projects, ui, type Project } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { useScrollLock } from "@/lib/scroll-lock";
import { EASE_OUT } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

const techIcons = new Map(allTech.map((tech) => [tech.name, tech]));

const panel: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { type: "spring", damping: 34, stiffness: 260 } },
  exit: { x: "100%", transition: { duration: 0.45, ease: EASE_OUT } },
};
const backdrop: Variants = { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } };
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.2 + i * 0.06 } }),
};

type Props = {
  project: Project | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export function ProjectModal({ project, onClose, onNavigate }: Props) {
  return (
    <Portal>
      <AnimatePresence>
        {project && <ModalView key="project-modal" project={project} onClose={onClose} onNavigate={onNavigate} />}
      </AnimatePresence>
    </Portal>
  );
}

function ModalView({ project, onClose, onNavigate }: Props & { project: Project }) {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useScrollLock(true);

  const next = projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length];
  const gallery = project.gallery.map((s) => s.src);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  return (
    <motion.div className="fixed inset-0 z-[80]" initial="hidden" animate="show" exit="exit">
      <motion.div variants={backdrop} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.aside
        variants={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-[920px] flex-col border-l border-white/10 bg-ink-2 shadow-[-40px_0_120px_-20px_rgba(0,0,0,0.8)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 md:px-10">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-volt">{t(project.type)}</p>
            <h2 id="project-modal-title" className="mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl">
              {t(project.title)}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t(ui.close)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 transition duration-300 hover:rotate-90 hover:border-volt hover:text-volt"
          >
            <X className="size-5" />
          </button>
        </header>

        <div ref={scrollRef} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait">
            <motion.div key={project.id} initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <motion.div variants={item} custom={0} className="relative aspect-[16/11] overflow-hidden border-b border-white/[0.06] bg-surface">
                <div className="bg-grid absolute inset-0 opacity-40" />
                <ProjectVisual project={project} hovered />
              </motion.div>

              <div className="space-y-12 px-5 py-10 md:px-10 md:py-12">
                {project.award && (
                  <motion.div
                    variants={item}
                    custom={1}
                    className="flex items-center gap-4 rounded-2xl border border-volt/30 bg-volt/[0.06] p-4"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-volt text-black">
                      <Trophy className="size-5" />
                    </span>
                    <p className="font-medium text-volt">{t(project.award)}</p>
                  </motion.div>
                )}

                <motion.section variants={item} custom={2}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{t(ui.overview)}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-fg/90">{t(project.description)}</p>
                </motion.section>

                <div className="grid gap-10 md:grid-cols-[1.25fr_1fr]">
                  <motion.section variants={item} custom={3}>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{t(ui.highlights)}</h3>
                    <ul className="mt-5 space-y-3.5">
                      {t(project.highlights).map((h, i) => (
                        <motion.li key={h} variants={item} custom={4 + i} className="flex gap-3 text-fg/85">
                          <CircleCheck className="mt-0.5 size-5 shrink-0 text-volt" />
                          <span className="leading-relaxed">{h}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.section>

                  <motion.div variants={item} custom={4} className="space-y-8">
                    <section className="rounded-2xl border border-white/[0.08] bg-surface p-5">
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-volt">{t(ui.myRole)}</h3>
                      <p className="mt-3 leading-relaxed text-fg/85">{t(project.role)}</p>
                    </section>
                    <section>
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{t(ui.techStack)}</h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((name) => {
                          const tech = techIcons.get(name);
                          return (
                            <li key={name} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-3.5 text-sm">
                              {tech ? (
                                <Image src={tech.icon} alt="" width={18} height={18} className={tech.invert ? "invert" : undefined} />
                              ) : (
                                <span className="size-1.5 rounded-full bg-volt" />
                              )}
                              {name}
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  </motion.div>
                </div>

                <motion.section variants={item} custom={6}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{t(ui.gallery)}</h3>
                    <span className="font-mono text-xs text-subtle">{String(gallery.length).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-5 columns-2 gap-3 md:columns-3">
                    {project.gallery.map((shot, i) => (
                      <button
                        key={shot.src}
                        type="button"
                        data-cursor="Zoom"
                        onClick={() => setLightbox(i)}
                        className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-surface"
                      >
                        <Image
                          src={shot.src}
                          alt={`${t(project.title)} — ${i + 1}`}
                          width={shot.w}
                          height={shot.h}
                          sizes="(min-width: 768px) 280px, 45vw"
                          className="h-auto w-full transition duration-700 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                </motion.section>

                {(project.repo || project.demo) && (
                  <motion.div variants={item} custom={7} className="flex flex-wrap gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-volt px-5 py-3 text-sm font-semibold text-black"
                      >
                        {t(ui.liveDemo)} <ArrowUpRight className="size-4" />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition hover:border-white/40 hover:bg-white/5"
                      >
                        <BrandIcon name="github" className="size-4" /> {t(ui.sourceCode)}
                      </a>
                    )}
                  </motion.div>
                )}
              </div>

              <button
                type="button"
                onClick={() => onNavigate(next.id)}
                className="group flex w-full items-center justify-between gap-6 border-t border-white/[0.06] px-5 py-8 text-left transition hover:bg-volt md:px-10"
              >
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition group-hover:text-black/60">
                    {t(ui.nextProject)} →
                  </span>
                  <span className="mt-2 block font-display text-xl font-semibold transition group-hover:text-black md:text-2xl">
                    {t(next.title)}
                  </span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 transition group-hover:border-black group-hover:bg-black group-hover:text-volt">
                  <ArrowRight className="size-5" />
                </span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.aside>

      <Lightbox images={gallery} index={lightbox} title={t(project.title)} onIndexChange={setLightbox} onClose={() => setLightbox(null)} />
    </motion.div>
  );
}
