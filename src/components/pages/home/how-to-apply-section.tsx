"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import { useSectionMotion } from "./use-section-motion";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const HIGHLIGHT = "Day 1";

const STAMPS = [
  {
    left: "6%",
    top: "30%",
    rotate: -9,
    round: true,
    size: "size-[34%]",
    tone: "primary",
  },
  {
    left: "22%",
    top: "62%",
    rotate: 7,
    round: false,
    size: "w-[36%] h-[26%]",
    tone: "ink",
  },
  {
    left: "55%",
    top: "10%",
    rotate: -5,
    round: false,
    size: "w-[36%] h-[26%]",
    tone: "ink",
  },
  {
    left: "63%",
    top: "34%",
    rotate: 11,
    round: true,
    size: "size-[30%]",
    tone: "primary",
  },
  {
    left: "52%",
    top: "62%",
    rotate: -7,
    round: false,
    size: "w-[42%] h-[30%]",
    tone: "day",
  },
] as const;

function splitHeadline(text: string) {
  const at = text.lastIndexOf(HIGHLIGHT);
  if (at < 0) return { before: text, mark: "", after: "" };
  return {
    before: text.slice(0, at),
    mark: HIGHLIGHT,
    after: text.slice(at + HIGHLIGHT.length),
  };
}

function Passport({ titles }: { titles: string[] }) {
  return (
    <div
      data-passport
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-cs-paper ring-1 ring-inset ring-cs-on-paper/12">
      <span
        aria-hidden
        className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_30%_40%,transparent_0_14px,color-mix(in_srgb,var(--brand-color)_7%,transparent)_14px_15px)]"
      />
      <span
        aria-hidden
        className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-linear-to-r from-transparent via-cs-on-paper/10 to-transparent"
      />
      <div className="absolute left-[6%] right-[54%] top-[7%] flex items-baseline justify-between text-cs-on-paper/60">
        <span className="font-heading text-[13px] font-semibold text-cs-on-paper sm:text-[15px]">
          Coding Sharks
        </span>
        <span className="text-[11px] sm:text-[12px]">Admission</span>
      </div>
      <div className="absolute left-[6%] right-[54%] top-[17%] border-b border-dashed border-cs-on-paper/30 pb-1 text-[11px] text-cs-on-paper/60 sm:text-[12px]">
        Holder: <span className="font-semibold text-cs-on-paper">you</span>
      </div>

      {titles.map((title, i) => {
        const stamp = STAMPS[i % STAMPS.length];
        const shape = stamp.round ? "rounded-full" : "rounded-[14px]";
        const color =
          stamp.tone === "ink"
            ? "border-cs-ink text-cs-ink"
            : stamp.tone === "day"
              ? "border-primary bg-primary text-white"
              : "border-primary text-primary";
        return (
          <div
            key={title}
            data-stamp
            aria-hidden
            style={{
              left: stamp.left,
              top: stamp.top,
              rotate: `${stamp.rotate}deg`,
              opacity: 0.92,
            }}
            className={`absolute grid place-items-center border-[3px] p-1.5 text-center mix-blend-multiply will-change-transform ${shape} ${stamp.size} ${color}`}>
            <span
              className={`grid h-full w-full place-items-center border border-current px-2 opacity-90 ${stamp.round ? "rounded-full" : "rounded-[9px]"}`}>
              <span>
                <span className="block text-[8px] font-semibold uppercase tracking-[0.08em] opacity-80 sm:text-[10px]">
                  Coding Sharks
                </span>
                <span
                  className={`mt-0.5 block font-heading font-bold uppercase leading-[1.05] tracking-[-0.01em] ${
                    stamp.tone === "day"
                      ? "text-[22px] sm:text-[34px]"
                      : "text-[10px] sm:text-[14px]"
                  }`}>
                  {title}
                </span>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function HowToApplySection() {
  const { howToApply } = home;
  const steps = howToApply.steps;
  const title = splitHeadline(howToApply.headline);
  const sectionRef = useRef<HTMLElement>(null);

  useSectionMotion(sectionRef, ({ gsap, ScrollTrigger, root }) => {
    gsap.fromTo(
      "[data-apply-mark]",
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.9,
        delay: 0.25,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      },
    );

    const stamps = gsap.utils.toArray<HTMLElement>("[data-stamp]");
    const passport = root.querySelector<HTMLElement>("[data-passport]");
    gsap.set(stamps, { opacity: 0 });

    gsap.utils.toArray<HTMLElement>("[data-apply-step]").forEach((step, i) => {
      const stamp = stamps[i];
      const check = step.querySelector("[data-apply-check]");
      const mini = step.querySelector("[data-apply-mini]");
      if (check) gsap.set(check, { scale: 0 });
      if (mini) gsap.set(mini, { opacity: 0, scale: 1.5 });
      ScrollTrigger.create({
        trigger: step,
        start: "top 62%",
        onEnter: () => {
          if (check)
            gsap.to(check, { scale: 1, duration: 0.4, ease: "back.out(2.5)" });
          if (mini)
            gsap.to(mini, {
              opacity: 0.9,
              scale: 1,
              duration: 0.3,
              ease: "power4.in",
            });
          if (!stamp) return;
          gsap
            .timeline()
            .fromTo(
              stamp,
              { opacity: 0, scale: 2.4 },
              { opacity: 0.92, scale: 1, duration: 0.32, ease: "power4.in" },
            )
            .to(passport, {
              x: 4,
              duration: 0.05,
              yoyo: true,
              repeat: 3,
              ease: "power1.inOut",
            })
            .set(passport, { x: 0 });
        },
        onLeaveBack: () => {
          if (check) gsap.to(check, { scale: 0, duration: 0.25 });
          if (mini) gsap.to(mini, { opacity: 0, scale: 1.4, duration: 0.25 });
          if (stamp)
            gsap.to(stamp, {
              opacity: 0,
              scale: 1.4,
              duration: 0.25,
              ease: "power2.in",
            });
        },
      });
      gsap.fromTo(
        step,
        { opacity: 0.35 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 55%",
            scrub: 0.5,
          },
        },
      );
    });
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-cs-paper-2 py-16 text-cs-on-paper sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-heading text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[44px] lg:text-[52px]">
              {title.before}
              {title.mark ? (
                <span
                  data-apply-mark
                  className="inline-block -rotate-1 rounded-[0.12em] bg-primary px-[0.18em] text-white will-change-[clip-path]">
                  {title.mark}
                </span>
              ) : null}
              {title.after}
            </h2>
            <div className="mt-8 hidden lg:block">
              <Passport titles={steps.map((step) => step.title)} />
            </div>
          </div>

          <div>
            <ol>
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  data-apply-step
                  className="flex gap-4 border-b border-dashed border-cs-on-paper/20 py-8 first:pt-0 lg:min-h-[34svh] lg:items-center lg:py-10">
                  <span className="relative mt-1 grid size-8 shrink-0 place-items-center rounded-full border-2 border-dashed border-cs-on-paper/30 lg:mt-0">
                    <span
                      data-apply-check
                      className="absolute inset-[-2px] grid place-items-center rounded-full bg-primary text-white">
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-[24px] font-medium leading-tight tracking-[-0.02em] sm:text-[30px]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[16px]">
                      {step.description}
                    </p>
                  </div>
                  <span
                    data-apply-mini
                    aria-hidden
                    style={{ rotate: `${STAMPS[i % STAMPS.length].rotate}deg` }}
                    className={`grid size-16 shrink-0 place-items-center self-start rounded-full border-[3px] text-center font-heading text-[9px] font-bold uppercase leading-tight mix-blend-multiply lg:hidden ${
                      STAMPS[i % STAMPS.length].tone === "ink"
                        ? "border-cs-ink text-cs-ink"
                        : "border-primary text-primary"
                    }`}>
                    Coding
                    <br />
                    Sharks
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => openLeadModal("home-apply")}
                className={`group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-cs-accent-press sm:w-auto ${focusRing}`}>
                Book a free career call
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
