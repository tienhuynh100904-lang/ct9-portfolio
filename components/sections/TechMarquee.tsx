"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { allTech, type Tech } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TechMarquee() {
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const skewX = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7], { clamp: true });

  return (
    <section aria-label="Tech stack" className="relative overflow-hidden border-y border-white/[0.06] bg-ink-2 py-8 md:py-12">
      <motion.div style={{ skewX }} className="mask-fade-x flex flex-col gap-5 md:gap-7">
        <Row items={allTech} duration="70s" />
        <Row items={[...allTech].reverse()} duration="80s" reverse outline />
      </motion.div>
    </section>
  );
}

function Row({ items, duration, reverse, outline }: { items: Tech[]; duration: string; reverse?: boolean; outline?: boolean }) {
  return (
    <div className="group flex overflow-hidden">
      <div
        className={cn(
          "flex w-max shrink-0 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item.name} className="flex items-center gap-4 pr-10 md:gap-5 md:pr-14">
                <Image
                  src={item.icon}
                  alt=""
                  width={44}
                  height={44}
                  className={cn("size-8 md:size-11", item.invert && "invert", outline && "opacity-60 grayscale")}
                />
                <span
                  className={cn(
                    "whitespace-nowrap font-display text-2xl font-semibold tracking-tight transition-colors duration-300 md:text-5xl",
                    outline ? "text-outline hover:text-volt" : "text-fg/90 hover:text-volt",
                  )}
                >
                  {item.name}
                </span>
                <span className="text-xl text-volt md:text-3xl">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
