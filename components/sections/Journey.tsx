"use client";

import { ArrowUpRight, Images, Trophy } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { activities, ui, type Activity } from "@/lib/content";
import { useIsDesktop } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Open = { activity: Activity; index: number } | null;

export function Journey() {
  const { t } = useLang();
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState<Open>(null);
  const onOpen = (activity: Activity, index: number) => setOpen({ activity, index });

  const heading = (
    <SectionHeading index="04" label={t(ui.journeyLabel)} title={t(ui.journeyTitle)} compact />
  );

  return (
    <section id="journey" className="relative">
      {isDesktop ? <PinnedTrack heading={heading} onOpen={onOpen} /> : <SwipeTrack heading={heading} onOpen={onOpen} />}
      <Lightbox
        images={open?.activity.images ?? []}
        index={open ? open.index : null}
        title={open ? t(open.activity.title) : undefined}
        onIndexChange={(index) => setOpen((o) => (o ? { ...o, index } : o))}
        onClose={() => setOpen(null)}
      />
    </section>
  );
}

type TrackProps = { heading: ReactNode; onOpen: (a: Activity, i: number) => void };

/** Desktop: vertical scroll drives a horizontal track while the section is pinned. */
function PinnedTrack({ heading, onOpen }: TrackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    // ResizeObserver fires once on observe, which gives the initial measurement.
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);
  const backdropX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <motion.div
          aria-hidden="true"
          style={{ x: backdropX }}
          className="text-outline pointer-events-none absolute bottom-[4%] left-0 select-none whitespace-nowrap font-display text-[17vw] font-bold leading-none opacity-30"
        >
          2024 — 2025 — 2024 — 2025
        </motion.div>

        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">{heading}</div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-6 pl-[max(1.25rem,calc((100vw-80rem)/2+2rem))] pr-[8vw]"
        >
          {activities.map((a, i) => (
            <ActivityCard key={a.id} activity={a} index={i} onOpen={onOpen} />
          ))}
          <NextChapterCard />
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-5 md:px-8">
          <div className="relative h-px bg-white/10">
            <motion.div className="absolute inset-0 origin-left bg-volt" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Touch / narrow screens: native swipeable carousel with snap points. */
function SwipeTrack({ heading, onOpen }: TrackProps) {
  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">{heading}</div>
      <Reveal>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:scroll-px-8 md:px-8">
          {activities.map((a, i) => (
            <ActivityCard key={a.id} activity={a} index={i} onOpen={onOpen} />
          ))}
          <NextChapterCard />
        </div>
      </Reveal>
    </div>
  );
}

function ActivityCard({ activity, index, onOpen }: { activity: Activity; index: number; onOpen: (a: Activity, i: number) => void }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(false);
  const [shown, setShown] = useState(0);
  const count = activity.images.length;

  // Cycle through the photos while hovered.
  useEffect(() => {
    if (!hovered || count < 2) return;
    const id = window.setInterval(() => setShown((i) => (i + 1) % count), 1300);
    return () => window.clearInterval(id);
  }, [hovered, count]);

  return (
    <article
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn(
        "group relative flex w-[82vw] max-w-[420px] shrink-0 snap-start flex-col rounded-[1.75rem] border bg-surface p-3 transition duration-500 lg:w-[380px] xl:w-[420px]",
        activity.featured
          ? "border-volt/40 shadow-[0_0_80px_-20px_rgba(200,255,46,0.35)]"
          : "border-white/10 hover:border-white/20",
      )}
    >
      <button
        type="button"
        data-cursor="Open"
        onClick={() => onOpen(activity, shown)}
        aria-label={`${t(activity.title)} — ${count} ${t(ui.photos)}`}
        className="relative block aspect-[16/11] w-full overflow-hidden rounded-[1.25rem] bg-ink-2"
      >
        {activity.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 1024px) 360px, 82vw"
            className={cn(
              "object-cover transition-[opacity,transform] duration-[900ms] group-hover:scale-[1.06]",
              i === shown ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="glass absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] text-fg">
          <Images className="size-3.5" /> {count} {t(ui.photos)}
        </span>
        {activity.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-volt px-3 py-1 text-xs font-semibold text-black">
            <Trophy className="size-3.5" /> {t(activity.featured)}
          </span>
        )}
        {count > 1 && (
          <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {activity.images.map((src, i) => (
              <span key={src} className={cn("h-1 rounded-full transition-all duration-500", i === shown ? "w-5 bg-volt" : "w-1.5 bg-white/50")} />
            ))}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-volt">{activity.period}</span>
          <span className="text-subtle">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-medium leading-snug xl:text-xl">{t(activity.title)}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t(activity.desc)}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {t(activity.tags).map((tag) => (
            <li key={tag} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-fg/70">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function NextChapterCard() {
  const { t } = useLang();
  return (
    <a
      href="#contact"
      className="group relative flex w-[82vw] max-w-[420px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[1.75rem] bg-volt p-8 text-black lg:w-[380px] xl:w-[420px]"
    >
      <span className="absolute -right-16 -top-16 size-56 rounded-full border-[28px] border-black/10 transition-transform duration-700 group-hover:scale-125" />
      <span className="relative font-mono text-xs uppercase tracking-[0.25em] text-black/60">{t(ui.nextChapter)}</span>
      <span className="relative">
        <span className="block font-display text-4xl font-bold leading-tight xl:text-5xl">{t(ui.nextChapterTitle)}</span>
        <span className="mt-4 block text-sm leading-relaxed text-black/70">{t(ui.nextChapterText)}</span>
        <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-volt">
          {t(ui.letsTalk)}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </span>
    </a>
  );
}
