"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Project, Shot } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  /** Pointer position (-0.5..0.5) for parallax; omit for a static composition. */
  mx?: MotionValue<number>;
  my?: MotionValue<number>;
  hovered?: boolean;
  className?: string;
};

/** Composes real product screenshots into browser / phone mock-ups. */
export function ProjectVisual({ project, mx: pointerX, my: pointerY, hovered = false, className }: Props) {
  const still = useMotionValue(0);
  const mx = pointerX ?? still;
  const my = pointerY ?? still;
  const [a, b, c] = project.cover;
  const alt = project.title.en;

  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(60% 60% at 50% 45%, ${project.accent}33, transparent 70%)`,
          opacity: hovered ? 1 : 0.7,
        }}
      />

      <div className="absolute inset-0 flex items-center">
        <div className="relative aspect-[16/11] w-full">
          {project.visual === "web-mobile" && (
            <>
              <Layer mx={mx} my={my} depth={14} className="left-[13%] top-[15%] w-[70%]" animate={{ y: hovered ? -6 : 0 }}>
                <BrowserFrame shot={a} alt={`${alt} — web`} />
              </Layer>
              <Layer
                mx={mx}
                my={my}
                depth={30}
                className="right-[6%] top-[6%] w-[21%]"
                animate={{ rotate: hovered ? 9 : 5, x: hovered ? 8 : 0 }}
              >
                <PhoneFrame shot={b} alt={`${alt} — mobile`} />
              </Layer>
              <Layer
                mx={mx}
                my={my}
                depth={44}
                className="bottom-[4%] left-[3%] w-[19%]"
                animate={{ rotate: hovered ? -10 : -5, y: hovered ? -10 : 0 }}
              >
                <PhoneFrame shot={c} alt={`${alt} — cart`} />
              </Layer>
            </>
          )}

          {project.visual === "mobile" && (
            <>
              <Layer
                mx={mx}
                my={my}
                depth={22}
                className="left-[12%] top-[14%] w-[24%]"
                animate={{ rotate: hovered ? -14 : -8, x: hovered ? -18 : 0 }}
              >
                <PhoneFrame shot={a} alt={`${alt} — login`} />
              </Layer>
              <Layer
                mx={mx}
                my={my}
                depth={22}
                className="right-[12%] top-[14%] w-[24%]"
                animate={{ rotate: hovered ? 14 : 8, x: hovered ? 18 : 0 }}
              >
                <PhoneFrame shot={c} alt={`${alt} — statistics`} />
              </Layer>
              <Layer mx={mx} my={my} depth={40} className="left-[37%] top-[6%] z-10 w-[26%]" animate={{ y: hovered ? -12 : 0, scale: hovered ? 1.04 : 1 }}>
                <PhoneFrame shot={b} alt={`${alt} — tasks`} />
              </Layer>
            </>
          )}

          {project.visual === "web" && (
            <>
              <Layer mx={mx} my={my} depth={10} className="right-[4%] top-[8%] w-[64%] opacity-70" animate={{ x: hovered ? 10 : 0 }}>
                <BrowserFrame shot={b} alt={`${alt} — event detail`} />
              </Layer>
              <Layer mx={mx} my={my} depth={24} className="bottom-[12%] left-[4%] z-10 w-[72%]" animate={{ y: hovered ? -8 : 0 }}>
                <BrowserFrame shot={a} alt={`${alt} — home`} />
              </Layer>
              <Layer
                mx={mx}
                my={my}
                depth={46}
                className="bottom-[5%] right-[5%] z-20 w-[30%]"
                animate={{ rotate: hovered ? -3 : 3, scale: hovered ? 1.06 : 1 }}
              >
                <div className="overflow-hidden rounded-xl border border-white/15 shadow-2xl shadow-black/70">
                  <Image src={c.src} alt={`${alt} — registration`} width={c.w} height={c.h} sizes="240px" className="block h-auto w-full" />
                </div>
              </Layer>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Layer({
  children,
  className,
  depth,
  mx,
  my,
  animate,
}: {
  children: ReactNode;
  className?: string;
  depth: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  animate?: { x?: number; y?: number; rotate?: number; scale?: number };
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={cn("absolute", className)}>
      <motion.div
        initial={false}
        animate={{ x: 0, y: 0, rotate: 0, scale: 1, ...animate }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function BrowserFrame({ shot, alt, sizes = "(min-width: 1024px) 560px, 80vw" }: { shot: Shot; alt: string; sizes?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d12] shadow-2xl shadow-black/60">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 h-3.5 flex-1 rounded-full bg-white/[0.06]" />
      </div>
      <Image src={shot.src} alt={alt} width={shot.w} height={shot.h} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}

export function PhoneFrame({ shot, alt, sizes = "(min-width: 1024px) 200px, 30vw" }: { shot: Shot; alt: string; sizes?: string }) {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border-[5px] border-[#22222a] bg-black shadow-2xl shadow-black/70 ring-1 ring-white/10">
      <Image src={shot.src} alt={alt} width={shot.w} height={shot.h} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}
