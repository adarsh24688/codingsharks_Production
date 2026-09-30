"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import { useSectionMotion } from "./use-section-motion";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const PHOTO = "/images/office/office6.jpg";
const INSET_PHOTO = "/images/sections/seminar.webp";
const HEADLINE_PHRASE = "parents";

function splitPhrase(text: string, phrase: string): [string, string, string] {
  const at = text.indexOf(phrase);
  if (at < 0) return [text, "", ""];
  return [text.slice(0, at), phrase, text.slice(at + phrase.length)];
}

export function ParentsSection() {
  const { parents } = home;
  const sectionRef = useRef<HTMLElement>(null);
  const [before, phrase, after] = splitPhrase(parents.headline, HEADLINE_PHRASE);

  useSectionMotion(sectionRef, ({ gsap, finePointer }) => {
    const intro = gsap.utils.toArray<HTMLElement>("[data-parents-intro]");
    gsap.fromTo(
      intro,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: intro[0], start: "top 86%", once: true },
      },
    );

    gsap.fromTo(
      "[data-parents-frame]",
      { clipPath: "inset(0% 0% 100% 0% round 20px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 20px)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-parents-media]", start: "top 82%", once: true },
      },
    );

    gsap.set("[data-parents-photo]", { scale: 1.12 });
    gsap.fromTo(
      "[data-parents-photo]",
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: "[data-parents-media]", start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    gsap.fromTo(
      "[data-parents-inset]",
      { y: 56 },
      {
        y: -56,
        ease: "none",
        scrollTrigger: { trigger: "[data-parents-media]", start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    gsap.fromTo(
      "[data-parents-inset-frame]",
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-parents-media]", start: "top 82%", once: true },
      },
    );

    const rows = gsap.utils.toArray<HTMLElement>("[data-parents-row]");
    rows.forEach((row) => {
      const line = row.querySelector("[data-parents-line]");
      const body = row.querySelector("[data-parents-body]");
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: row, start: "top 88%", once: true },
      });
      if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0);
      if (body) tl.fromTo(body, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15);
    });

    gsap.fromTo(
      "[data-parents-cta]",
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-parents-cta]", start: "top 92%", once: true },
      },
    );

    if (!finePointer) return;

    const unbind = rows.map((row) => {
      const arrow = row.querySelector("[data-parents-arrow]");
      const question = row.querySelector("[data-parents-question]");
      if (!arrow || !question) return () => {};
      gsap.set(arrow, { opacity: 0, x: -14 });
      const enter = () => {
        gsap.to(arrow, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", overwrite: true });
        gsap.to(question, { x: 6, duration: 0.35, ease: "power3.out", overwrite: true });
      };
      const leave = () => {
        gsap.to(arrow, { opacity: 0, x: -14, duration: 0.3, ease: "power2.out", overwrite: true });
        gsap.to(question, { x: 0, duration: 0.3, ease: "power2.out", overwrite: true });
      };
      row.addEventListener("pointerenter", enter);
      row.addEventListener("pointerleave", leave);
      return () => {
        row.removeEventListener("pointerenter", enter);
        row.removeEventListener("pointerleave", leave);
      };
    });

    return () => unbind.forEach((off) => off());
  });

  return (
    <section ref={sectionRef} className="bg-cs-paper py-16 text-cs-on-paper sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              data-parents-intro
              className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
              {before}
              {phrase ? <span className="text-primary">{phrase}</span> : null}
              {after}
            </h2>
            <p
              data-parents-intro
              className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px]">
              {parents.subline}
            </p>
            <div data-parents-media className="relative mt-10 lg:mb-14 lg:mr-8">
              <div
                data-parents-frame
                className="relative aspect-4/3 overflow-hidden rounded-[20px] bg-cs-paper-2">
                <div data-parents-photo className="absolute inset-0 will-change-transform">
                  <Image
                    src={PHOTO}
                    alt="Students and mentors together at the Coding Sharks campus in Indore"
                    fill
                    sizes="(min-width: 1280px) 470px, (min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                data-parents-inset
                className="absolute -bottom-14 -right-8 hidden w-[46%] will-change-transform lg:block">
                <div
                  data-parents-inset-frame
                  className="relative aspect-4/3 overflow-hidden rounded-[20px] border-[6px] border-cs-paper bg-cs-paper-2">
                  <Image
                    src={INSET_PHOTO}
                    alt="A seminar room with a speaker addressing the audience"
                    fill
                    sizes="18vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div>
              {parents.items.map((item) => (
                <div key={item.q} data-parents-row>
                  <span
                    aria-hidden="true"
                    data-parents-line
                    className="block h-px origin-left bg-primary/50"
                  />
                  <div data-parents-body className="py-7 sm:py-8">
                    <div className="flex items-center gap-3">
                      <h3
                        data-parents-question
                        className="font-heading text-[20px] font-medium leading-[1.2] tracking-[-0.02em] will-change-transform sm:text-[24px]">
                        {item.q}
                      </h3>
                      <ArrowRight
                        aria-hidden="true"
                        data-parents-arrow
                        className="hidden size-5 flex-none text-primary motion-safe:[@media(hover:hover)_and_(pointer:fine)]:block"
                      />
                    </div>
                    <p className="mt-3 max-w-[600px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div data-parents-cta>
              <span aria-hidden="true" className="block h-px bg-primary/50" />
              <button
                type="button"
                onClick={() => openLeadModal("parents")}
                className={`group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-cs-accent-press sm:w-auto ${focusRing}`}>
                {parents.cta}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
