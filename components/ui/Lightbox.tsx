"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ui } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { useScrollLock } from "@/lib/scroll-lock";
import { cn, EASE_OUT } from "@/lib/utils";
import { Portal } from "./Portal";

type LightboxProps = {
  images: string[];
  /** `null` = closed. */
  index: number | null;
  title?: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox(props: LightboxProps) {
  return (
    <Portal>
      <AnimatePresence>{props.index !== null && <LightboxView key="lightbox" {...props} index={props.index} />}</AnimatePresence>
    </Portal>
  );
}

function LightboxView({ images, index, title, onIndexChange, onClose }: LightboxProps & { index: number }) {
  const { t } = useLang();
  const [direction, setDirection] = useState(0);
  const count = images.length;
  useScrollLock(true);

  const go = (delta: number) => {
    setDirection(delta);
    onIndexChange((index + delta + count) % count);
  };

  useEffect(() => {
    // Capture phase so Escape closes only the lightbox, not a modal underneath.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") {
        setDirection(1);
        onIndexChange((index + 1) % count);
      } else if (e.key === "ArrowLeft") {
        setDirection(-1);
        onIndexChange((index - 1 + count) % count);
      } else return;
      e.stopPropagation();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [count, index, onClose, onIndexChange]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[95] flex flex-col bg-black/92 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="min-w-0">
          {title && <p className="truncate font-display text-sm text-fg md:text-base">{title}</p>}
          <p className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t(ui.close)}
          className="grid size-11 place-items-center rounded-full border border-white/15 text-fg transition hover:rotate-90 hover:border-volt hover:text-volt"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden" onClick={onClose}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={images[index]}
            custom={direction}
            className="absolute inset-4 md:inset-x-24 md:inset-y-6"
            initial={{ opacity: 0, x: direction * 120, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -120, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={title ? `${title} — ${index + 1}` : ""}
              fill
              sizes="100vw"
              className="pointer-events-none select-none object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      {count > 1 && (
        <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 py-4">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                onIndexChange(i);
              }}
              className={cn(
                "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition md:h-14 md:w-20",
                i === index ? "border-volt opacity-100" : "border-white/10 opacity-45 hover:opacity-80",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous" : "Next"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-fg backdrop-blur transition hover:border-volt hover:bg-volt hover:text-black",
        side === "left" ? "left-3 md:left-8" : "right-3 md:right-8",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
