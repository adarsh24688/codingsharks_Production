"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Flag, GraduationCap, Laptop } from "lucide-react";

import home from "@/data/home.json";
import sharkMark from "@/assets/images/coding-logo-mark-white.png";
import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import { useSectionMotion } from "./use-section-motion";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const MARKER_PHRASE = "Three ways";

const STOPS = [0.14, 0.38, 0.62, 0.86];

const ICONS = [null, Laptop, GraduationCap];

export function ComparisonSection() {
  const { comparison } = home;
  const race = comparison.race;
  const sectionRef = useRef<HTMLElement>(null);

  useSectionMotion(sectionRef, ({ gsap }) => {
    gsap.from("[data-compare-head]", {
      opacity: 0,
      y: 28,
      duration: 0.8,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-compare-head]", start: "top 86%", once: true },
    });
    gsap.fromTo(
      "[data-compare-marker]",
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        delay: 0.25,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-compare-head]", start: "top 86%", once: true },
      },
    );

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: "[data-race]", start: "top 70%", end: "top 12%", scrub: 0.6 },
    });

    gsap.utils.toArray<HTMLElement>("[data-lane]").forEach((lane) => {
      const reach = Number(lane.dataset.reach) || 0;
      tl.fromTo(lane.querySelector("[data-runner]"), { xPercent: 0 }, { xPercent: reach * 100, duration: 1 }, 0);
      tl.fromTo(lane.querySelector("[data-trail]"), { scaleX: 0 }, { scaleX: reach, duration: 1 }, 0);
      lane.querySelectorAll<HTMLElement>("[data-stop]").forEach((stop) => {
        const at = Number(stop.dataset.at) || 0;
        if (at > reach) return;
        tl.fromTo(stop, { opacity: 0.3, y: 6 }, { opacity: 1, y: 0, duration: 0.06 }, (at / reach) * 0.98 - 0.03);
      });
      const end = lane.querySelector("[data-end]");
      if (end)
        tl.fromTo(end, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.08, ease: "back.out(2)" }, 0.97);
    });
    tl.fromTo("[data-finish-flag]", { rotation: -30 }, { rotation: 8, duration: 0.2, ease: "back.out(3)" }, 0.9);
    tl.set({}, {}, 1.05);
  });

  const marked = comparison.headline.startsWith(MARKER_PHRASE);
  const headlineRest = marked ? comparison.headline.slice(MARKER_PHRASE.length) : comparison.headline;

  return (
    <section ref={sectionRef} className="bg-cs-paper py-16 text-cs-on-paper sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2
            data-compare-head
            className="font-heading text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
            {marked ? (
              <span
                data-compare-marker
                className="inline-block -rotate-1 rounded-[0.12em] bg-primary px-[0.18em] text-white">
                {MARKER_PHRASE}
              </span>
            ) : null}
            {headlineRest}
          </h2>
          <p
            data-compare-head
            className="max-w-[420px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px] lg:pb-2">
            {race.subline}
          </p>
        </div>

        <div
          data-race
          className="relative mt-10 rounded-[28px] bg-cs-ink p-5 text-cs-on-ink sm:p-8 lg:mt-12 lg:px-10 lg:py-9">
          <div className="grid items-end gap-4 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-8">
            <p className="hidden text-[13px] text-cs-on-ink/56 lg:block">The road you pick</p>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-cs-on-ink/60">Start: you, today</span>
              <span className="flex items-center gap-2 font-semibold text-primary">
                <span data-finish-flag className="inline-block origin-bottom-left">
                  <Flag aria-hidden className="size-4" />
                </span>
                {race.finish}
              </span>
            </div>
          </div>

          <ol className="mt-6 space-y-8 lg:space-y-6">
            {race.lanes.map((lane, index) => {
              const Icon = ICONS[index];
              return (
                <li
                  key={lane.name}
                  data-lane
                  data-reach={lane.reach}
                  className="grid gap-4 lg:grid-cols-[210px_minmax(0,1fr)] lg:items-start lg:gap-8">
                  <div className="lg:pt-3">
                    <h3
                      className={`font-heading text-[20px] font-medium leading-tight tracking-[-0.02em] sm:text-[22px] ${
                        lane.featured ? "text-primary" : "text-cs-on-ink/85"
                      }`}>
                      {lane.name}
                    </h3>
                    <p
                      data-end
                      className={`mt-1.5 inline-block origin-left rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                        lane.featured ? "bg-primary text-white" : "bg-cs-on-ink/10 text-cs-on-ink/70"
                      }`}>
                      {lane.end}
                    </p>
                  </div>

                  <div>
                    <div
                      className={`relative h-14 overflow-hidden rounded-full px-7 ${lane.featured ? "bg-primary/12 ring-1 ring-inset ring-primary/40" : "bg-cs-ink-2 ring-1 ring-inset ring-cs-on-ink/10"}`}>
                      <div className="relative h-full">
                        <span
                          aria-hidden
                          className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-cs-on-ink/15"
                        />
                        <span
                          aria-hidden
                          data-trail
                          className={`absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 origin-left rounded-full ${
                            lane.featured ? "bg-primary" : "bg-cs-on-ink/45"
                          }`}
                        />
                        {STOPS.map((at) => (
                          <span
                            key={at}
                            aria-hidden
                            style={{ left: `${at * 100}%` }}
                            className={`absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ${
                              lane.featured ? "ring-cs-ink" : "ring-cs-ink-2"
                            } ${at <= lane.reach ? (lane.featured ? "bg-primary" : "bg-cs-on-ink/70") : "bg-cs-on-ink/20"}`}
                          />
                        ))}
                        <span
                          aria-hidden
                          className="absolute right-0 top-1/2 h-10 w-2.5 -translate-y-1/2 rounded-[3px] bg-[repeating-linear-gradient(0deg,var(--cs-on-ink)_0_5px,var(--cs-ink)_5px_10px)] opacity-60"
                        />
                        <div aria-hidden className="pointer-events-none absolute inset-0">
                          <div data-runner className="h-full w-full will-change-transform">
                            <span
                              className={`absolute left-0 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ring-4 ${
                                lane.featured
                                  ? "bg-primary text-white ring-primary/30"
                                  : "bg-cs-on-ink text-cs-ink ring-cs-on-ink/15"
                              }`}>
                              {Icon ? (
                                <Icon className="size-5" />
                              ) : (
                                <Image src={sharkMark} alt="" className="h-5 w-auto" />
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ol className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 px-1 sm:grid-cols-4 lg:px-7">
                      {lane.milestones.map((milestone, i) => (
                        <li
                          key={milestone}
                          data-stop
                          data-at={STOPS[i]}
                          className={`text-[13px] leading-snug sm:text-center ${
                            STOPS[i] > lane.reach
                              ? "text-cs-on-ink/35 line-through decoration-cs-on-ink/30"
                              : lane.featured
                                ? "text-cs-on-ink"
                                : "text-cs-on-ink/75"
                          }`}>
                          {milestone}
                        </li>
                      ))}
                    </ol>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-col items-start gap-3 border-t border-cs-on-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[520px] text-[15px] text-cs-on-ink/80">
              Only one road is built to end at an <span className="font-semibold text-primary">offer letter</span>.
            </p>
            <button
              type="button"
              onClick={() => openLeadModal("home-comparison")}
              className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-cs-accent-press ${focusRing}`}>
              Book a free career call
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
