"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { useSectionMotion } from "./use-section-motion";

const HEADLINE_PHRASE = "not the same as building";
const PIVOT_PHRASE = "ship something every week";
const TEAM_PHOTO = "/images/sections/team-coding.webp";
const NOTES_PHOTO = "/images/sections/notes-writing.webp";
const TEAM_ALT = "A team coding together at a wooden table";
const NOTES_ALT = "A hand writing notes beside a coffee cup";

function splitPhrase(text: string, phrase: string): [string, string, string] {
  const at = text.indexOf(phrase);
  if (at < 0) return [text, "", ""];
  return [text.slice(0, at), phrase, text.slice(at + phrase.length)];
}

function halves(phrase: string) {
  const words = phrase.split(" ").filter(Boolean);
  if (words.length < 2) return words;
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export function ProblemSection() {
  const { problem } = home;
  const sectionRef = useRef<HTMLElement>(null);

  const [headBefore, headPhrase, headAfter] = splitPhrase(problem.headline, HEADLINE_PHRASE);
  const headWords = headBefore.trim().split(" ").filter(Boolean);
  const headChunks = halves(headPhrase);
  const [pivotBefore, pivotPhrase, pivotAfter] = splitPhrase(problem.pivot, PIVOT_PHRASE);

  useSectionMotion(sectionRef, ({ gsap, root }) => {
    const words = gsap.utils.toArray<HTMLElement>("[data-problem-word]");
    if (words.length) {
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          duration: 1,
          stagger: 0.6,
          scrollTrigger: {
            trigger: "[data-problem-headline]",
            start: "top 82%",
            end: "bottom 45%",
            scrub: 0.5,
          },
        },
      );
    }

    gsap.fromTo(
      "[data-problem-underline]",
      { strokeDasharray: "1 2", strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 0.8,
        stagger: 0.4,
        ease: "power2.inOut",
        scrollTrigger: { trigger: "[data-problem-headline]", start: "top 70%", once: true },
      },
    );

    gsap.utils.toArray<HTMLElement>("[data-problem-tilt]").forEach((el, i) => {
      const rest = Number(el.dataset.problemRest) || 0;
      const from = rest + (Number(el.dataset.problemTilt) || 0);
      gsap.fromTo(
        el,
        { opacity: 0, y: 70, rotation: from },
        {
          opacity: 1,
          y: 0,
          rotation: rest,
          duration: 1.1,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top 88%", once: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-problem-drift]").forEach((el) => {
      const range = Number(el.dataset.problemDrift) || 0;
      gsap.fromTo(
        el,
        { y: range },
        {
          y: -range,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-problem-fade]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-ledger-row]").forEach((row) => {
      const strike = row.querySelector("[data-ledger-strike]");
      const them = row.querySelector("[data-ledger-them]");
      const us = row.querySelector("[data-ledger-us]");
      const arrow = row.querySelector("[data-ledger-arrow]");
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: row, start: "top 84%", once: true },
      });
      if (them) tl.fromTo(them, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
      if (strike) tl.fromTo(strike, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 0.2);
      if (us) tl.fromTo(us, { opacity: 0, x: 14 }, { opacity: 1, x: 0, duration: 0.6 }, 0.55);
      if (arrow) tl.fromTo(arrow, { x: -8 }, { x: 0, duration: 0.6 }, 0.55);
    });
  });

  return (
    <section ref={sectionRef} className="bg-cs-paper pb-8 pt-20 text-cs-on-paper sm:pb-10 sm:pt-28 lg:pb-12 lg:pt-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <h2
            data-problem-headline
            className="font-heading text-[40px] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[56px] lg:col-span-7 lg:text-[64px] xl:text-[72px]">
            {headWords.map((word, i) => (
              <span key={`${word}-${i}`}>
                <span data-problem-word>{word}</span>{" "}
              </span>
            ))}
            {headChunks.map((chunk, i) => (
              <span key={chunk}>
                <span className="whitespace-nowrap">
                  <span className="relative inline-block text-primary">
                    {chunk}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 12"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-x-0 top-[1em] h-[0.16em] w-full overflow-visible">
                      <path
                        data-problem-underline
                        d={i % 2 === 0 ? "M3 8 C 52 2, 96 11, 150 6 S 252 3, 297 7" : "M3 6 C 60 11, 110 2, 160 7 S 250 10, 297 4"}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        pathLength={1}
                      />
                    </svg>
                  </span>
                  {i === headChunks.length - 1 ? headAfter : null}
                </span>{" "}
              </span>
            ))}
          </h2>

          <div className="lg:col-span-5">
            <div data-problem-tilt="4" className="lg:hidden">
              <div className="relative aspect-3/2 overflow-hidden rounded-[20px] bg-cs-paper-2">
                <Image src={TEAM_PHOTO} alt={TEAM_ALT} fill sizes="100vw" className="object-cover" />
              </div>
            </div>

            <div className="relative hidden aspect-square lg:block">
              <div data-problem-drift="46" className="absolute right-3 top-0 w-[60%] will-change-transform">
                <div data-problem-tilt="-7" data-problem-rest="-3" className="-rotate-3">
                  <div className="relative aspect-4/3 overflow-hidden rounded-[20px] bg-cs-paper-2">
                    <Image src={NOTES_PHOTO} alt={NOTES_ALT} fill sizes="26vw" className="object-cover" />
                  </div>
                </div>
              </div>
              <div data-problem-drift="-34" className="absolute bottom-[4%] left-0 w-[82%] will-change-transform">
                <div data-problem-tilt="7" data-problem-rest="2" className="rotate-2">
                  <div className="relative aspect-4/3 overflow-hidden rounded-[20px] bg-cs-paper-2">
                    <Image src={TEAM_PHOTO} alt={TEAM_ALT} fill sizes="34vw" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <p
            data-problem-fade
            className="max-w-[520px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px] lg:col-span-4">
            {problem.body}
          </p>

          <div className="lg:col-span-8 lg:pl-6">
            <div
              aria-hidden="true"
              className="hidden pb-3 text-[14px] text-cs-on-paper/60 sm:grid sm:grid-cols-2 sm:gap-8">
              <span>Most courses</span>
              <span>Coding Sharks</span>
            </div>
            <ul className="border-b border-cs-on-paper/12">
              {problem.contrasts.map((row) => {
                const [lead, ...rest] = row.us.split(" ");
                return (
                  <li
                    key={row.them}
                    data-ledger-row
                    className="grid gap-2 border-t border-cs-on-paper/12 py-5 sm:grid-cols-2 sm:items-center sm:gap-8 sm:py-6">
                    <p data-ledger-them className="text-[17px] leading-snug text-cs-on-paper/60 sm:text-[20px]">
                      <span className="sr-only">Most courses: </span>
                      <s className="relative inline-block no-underline">
                        {row.them}
                        <span
                          aria-hidden="true"
                          data-ledger-strike
                          className="absolute inset-x-0 top-[54%] h-[1.5px] origin-left bg-cs-on-paper/70"
                        />
                      </s>
                    </p>
                    <p
                      data-ledger-us
                      className="flex items-start gap-2.5 font-heading text-[19px] font-medium leading-snug tracking-[-0.01em] sm:text-[22px]">
                      <ArrowRight
                        aria-hidden="true"
                        data-ledger-arrow
                        className="mt-[0.15em] size-5 flex-none text-primary"
                      />
                      <span>
                        <span className="sr-only">Coding Sharks: </span>
                        <span className="text-primary">{lead}</span>
                        {rest.length ? ` ${rest.join(" ")}` : null}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p
          data-problem-fade
          className="mt-14 max-w-[960px] font-heading text-[26px] font-medium leading-[1.12] tracking-[-0.025em] text-balance sm:mt-20 sm:text-[34px] lg:text-[44px]">
          {pivotBefore}
          {pivotPhrase ? <span className="text-primary">{pivotPhrase}</span> : null}
          {pivotAfter}
        </p>
      </Container>
    </section>
  );
}
