"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import type { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

import placements from "@/data/placements.json";
import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import { useSectionMotion } from "./use-section-motion";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const MAX_STUDENTS = 6;
const STEP_SVH = 70;
const ROT = [0, -5, 6, -8, 9, -10];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const FALLBACK_IMAGES = Array.from({ length: 5 }, (_, i) => `/images/students/student${i + 1}.png`);

type Student = {
  id: string;
  name: string;
  role: string;
  company: string;
  ctc: string;
  image: string;
};

const STUDENTS: Student[] = placements.slice(0, MAX_STUDENTS).map((p, i) => ({
  id: p.id,
  name: p.name,
  role: p.position,
  company: p.company,
  ctc: `₹${p.package}`,
  image: p.image.startsWith("/images/students/") ? p.image : FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
}));

const COMPANY_TILES = Math.max(...STUDENTS.map((s) => s.company.length));
const CTC_TILES = Math.max(...STUDENTS.map((s) => s.ctc.length));

const pose = (depth: number) => ({
  x: depth * 16,
  y: depth * -14,
  rotation: ROT[depth] ?? 0,
  scale: 1 - depth * 0.05,
  opacity: depth > 3 ? 0 : 1,
});

function Flaps({ text, size, className }: { text: string; size: number; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = text.toUpperCase().padEnd(size, " ").slice(0, size).split("");

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>("[data-flap]"));
    const tweens = tiles.map((tile, i) => {
      const final = tile.dataset.flap ?? " ";
      const spin = { n: 0 };
      return gsap.to(spin, {
        n: 1,
        duration: 0.32 + i * 0.045,
        ease: "none",
        onUpdate: () => {
          tile.dataset.show =
            final === " " && Math.random() < 0.5 ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        },
        onComplete: () => {
          tile.dataset.show = final;
        },
      });
    });
    return () => {
      for (const t of tweens) t.kill();
      for (const tile of tiles) tile.dataset.show = tile.dataset.flap ?? " ";
    };
  }, [text]);

  return (
    <span ref={ref} aria-hidden="true" className={`flex gap-[0.08em] ${className}`}>
      {chars.map((c, i) => (
        <span
          key={i}
          data-flap={c}
          data-show={c}
          className="relative grid h-[1.24em] w-[0.8em] place-items-center overflow-hidden rounded-[0.12em] bg-cs-ink-2 leading-none after:content-[attr(data-show)] before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-cs-ink"
        />
      ))}
    </span>
  );
}

function Badge({ student, sizes }: { student: Student; sizes: string }) {
  return (
    <div className="relative rounded-[24px] bg-cs-paper p-3 pt-8 text-cs-on-paper">
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-3 h-2 w-14 -translate-x-1/2 rounded-full bg-cs-on-paper/80"
      />
      <div className="relative aspect-square overflow-hidden rounded-[16px] bg-cs-paper-2">
        <Image
          src={student.image}
          alt={`${student.name}, ${student.role} at ${student.company}`}
          fill
          sizes={sizes}
          className="origin-top scale-[1.12] object-cover object-top"
        />
      </div>
      <div className="px-2 pb-1 pt-4">
        <p className="font-heading text-[22px] font-semibold leading-tight tracking-[-0.02em]">{student.name}</p>
        <p className="mt-1 text-[14px] leading-snug text-cs-on-paper/72">{student.role}</p>
        <p className="mt-3 flex items-center gap-2 border-t border-cs-on-paper/12 pt-3 text-[14px] font-semibold">
          <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-primary" />
          {student.company}
        </p>
      </div>
    </div>
  );
}

export function PlacementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Trigger | null>(null);
  const [active, setActive] = useState(0);
  const current = STUDENTS[active] ?? STUDENTS[0];
  const stageHeight = `${100 + (STUDENTS.length - 1) * STEP_SVH}svh`;
  const steps = Math.max(1, STUDENTS.length - 1);

  useEffect(() => {
    const el = nameRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
    return () => {
      tween.kill();
    };
  }, [active]);

  useSectionMotion(sectionRef, ({ gsap, root, finePointer }) => {
    root.dataset.pinned = "true";

    const mm = gsap.matchMedia(root);
    mm.add("(max-width: 1023px)", () => {
      const track = root.querySelector<HTMLElement>("[data-pl-track]");
      const viewport = root.querySelector<HTMLElement>("[data-pl-viewport]");
      if (!track || !viewport) return;
      const loop = gsap.to(track, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
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
      };
    });
    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-pl-card]");
      const total = cards.length;
      if (total < 2) return;
      cards.forEach((card, i) => gsap.set(card, pose(i)));

      gsap.fromTo(
        "[data-pl-strap]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 85%", end: "top 20%", scrub: 0.6 },
        },
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const t = self.progress * (total - 1);
            setActive(Math.min(total - 1, Math.floor(t + 0.55)));
          },
        },
      });

      for (let k = 0; k < total - 1; k++) {
        const at = k + 0.2;
        tl.to(cards[k], { xPercent: -150, y: 160, rotation: -32, duration: 0.6, ease: "power2.in" }, at).to(
          cards[k],
          { opacity: 0, duration: 0.14 },
          at + 0.46,
        );
        for (let j = k + 1; j < total; j++) {
          tl.to(cards[j], { ...pose(j - k - 1), duration: 0.6, ease: "power2.out" }, at + 0.12);
        }
      }
      tl.set({}, {}, total - 1);
      triggerRef.current = tl.scrollTrigger ?? null;

      if (!finePointer) return;
      const deck = root.querySelector("[data-pl-deck]");
      if (!deck) return;
      const ry = gsap.quickTo(deck, "rotationY", { duration: 0.9, ease: "power3.out" });
      const rx = gsap.quickTo(deck, "rotationX", { duration: 0.9, ease: "power3.out" });
      gsap.set(deck, { transformPerspective: 1100 });
      const onMove = (event: PointerEvent) => {
        ry(((event.clientX / window.innerWidth) * 2 - 1) * 9);
        rx(-((event.clientY / window.innerHeight) * 2 - 1) * 6);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        triggerRef.current = null;
      };
    });

    return () => {
      delete root.dataset.pinned;
    };
  });

  const jumpTo = (i: number) => {
    const st = triggerRef.current;
    if (!st) return;
    window.scrollTo({ top: st.start + ((st.end - st.start) * i) / steps + 2, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      style={{ "--stage": stageHeight } as CSSProperties}
      className="group/pl relative bg-cs-ink text-cs-on-ink lg:data-pinned:h-(--stage)">
      <div className="relative py-16 sm:py-20 lg:py-24 lg:group-data-pinned/pl:sticky lg:group-data-pinned/pl:top-0 lg:group-data-pinned/pl:h-svh lg:group-data-pinned/pl:overflow-hidden lg:group-data-pinned/pl:py-0">
        <Container className="relative lg:group-data-pinned/pl:grid lg:group-data-pinned/pl:h-full lg:group-data-pinned/pl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:group-data-pinned/pl:gap-16">
          <div className="relative hidden lg:group-data-pinned/pl:block">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 z-50 flex -translate-x-1/2 flex-col items-center">
              <span data-pl-strap className="block h-[calc(50svh-min(24svh,212px)+12px)] w-7 origin-top bg-primary" />
              <span className="-mt-1 block h-7 w-11 rounded-[8px] border-2 border-cs-on-ink/60 bg-cs-ink-2" />
            </div>
            <div className="absolute inset-0 grid place-items-center pt-[4svh]">
              <div data-pl-deck className="relative w-[min(32svh,300px)] will-change-transform">
                {STUDENTS.map((s, i) => (
                  <div
                    key={s.id}
                    data-pl-card
                    aria-hidden={i !== active}
                    style={{ zIndex: STUDENTS.length - i }}
                    className={`will-change-transform ${i === 0 ? "relative" : "absolute inset-x-0 top-0"}`}>
                    <Badge student={s} sizes="300px" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-col lg:group-data-pinned/pl:justify-center lg:group-data-pinned/pl:pb-24 lg:group-data-pinned/pl:pt-28 short:group-data-pinned/pl:pb-16 short:group-data-pinned/pl:pt-20">
            <div className="max-w-[640px]">
              <h2 className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px] short:text-[42px]">
                Where our students <span className="text-primary">work now</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-cs-on-ink/72 sm:text-[17px] short:mt-3 short:text-[15px]">
                Students who trained with us, and the roles they hold today.
              </p>
            </div>

            <div className="mt-12 hidden lg:group-data-pinned/pl:block short:mt-6">
              <p className="text-[14px] text-cs-on-ink/60">Package</p>
              <p className="mt-2">
                <span className="sr-only">{current.ctc}</span>
                <Flaps
                  text={current.ctc}
                  size={CTC_TILES}
                  className="font-mono text-[64px] font-medium text-primary xl:text-[80px] short:text-[50px] xl:short:text-[54px]"
                />
              </p>
              <p className="mt-7 text-[14px] text-cs-on-ink/60 short:mt-4">Company</p>
              <p className="mt-2">
                <span className="sr-only">{current.company}</span>
                <Flaps
                  text={current.company}
                  size={COMPANY_TILES}
                  className="font-mono text-[28px] font-medium text-cs-on-ink xl:text-[34px] short:text-[24px] xl:short:text-[26px]"
                />
              </p>
              <div ref={nameRef} className="mt-8 short:mt-4">
                <h3 className="font-heading text-[28px] font-medium leading-tight tracking-[-0.02em] xl:text-[32px] short:text-[24px] xl:short:text-[26px]">
                  {current.name}
                </h3>
                <p className="mt-1 text-[16px] text-cs-on-ink/72">{current.role}</p>
              </div>

              <div className="mt-8 flex items-center gap-3 short:mt-4">
                {STUDENTS.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Show ${s.name}`}
                    aria-current={i === active}
                    className={`relative size-11 short:size-9 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-cs-ink transition-transform duration-300 ${i === active ? "scale-110 ring-primary" : "ring-transparent opacity-60 hover:opacity-100"} ${focusRing}`}>
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="44px"
                      className="origin-top scale-[1.3] object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div
              role="region"
              aria-label="Placed students"
              data-pl-viewport
              className="-mx-4 mt-10 overflow-hidden py-4 motion-reduce:mx-0 motion-reduce:overflow-visible lg:mx-0 lg:overflow-visible lg:group-data-pinned/pl:hidden">
              <div
                data-pl-track
                className="flex w-max motion-reduce:grid motion-reduce:w-auto motion-reduce:grid-cols-2 motion-reduce:gap-x-4 motion-reduce:gap-y-10 lg:grid lg:w-auto lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
                {[0, 1].flatMap((copy) =>
                  STUDENTS.map((s, i) => (
                    <article
                      key={`${copy}-${s.id}`}
                      aria-hidden={copy > 0 ? true : undefined}
                      className={`w-[70vw] max-w-[280px] flex-none px-3 motion-reduce:w-auto motion-reduce:max-w-none motion-reduce:px-0 lg:w-auto lg:max-w-none lg:px-0 ${copy > 0 ? "motion-reduce:hidden lg:hidden" : ""} ${i % 2 === 0 ? "-rotate-2" : "rotate-2"} motion-reduce:rotate-0`}>
                      <Badge student={s} sizes="(min-width: 1024px) 380px, 300px" />
                      <p className="mt-5 font-mono text-[40px] font-medium leading-none tracking-[-0.04em] text-primary [word-spacing:-0.2em]">
                        {s.ctc}
                      </p>
                    </article>
                  )),
                )}
              </div>
            </div>

            <div className="mt-12 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6 lg:group-data-pinned/pl:mt-10 short:group-data-pinned/pl:mt-6">
              <button
                type="button"
                onClick={() => openLeadModal("placements")}
                className={`group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-cs-accent-press sm:w-auto ${focusRing}`}>
                Book a free career call
                <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/placements"
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-2 text-[15px] font-medium text-cs-on-ink/80 underline decoration-cs-on-ink/24 underline-offset-[6px] transition-colors duration-150 hover:text-cs-on-ink hover:decoration-primary ${focusRing}`}>
                All placement stories
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
