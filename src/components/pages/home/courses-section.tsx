"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Download, X } from "lucide-react";
import gsap from "gsap";

import courses from "@/data/courses.json";
import { Container } from "@/components/layout/container";
import { BrochureButton } from "@/components/common/apply-now-button";
import { useSectionMotion } from "./use-section-motion";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const COURSE_IMAGE: Record<string, string> = {
  "full-stack": "/images/courses/full-stack.jpg",
  "ai-agents": "/images/courses/ai-agents.jpg",
  "python-for-data-science": "/images/courses/python-for-data-science.jpg",
  "data-science": "/images/courses/data-science.jpg",
  "data-analytics": "/images/courses/data-analytics.jpg",
  "system-design": "/images/courses/system-design.jpg",
  "c-cpp": "/images/courses/c-cpp.jpg",
  "dsa-mastery": "/images/courses/dsa-mastery.jpg",
};

const FALLBACK_IMAGE = "/images/home/1517694712202-14dd9538aa97.jpg";

const LONG_DASH = new RegExp(`\\s+[${String.fromCharCode(8212, 8211)}]\\s+`);

const PROGRAMS = courses.map((course) => ({
  slug: course.slug,
  title: course.title,
  duration: course.duration,
  line: course.tagline.split(LONG_DASH)[0].trim(),
  image: COURSE_IMAGE[course.slug] ?? FALLBACK_IMAGE,
}));

type Program = (typeof PROGRAMS)[number];

const HEADLINE = "Pick what you want to";
const HEADLINE_PHRASE = "become";

const SPINES = [
  { veil: "bg-cs-ink/72", band: "bg-primary", height: "h-[90%]" },
  { veil: "bg-primary/85", band: "bg-cs-ink", height: "h-full" },
  { veil: "bg-cs-ink/60", band: "bg-cs-paper", height: "h-[84%]" },
  { veil: "bg-cs-accent-press/85", band: "bg-cs-paper", height: "h-[95%]" },
  { veil: "bg-cs-ink/72", band: "bg-primary", height: "h-[88%]" },
  { veil: "bg-primary/85", band: "bg-cs-ink", height: "h-[97%]" },
  { veil: "bg-cs-ink/60", band: "bg-primary", height: "h-[86%]" },
  { veil: "bg-cs-accent-press/85", band: "bg-cs-paper", height: "h-[93%]" },
];

type Opened = { index: number; from: DOMRect };

function OpenBook({ program, from, onClosed }: { program: Program; from: DOMRect; onClosed: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const [vertical] = useState(() => window.innerWidth < 768);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const tl = tlRef.current;
    if (!tl || tl.duration() === 0) {
      onClosed();
      return;
    }
    tl.eventCallback("onReverseComplete", onClosed);
    tl.timeScale(1.6).reverse();
  };
  const closeEvent = useRef(close);
  useEffect(() => {
    closeEvent.current = close;
  });

  useEffect(() => {
    const overlay = overlayRef.current;
    const book = bookRef.current;
    const cover = coverRef.current;
    if (!overlay || !book || !cover) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = book.getBoundingClientRect();
    const coverBox = cover.getBoundingClientRect();
    const cx = coverBox.left + coverBox.width / 2;
    const cy = coverBox.top + coverBox.height / 2;
    const originX = ((cx - box.left) / box.width) * 100;
    const originY = ((cy - box.top) / box.height) * 100;
    const scale = Math.min(from.height / coverBox.height, from.width / coverBox.width) * 1.02;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    if (reduced) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(cover, vertical ? { rotationX: 180 } : { rotationY: -180 });
    } else {
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0)
        .fromTo(
          book,
          {
            transformOrigin: `${originX}% ${originY}%`,
            x: from.left + from.width / 2 - cx,
            y: from.top + from.height / 2 - cy,
            scale,
            rotation: -4,
          },
          { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.75 },
          0,
        )
        .to(cover, vertical ? { rotationX: 180, duration: 0.9 } : { rotationY: -180, duration: 0.9 }, 0.62)
        .fromTo(
          book.querySelectorAll("[data-page-line]"),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
          },
          1.05,
        );
    }
    tlRef.current = tl;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeEvent.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = previous;
      tl.kill();
    };
  }, [from, vertical]);

  const pageRound = vertical ? "rounded-b-[16px]" : "rounded-r-[16px]";
  const leafRound = vertical ? "rounded-t-[16px]" : "rounded-l-[16px]";

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={program.title}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-[70] grid place-items-center bg-cs-ink/80 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}>
      <button
        ref={closeRef}
        type="button"
        onClick={close}
        aria-label="Close"
        className={`absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full bg-primary text-white transition-transform duration-300 hover:rotate-90 sm:right-8 sm:top-8 ${focusRing}`}>
        <X className="size-5" aria-hidden />
      </button>

      <div style={{ perspective: "2200px" }} className="w-full max-w-[920px]">
        <div
          ref={bookRef}
          className={`relative mx-auto will-change-transform [transform-style:preserve-3d] ${
            vertical ? "h-[min(78svh,640px)] w-full max-w-[420px]" : "aspect-[16/10] w-full"
          }`}>
          <div
            className={`absolute bg-cs-paper text-cs-on-paper ${pageRound} ${
              vertical ? "inset-x-0 bottom-0 h-1/2" : "inset-y-0 right-0 w-1/2"
            }`}>
            <span
              aria-hidden
              className={`absolute from-cs-on-paper/14 to-transparent ${
                vertical ? "inset-x-0 top-0 h-6 bg-linear-to-b" : "inset-y-0 left-0 w-8 bg-linear-to-r"
              }`}
            />
            <div className="relative flex h-full flex-col justify-center overflow-y-auto p-6 sm:p-10">
              <p data-page-line className="font-mono text-[13px] text-cs-on-paper/60">
                {program.duration}
              </p>
              <h3
                data-page-line
                className="mt-2 font-heading text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[34px]">
                {program.title}
              </h3>
              <p data-page-line className="mt-3 text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px]">
                {program.line}
              </p>
              <p data-page-line className="mt-3 hidden text-[14px] leading-relaxed text-cs-on-paper/64 sm:block">
                Live classes on campus in Indore, real projects, weekly code reviews and placement support.
              </p>
              <div data-page-line className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/courses/${program.slug}`}
                  className={`group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-cs-accent-press ${focusRing}`}>
                  View program
                  <ArrowRight
                    className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <BrochureButton
                  source={`brochure-home-${program.slug}`}
                  className={`inline-flex h-11 items-center gap-2 rounded-full border border-cs-on-paper/20 px-5 text-[15px] font-semibold text-cs-on-paper transition-colors duration-150 hover:border-primary hover:text-primary ${focusRing}`}>
                  <Download aria-hidden="true" className="size-4" />
                  Brochure
                </BrochureButton>
              </div>
            </div>
          </div>

          <div
            ref={coverRef}
            style={{ transformOrigin: vertical ? "50% 0%" : "0% 50%" }}
            className={`pointer-events-none absolute [transform-style:preserve-3d] ${
              vertical ? "inset-x-0 bottom-0 h-1/2" : "inset-y-0 right-0 w-1/2"
            }`}>
            <div className={`absolute inset-0 overflow-hidden bg-cs-ink [backface-visibility:hidden] ${pageRound}`}>
              <Image src={program.image} alt="" fill sizes="460px" className="object-cover" />
              <div className="absolute inset-0 bg-cs-ink/55" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cs-on-ink sm:p-8">
                <span className="block h-1 w-12 rounded-full bg-primary" />
                <p className="mt-4 font-heading text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[32px]">
                  {program.title}
                </p>
                <p className="mt-2 font-mono text-[13px] text-cs-on-ink/72">{program.duration}</p>
              </div>
            </div>
            <div
              style={{
                transform: vertical ? "rotateX(180deg)" : "rotateY(180deg)",
              }}
              className={`absolute inset-0 overflow-hidden bg-cs-ink [backface-visibility:hidden] ${leafRound}`}>
              <Image src={program.image} alt={program.title} fill sizes="460px" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bookRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const [opened, setOpened] = useState<Opened | null>(null);

  useEffect(() => {
    const loop = loopRef.current;
    if (!loop) return;
    if (opened) loop.pause();
    else loop.resume();
  }, [opened]);

  useSectionMotion(sectionRef, ({ gsap, root }) => {
    gsap.from("[data-courses-head]", {
      opacity: 0,
      y: 28,
      duration: 0.8,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "[data-courses-head]",
        start: "top 86%",
        once: true,
      },
    });

    gsap.fromTo(
      "[data-courses-fill]",
      { clipPath: "inset(-12% 100% -12% -4%)" },
      {
        clipPath: "inset(-12% -4% -12% -4%)",
        ease: "none",
        scrollTrigger: {
          trigger: "[data-courses-fill]",
          start: "top 88%",
          end: "top 48%",
          scrub: 0.6,
        },
      },
    );

    gsap.from("[data-book]", {
      yPercent: -40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: "[data-shelf]", start: "top 80%", once: true },
    });

    const mm = gsap.matchMedia(root);
    mm.add("(max-width: 1023px)", () => {
      const track = root.querySelector<HTMLElement>("[data-shelf-track]");
      const viewport = root.querySelector<HTMLElement>("[data-shelf-viewport]");
      if (!track || !viewport) return;
      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
      loopRef.current = loop;
      let resume: gsap.core.Tween | null = null;
      const hold = () => {
        resume?.kill();
        loop.pause();
      };
      const release = () => {
        resume?.kill();
        resume = gsap.delayedCall(1.4, () => loop.resume());
      };
      viewport.addEventListener("pointerdown", hold);
      viewport.addEventListener("pointerup", release);
      viewport.addEventListener("pointercancel", release);
      return () => {
        resume?.kill();
        viewport.removeEventListener("pointerdown", hold);
        viewport.removeEventListener("pointerup", release);
        viewport.removeEventListener("pointercancel", release);
        loopRef.current = null;
      };
    });
  });

  const open = (index: number, el: HTMLButtonElement) => {
    setOpened({ index, from: el.getBoundingClientRect() });
  };

  const closed = () => {
    const index = opened?.index;
    setOpened(null);
    if (index !== undefined) bookRefs.current[index]?.focus({ preventScroll: true });
  };

  return (
    <section ref={sectionRef} className="relative bg-cs-paper pb-16 pt-12 text-cs-on-paper sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2
            data-courses-head
            className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
            {HEADLINE}{" "}
            <span className="relative inline-block">
              <span className="text-transparent [-webkit-text-stroke:1.5px_var(--brand-color)]">{HEADLINE_PHRASE}</span>
              <span data-courses-fill aria-hidden="true" className="absolute inset-0 text-primary">
                {HEADLINE_PHRASE}
              </span>
            </span>
          </h2>
          <p
            data-courses-head
            className="max-w-[420px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px] lg:pb-2">
            Every program runs live on campus in Indore. Pick a book off the shelf to open it.
          </p>
        </div>

        <div data-shelf className="mt-4 min-w-0 lg:mt-6">
          <div
            data-shelf-viewport
            className="-mx-4 overflow-hidden pt-8 motion-reduce:overflow-x-auto motion-reduce:px-4 lg:mx-0 lg:overflow-visible">
            <ul
              aria-label="Programs"
              data-shelf-track
              className="flex h-[300px] w-max items-end sm:h-[360px] lg:mx-auto lg:h-[420px]">
              {[0, 1].flatMap((copy) =>
                PROGRAMS.map((program, index) => {
                  const spine = SPINES[index % SPINES.length];
                  const hidden = opened?.index === index;
                  const clone = copy > 0;
                  return (
                    <li
                      key={`${copy}-${program.slug}`}
                      data-book={clone ? undefined : true}
                      aria-hidden={clone ? true : undefined}
                      className={`flex w-[76px] flex-none pr-2 sm:w-[92px] lg:w-[124px] lg:pr-3 xl:w-[140px] ${spine.height} ${clone ? "motion-reduce:hidden lg:hidden" : ""}`}>
                      <button
                        ref={(el) => {
                          if (!clone) bookRefs.current[index] = el;
                        }}
                        type="button"
                        tabIndex={clone ? -1 : undefined}
                        aria-haspopup="dialog"
                        aria-label={`Open ${program.title}, ${program.duration}`}
                        onClick={(event) => open(index, event.currentTarget)}
                        className={`group relative flex h-full w-full origin-bottom flex-col items-center justify-between overflow-hidden rounded-t-[8px] rounded-b-[3px] px-1 py-4 text-white transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-4 hover:-rotate-2 motion-reduce:transition-none ${
                          hidden ? "opacity-0" : "opacity-100"
                        } ${focusRing}`}>
                        <Image
                          src={program.image}
                          alt=""
                          fill
                          sizes="128px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <span aria-hidden className={`absolute inset-0 ${spine.veil}`} />
                        <span aria-hidden className="relative flex w-full flex-col gap-1 px-2">
                          <span className={`h-[3px] rounded-full ${spine.band}`} />
                          <span className={`h-[3px] w-2/3 rounded-full ${spine.band} opacity-70`} />
                        </span>
                        <span
                          aria-hidden
                          className="relative min-h-0 flex-1 overflow-hidden py-3 font-heading text-[15px] font-semibold leading-none tracking-[-0.01em] [writing-mode:vertical-rl] rotate-180 sm:text-[18px] lg:text-[20px]">
                          {program.title}
                        </span>
                        <span aria-hidden className="relative flex w-full flex-col items-center gap-2">
                          <span className="font-mono text-[10px] leading-tight opacity-80 lg:text-[11px]">
                            {program.duration}
                          </span>
                          <span className={`h-[3px] w-[calc(100%-16px)] rounded-full ${spine.band}`} />
                        </span>
                      </button>
                    </li>
                  );
                }),
              )}
            </ul>
          </div>
          <div aria-hidden className="h-3 rounded-full bg-cs-on-paper" />
          <div aria-hidden className="mx-6 h-2 rounded-b-[6px] bg-cs-on-paper/20" />
        </div>
      </Container>

      {opened ? (
        <OpenBook key={opened.index} program={PROGRAMS[opened.index]} from={opened.from} onClosed={closed} />
      ) : null}
    </section>
  );
}
