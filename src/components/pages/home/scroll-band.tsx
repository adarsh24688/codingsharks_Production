"use client";

import { useRef } from "react";

import { useSectionMotion } from "./use-section-motion";

type ScrollBandProps = {
  words: string[];
  direction?: 1 | -1;
  tone?: "paper" | "paper-2" | "ink";
};

const GROUNDS = {
  paper: "bg-cs-paper text-cs-on-paper",
  "paper-2": "bg-cs-paper-2 text-cs-on-paper",
  ink: "bg-cs-ink text-cs-on-ink",
};

const STROKES = {
  paper: "[-webkit-text-stroke:1.5px_var(--cs-on-paper)]",
  "paper-2": "[-webkit-text-stroke:1.5px_var(--cs-on-paper)]",
  ink: "[-webkit-text-stroke:1.5px_var(--cs-on-ink)]",
};

export function ScrollBand({ words, direction = 1, tone = "paper" }: ScrollBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const sentence = words.join(" ");
  const loop = [...words, ...words, ...words];

  useSectionMotion(ref, ({ gsap, root }) => {
    const track = root.querySelector("[data-band-track]");
    if (!track) return;
    gsap.fromTo(
      track,
      { xPercent: direction === 1 ? 0 : -33.333 },
      {
        xPercent: direction === 1 ? -33.333 : 0,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 },
      },
    );
  });

  return (
    <div ref={ref} className={`overflow-hidden pb-10 pt-2 sm:pb-14 sm:pt-4 ${GROUNDS[tone]}`}>
      <p className="sr-only">{sentence}</p>
      <div
        data-band-track
        aria-hidden="true"
        className="flex w-max items-baseline gap-[0.35em] whitespace-nowrap font-heading text-[18vw] font-medium leading-none tracking-[-0.04em] will-change-transform sm:text-[13vw] lg:text-[11vw]">
        {loop.map((word, i) => {
          const style = i % 3;
          return (
            <span
              key={`${word}-${i}`}
              className={style === 1 ? `text-transparent ${STROKES[tone]}` : style === 2 ? "text-primary" : ""}>
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
}
