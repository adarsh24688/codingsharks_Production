"use client";

import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { useSectionMotion } from "./use-section-motion";

type Tone = "ink" | "accent" | "paper";

const TONES: Record<Tone, { cell: string; label: string; suffix: string }> = {
  ink: { cell: "bg-cs-ink text-cs-on-ink", label: "text-cs-on-ink/72", suffix: "text-primary" },
  accent: { cell: "bg-primary text-white", label: "text-white/88", suffix: "" },
  paper: {
    cell: "border border-cs-on-paper/14 bg-cs-paper text-cs-on-paper",
    label: "text-cs-on-paper/68",
    suffix: "text-primary",
  },
};

type Fact = { value: number; suffix: string; label: string; tone: Tone; place: string };

const FACTS: Record<"placement" | "careers" | "developers" | "partners", Fact> = {
  placement: {
    value: 91,
    suffix: "%+",
    label: "placement rate",
    tone: "ink",
    place: "lg:col-span-3 lg:col-start-7 lg:row-start-1",
  },
  careers: {
    value: 2000,
    suffix: "+",
    label: "careers transformed",
    tone: "paper",
    place: "lg:col-span-3 lg:col-start-7 lg:row-start-2",
  },
  developers: {
    value: 15000,
    suffix: "+",
    label: "developers trained",
    tone: "paper",
    place: "lg:col-span-4 lg:col-start-1 lg:row-start-3",
  },
  partners: {
    value: 50,
    suffix: "+",
    label: "hiring partners",
    tone: "accent",
    place: "lg:col-span-3 lg:col-start-5 lg:row-start-3",
  },
};

const TOP_OFFER = { prefix: "₹", value: 21, suffix: " LPA", label: "top offer" };

const NOTES = [
  {
    title: "How you learn at Coding Sharks",
    points: [
      "Real full stack products from day one",
      "Weekly code reviews by a senior engineer",
      "Live code reviews and architecture walkthroughs",
      "Mock interviews with DSA and system design sprints",
    ],
  },
  {
    title: "What hiring teams look for",
    points: [
      "Engineers who build and deploy end to end on their own",
      "Working full stack skill over textbook theory",
      "System design and scalable architecture thinking",
      "AI and automation used in everyday work",
    ],
  },
];

const format = (value: number) => Math.round(value).toLocaleString("en-US");

function FactCell({ fact }: { fact: Fact }) {
  const tone = TONES[fact.tone];
  return (
    <div
      data-why-cell
      className={`col-span-1 flex min-h-[150px] flex-col justify-between rounded-[20px] p-4 sm:min-h-[190px] sm:p-7 lg:min-h-0 ${fact.place} ${tone.cell}`}>
      <p className="font-mono text-[32px] font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[52px] lg:text-[60px]">
        <span aria-hidden="true">
          <span data-count={fact.value}>{format(fact.value)}</span>
          <span className={tone.suffix}>{fact.suffix}</span>
        </span>
        <span className="sr-only">
          {format(fact.value)}
          {fact.suffix}
        </span>
      </p>
      <p className={`text-[14px] leading-snug sm:text-[15px] ${tone.label}`}>{fact.label}</p>
    </div>
  );
}

export function WhyCodingSharksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionMotion(sectionRef, ({ gsap, ScrollTrigger, root }) => {
    gsap.from("[data-why-head]", {
      opacity: 0,
      y: 28,
      duration: 0.8,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-why-head]", start: "top 86%", once: true },
    });

    gsap.set("[data-why-cell]", { opacity: 0, y: 32 });
    ScrollTrigger.batch("[data-why-cell]", {
      start: "top 88%",
      once: true,
      onEnter: (cells) =>
        gsap.to(cells, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }),
    });

    gsap.fromTo(
      "[data-why-wipe]",
      { clipPath: "inset(0% 100% 0% 0% round 20px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 20px)",
        duration: 1.3,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-why-wipe]", start: "top 82%", once: true },
      },
    );

    gsap.fromTo(
      "[data-why-parallax]",
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: "[data-why-wipe]", start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    gsap.fromTo(
      "[data-why-zoom]",
      { scale: 1.25 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-why-zoom]", start: "top bottom", end: "center 45%", scrub: 0.6 },
      },
    );

    gsap.fromTo(
      "[data-why-tilt]",
      { rotation: -4, y: 56 },
      {
        rotation: 0,
        y: 0,
        ease: "none",
        scrollTrigger: { trigger: "[data-why-tilt-slot]", start: "top bottom", end: "top 50%", scrub: 0.6 },
      },
    );

    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count) || 0;
      const proxy = { value: 0 };
      el.textContent = format(0);
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(proxy, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = format(proxy.value);
            },
            onComplete: () => {
              el.textContent = format(target);
            },
          });
        },
      });
    });

    return () => {
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = format(Number(el.dataset.count) || 0);
      });
    };
  });

  return (
    <section ref={sectionRef} className="overflow-x-clip bg-cs-paper-2 pb-16 pt-12 text-cs-on-paper sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-16">
      <Container>
        <div className="max-w-[720px] lg:ml-auto lg:text-right">
          <h2
            data-why-head
            className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
            Why <span className="text-primary">Coding Sharks</span>
          </h2>
          <p data-why-head className="mt-5 text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px]">
            The results our students get, and the way of learning that produces them.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[repeat(3,minmax(220px,auto))]">
          <div
            data-why-wipe
            className="relative col-span-2 aspect-4/3 overflow-hidden rounded-[20px] bg-cs-ink lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-auto">
            <div data-why-parallax className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
              <Image
                src="/images/sections/pair-debugging.webp"
                alt="Three people leaning into one laptop to work through a problem, a bookshelf behind them"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <FactCell fact={FACTS.placement} />
          <FactCell fact={FACTS.careers} />

          <div className="relative col-span-1 row-span-2 min-h-[312px] overflow-hidden rounded-[20px] bg-cs-ink lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:min-h-0">
            <div data-why-zoom className="absolute inset-0 will-change-transform">
              <Image
                src="/images/sections/coder-focus.webp"
                alt="A developer concentrating on code at an office desk"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <FactCell fact={FACTS.developers} />
          <FactCell fact={FACTS.partners} />

          <div
            data-why-cell
            className={`col-span-2 flex min-h-[190px] flex-col justify-between rounded-[20px] p-6 sm:p-8 lg:col-span-5 lg:col-start-8 lg:row-start-3 lg:min-h-0 ${TONES.paper.cell}`}>
            <p className="font-mono text-[56px] font-medium leading-none tracking-[-0.05em] tabular-nums sm:text-[84px] lg:text-[96px]">
              <span aria-hidden="true">
                <span className="font-heading text-primary">{TOP_OFFER.prefix}</span>
                <span data-count={TOP_OFFER.value}>{format(TOP_OFFER.value)}</span>
                <span className="ml-[0.22em] text-primary">{TOP_OFFER.suffix.trim()}</span>
              </span>
              <span className="sr-only">
                {TOP_OFFER.prefix}
                {format(TOP_OFFER.value)}
                {TOP_OFFER.suffix}
              </span>
            </p>
            <p className={`text-[15px] leading-snug sm:text-[17px] ${TONES.paper.label}`}>{TOP_OFFER.label}</p>
          </div>

          <div data-why-tilt-slot className="col-span-2 lg:col-span-5 lg:col-start-1 lg:row-start-4">
            <div
              data-why-tilt
              className="relative aspect-16/10 w-full overflow-hidden rounded-[20px] bg-cs-ink will-change-transform lg:aspect-auto lg:h-full lg:min-h-[320px]">
              <Image
                src="/images/sections/whiteboard.webp"
                alt="A woman at a whiteboard covered in sticky notes while her team watches"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div
            data-why-cell
            className={`col-span-2 grid gap-8 rounded-[20px] p-6 sm:grid-cols-2 sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-start-4 lg:content-center ${TONES.paper.cell}`}>
            {NOTES.map((note) => (
              <div key={note.title}>
                <h3 className="font-heading text-[19px] font-medium leading-snug tracking-[-0.015em] sm:text-[21px]">
                  {note.title}
                </h3>
                <ul className="mt-4">
                  {note.points.map((point) => (
                    <li
                      key={point}
                      className="border-t border-cs-on-paper/12 py-3 text-[14px] leading-relaxed text-cs-on-paper/76 sm:text-[15px]">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
