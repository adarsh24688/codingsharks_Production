"use client";

import { useEffect, useState } from "react";

type HeroData = {
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  cyclingWords: string[];
  stats: { value: string; label: string }[];
};

type Props = { data: HeroData };

export function CounselingHero({ data }: Props) {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % data.cyclingWords.length);
        setVisible(true);
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, [data.cyclingWords.length]);

  return (
    <section className="relative flex min-h-[88vh] flex-col overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      {/* Main content */}
      <div className="relative flex flex-1 flex-col justify-center px-4 pt-12 pb-8 sm:px-8 lg:px-16 xl:px-24">
        {/* Trust badge */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="h-3.5 w-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-bold tracking-[0.16em] text-white/60 uppercase">
            500+ students counseled &nbsp;·&nbsp; 100% free &nbsp;·&nbsp; No sales pitch
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_420px] xl:gap-16">
          {/* Left — Massive typographic headline */}
          <div>
            <h1
              className="font-heading font-black leading-[0.86] tracking-tighter text-white"
              style={{ fontSize: "clamp(60px, 9.5vw, 124px)" }}>
              STUCK.
              <br />
              CONFUSED.
              <br />
              <span className="text-primary">LET&apos;S FIX</span>
              <br />
              THAT.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              {data.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="group inline-flex h-14 items-center bg-primary px-8 text-sm font-black uppercase tracking-wider text-white transition hover:bg-primary/90">
                Book Free Session
                <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#what-you-get"
                className="text-sm font-semibold text-white/60 underline underline-offset-4 transition hover:text-white/75">
                See what&apos;s included
              </a>
            </div>
          </div>

          {/* Right — Stacked doubt cards */}
          <div className="relative hidden h-[360px] lg:block">
            {/* Ghost cards stacked behind */}
            <div
              className="absolute inset-0 border border-white/6 bg-white/2"
              style={{ transform: "rotate(5deg) translate(10px, 12px)" }}
            />
            <div
              className="absolute inset-0 border border-white/10 bg-white/3"
              style={{ transform: "rotate(2.5deg) translate(5px, 6px)" }}
            />

            {/* Active card */}
            <div
              className="absolute inset-0 border border-primary/20 bg-[#0b0b0b] p-8"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}>
              <p className="text-[9px] font-black tracking-[0.25em] text-primary/50 uppercase">
                Student&apos;s Doubt
              </p>

              <p className="mt-5 text-xl font-bold leading-snug text-white sm:text-[22px]">
                &ldquo;{data.cyclingWords[wordIndex]}&rdquo;
              </p>

              {/* Fake avatar */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-xs font-bold text-primary">
                  ?
                </div>
                <div>
                  <div className="h-2 w-20 rounded-full bg-white/15" />
                  <div className="mt-1.5 h-1.5 w-12 rounded-full bg-white/8" />
                </div>
              </div>

              {/* Answer strip */}
              <div className="mt-6 border-t border-white/8 pt-5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                    ✓
                  </span>
                  <div>
                    <p className="text-xs font-bold text-primary/80">
                      Answered in your free session
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                      Our counselor addresses your specific doubt — no generic advice, ever.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom counter */}
              <div className="absolute bottom-5 right-6 flex items-center gap-1.5">
                {data.cyclingWords.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: i === wordIndex ? "20px" : "6px",
                      background: i === wordIndex ? "var(--color-primary, #d24509)" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip at bottom */}
      <div className="relative border-t border-white/10">
        <div className="grid grid-cols-3 divide-x divide-white/10">
          {data.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-5 text-center">
              <p className="font-heading text-2xl font-black text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
