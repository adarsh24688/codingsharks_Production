"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Star } from "lucide-react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { useSectionMotion } from "./use-section-motion";

type Review = (typeof home.reviews)[number];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const REVIEWS = home.reviews.filter((review) => !/bhopal/i.test(review.text));
const COUNT = REVIEWS.length;
const STEP = 360 / COUNT;

const TONES = [
  {
    card: "bg-cs-paper text-cs-on-paper ring-1 ring-inset ring-cs-on-paper/10",
    glyph: "text-primary",
    sub: "text-cs-on-paper/60",
    avatar: "bg-cs-ink text-cs-on-ink",
    star: "fill-primary",
    off: "fill-cs-on-paper/14",
  },
  {
    card: "bg-cs-ink text-cs-on-ink",
    glyph: "text-primary",
    sub: "text-cs-on-ink/60",
    avatar: "bg-primary text-white",
    star: "fill-primary",
    off: "fill-cs-on-ink/20",
  },
  {
    card: "bg-primary text-white",
    glyph: "text-cs-ink",
    sub: "text-white/75",
    avatar: "bg-cs-ink text-cs-on-ink",
    star: "fill-white",
    off: "fill-white/30",
  },
];

function ReviewCard({ review, tone }: { review: Review; tone: (typeof TONES)[number] }) {
  return (
    <article className={`flex h-full flex-col rounded-[20px] p-5 sm:rounded-[22px] sm:p-7 ${tone.card}`}>
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden className={`block font-heading text-[56px] leading-[0.7] sm:text-[72px] ${tone.glyph}`}>
          &ldquo;
        </span>
        <span role="img" aria-label={`Rated ${review.rating} out of 5`} className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden
              className={`size-3.5 text-transparent ${i < review.rating ? tone.star : tone.off}`}
            />
          ))}
        </span>
      </div>
      <p className="mt-3 font-heading text-[15px] leading-[1.4] tracking-[-0.01em] sm:text-[20px]">{review.text}</p>
      <div className="mt-auto flex items-center gap-3 pt-4 sm:pt-6">
        <span
          aria-hidden
          className={`grid size-10 shrink-0 place-items-center rounded-full font-heading text-[15px] font-semibold ${tone.avatar}`}>
          {review.initial}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold leading-tight">{review.name}</span>
          <span className={`mt-0.5 block truncate text-[13px] ${tone.sub}`}>{review.role}</span>
        </span>
      </div>
    </article>
  );
}

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionMotion(sectionRef, ({ gsap, ScrollTrigger, root }) => {
    const marker = root.querySelector<HTMLElement>("[data-review-marker]");
    if (marker) {
      gsap.fromTo(
        marker,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: { trigger: marker, start: "top 84%", once: true },
        },
      );
    }

    const ring = root.querySelector<HTMLElement>("[data-review-ring]");
    const stage = root.querySelector<HTMLElement>("[data-review-stage]");
    const cards = gsap.utils.toArray<HTMLElement>("[data-review-card]");
    if (!ring || !stage || cards.length === 0) return;

    const state = { scroll: 0, drag: 0, shown: 0 };

    const paint = () => {
      state.shown += (state.scroll + state.drag - state.shown) * 0.12;
      gsap.set(ring, { rotationY: state.shown });
      cards.forEach((card, i) => {
        const facing = Math.cos(((i * STEP + state.shown) * Math.PI) / 180);
        gsap.set(card, { opacity: 0.18 + 0.82 * Math.max(0, facing) ** 1.6 });
      });
    };
    gsap.ticker.add(paint);

    ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        state.scroll = -self.progress * 360;
      },
    });

    gsap.fromTo(
      stage,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: stage, start: "top 85%", once: true },
      },
    );

    let startX = 0;
    let startDrag = 0;
    let dragging = false;
    const down = (event: PointerEvent) => {
      dragging = true;
      startX = event.clientX;
      startDrag = state.drag;
      stage.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      state.drag = startDrag + (event.clientX - startX) * 0.35;
    };
    const up = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      const total = state.scroll + state.drag;
      state.drag += Math.round(total / STEP) * STEP - total;
    };
    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);

    return () => {
      gsap.ticker.remove(paint);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
    };
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-cs-paper-2 pb-16 pt-12 text-cs-on-paper sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
            What{" "}
            <span
              data-review-marker
              className="inline-block -rotate-1 whitespace-nowrap rounded-[0.12em] bg-primary px-[0.18em] text-white">
              students say
            </span>
          </h2>
          <div className="flex flex-col gap-3 lg:items-end lg:pb-2">
            <p className="max-w-[440px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px] lg:text-right">
              Reviews from students who trained with us, in their own words.
            </p>
            <Link
              href="/reviews"
              className={`group inline-flex items-center gap-2 self-start text-[15px] font-medium text-cs-on-paper underline decoration-cs-on-paper/24 underline-offset-[6px] transition-colors duration-150 hover:decoration-primary lg:self-end ${focusRing}`}>
              Read all reviews
              <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>

      <div
        data-review-stage
        className="relative mx-auto mt-10 h-[380px] cursor-grab touch-pan-y select-none [perspective:2400px] active:cursor-grabbing sm:[perspective:1800px] sm:mt-16 sm:h-[460px] lg:mt-20 lg:h-[500px]">
        <div
          data-review-ring
          className="absolute left-1/2 top-1/2 size-0 will-change-transform [transform-style:preserve-3d]">
          {REVIEWS.map((review, i) => (
            <div
              key={review.name}
              data-review-card
              style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--ring-r))` }}
              className="absolute -left-[100px] -top-[160px] h-[320px] w-[200px] [--ring-r:215px] [backface-visibility:hidden] sm:-left-[150px] sm:-top-[180px] sm:h-[360px] sm:w-[300px] sm:[--ring-r:340px] lg:-left-[160px] lg:-top-[190px] lg:h-[380px] lg:w-[320px] lg:[--ring-r:370px]">
              <ReviewCard review={review} tone={TONES[i % TONES.length]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
