"use client";

import { useRef, type ReactNode } from "react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { useSectionMotion } from "./use-section-motion";

const AT = [0.1, 0.37, 0.63, 0.88];
const DEPTH = [10, -14, 12, -16];

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  pathLength: 1,
  strokeDasharray: 1,
};

function Draw({ d, accent }: { d: string; accent?: boolean }) {
  return <path data-j-draw d={d} {...stroke} className={accent ? "text-primary" : undefined} />;
}

function BuildArt() {
  return (
    <>
      <path data-j-pop d="M30 38 h60 v36 h-60 z" className="fill-primary/12" />
      <Draw d="M28 34 h64 a4 4 0 0 1 4 4 v40 h-72 v-40 a4 4 0 0 1 4 -4 z" />
      <Draw d="M14 78 h92 l-7 11 h-78 z" />
      <Draw d="M51 47 l-8 8 l8 8" accent />
      <Draw d="M69 47 l8 8 l-8 8" accent />
      <Draw d="M63 44 l-6 22" accent />
    </>
  );
}

function ShipArt() {
  return (
    <>
      <Draw d="M60 18 c15 12 19 33 14 54 h-28 c-5 -21 -1 -42 14 -54 z" />
      <circle data-j-pop cx="60" cy="44" r="7" className="fill-primary" />
      <Draw d="M46 58 l-11 17 l13 -3" />
      <Draw d="M74 58 l11 17 l-13 -3" />
      <path data-j-pop d="M52 76 q8 26 8 28 q0 -2 8 -28 z" className="fill-primary" />
      <Draw d="M24 94 h12" accent />
      <Draw d="M86 98 h12" accent />
      <Draw d="M20 80 h8" accent />
    </>
  );
}

function ReviewArt() {
  return (
    <>
      <Draw d="M22 26 h54 a5 5 0 0 1 5 5 v50 a5 5 0 0 1 -5 5 h-54 a5 5 0 0 1 -5 -5 v-50 a5 5 0 0 1 5 -5 z" />
      <Draw d="M29 40 h30" />
      <Draw d="M29 51 h40" />
      <Draw d="M29 62 h22" />
      <path
        data-j-pop
        d="M70 58 h30 a6 6 0 0 1 6 6 v18 a6 6 0 0 1 -6 6 h-15 l-9 9 v-9 h-6 a6 6 0 0 1 -6 -6 v-18 a6 6 0 0 1 6 -6 z"
        className="fill-primary"
      />
      <path data-j-draw d="M77 73 l5 5 l10 -10" {...stroke} className="text-white" />
    </>
  );
}

function HiredArt() {
  return (
    <>
      <Draw d="M46 12 l14 22 l14 -22" accent />
      <Draw d="M37 34 h46 a5 5 0 0 1 5 5 v56 a5 5 0 0 1 -5 5 h-46 a5 5 0 0 1 -5 -5 v-56 a5 5 0 0 1 5 -5 z" />
      <Draw d="M60 48 a9 9 0 1 1 -0.01 0" />
      <Draw d="M45 80 q15 -13 30 0" />
      <path data-j-pop d="M40 86 h40 v8 h-40 z" className="fill-primary" />
      <path
        data-j-pop
        d="M99 22 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z"
        className="fill-primary"
      />
      <path data-j-pop d="M20 50 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z" className="fill-primary" />
    </>
  );
}

const ART: (() => ReactNode)[] = [BuildArt, ShipArt, ReviewArt, HiredArt];

function Word({ text, index }: { text: string; index: number }) {
  if (index === 3) {
    return (
      <span className="inline-block -rotate-1 rounded-[0.1em] bg-primary px-[0.16em] text-white">{text}.</span>
    );
  }
  if (index === 1) return <span className="text-primary">{text}.</span>;
  return (
    <>
      {text}
      <span className="text-primary">.</span>
    </>
  );
}

export function JourneySection() {
  const { journey } = home;
  const sectionRef = useRef<HTMLElement>(null);

  useSectionMotion(sectionRef, ({ gsap, root, finePointer }) => {
    const stations = gsap.utils.toArray<HTMLElement>("[data-j-station]");

    const reveal = (tl: gsap.core.Timeline, station: HTMLElement, at: number) => {
      tl.fromTo(
        station.querySelector("[data-j-badge]"),
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.07, ease: "back.out(2)" },
        at - 0.04,
      )
        .fromTo(
          station.querySelectorAll("[data-j-draw]"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.12, stagger: 0.012, ease: "power1.inOut" },
          at - 0.02,
        )
        .fromTo(
          station.querySelectorAll("[data-j-pop]"),
          { scale: 0, opacity: 0, transformOrigin: "50% 50%" },
          { scale: 1, opacity: 1, duration: 0.05, stagger: 0.01, ease: "back.out(2.4)" },
          at + 0.06,
        )
        .fromTo(
          station.querySelector("[data-j-word]"),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.08, ease: "power3.out" },
          at,
        )
        .fromTo(
          station.querySelector("[data-j-caption]"),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
          at + 0.04,
        );
    };

    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top 80%", end: "bottom 88%", scrub: 0.8 },
      });
      tl.fromTo("[data-j-road]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0);
      stations.forEach((station, i) => reveal(tl, station, AT[i] ?? i / stations.length));
      tl.set({}, {}, 1);
    });
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top 72%", end: "bottom 62%", scrub: 0.8 },
      });
      tl.fromTo("[data-j-rail]", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);
      stations.forEach((station, i) => reveal(tl, station, 0.06 + (i / stations.length) * 0.9));
      tl.set({}, {}, 1);
    });

    if (!finePointer) return;
    const floats = gsap.utils.toArray<HTMLElement>("[data-j-float]").map((el, i) => ({
      x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
      depth: DEPTH[i % DEPTH.length],
    }));
    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      for (const f of floats) {
        f.x(x * f.depth);
        f.y(y * f.depth);
      }
    };
    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  });

  return (
    <section
      ref={sectionRef}
      aria-label={journey.label}
      className="relative overflow-hidden bg-cs-paper pb-24 pt-10 text-cs-on-paper sm:pb-24 lg:pb-28 lg:pt-14">
      <Container>
        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[300px] w-full lg:block">
            <path
              d="M-20 40 C 50 40, 70 68, 125 68 C 250 68, 250 228, 375 228 C 500 228, 500 68, 625 68 C 750 68, 750 228, 875 228 C 930 228, 960 250, 1020 262"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-cs-on-paper/12"
            />
            <path
              data-j-road
              d="M-20 40 C 50 40, 70 68, 125 68 C 250 68, 250 228, 375 228 C 500 228, 500 68, 625 68 C 750 68, 750 228, 875 228 C 930 228, 960 250, 1020 262"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              className="text-primary"
            />
          </svg>

          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[44px] top-6 w-0.5 -translate-x-1/2 rounded-full bg-cs-on-paper/12 lg:hidden">
            <span data-j-rail className="absolute inset-0 origin-top rounded-full bg-primary" />
          </span>

          <ol className="relative flex flex-col gap-12 lg:grid lg:grid-cols-4 lg:gap-6">
            {journey.steps.map((step, i) => {
              const Art = ART[i % ART.length];
              return (
                <li
                  key={step.word}
                  data-j-station
                  className={`group flex items-center gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center ${i % 2 === 1 ? "lg:mt-40" : ""}`}>
                  <div data-j-float className="flex-none">
                    <div
                      data-j-badge
                      className="grid size-[88px] place-items-center rounded-full border border-cs-on-paper/10 bg-cs-paper-2 text-cs-on-paper transition-colors duration-300 group-hover:border-primary/40 lg:size-[136px]">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 120 120"
                        className="size-[62px] transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 lg:size-[96px]">
                        <Art />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0 lg:mt-7">
                    <h3 className="overflow-hidden whitespace-nowrap pb-[0.08em] font-heading text-[34px] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[40px] lg:text-[36px] xl:text-[46px]">
                      <span data-j-word className="block">
                        <Word text={step.word} index={i} />
                      </span>
                    </h3>
                    <p
                      data-j-caption
                      className="mt-2 max-w-[260px] text-[15px] leading-snug text-cs-on-paper/72 lg:mx-auto lg:mt-3 lg:text-base">
                      {step.caption}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
