"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import { useSectionMotion } from "./use-section-motion";

type Logo = { name: string | null; x: number; w: number; invert?: boolean };

type Strip = { src: string; width: number; height: number; logos: Logo[] };

const STRIPS: Strip[] = [
  {
    src: "/images/workat1.webp",
    width: 3399,
    height: 64,
    logos: [
      { name: "Zee", x: 0, w: 48 },
      { name: "Target", x: 96, w: 139 },
      { name: "OnMobile", x: 283, w: 181 },
      { name: "Amazon", x: 512, w: 131 },
      { name: "Epsilon", x: 691, w: 143 },
      { name: "Landmark Group", x: 882, w: 189 },
      { name: "NTT Data", x: 1119, w: 179 },
      { name: "Reliance", x: 1346, w: 94 },
      { name: "Akamai", x: 1488, w: 103 },
      { name: "PayPal", x: 1639, w: 151 },
      { name: null, x: 1837, w: 57 },
      { name: "XB", x: 1942, w: 94 },
      { name: "Nykaa", x: 2085, w: 107 },
      { name: "Vimeo", x: 2240, w: 128 },
      { name: "Ajio", x: 2416, w: 106 },
      { name: "Mystifly", x: 2570, w: 158 },
      { name: "WorkSpan", x: 2775, w: 179 },
      { name: "WiseTech Global", x: 3001, w: 143 },
      { name: "Paymatrix", x: 3191, w: 208 },
    ],
  },
  {
    src: "/images/workat2.webp",
    width: 3132,
    height: 64,
    logos: [
      { name: "Muthoot Finance", x: 0, w: 125 },
      { name: "FirstHive", x: 173, w: 83 },
      { name: "Rebel Foods", x: 304, w: 104 },
      { name: "Yubi", x: 456, w: 105 },
      { name: "Credera", x: 608, w: 211 },
      { name: "Love, Bonito", x: 873, w: 90 },
      { name: "Siply", x: 1013, w: 115 },
      { name: "Fyers", x: 1177, w: 140 },
      { name: "Porter", x: 1365, w: 142 },
      { name: "Turvo", x: 1555, w: 146, invert: true },
      { name: "Apna", x: 1748, w: 65 },
      { name: "Sigmoid", x: 1860, w: 80 },
      { name: "nference", x: 1988, w: 176 },
      { name: "ABM", x: 2220, w: 77 },
      { name: "Monotype", x: 2348, w: 181 },
      { name: "Interra Systems", x: 2576, w: 125 },
      { name: "Superteam", x: 2749, w: 65 },
      { name: "Lummo Shop", x: 2862, w: 122 },
      { name: "Capri Loans", x: 3031, w: 101 },
    ],
  },
];

const CHIPS = STRIPS.flatMap((strip) => strip.logos.filter((logo) => logo.name).map((logo) => ({ strip, logo })));

const noise = (i: number, seed: number) => {
  const v = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

const px = (value: number) => `calc(var(--s) * ${value}px)`;

function LogoSprite({ strip, logo }: { strip: Strip; logo: Logo }) {
  return (
    <span className="block overflow-hidden" style={{ width: px(logo.w + 4), height: px(strip.height) }}>
      <Image
        src={strip.src}
        alt={logo.name ?? ""}
        width={strip.width}
        height={strip.height}
        unoptimized
        draggable={false}
        className={`max-w-none select-none ${logo.invert ? "brightness-0 invert" : ""}`}
        style={{
          width: px(strip.width),
          height: px(strip.height),
          transform: `translateX(${px(2 - logo.x)})`,
        }}
      />
    </span>
  );
}

export function WorkAtSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionMotion(sectionRef, ({ gsap, root, finePointer }) => {
    const board = root.querySelector<HTMLElement>("[data-workat-board]");
    const chips = gsap.utils.toArray<HTMLElement>("[data-chip]");
    if (!board || chips.length === 0) return;

    const stroke = root.querySelector<SVGPathElement>("[data-workat-stroke]");
    if (stroke) {
      gsap.fromTo(
        stroke,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.inOut",
          scrollTrigger: { trigger: stroke, start: "top 82%", once: true },
        },
      );
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: board,
        start: "top 92%",
        end: "top 22%",
        scrub: 0.9,
        invalidateOnRefresh: true,
      },
    });
    chips.forEach((chip, i) => {
      tl.fromTo(
        chip,
        {
          x: () => (noise(i, 1) - 0.5) * board.offsetWidth * 0.9,
          y: () => (noise(i, 2) - 0.2) * board.offsetHeight * 0.9,
          rotation: (noise(i, 3) - 0.5) * 80,
          scale: 0.45 + noise(i, 4) * 0.4,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        noise(i, 5) * 0.45,
      );
    });

    if (!finePointer) return;
    const inners = chips.map((chip) => {
      const inner = chip.querySelector<HTMLElement>("[data-chip-inner]") ?? chip;
      return {
        chip,
        x: gsap.quickTo(inner, "x", { duration: 0.5, ease: "power3.out" }),
        y: gsap.quickTo(inner, "y", { duration: 0.5, ease: "power3.out" }),
        o: gsap.quickTo(inner, "opacity", {
          duration: 0.4,
          ease: "power2.out",
        }),
      };
    });
    const onMove = (event: PointerEvent) => {
      for (const item of inners) {
        const box = item.chip.getBoundingClientRect();
        const dx = box.left + box.width / 2 - event.clientX;
        const dy = box.top + box.height / 2 - event.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        const push = Math.max(0, 1 - dist / 150) * 22;
        item.x((dx / dist) * push);
        item.y((dy / dist) * push);
        item.o(dist < 240 ? 1 : 0.42);
      }
    };
    const onLeave = () => {
      for (const item of inners) {
        item.x(0);
        item.y(0);
        item.o(1);
      }
    };
    board.addEventListener("pointermove", onMove);
    board.addEventListener("pointerleave", onLeave);
    return () => {
      board.removeEventListener("pointermove", onMove);
      board.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-cs-paper pb-14 pt-20 text-cs-on-paper [--s:0.42] sm:pb-16 sm:pt-28 sm:[--s:0.5] lg:pb-20 lg:pt-32 xl:[--s:0.56]">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
            Our alumni{" "}
            <span className="relative inline-block whitespace-nowrap text-primary">
              work at
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                fill="none"
                className="absolute -bottom-[0.2em] left-0 h-[0.22em] w-full overflow-visible">
                <path
                  data-workat-stroke
                  d="M3 8 C 32 2, 58 11, 92 6 S 150 3, 197 7"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1"
                />
              </svg>
            </span>
          </h2>
          <p className="max-w-[440px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px] lg:pb-2">
            Coding Sharks graduates build products at startups, product companies and global tech firms.
          </p>
        </div>

        <div
          data-workat-board
          className="relative mt-12 overflow-hidden rounded-[28px] bg-cs-ink p-4 text-cs-on-ink sm:mt-16 sm:p-6 lg:rounded-[36px] lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--cs-on-ink)_11%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--cs-on-ink)_11%,transparent)_1px,transparent_1px)] bg-size-[36px_36px] [mask-image:radial-gradient(ellipse_80%_75%_at_50%_45%,black,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_srgb,var(--brand-color)_55%,transparent)_1.5px,transparent_1.5px)] bg-size-[36px_36px] bg-position-[18px_18px] opacity-80 [mask-image:linear-gradient(135deg,black,transparent_60%)]"
          />
          <ul
            aria-label="Companies where our alumni work"
            className="relative grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-7 xl:grid-cols-8">
            {CHIPS.map(({ strip, logo }, index) => (
              <li
                key={`${strip.src}-${logo.x}`}
                data-chip
                className={`will-change-transform ${index >= 12 ? "hidden sm:block" : ""}`}>
                <div
                  data-chip-inner
                  className="grid h-14 place-items-center overflow-hidden rounded-2xl bg-cs-ink-2/85 px-2 ring-1 ring-inset ring-cs-on-ink/8 transition-colors duration-300 hover:ring-primary/60 sm:h-16 lg:h-[72px]">
                  <LogoSprite strip={strip} logo={logo} />
                </div>
              </li>
            ))}
            <li data-chip className="col-span-3 will-change-transform lg:col-span-5 xl:col-span-3">
              <button
                type="button"
                onClick={() => openLeadModal("work-at")}
                className="group flex h-14 w-full items-center justify-between gap-3 rounded-2xl bg-primary px-5 text-left text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-cs-accent-press focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:h-16 lg:h-[72px] lg:px-7 lg:text-[18px]">
                Your offer could be next
                <ArrowRight
                  className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
