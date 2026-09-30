"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import type { HeroScene } from "./hero-scene";
import { CHAPTER_COUNT, DIVE, FALL, PANS, RISE, RISEN, SLOTS, panAt } from "./hero-story";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const IMAGES = Array.from(
  { length: 14 },
  (_, i) => `/images/hero/gallery/hero-${String(i + 1).padStart(2, "0")}.webp`,
);

const storyImages = (mobile: boolean) =>
  Array.from({ length: 4 }, (_, i) => `/images/hero/story/story-0${i + 1}-${mobile ? "m" : "d"}.webp`);

const STEP = 0.04;

function Words({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <span key={`${word}-${i}`}>
      <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
        <span data-hero-word className="inline-block will-change-transform">
          {word}
        </span>
      </span>{" "}
    </span>
  ));
}

function StoryWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <span key={`${word}-${i}`}>
      <span data-story-word className="inline-block origin-bottom will-change-transform">
        {word}
      </span>{" "}
    </span>
  ));
}

function StoryTitle({ title, accent }: { title: string; accent?: string }) {
  const lead = accent && title.endsWith(accent) ? title.slice(0, -accent.length).trim() : title;
  return (
    <>
      <StoryWords text={lead} />
      {accent && lead !== title ? (
        <span className="relative inline-block -rotate-1 whitespace-nowrap px-[0.16em]">
          <span
            data-story-mark
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[0.06em] -z-10 rounded-[0.1em] bg-primary will-change-[clip-path]"
          />
          <span className="text-white">
            <StoryWords text={accent} />
          </span>
        </span>
      ) : null}
    </>
  );
}

export function HeroSection() {
  const { hero } = home;
  const chapters = hero.chapters.slice(0, CHAPTER_COUNT);
  const chapterKeys = chapters.map((c) => c.title).join("|");

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const scrub = { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.7 };

    let scene: HeroScene | null = null;
    let disposed = false;
    let visible = true;
    let drifters: { x: (v: number) => void; y: (v: number) => void; depth: number }[] = [];

    const axis = () => {
      const top = topRef.current;
      const bottom = bottomRef.current;
      if (!top || !bottom || !stage.offsetHeight) return undefined;
      return (top.offsetTop + top.offsetHeight + bottom.offsetTop) / 2 / stage.offsetHeight;
    };

    const onStory = (self: ScrollTrigger) => {
      const p = self.progress;
      scene?.kick(self.getVelocity());
      for (const el of [topRef.current, bottomRef.current]) {
        if (el) el.inert = Number(gsap.getProperty(el, "opacity")) < 0.5;
      }
      stage.style.pointerEvents = p > FALL[0] ? "none" : "";
      stage.dataset.headerTone = p > DIVE[1] - 0.06 && p < FALL[0] + 0.03 ? "dark" : "light";
      const pan = panAt(p);
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const early = i === RISEN ? p < RISE[1] - 0.02 : p < DIVE[1] - 0.04;
        const late = i === RISEN - 1 ? p > RISE[0] + 0.03 : p > FALL[0] + 0.02;
        el.inert = early || late || Math.abs(pan - SLOTS[i]) > 0.5;
      });
    };

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: 0.1 })
        .set(titleRef.current, { opacity: 1 })
        .fromTo("[data-hero-word]", { yPercent: 115 }, { yPercent: 0, duration: 0.95, stagger: 0.045 }, 0)
        .fromTo("[data-hero-fade]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 }, 0.35);

      drifters = gsap.utils.toArray<HTMLElement>("[data-hero-drift]").map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
        depth: Number(el.dataset.heroDrift) || 1,
      }));
    }, section);

    const buildStory = (created: HeroScene) => {
      gsap.to(created.state, { intro: 1, duration: 2.8, ease: "power3.out" });

      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { ...scrub, onUpdate: onStory } });
      tl.to(created.state, { story: 1, duration: 1 }, 0)
        .to(topRef.current, { opacity: 0, yPercent: -24, duration: 0.06 }, 0.005)
        .to(bottomRef.current, { opacity: 0, yPercent: 32, duration: 0.06 }, 0.005)
        .set(groundRef.current, { opacity: 0 }, FALL[0] - 0.02);

      const landed = DIVE[1] - 0.015;
      tl.set(trackRef.current, { opacity: 1 }, landed);
      PANS.forEach(([from, to], n) => {
        tl.to(trackRef.current, { xPercent: -100 * (n + 1), duration: to - from }, from);
      });

      chapterRefs.current.forEach((el, i) => {
        const body = el?.querySelector("[data-story-body]");
        if (!el || !body) return;
        const words = el.querySelectorAll("[data-story-word]");
        const mark = el.querySelector("[data-story-mark]");
        const lines = el.querySelectorAll("[data-story-line]");
        const arrival = PANS[SLOTS[i] - 1];
        const departure = i === RISEN - 1 ? undefined : PANS[SLOTS[i]];
        const step = arrival ? arrival[1] - arrival[0] : 0;
        const centred = arrival ? arrival[1] : 0;

        if (i === 0) {
          tl.fromTo(
            words,
            { opacity: 0, yPercent: 60, rotationX: -82, transformPerspective: 900 },
            { opacity: 1, yPercent: 0, rotationX: 0, duration: STEP, stagger: 0.006, ease: "power3.out" },
            landed,
          );
          if (mark) {
            tl.fromTo(
              mark,
              { clipPath: "inset(0% 100% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.035, ease: "power2.inOut" },
              landed + 0.022,
            );
          }
          tl.fromTo(
            lines,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: STEP, stagger: 0.01, ease: "power2.out" },
            landed + 0.035,
          );
        } else if (i === RISEN) {
          const settle = RISE[0] + (RISE[1] - RISE[0]) * 0.6;
          tl.fromTo(
            words,
            { opacity: 0, yPercent: 130, rotation: 7 },
            { opacity: 1, yPercent: 0, rotation: 0, duration: STEP, stagger: 0.004, ease: "power3.out" },
            settle,
          );
          if (mark) {
            tl.fromTo(
              mark,
              { clipPath: "inset(0% 100% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.03, ease: "power2.inOut" },
              settle + 0.02,
            );
          }
          tl.fromTo(
            lines,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.03, stagger: 0.008, ease: "power2.out" },
            settle + 0.03,
          );
        } else {
          tl.fromTo(body, { xPercent: 14 }, { xPercent: 0, duration: step }, centred - step);
          words.forEach((word, n) => {
            tl.fromTo(
              word,
              { opacity: 0, xPercent: 70 + n * 34, skewX: -10 },
              { opacity: 1, xPercent: 0, skewX: 0, duration: step * 0.5, ease: "power3.out" },
              centred - step * 0.72 + n * 0.003,
            );
          });
          if (mark) {
            tl.fromTo(
              mark,
              { clipPath: "inset(0% 100% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: step * 0.3, ease: "power2.inOut" },
              centred - step * 0.42,
            );
          }
          tl.fromTo(
            lines,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: step * 0.3, stagger: 0.008, ease: "power2.out" },
            centred - step * 0.34,
          );
        }
        if (departure) tl.to(body, { xPercent: -14, duration: departure[1] - departure[0] }, departure[0]);
        if (i === RISEN - 1) tl.to(body, { opacity: 0, y: -72, duration: 0.04, ease: "power2.in" }, RISE[0] - 0.005);
        if (i === CHAPTER_COUNT - 1) tl.to(body, { opacity: 0, y: 64, duration: 0.035, ease: "power2.in" }, FALL[0] - 0.012);
      });
      tl.set({}, {}, 1);
    };

    const boot = async () => {
      if (saveData) {
        setFallback(true);
        return;
      }
      try {
        const { createHeroScene, readHeroPalette } = await import("./hero-scene");
        const created = await createHeroScene(canvas, stage, {
          images: IMAGES,
          story: reduced ? [] : storyImages(stage.clientWidth < 768),
          stats: hero.stats,
          palette: readHeroPalette(getComputedStyle(document.documentElement)),
          fonts: {
            heading: getComputedStyle(titleRef.current ?? section).fontFamily,
            mono: getComputedStyle(noteRef.current ?? section).fontFamily,
          },
        });
        if (disposed) {
          created.dispose();
          return;
        }
        scene = created;
        created.resize(axis());
        if (reduced) {
          created.state.intro = 1;
          created.renderOnce();
          return;
        }
        ctx.add(() => buildStory(created));
        if (visible) created.start();
      } catch {
        if (!disposed) setFallback(true);
      }
    };
    boot();

    const resizeObserver = new ResizeObserver(() => {
      if (!scene) return;
      scene.resize(axis());
      if (reduced) scene.renderOnce();
    });
    resizeObserver.observe(stage);

    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!scene || reduced) return;
      if (visible) scene.start();
      else scene.stop();
    });
    viewObserver.observe(section);

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      scene?.pointer(x, y);
      for (const drifter of drifters) {
        drifter.x(-x * 12 * drifter.depth);
        drifter.y(-y * 8 * drifter.depth);
      }
    };
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      ctx.revert();
      scene?.dispose();
    };
  }, [hero.stats, chapterKeys]);

  return (
    <>
    <section
      ref={sectionRef}
      aria-label="Coding Sharks"
      className={`pointer-events-none relative z-10 text-cs-on-paper ${fallback ? "h-svh" : "h-svh motion-safe:-mb-[143svh] motion-safe:h-[580svh] motion-safe:lg:-mb-[149svh] motion-safe:lg:h-[640svh]"}`}>
      <div
        ref={stageRef}
        data-header-tone="light"
        className="pointer-events-auto sticky top-0 isolate flex h-svh flex-col justify-between overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div ref={groundRef} className="absolute inset-0 bg-cs-paper-2">
            <div className="absolute inset-0 bg-[radial-gradient(var(--cs-on-paper)_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.07]" />
          </div>
          {fallback ? (
            <div className="absolute inset-x-4 top-1/2 grid -translate-y-1/2 grid-cols-2 gap-3 sm:inset-x-10 sm:grid-cols-4">
              {IMAGES.slice(0, 4).map((src, i) => (
                <div key={src} className={`relative aspect-4/5 overflow-hidden rounded-2xl ${i > 1 ? "hidden sm:block" : ""}`}>
                  <Image src={src} alt="" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <canvas ref={canvasRef} className="absolute inset-0 size-full" />
          )}
        </div>

        <div ref={topRef} className="w-full pt-[calc(5.75rem+env(safe-area-inset-top))] will-change-transform lg:pt-24">
          <Container>
            <div data-hero-drift="1" className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
              <h1
                ref={titleRef}
                className="hero-reveal font-heading text-[38px] font-semibold leading-[1.04] tracking-[-0.035em] text-cs-on-paper sm:text-[48px] lg:text-[56px] xl:text-[60px]">
                <Words text={hero.headline} />
                <br className="hidden sm:block" />
                <span className="text-primary">
                  <Words text={hero.headlineAccent} />
                </span>
              </h1>
            </div>
          </Container>
        </div>

        <div ref={bottomRef} className="w-full pb-[calc(3.5rem+env(safe-area-inset-bottom))] will-change-transform lg:pb-16">
          <Container>
            <div data-hero-drift="0.6" className="mx-auto flex max-w-[600px] flex-col items-center text-center">
              <p data-hero-fade className="hero-reveal text-[16px] font-medium leading-relaxed text-cs-on-paper/88 sm:text-[18px]">
                {hero.subheadline}
              </p>
              <div data-hero-fade className="hero-reveal mt-6 flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-6">
                <button
                  type="button"
                  onClick={() => openLeadModal("hero-primary")}
                  className={`group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-cs-accent-press sm:w-auto ${focusRing}`}>
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </button>
                <Link
                  href={hero.secondaryCta.href}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-2 text-[15px] font-medium text-cs-on-paper/80 underline decoration-cs-on-paper/24 underline-offset-[6px] transition-colors duration-150 hover:text-cs-on-paper hover:decoration-primary ${focusRing}`}>
                  {hero.secondaryCta.label}
                </Link>
              </div>
              <p ref={noteRef} data-hero-fade className="hero-reveal mt-3 font-mono text-[12px] text-cs-on-paper/72">
                {hero.primaryCta.note}
              </p>
            </div>
          </Container>
        </div>

        <div ref={trackRef} style={{ opacity: 0 }} className="pointer-events-none absolute inset-0 flex will-change-transform">
        {chapters.map((c, i) => {
          const last = i === chapters.length - 1;
          return (
            <div
              key={c.title}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              inert
              style={{ left: `${SLOTS[i] * 100}%` }}
              className="pointer-events-auto absolute inset-y-0 flex w-full items-center justify-center text-cs-on-ink">
              <Container>
                <div
                  data-hero-drift="1.5"
                  data-story-body
                  className="mx-auto flex max-w-[780px] flex-col items-center text-center will-change-transform">
                  <h2 className="font-heading text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] text-balance text-white sm:text-[56px] lg:text-[76px]">
                    <StoryTitle title={c.title} accent={c.accent} />
                  </h2>
                  {c.body ? (
                    <p
                      data-story-line
                      className="mt-6 max-w-[560px] text-[17px] font-medium leading-[1.55] text-white sm:text-[21px]">
                      {c.body}
                    </p>
                  ) : null}
                  {last ? (
                    <>
                      <dl data-story-line className="mt-8 grid w-full max-w-[560px] grid-cols-3 border-y border-cs-on-ink/24">
                        {hero.stats.map((s, n) => (
                          <div key={s.label} className={`py-4 ${n > 0 ? "border-l border-cs-on-ink/24" : ""}`}>
                            <dt className="text-[11px] leading-snug text-cs-on-ink/72 sm:text-xs">{s.label}</dt>
                            <dd className="mt-1 font-mono text-[22px] font-medium tracking-[-0.02em] sm:text-[30px]">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <div data-story-line className="mt-7 flex flex-col items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openLeadModal("hero-final")}
                          className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-cs-accent-press ${focusRing}`}>
                          {hero.primaryCta.label}
                          <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </button>
                        <p className="font-mono text-[11px] text-cs-on-ink/68">{hero.primaryCta.note}</p>
                      </div>
                    </>
                  ) : null}
                </div>
              </Container>
            </div>
          );
        })}
        </div>

      </div>
    </section>
    {fallback ? null : (
      <div aria-hidden="true" className="-mb-px hidden h-[46svh] bg-cs-paper motion-safe:block lg:h-[52svh]" />
    )}
    </>
  );
}
