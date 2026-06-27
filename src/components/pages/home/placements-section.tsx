"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import placements from "@/data/placements.json";
import { openLeadModal } from "@/components/common/lead-modal";

type Placement = (typeof placements)[number];

/* vertical stagger so cards sit at different heights */
const OFFSETS = [28, 0, 52, 10, 40];

/* ─── PlacementCard ──────────────────────────────────────────────────────── */

function PlacementCard({
  placement,
  offsetTop,
  delay,
}: {
  placement: Placement;
  offsetTop: number;
  delay: number;
}) {
  const w = "clamp(240px, 20vw, 300px)";
  const h = "clamp(300px, 42vh, 420px)";

  return (
    <div
      className="relative shrink-0 overflow-hidden group cursor-pointer cs-card-in"
      style={{
        width: w,
        height: h,
        marginTop: offsetTop,
        animationDelay: `${delay}ms`,
      }}>
      {/* Photo — grayscale default, color on hover */}
      <Image
        src={placement.image}
        alt={placement.name}
        fill
        sizes="290px"
        className="cs-placement-img object-cover lg:grayscale transition-all duration-700 ease-out lg:group-hover:grayscale-0 lg:group-hover:scale-[1.06] motion-reduce:transition-none"
        priority
      />

      {/* Permanent top dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />

      {/* Top: company chip + arrow */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase backdrop-blur-sm lg:group-hover:bg-black group-hover:text-primary bg-black text-primary">
          {placement.company}
        </span>

        <span className="inline-flex items-center rounded-full border border-white/15 bg-black px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase backdrop-blur-sm lg:group-hover:bg-black lg:group-hover:text-primary text-primary">
          {placement.package}
        </span>
      </div>

      {/* ── HOVER REVEAL: orange gradient + content slides up ── */}
      <div className="cs-placement-reveal absolute inset-x-0 bottom-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none">
        {/* Orange gradient bg matching reference */}
        <div className="bg-gradient-to-t from-[rgba(200,72,10,0.95)] via-[rgba(255,107,44,0.80)] to-transparent pt-10 pb-4 px-4">
          <p className="text-[9px] font-bold tracking-[0.28em] text-white/60 uppercase mb-1">
            {placement.position}
          </p>
          <h3 className="font-heading text-sm font-bold text-white leading-snug">
            {placement.name}
          </h3>
          <p className="mt-1 font-heading text-base font-black text-white/90">
            {placement.package}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── PlacementsSection ──────────────────────────────────────────────────── */

export function PlacementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  const items = placements.slice(0, 5);

  /* Dynamic section height: 1px scroll → 0.45px horizontal */
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!section || !track || !wrap) return;

    const compute = () => {
      const maxT = Math.max(0, track.scrollWidth - wrap.offsetWidth);
      section.style.height = `calc(100svh + ${maxT / 0.45}px)`;
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  /* inView via IntersectionObserver — fires as soon as section enters viewport */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.05 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  /* Scroll → translateX + progress */
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!section || !track || !wrap) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(1, scrolled / scrollable);
      const maxT = track.scrollWidth - wrap.offsetWidth;

      setTranslateX(-(p * maxT));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Using native <section> to avoid Section component's py-10 default */}
      <section
        ref={sectionRef}
        className="relative bg-[#060606] border-t border-white/[0.06] lg:pb-10"
        style={{ height: "300vh" }}>
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(255,107,44,0.06),transparent)]" />

        {/* ── STICKY VIEWPORT ──
            Extra bottom padding keeps CTAs above the fixed helpline bar */}
        <div className="sticky lg:-top-7 top-0 h-svh overflow-hidden flex flex-col pt-[calc(4.75rem+env(safe-area-inset-top))] sm:pt-[calc(5.25rem+env(safe-area-inset-top))] pb-[calc(7rem+env(safe-area-inset-bottom))]">
          {/* ── HEADER ── */}
          <div
            className={`flex flex-col items-center text-center px-6 sm:px-10 lg:px-16 pt-3 sm:pt-5 pb-5 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
            }`}>
            {/* Eyebrow — same as book-live-class-section */}
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1.5 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-primary uppercase">
                Placements
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white max-w-3xl leading-[1.1] tracking-tight font-heading">
              Our Students. <span className="text-primary">Our Pride.</span>
            </h2>

            {/* Subtext */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
              From non‑CS backgrounds to top tech roles. Every salary{" "}
              <span className="text-white/70 font-semibold">verified</span>.
              Scroll to explore.
            </p>
          </div>

          {/* ── CARD TRACK ── */}
          <div ref={wrapRef} className="flex-1 overflow-visible">
            <div
              ref={trackRef}
              className="flex gap-5 h-full items-start"
              style={{
                transform: `translateX(${translateX}px)`,
                willChange: "transform",
                paddingLeft: "clamp(24px, 5vw, 80px)",
                paddingRight: "clamp(24px, 5vw, 80px)",
                width: "max-content",
              }}>
              {items.map((p, i) => (
                <PlacementCard
                  key={p.id}
                  placement={p}
                  offsetTop={OFFSETS[i] ?? 0}
                  delay={i * 100}
                />
              ))}
            </div>
          </div>

          {/* ── BOTTOM BAR: CTAs + progress ── */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 sm:px-10 lg:px-16 pt-4 pb-4 sm:pb-2 transition-all duration-700 delay-150 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}>
            {/* CTAs */}
            <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto sm:flex-nowrap sm:justify-start">
              {" "}
              <Link
                href="/courses"
                className="group inline-flex h-10 items-center gap-1.5 border border-white/12 bg-white/4 px-5 text-sm font-semibold text-white/65 hover:text-white hover:border-white/22 hover:bg-white/[0.07] transition-all">
                All Courses
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={() => openLeadModal("placements")}
                className="inline-flex h-10 items-center bg-primary px-5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(255,107,44,0.22)] hover:bg-primary/90 hover:shadow-[0_6px_28px_rgba(255,107,44,0.38)] transition-all">
                Book Demo
              </button>
            </div>

            {/* Progress bar + label */}
            <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-end">
              {" "}
              <div className="h-px w-30 sm:w-40 bg-white/[0.07] overflow-hidden">
                <div
                  className="h-full bg-primary/60 origin-left transition-transform duration-75"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
              <span className="hidden sm:block text-[10px] font-semibold tracking-[0.2em] text-white/20 uppercase">
                Scroll
              </span>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes cs-card-in {
            from { opacity: 0; transform: translateY(32px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0)    scale(1);    }
          }
          .cs-card-in { animation: cs-card-in 0.65s cubic-bezier(0.16,1,0.3,1) both; }

@media (hover: none), (pointer: coarse) {
  .cs-placement-img { filter: none !important; transform: none !important; }
  .cs-placement-reveal { transform: translateY(0) !important; }
}
        `}</style>
      </section>
    </>
  );
}
