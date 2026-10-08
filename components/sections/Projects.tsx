"use client";

import { ArrowUpRight, CircleCheck, Trophy } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, type PointerEvent } from "react";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, ui, type Project } from "@/lib/content";
import { useIsDesktop } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";
import { ProjectModal } from "./ProjectModal";
import { ProjectVisual } from "./ProjectVisual";

export function Projects() {
  const { t } = useLang();
  const stackRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="work" className="relative pt-20 md:pt-28 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="03" label={t(ui.workLabel)} title={t(ui.workTitle)} intro={t(ui.workIntro)} className="lg:mb-4" />

        <div ref={stackRef} className="relative flex flex-col gap-6 pb-10 lg:gap-0 lg:pb-[12vh]">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={openProject}
        onClose={() => setOpenId(null)}
        onNavigate={(id) => setOpenId(id)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  const { t } = useLang();
  const isDesktop = useIsDesktop();
  const [hovered, setHovered] = useState(false);

  // Earlier cards shrink and dim as later ones stack over them.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.25]);

  const mx = useSpring(0, { stiffness: 90, damping: 18 });
  const my = useSpring(0, { stiffness: 90, damping: 18 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  const number = String(index + 1).padStart(2, "0");

  const card = (
    <motion.article
      style={isDesktop ? { scale, top: `calc(${index * 26}px - 2vh)` } : undefined}
      className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-[0_-20px_80px_-30px_rgba(0,0,0,0.9)] lg:h-[min(80vh,700px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(70% 90% at 90% 10%, ${project.accent}1f, transparent 65%)` }}
      />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_left,#000,transparent_60%)]" />

      <div className="relative grid h-full lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="order-2 flex flex-col p-6 sm:p-8 lg:order-1 lg:overflow-hidden lg:p-11">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
            <span className="text-volt">{number}</span>
            <span className="text-subtle">/ {String(total).padStart(2, "0")}</span>
            <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-wider">{t(project.type)}</span>
          </div>

          {project.award && (
            <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-volt/10 px-3 py-1.5 text-xs font-medium text-volt ring-1 ring-volt/30">
              <Trophy className="size-3.5" />
              {t(project.award)}
            </span>
          )}

          <h3 className="text-chrome mt-4 pt-1 font-display text-[clamp(1.6rem,2.6vw,2.6rem)] font-semibold leading-[1.08] tracking-tight">
            {t(project.title)}
          </h3>
          <p className="mt-4 leading-relaxed text-muted lg:line-clamp-3">{t(project.summary)}</p>

          <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-volt">{t(ui.myRole)}</p>
            <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-fg/80 md:line-clamp-none lg:line-clamp-2">{t(project.role)}</p>
          </div>

          <ul className="mt-5 hidden space-y-2 md:block lg:hidden tall:block">
            {t(project.highlights)
              .slice(0, 3)
              .map((h) => (
                <li key={h} className="flex gap-2.5 text-sm text-muted">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-volt" />
                  <span className="lg:line-clamp-1">{h}</span>
                </li>
              ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-fg/75">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
            <button
              type="button"
              onClick={onOpen}
              className="group inline-flex items-center gap-2 rounded-full bg-volt px-4 py-2.5 text-sm font-semibold text-black sm:px-5 sm:py-3 transition hover:shadow-[0_0_40px_-6px_rgba(200,255,46,0.7)]"
            >
              {t(ui.caseStudy)}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium sm:px-5 sm:py-3 transition hover:border-white/40 hover:bg-white/5"
              >
                <BrandIcon name="github" className="size-4" />
                {t(ui.sourceCode)}
              </a>
            )}
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label={`${t(ui.caseStudy)}: ${t(project.title)}`}
          data-cursor="View"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen();
            }
          }}
          onPointerMove={onMove}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={onLeave}
          className="relative order-1 aspect-[16/11] overflow-hidden border-b border-white/[0.06] lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l"
        >
          <ProjectVisual project={project} mx={mx} my={my} hovered={hovered} />
        </div>
      </div>

      {isDesktop && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} />}
    </motion.article>
  );

  if (!isDesktop) return <Reveal>{card}</Reveal>;

  return <div className="sticky top-0 flex h-screen items-center">{card}</div>;
}
