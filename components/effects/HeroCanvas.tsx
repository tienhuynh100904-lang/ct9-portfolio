"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GAP = 30;
const RADIUS = 170;

/** Interactive dot field: a slow light wave drifts across, dots near the pointer light up and get pushed away. */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let dots: { x: number; y: number }[] = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < height; y += GAP) for (let x = GAP / 2; x < width; x += GAP) dots.push({ x, y });
      if (!running) draw(0);
    };

    const draw = (time: number) => {
      // Snap when the pointer enters or leaves, ease while it moves inside.
      if (mouse.tx < -9000 || mouse.x < -9000) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      } else {
        mouse.x += (mouse.tx - mouse.x) * 0.14;
        mouse.y += (mouse.ty - mouse.y) * 0.14;
      }

      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;
      for (const d of dots) {
        const wave = reduce ? 0.5 : (Math.sin(d.x * 0.011 + d.y * 0.007 - t * 1.1) + 1) / 2;
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS && dist > 0.001) {
          const f = 1 - dist / RADIUS;
          const push = f * f * 22;
          const px = d.x + (dx / dist) * push;
          const py = d.y + (dy / dist) * push;
          const r = 1.1 + f * 1.8;
          ctx.fillStyle = `rgba(200,255,46,${0.15 + f * 0.85})`;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.05 + wave * 0.11})`;
          ctx.fillRect(d.x - 0.9, d.y - 0.9, 1.8, 1.8);
        }
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      // Touch drags would light up dots under the reader's finger and over the text.
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none size-full", className)} />;
}
