"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, Instagram, Linkedin, Youtube } from "lucide-react";

import site from "@/data/site.json";
import { Container } from "@/components/layout/container";
import { useSectionMotion } from "./use-section-motion";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

type Photo = { src: string; alt: string; title: string; tall?: boolean };

const PHOTOS: Photo[] = [
  {
    src: "/images/office/office6.jpg",
    alt: "A batch group photo inside the classroom",
    title: "A batch, all together",
  },
  {
    src: "/images/office/office4.jpg",
    alt: "Students working on laptops in a Coding Sharks classroom",
    title: "Class in session",
    tall: true,
  },
  {
    src: "/images/office/office7.jpg",
    alt: "Students cheering in a group selfie at a Coding Sharks event",
    title: "Event day",
  },
  {
    src: "/images/office/office9.jpg",
    alt: "A Coding Sharks team member explaining a point during a session",
    title: "One more way to explain it",
    tall: true,
  },
  {
    src: "/images/office/office3.jpg",
    alt: "Close view of a student writing code on a laptop",
    title: "Heads down, writing code",
  },
  {
    src: "/images/office/office10.jpg",
    alt: "Students gathered at a Coding Sharks event stall in the evening",
    title: "The evening stall",
    tall: true,
  },
  {
    src: "/images/office/office5.jpg",
    alt: "Four students giving a thumbs up around a shared desk",
    title: "Thumbs up at the shared desk",
  },
  {
    src: "/images/office/office1.jpg",
    alt: "Reception and lounge at the Coding Sharks campus",
    title: "Reception and lounge",
    tall: true,
  },
  { src: "/images/office/office2.jpg", alt: "Front desk with the Coding Sharks sign", title: "The front desk" },
  {
    src: "/images/office/office8.jpg",
    alt: "Two Coding Sharks team members standing side by side",
    title: "The team",
    tall: true,
  },
];

const COLUMNS = [
  { shift: 0, speed: 60, up: true, show: "" },
  { shift: 3, speed: 72, up: false, show: "" },
  { shift: 6, speed: 54, up: true, show: "" },
  { shift: 8, speed: 66, up: false, show: "hidden sm:block" },
  { shift: 2, speed: 78, up: true, show: "hidden lg:block" },
  { shift: 5, speed: 64, up: false, show: "hidden lg:block" },
  { shift: 7, speed: 70, up: true, show: "hidden xl:block" },
];

const rotate = (list: Photo[], by: number) => [...list.slice(by), ...list.slice(0, by)];

const LINKS = [
  {
    label: "Follow us on Instagram",
    note: "Campus days and batch moments",
    href: site.socials.instagram,
    icon: Instagram,
  },
  {
    label: "Coding Sharks on LinkedIn",
    note: "Placements and hiring news",
    href: site.socials.linkedin,
    icon: Linkedin,
  },
  { label: "Watch us on YouTube", note: "Classes, talks and walkthroughs", href: site.socials.youtube, icon: Youtube },
];

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionMotion(sectionRef, ({ gsap, ScrollTrigger, root }) => {
    gsap.fromTo(
      "[data-community-fill]",
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: "[data-community-fill]", start: "top 88%", end: "top 42%", scrub: 0.6 },
      },
    );

    const wall = root.querySelector<HTMLElement>("[data-wall]");
    if (!wall) return;

    const loops = gsap.utils.toArray<HTMLElement>("[data-wall-track]").map((track, i) => {
      const column = COLUMNS[i % COLUMNS.length];
      return gsap.fromTo(
        track,
        { yPercent: column.up ? 0 : -50 },
        { yPercent: column.up ? -50 : 0, duration: column.speed, ease: "none", repeat: -1 },
      );
    });

    gsap.fromTo(
      wall.querySelector("[data-wall-tilt]"),
      { rotationX: 38, rotationZ: -14, scale: 1.25, opacity: 0 },
      {
        rotationX: 16,
        rotationZ: -7,
        scale: 0.96,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: wall, start: "top 85%", once: true },
      },
    );

    const columns = gsap.utils.toArray<HTMLElement>("[data-wall-column]");
    const rates = loops.map(() => ({ value: 1 }));
    const apply = (i: number) => loops[i]?.timeScale(rates[i].value);
    const applyAll = () => loops.forEach((_, i) => apply(i));
    const handlers = columns.map((column, i) => {
      const enter = () =>
        gsap.to(rates[i], { value: 0.45, duration: 0.6, ease: "power2.out", onUpdate: () => apply(i) });
      const leave = () => gsap.to(rates[i], { value: 1, duration: 0.6, ease: "power2.out", onUpdate: () => apply(i) });
      column.addEventListener("pointerenter", enter);
      column.addEventListener("pointerleave", leave);
      return { column, enter, leave };
    });

    ScrollTrigger.create({
      trigger: wall,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => loops.forEach((loop) => (self.isActive ? loop.play() : loop.pause())),
      onUpdate: (self) => {
        const boost = Math.min(3, Math.abs(self.getVelocity()) / 600);
        if (boost > 0.2) {
          loops.forEach((loop, i) => loop.timeScale(rates[i].value + boost));
          gsap.delayedCall(0.25, applyAll);
        }
      },
    });

    return () => {
      for (const { column, enter, leave } of handlers) {
        column.removeEventListener("pointerenter", enter);
        column.removeEventListener("pointerleave", leave);
      }
    };
  });

  return (
    <section ref={sectionRef} className="overflow-hidden bg-cs-paper py-16 text-cs-on-paper sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
            Life on{" "}
            <span className="relative inline-block">
              <span className="text-transparent [-webkit-text-stroke:1.5px_var(--brand-color)]">campus</span>
              <span
                aria-hidden="true"
                data-community-fill
                className="absolute inset-0 text-primary will-change-[clip-path]">
                campus
              </span>
            </span>
          </h2>
          <p className="max-w-[440px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px] lg:pb-2">
            Classrooms, batch photos and event days from our campus in {site.address.city}.
          </p>
        </div>
      </Container>

      <div
        data-wall
        role="region"
        aria-label="Campus photos"
        className="relative mt-10 h-[440px] overflow-hidden [perspective:2000px] sm:h-[520px] lg:mt-12 lg:h-[580px]">
        <div
          data-wall-tilt
          style={{ transform: "rotateX(16deg) rotateZ(-7deg) scale(0.96)" }}
          className="absolute inset-x-[-6%] -top-[20%] -bottom-[20%] grid grid-cols-3 gap-3 px-3 will-change-transform sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 xl:grid-cols-7">
          {COLUMNS.map((column, c) => (
            <div key={c} data-wall-column className={`overflow-hidden ${column.show}`}>
              <ul data-wall-track className="flex flex-col gap-3 will-change-transform sm:gap-4">
                {[0, 1].flatMap((copy) =>
                  rotate(PHOTOS, column.shift).map((photo) => (
                    <li
                      key={`${copy}-${photo.src}`}
                      aria-hidden={copy > 0 || c > 0 ? true : undefined}
                      className="group relative">
                      <div
                        className={`relative overflow-hidden rounded-[14px] bg-cs-ink ${photo.tall ? "aspect-[4/5]" : "aspect-[3/2]"}`}>
                        <Image
                          src={photo.src}
                          alt={copy > 0 || c > 0 ? "" : photo.alt}
                          fill
                          sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 27vw, 36vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <span className="absolute inset-x-2 bottom-2 translate-y-2 rounded-full bg-cs-ink/80 px-3 py-1.5 text-center text-[12px] font-medium text-cs-on-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {photo.title}
                        </span>
                      </div>
                    </li>
                  )),
                )}
              </ul>
            </div>
          ))}
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-cs-paper to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-cs-paper to-transparent"
        />
      </div>

      <Container>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {LINKS.map(({ label, note, href, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 rounded-[18px] bg-cs-ink p-4 text-cs-on-ink transition-colors duration-300 hover:bg-primary sm:p-5 ${focusRing}`}>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-white transition-colors duration-300 group-hover:bg-cs-ink">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-tight">{label}</span>
                  <span className="mt-1 block text-[13px] text-cs-on-ink/64 transition-colors duration-300 group-hover:text-white/85">
                    {note}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-cs-on-ink/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
