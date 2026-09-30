"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, RotateCw } from "lucide-react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { useSectionMotion } from "./use-section-motion";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const COMPANY_DISPLAY: Record<string, string> = {
  Dinng: "Dingg",
  "Bolt , europe": "Bolt, Europe",
};

const IMAGE_FOCUS: Record<string, string> = {
  "/images/mentor/mentor1.jpeg": "object-[26%_50%]",
  "/images/mentor/mentor2.jpeg": "object-center",
  "/images/mentor/mentor3.jpeg": "object-[64%_50%]",
};

const HANG = [
  { drop: "md:mt-[22px]", tilt: -3, start: -16 },
  { drop: "md:mt-[48px]", tilt: 2, start: 14 },
  { drop: "md:mt-[22px]", tilt: -1.5, start: -12 },
];

const displayCompany = (company: string) => COMPANY_DISPLAY[company] ?? company;

const displayDescription = (text: string) =>
  text.replace(/Coding Shark(?!s)/g, "Coding Sharks").replace(/\s{2,}/g, " ");

export function MentorsSection() {
  const mentors = home.mentors;
  const sectionRef = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useSectionMotion(sectionRef, ({ gsap, root, finePointer }) => {
    const mark = root.querySelector<SVGPathElement>("[data-mentor-underline]");
    if (mark) {
      gsap.fromTo(
        mark,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.inOut",
          scrollTrigger: { trigger: mark, start: "top 84%", once: true },
        },
      );
    }

    const line = root.querySelector<SVGPathElement>("[data-mentor-line]");
    if (line) {
      gsap.fromTo(
        line,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: "[data-mentor-rope]", start: "top 80%", once: true },
        },
      );
    }

    const hangers = gsap.utils.toArray<HTMLElement>("[data-mentor-hang]");
    hangers.forEach((el, i) => {
      const pose = HANG[i % HANG.length];
      gsap.fromTo(
        el,
        { rotation: pose.start, y: -60, opacity: 0 },
        {
          rotation: pose.tilt,
          y: 0,
          opacity: 1,
          duration: 1.8,
          delay: 0.2 + i * 0.15,
          ease: "elastic.out(1, 0.35)",
          scrollTrigger: { trigger: "[data-mentor-rope]", start: "top 75%", once: true },
        },
      );
    });

    if (!finePointer) return;
    const sway = hangers.map((el, i) => ({
      el,
      base: HANG[i % HANG.length].tilt,
      to: gsap.quickTo(el, "rotation", { duration: 1.2, ease: "elastic.out(1, 0.4)" }),
    }));
    let lastX = 0;
    const onMove = (event: PointerEvent) => {
      const dx = Math.max(-40, Math.min(40, event.clientX - lastX));
      lastX = event.clientX;
      for (const item of sway) {
        const box = item.el.getBoundingClientRect();
        const near = Math.abs(event.clientX - (box.left + box.width / 2)) < box.width;
        item.to(item.base + (near ? dx * 0.18 : 0));
      }
    };
    const onLeave = () => {
      for (const item of sway) item.to(item.base);
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-cs-paper-2 pb-12 pt-16 text-cs-on-paper sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <h2 className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
              The people{" "}
              <span className="relative inline-block text-primary">
                advising
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                  className="absolute -bottom-[0.14em] left-0 h-[0.2em] w-full overflow-visible">
                  <path
                    data-mentor-underline
                    d="M3 8 C 28 3, 52 10, 80 6 S 132 3, 158 7 S 188 8, 197 5"
                    pathLength={1}
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              our programs
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px]">
              Founders and senior engineers who advise Coding Sharks on what the industry expects from a new developer.
            </p>
          </div>
          <Link
            href="/instructors"
            className={`group inline-flex shrink-0 items-center gap-2 self-start text-[15px] font-medium text-cs-on-paper underline decoration-cs-on-paper/24 underline-offset-[6px] transition-colors duration-150 hover:decoration-primary lg:self-auto ${focusRing}`}>
            Meet all instructors
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div data-mentor-rope className="relative mt-10 sm:mt-14">
          <svg
            aria-hidden
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-[-4%] top-0 hidden h-[80px] w-[108%] md:block">
            <path
              data-mentor-line
              d="M0 8 Q 500 120 1000 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray={1}
              className="text-cs-on-paper/40"
            />
          </svg>

          <ul className="relative -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 pt-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:gap-12 [&::-webkit-scrollbar]:hidden">
            {mentors.map((mentor, i) => {
              const description = displayDescription(mentor.description);
              const pose = HANG[i % HANG.length];
              const on = flipped === i;
              return (
                <li
                  key={mentor.name}
                  className={`w-[56vw] max-w-[230px] flex-none snap-center md:mx-auto md:w-full md:max-w-[340px] ${pose.drop}`}>
                  <div data-mentor-hang className="relative origin-top pt-4 will-change-transform">
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-0 z-20 h-9 w-4 -translate-x-1/2 rounded-[4px] bg-cs-ink ring-2 ring-cs-paper-2"
                    />
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setFlipped(on ? null : i)}
                      className={`group block w-full text-left [perspective:1600px] ${focusRing}`}>
                      <span
                        className={`relative grid transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${
                          on
                            ? "[transform:rotateY(180deg)]"
                            : "[@media(hover:hover)_and_(pointer:fine)]:group-hover:[transform:rotateY(180deg)]"
                        }`}>
                        <span className="col-start-1 row-start-1 block rounded-[6px] bg-cs-paper p-2 pb-3 [backface-visibility:hidden]">
                          <span className="relative block aspect-square overflow-hidden rounded-[3px] bg-cs-ink md:aspect-4/5">
                            <Image
                              src={mentor.imageUrl}
                              alt={`Portrait of ${mentor.name}`}
                              fill
                              sizes="(min-width: 768px) 30vw, 340px"
                              className={`object-cover ${IMAGE_FOCUS[mentor.imageUrl] ?? "object-top"}`}
                            />
                          </span>
                          <span className="mt-3 flex items-end justify-between gap-3 px-1 md:mt-4">
                            <span className="min-w-0">
                              <span className="block font-heading text-[18px] font-medium leading-tight tracking-[-0.02em] md:text-[24px]">
                                {mentor.name}
                              </span>
                              <span className="mt-1 block text-[13px] font-bold text-primary md:text-[15px]">
                                {displayCompany(mentor.company)}
                              </span>
                            </span>
                            <RotateCw aria-hidden className="mb-1 size-4 shrink-0 text-cs-on-paper/40" />
                          </span>
                        </span>

                        <span className="col-start-1 row-start-1 flex flex-col overflow-hidden rounded-[6px] bg-cs-ink p-4 text-cs-on-ink md:p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                          <span className="block h-1 w-12 rounded-full bg-primary" />
                          <span className="mt-3 block font-heading text-[18px] font-medium leading-tight tracking-[-0.02em] md:mt-5 md:text-[24px]">
                            {mentor.name}
                          </span>
                          <span className="mt-1 block text-[12px] text-cs-on-ink/64 md:text-[14px]">{mentor.role}</span>
                          <span className="mt-3 block text-[12px] leading-snug text-cs-on-ink/85 md:mt-5 md:text-[15px] md:leading-relaxed">
                            {description}
                          </span>
                          <span className="mt-auto block pt-3 text-[13px] font-bold text-primary md:pt-6 md:text-[15px]">
                            {displayCompany(mentor.company)}
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
