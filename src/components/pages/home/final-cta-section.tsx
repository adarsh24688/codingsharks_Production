"use client";

import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight } from "lucide-react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import { useSectionMotion } from "./use-section-motion";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const CARDS = [
  {
    src: "/images/sections/high-five.webp",
    alt: "Two colleagues high-five over a laptop",
    place: "relative w-[36%] lg:absolute lg:left-[1.5vw] lg:top-[8%] lg:w-[17vw] lg:max-w-[280px]",
    tilt: "-rotate-6",
    speed: 80,
    depth: 1.3,
  },
  {
    src: "/images/sections/team-coding.webp",
    alt: "A team coding together at a wooden table",
    place: "relative -ml-[4%] mt-7 w-[36%] lg:absolute lg:right-[2vw] lg:top-[10%] lg:ml-0 lg:mt-0 lg:w-[16vw] lg:max-w-[260px]",
    tilt: "rotate-[5deg]",
    speed: 45,
    depth: 0.8,
  },
  {
    src: "/images/sections/friends-view.webp",
    alt: "Friends from behind with arms over shoulders, looking at a view",
    place: "relative -ml-[4%] w-[36%] lg:absolute lg:left-[2.5vw] lg:top-[66%] lg:ml-0 lg:w-[16vw] lg:max-w-[260px]",
    tilt: "rotate-[4deg]",
    speed: 60,
    depth: 1,
  },
  {
    src: "/images/sections/coder-focus.webp",
    alt: "A developer concentrating on code at an office desk",
    place: "hidden lg:absolute lg:right-[1.5vw] lg:top-[40%] lg:block lg:w-[17vw] lg:max-w-[280px]",
    tilt: "rotate-[-4deg]",
    speed: 90,
    depth: 1.3,
  },
  {
    src: "/images/sections/crowd.webp",
    alt: "Top view of a large crowd at an event",
    place: "hidden lg:absolute lg:left-[4vw] lg:top-[40%] lg:block lg:w-[14vw] lg:max-w-[230px]",
    tilt: "rotate-[-3deg]",
    speed: 35,
    depth: 0.6,
  },
  {
    src: "/images/sections/handshake.webp",
    alt: "A handshake across a desk",
    place: "hidden lg:absolute lg:right-[5vw] lg:top-[70%] lg:block lg:w-[13vw] lg:max-w-[215px]",
    tilt: "rotate-[7deg]",
    speed: 30,
    depth: 0.5,
  },
];

const WORD = "Coding Sharks";

type Mover = { x: (value: number) => void; y: (value: number) => void; depth: number };

export function FinalCtaSection() {
  const { finalCta } = home;

  const sectionRef = useRef<HTMLElement>(null);
  const depthRef = useRef<Mover[]>([]);
  const magnetRef = useRef<Mover | null>(null);

  useSectionMotion(sectionRef, ({ gsap, root, finePointer }) => {
    gsap.from("[data-cta-line]", {
      yPercent: 110,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.12,
      scrollTrigger: { trigger: "[data-cta-title]", start: "top 84%", once: true },
    });

    gsap.from("[data-cta-fade]", {
      opacity: 0,
      y: 22,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.35,
      scrollTrigger: { trigger: "[data-cta-title]", start: "top 84%", once: true },
    });

    gsap.from("[data-cta-photo]", {
      opacity: 0,
      scale: 0.8,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: "top 78%", once: true },
    });

    gsap.utils.toArray<HTMLElement>("[data-cta-card]").forEach((card) => {
      const speed = Number(card.dataset.ctaCard) || 0;
      const travel = () => speed * (window.innerWidth < 1024 ? 0.22 : 1);
      gsap.fromTo(
        card,
        { y: () => travel() },
        {
          y: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    gsap.fromTo(
      "[data-cta-word]",
      { xPercent: 0 },
      {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 },
      },
    );

    if (!finePointer) return;

    depthRef.current = gsap.utils.toArray<HTMLElement>("[data-cta-depth]").map((layer) => ({
      x: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3.out" }),
      y: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3.out" }),
      depth: Number(layer.dataset.ctaDepth) || 1,
    }));

    const magnet = root.querySelector<HTMLElement>("[data-cta-magnet]");
    if (magnet) {
      magnetRef.current = {
        x: gsap.quickTo(magnet, "x", { duration: 0.45, ease: "power3.out" }),
        y: gsap.quickTo(magnet, "y", { duration: 0.45, ease: "power3.out" }),
        depth: 1,
      };
    }
  });

  const onSectionMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    for (const layer of depthRef.current) {
      layer.x(-x * 14 * layer.depth);
      layer.y(-y * 12 * layer.depth);
    }
  };

  const onSectionLeave = () => {
    for (const layer of depthRef.current) {
      layer.x(0);
      layer.y(0);
    }
  };

  const onMagnetMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const magnet = magnetRef.current;
    if (!magnet || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    magnet.x(Math.max(-10, Math.min(10, x * 0.16)));
    magnet.y(Math.max(-6, Math.min(6, y * 0.22)));
  };

  const onMagnetLeave = () => {
    magnetRef.current?.x(0);
    magnetRef.current?.y(0);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onSectionMove}
      onPointerLeave={onSectionLeave}
      className="relative isolate overflow-hidden bg-cs-ink pt-20 text-cs-on-ink sm:pt-24 lg:pt-44">
      <div
        data-cta-cluster
        className="pointer-events-none mx-auto mb-14 flex max-w-[560px] items-start justify-center px-5 sm:mb-16 lg:absolute lg:inset-0 lg:-z-10 lg:mb-0 lg:block lg:max-w-none lg:px-0">
        {CARDS.map((card) => (
          <div key={card.src} data-cta-card={card.speed} className={`will-change-transform ${card.place}`}>
            <div data-cta-depth={card.depth} className="will-change-transform">
              <div data-cta-photo className={`relative aspect-4/3 overflow-hidden rounded-[20px] ${card.tilt}`}>
                <Image src={card.src} alt={card.alt} fill sizes="(min-width: 1024px) 17vw, 36vw" className="object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Container>
        <div className="mx-auto flex max-w-[560px] flex-col items-center text-center xl:max-w-[720px] 2xl:max-w-[880px]">
          <h2
            data-cta-title
            className="font-heading text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-balance sm:text-[52px] lg:text-[60px] xl:text-[72px] 2xl:text-[92px]">
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <span data-cta-line className="block will-change-transform">
                {finalCta.headline1}
              </span>
            </span>{" "}
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <span data-cta-line className="block text-primary will-change-transform">
                {finalCta.headline2}
              </span>
            </span>
          </h2>

          <p data-cta-fade className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-cs-on-ink/76 sm:mt-8 sm:text-[17px]">
            {finalCta.subline}
          </p>

          <div data-cta-fade className="mt-9 flex w-full flex-col items-center sm:mt-11 sm:w-auto">
            <div onPointerMove={onMagnetMove} onPointerLeave={onMagnetLeave} className="-m-5 w-[calc(100%+2.5rem)] p-5 sm:w-auto">
              <button
                type="button"
                data-cta-magnet
                onClick={() => openLeadModal("home-final")}
                className={`group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-primary px-9 text-base font-semibold text-white transition-colors duration-150 will-change-transform hover:bg-cs-accent-press sm:h-16 sm:w-auto sm:px-12 sm:text-[17px] ${focusRing}`}>
                {finalCta.cta.label}
                <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>
            </div>
            <p className="mt-4 text-[13px] text-cs-on-ink/60">{finalCta.cta.note}</p>
          </div>
        </div>
      </Container>

      <div aria-hidden="true" className="pointer-events-none -mb-[2.5vw] mt-20 overflow-hidden select-none lg:mt-28">
        <div
          data-cta-word
          className="w-max font-heading text-[16vw] leading-[0.9] font-medium tracking-[-0.04em] whitespace-nowrap text-cs-on-ink/6 will-change-transform">
          {WORD} {WORD} {WORD}
        </div>
      </div>
    </section>
  );
}
