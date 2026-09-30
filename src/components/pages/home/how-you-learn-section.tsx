"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { useSectionMotion } from "./use-section-motion";

const HEADLINE_PHRASE = "One week";
const STEP_SVH = 70;
const TICKS = 56;

const PHOTOS = [
  { src: "/images/office/office9.jpg", alt: "A Coding Sharks team member explaining a point during a session" },
  { src: "/images/sections/typing-hands.webp", alt: "Close-up of hands typing on a laptop" },
  { src: "/images/sections/reviewer-keyboard.webp", alt: "Hands on a keyboard in front of monitors, seen from above" },
  { src: "/images/sections/meeting-gesture.webp", alt: "Hands gesturing during a meeting with a laptop on the table" },
];

function splitPhrase(text: string, phrase: string): [string, string, string] {
  const at = text.indexOf(phrase);
  if (at < 0) return [text, "", ""];
  return [text.slice(0, at), phrase, text.slice(at + phrase.length)];
}

export function HowYouLearnSection() {
  const { howYouLearn } = home;
  const beats = howYouLearn.beats;
  const count = beats.length;
  const slice = 360 / count;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [before, phrase, after] = splitPhrase(howYouLearn.headline, HEADLINE_PHRASE);
  const stageHeight = `${100 + (count - 1) * STEP_SVH}svh`;

  useSectionMotion(sectionRef, ({ gsap, root }) => {
    root.dataset.pinned = "true";

    gsap.fromTo(
      "[data-learn-highlight]",
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        delay: 0.25,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      },
    );

    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 1024px)", () => {
      const wheel = root.querySelector("[data-learn-wheel]");
      const uprights = gsap.utils.toArray<HTMLElement>("[data-learn-upright]");
      const texts = gsap.utils.toArray<HTMLElement>("[data-learn-text]");
      const arc = root.querySelector("[data-learn-arc]");
      if (!wheel) return;

      gsap.fromTo(
        wheel,
        { rotation: 60, opacity: 0, scale: 0.85 },
        {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        },
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          onUpdate: (self) => setActive(Math.min(count - 1, Math.round(self.progress * (count - 1)))),
        },
      });

      for (let k = 0; k < count - 1; k++) {
        const at = k + 0.15;
        const turn = -(k + 1) * slice;
        tl.to("[data-learn-spin]", { rotation: turn, duration: 0.7, ease: "power2.inOut" }, at)
          .to(uprights, { rotation: -turn, duration: 0.7, ease: "power2.inOut" }, at)
          .to(texts[k], { yPercent: -30, opacity: 0, duration: 0.3, ease: "power2.in" }, at)
          .fromTo(
            texts[k + 1],
            { yPercent: 30, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
            at + 0.35,
          );
        if (arc) tl.to(arc, { attr: { "stroke-dashoffset": 1 - (k + 1) / (count - 1) }, duration: 0.7, ease: "power2.inOut" }, at);
      }
      tl.set({}, {}, count - 1);
    });

    mm.add("(max-width: 1023.98px)", () => {
      gsap.fromTo(
        "[data-learn-rail]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-learn-agenda]", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-learn-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          },
        );
      });
    });

    return () => {
      delete root.dataset.pinned;
    };
  });

  const heading = (
    <h2 className="font-heading text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[44px] lg:text-[52px] xl:text-[56px]">
      {before}
      {phrase ? (
        <span
          data-learn-highlight
          className="inline-block -rotate-1 rounded-[0.12em] bg-primary px-[0.18em] text-white">
          {phrase}
        </span>
      ) : null}
      {after}
    </h2>
  );

  return (
    <section
      ref={sectionRef}
      style={{ "--stage": stageHeight } as CSSProperties}
      className="group/learn relative bg-cs-paper-2 text-cs-on-paper lg:data-pinned:h-(--stage)">
      <div className="relative py-16 sm:py-20 lg:py-24 lg:group-data-pinned/learn:sticky lg:group-data-pinned/learn:top-0 lg:group-data-pinned/learn:h-svh lg:group-data-pinned/learn:overflow-hidden lg:group-data-pinned/learn:py-0">
        <div className="hidden lg:group-data-pinned/learn:block">
          <div className="absolute inset-y-0 left-0 w-[52%]">
            <div
              data-learn-wheel
              className="absolute right-[6%] top-1/2 aspect-square h-[min(74svh,700px)] -translate-y-1/2 will-change-transform">
              <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 size-full">
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-cs-on-paper/16"
                />
                <circle
                  data-learn-arc
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  className="text-primary"
                />
                {Array.from({ length: TICKS }, (_, i) => {
                  const long = i % (TICKS / count) === 0;
                  return (
                    <line
                      key={i}
                      x1="100"
                      y1={long ? 4 : 8}
                      x2="100"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth={long ? 0.9 : 0.4}
                      transform={`rotate(${(360 / TICKS) * i} 100 100)`}
                      className={long ? "text-primary" : "text-cs-on-paper/30"}
                    />
                  );
                })}
              </svg>

              <div data-learn-spin className="absolute inset-0 will-change-transform">
                <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 size-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="58"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.4"
                    strokeDasharray="1.5 2.5"
                    className="text-cs-on-paper/30"
                  />
                </svg>
                {beats.map((beat, i) => {
                  const photo = PHOTOS[i % PHOTOS.length];
                  const on = i === active;
                  return (
                    <div key={beat.title} style={{ transform: `rotate(${i * slice}deg)` }} className="absolute inset-0">
                      <div
                        style={{ transform: `rotate(${-i * slice}deg)` }}
                        className="absolute left-[89%] top-1/2 -ml-[70px] -mt-[70px] size-[140px] xl:-ml-[80px] xl:-mt-[80px] xl:size-[160px]">
                        <div data-learn-upright className="size-full will-change-transform">
                          <div
                            className={`relative size-full overflow-hidden rounded-full border-[6px] bg-cs-paper transition-[transform,border-color] duration-500 ${
                              on ? "scale-110 border-primary" : "scale-[0.82] border-cs-paper"
                            }`}>
                            <Image src={photo.src} alt="" fill sizes="160px" className="object-cover" />
                            <span
                              className={`absolute inset-0 bg-cs-ink/45 transition-opacity duration-500 ${on ? "opacity-0" : "opacity-100"}`}
                            />
                          </div>
                          <span
                            className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold transition-colors duration-500 ${
                              on ? "bg-primary text-white" : "bg-cs-paper text-cs-on-paper/70"
                            }`}>
                            {beat.day}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute left-1/2 top-1/2 grid size-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cs-ink text-center text-cs-on-ink">
                <div>
                  <svg aria-hidden viewBox="0 0 24 24" className="mx-auto size-7 text-primary">
                    <path
                      d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 font-heading text-[26px] font-semibold leading-none tracking-[-0.03em] xl:text-[30px]">
                    Every week
                  </p>
                  <p className="mt-2 text-[12px] text-cs-on-ink/64">until you are hired</p>
                </div>
              </div>

              <span
                aria-hidden
                className="absolute right-[-10%] top-1/2 size-0 -translate-y-1/2 border-y-[12px] border-r-[18px] border-y-transparent border-r-primary"
              />
            </div>
          </div>
        </div>

        <Container className="relative lg:group-data-pinned/learn:grid lg:group-data-pinned/learn:h-full lg:group-data-pinned/learn:grid-cols-[52%_1fr] lg:group-data-pinned/learn:items-center">
          <div className="hidden lg:group-data-pinned/learn:block" />
          <div className="lg:group-data-pinned/learn:pl-6 xl:group-data-pinned/learn:pl-10">
            {heading}
            <p className="mt-4 max-w-[460px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px]">
              {howYouLearn.subline}
            </p>

            <div className="relative mt-10 hidden h-[240px] lg:group-data-pinned/learn:block">
              {beats.map((beat, i) => (
                <div
                  key={beat.title}
                  data-learn-text
                  aria-hidden={i !== active}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  className="absolute inset-x-0 top-0 will-change-transform">
                  <p className="font-heading text-[40px] font-medium leading-none tracking-[-0.035em] text-primary xl:text-[48px]">
                    {beat.day}
                  </p>
                  <h3 className="mt-4 font-heading text-[26px] font-medium leading-[1.15] tracking-[-0.02em] xl:text-[30px]">
                    {beat.title}
                  </h3>
                  <p className="mt-3 max-w-[460px] text-[16px] leading-relaxed text-cs-on-paper/72">{beat.body}</p>
                </div>
              ))}
            </div>

            <ol data-learn-agenda className="relative mt-10 space-y-6 pl-8 lg:group-data-pinned/learn:hidden">
              <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-0.5 rounded-full bg-cs-on-paper/12">
                <span data-learn-rail className="absolute inset-0 origin-top rounded-full bg-primary" />
              </span>
              {beats.map((beat, i) => {
                const photo = PHOTOS[i % PHOTOS.length];
                return (
                  <li key={beat.title} data-learn-item className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-8 top-5 size-4 rounded-full border-[3px] border-cs-paper-2 bg-primary"
                    />
                    <div className="overflow-hidden rounded-[18px] border border-cs-on-paper/12 bg-cs-paper">
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-cs-paper-2">
                          <Image src={photo.src} alt={photo.alt} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[12px] text-primary">{beat.day}</p>
                          <h3 className="mt-1 font-heading text-[19px] font-medium leading-tight tracking-[-0.02em]">
                            {beat.title}
                          </h3>
                        </div>
                      </div>
                      <p className="border-t border-cs-on-paper/10 px-4 py-3 text-[14.5px] leading-relaxed text-cs-on-paper/72">
                        {beat.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
