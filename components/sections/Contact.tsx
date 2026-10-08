"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal, SplitReveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { mailto, profile, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Contact() {
  const { t, lang } = useLang();
  const [line1, line2] = t(ui.contactTitle);

  return (
    <section id="contact" className="relative overflow-hidden pb-16 pt-20 md:pb-24 md:pt-28 lg:pb-28 lg:pt-40">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-volt/[0.12] blur-[140px]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel index="05" label={t(ui.contactLabel)} />

        <h2
          className={cn(
            "mt-6 font-display text-[clamp(2.6rem,9.5vw,8.5rem)] font-bold uppercase tracking-[-0.03em]",
            lang === "vi" ? "leading-[1.12]" : "leading-[0.98]",
          )}
        >
          <SplitReveal key={`${lang}-1`} text={line1} wordClassName="text-chrome" className="block" />
          <SplitReveal key={`${lang}-2`} text={line2} wordClassName="text-shine" className="block" delay={0.15} />
        </h2>

        <div className="mt-8 grid items-center gap-8 md:mt-10 md:grid-cols-[1fr_auto] md:gap-12">
          <Reveal>
            <p className="max-w-xl text-lg leading-relaxed text-muted">{t(ui.contactText)}</p>
          </Reveal>
          <Reveal delay={0.15} className="justify-self-start md:justify-self-end">
            <Magnetic strength={0.45}>
              <a
                href={mailto(lang)}
                data-cursor="Mail"
                className="group relative grid size-36 place-items-center rounded-full bg-volt text-black shadow-[0_0_80px_-10px_rgba(200,255,46,0.6)] transition-transform duration-500 hover:scale-105 sm:size-44 lg:size-52"
              >
                <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 size-full" aria-hidden="true">
                  <defs>
                    <path id="contact-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
                  </defs>
                  <text className="fill-black font-mono text-[11px] font-semibold uppercase">
                    <textPath href="#contact-circle" textLength="476" lengthAdjust="spacing">
                      Open to work ✦ Let&apos;s talk ✦ Open to work ✦ Let&apos;s talk ✦
                    </textPath>
                  </text>
                </svg>
                <span className="relative flex flex-col items-center gap-1 text-center text-sm font-semibold">
                  <ArrowUpRight className="size-7 transition-transform duration-500 group-hover:rotate-45" />
                  {t(ui.getInTouch)}
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-20 lg:grid-cols-3">
          <ContactCard
            className="sm:col-span-2 lg:col-span-1"
            icon={<Mail className="size-5" />}
            label={t(ui.emailLabel)}
            value={<EmailText email={profile.email} />}
            action={
              <div className="flex items-center gap-5">
                <CardLink href={mailto(lang)}>{t(ui.sendEmail)}</CardLink>
                <CopyButton text={profile.email} />
              </div>
            }
            delay={0}
          />
          <ContactCard
            icon={<Phone className="size-5" />}
            label={t(ui.phone)}
            value={profile.phone}
            action={<CardLink href={profile.phoneHref}>{t(ui.callNow)}</CardLink>}
            delay={0.08}
          />
          <ContactCard
            icon={<MapPin className="size-5" />}
            label={t(ui.locationLabel)}
            value={t(profile.location)}
            action={
              <CardLink href={profile.mapUrl} external>
                {t(ui.viewMap)}
              </CardLink>
            }
            delay={0.16}
          />
        </div>

        <div className="mt-16 md:mt-24">
          <SectionLabel index="↗" label={t(ui.followMe)} className="mb-6" />
          <ul className="border-b border-white/10">
            {profile.socials.map((s, i) => (
              <li key={s.key} className="border-t border-white/10">
                <Reveal delay={i * 0.05} y={16}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center justify-between gap-4 overflow-hidden px-2 py-4 sm:py-5 md:px-4 lg:py-7"
                  >
                    <span className="absolute inset-0 translate-y-full bg-volt transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                    <span className="relative flex items-center gap-4 md:gap-6">
                      <BrandIcon name={s.key} className="size-6 text-muted transition-colors duration-300 group-hover:text-black md:size-8" />
                      <span className="font-display text-2xl font-semibold transition-all duration-500 group-hover:translate-x-2 group-hover:text-black sm:text-3xl md:text-4xl lg:text-5xl">
                        {s.label}
                      </span>
                    </span>
                    <span className="relative flex items-center gap-4">
                      <span className="hidden font-mono text-sm text-muted transition-colors group-hover:text-black/70 sm:inline">{s.handle}</span>
                      <span className="grid size-10 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-black group-hover:bg-black group-hover:text-volt md:size-12">
                        <ArrowUpRight className="size-5" />
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Lets a long address wrap before the "@" instead of mid-word. */
function EmailText({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  return (
    <>
      {user}
      <wbr />@{domain}
    </>
  );
}

function ContactCard({
  icon,
  label,
  value,
  action,
  delay,
  className,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  action: ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <SpotlightCard className="h-full p-6 lg:p-7">
        <div className="flex h-full flex-col">
          <span className="grid size-11 lg:size-12 place-items-center rounded-2xl border border-white/10 text-volt transition duration-500 group-hover/spot:border-volt group-hover/spot:bg-volt group-hover/spot:text-black">
            {icon}
          </span>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted lg:mt-8">{label}</p>
          <p className="mt-2 font-display text-base font-medium [overflow-wrap:anywhere] sm:text-lg lg:text-xl">{value}</p>
          <div className="mt-auto pt-5 lg:pt-8">{action}</div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function CardLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-volt"
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:rotate-45" />
    </a>
  );
}

function CopyButton({ text }: { text: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard
          ?.writeText(text)
          .then(() => setCopied(true))
          .catch(() => {});
      }}
      className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "copy"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-1.5"
        >
          {copied ? <Check className="size-4 text-volt" /> : <Copy className="size-4" />}
          {copied ? t(ui.copied) : t(ui.copy)}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
