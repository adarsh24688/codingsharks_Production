"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, X } from "lucide-react";
import gsap from "gsap";

import nav from "@/data/nav.json";
import site from "@/data/site.json";
import codingLogo from "@/assets/images/coding-logo-white.png";
import codingLogoDark from "@/assets/images/Coding.png";

import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import type { NavData, NavWorkshop } from "@/lib/nav-data";

type MenuKey = "programs" | "workshops";
type PreviewKey = MenuKey | "placements" | "blog";
type NavLink = { label: string; href: string; menu?: string };

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const PREVIEWS: Record<PreviewKey, { image: string; alt: string }> = {
  programs: { image: "/images/sections/team-coding.webp", alt: "A team coding together at a wooden table" },
  placements: { image: "/images/sections/high-five.webp", alt: "Two colleagues high-five over a laptop" },
  workshops: { image: "/images/sections/whiteboard.webp", alt: "A woman at a whiteboard of sticky notes while her team watches" },
  blog: { image: "/images/sections/notes-writing.webp", alt: "A hand writing notes beside a coffee cup" },
};

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function previewOf(item: NavLink): PreviewKey {
  const key = item.menu ?? item.href.replace(/^\//, "");
  return key in PREVIEWS ? (key as PreviewKey) : "blog";
}

function upcoming(workshops: NavWorkshop[]) {
  const today = new Date().toISOString().slice(0, 10);
  return workshops
    .filter((w) => w.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
}

function formatWhen(w: NavWorkshop) {
  const [h, m] = w.timeFrom.split(":").map(Number);
  const time = new Date(2000, 0, 1, h, m).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${dateFormat.format(new Date(`${w.date}T00:00:00`))}, ${time}`;
}

function SubLinks({
  kind,
  data,
  onNavigate,
}: {
  kind: MenuKey;
  data: NavData;
  onNavigate: () => void;
}) {
  const row = `group flex items-center justify-between gap-4 rounded-md py-2.5 text-[16px] text-cs-on-ink/80 transition-colors duration-150 hover:text-cs-on-ink ${focusRing}`;
  if (kind === "programs") {
    return (
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {data.programs.map((p) => (
          <li key={p.slug} className="border-b border-cs-on-ink/10">
            <Link href={`/courses/${p.slug}`} onClick={onNavigate} className={row}>
              <span className="min-w-0 leading-snug">{p.title}</span>
              <ArrowUpRight
                aria-hidden
                className="size-4 shrink-0 text-cs-on-ink/40 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  const next = upcoming(data.workshops);
  if (next.length === 0) {
    return <p className="py-2.5 text-[16px] text-cs-on-ink/72">New workshop dates are on the way.</p>;
  }
  return (
    <ul>
      {next.map((w) => (
        <li key={w.slug} className="border-b border-cs-on-ink/10">
          <Link href={`/workshops/${w.slug}`} onClick={onNavigate} className={row}>
            <span className="min-w-0">
              <span className="block truncate">{w.title}</span>
              <span className="mt-0.5 block text-[13px] text-cs-on-ink/56">
                {formatWhen(w)}, {w.mode}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-4 shrink-0 text-cs-on-ink/40 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Preview({
  kind,
  shown,
  armed,
  data,
  onNavigate,
}: {
  kind: PreviewKey;
  shown: boolean;
  armed: boolean;
  data: NavData;
  onNavigate: () => void;
}) {
  const more = `mt-5 inline-flex items-center gap-2 rounded-sm text-[15px] font-semibold text-cs-on-ink underline decoration-cs-on-ink/30 underline-offset-[6px] transition-colors duration-150 hover:decoration-primary ${focusRing}`;
  return (
    <div
      inert={!shown}
      className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}>
      <div className="relative h-[42%] shrink-0 overflow-hidden">
        {armed ? (
          <Image
            src={PREVIEWS[kind].image}
            alt={PREVIEWS[kind].alt}
            fill
            loading="eager"
            sizes="40vw"
            className={`object-cover transition-transform duration-[900ms] ease-out ${shown ? "scale-100" : "scale-110"}`}
          />
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-7 xl:p-8">
        {kind === "programs" || kind === "workshops" ? (
          <>
            <SubLinks kind={kind} data={data} onNavigate={onNavigate} />
            <Link href={kind === "programs" ? "/courses" : "/workshops"} onClick={onNavigate} className={more}>
              {kind === "programs" ? "All programs" : "All workshops"}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </>
        ) : kind === "placements" ? (
          <>
            <p className="font-heading text-[64px] font-semibold leading-none tracking-[-0.04em] text-primary xl:text-[76px]">
              91%+
            </p>
            <p className="mt-2 text-[16px] text-cs-on-ink/80">
              placement rate, 50+ hiring partners and a top offer of ₹21 LPA.
            </p>
            <Link href="/placements" onClick={onNavigate} className={more}>
              See where students got placed
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </>
        ) : (
          <>
            <p className="max-w-[420px] font-heading text-[28px] font-medium leading-[1.12] tracking-[-0.02em] xl:text-[32px]">
              Notes, guides and interview prep from our engineers.
            </p>
            <Link href="/blog" onClick={onNavigate} className={more}>
              Read the blog
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function SiteMenu({
  open,
  setOpen,
  data,
  pathname,
  originRef,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: NavData;
  pathname: string;
  originRef: RefObject<HTMLButtonElement | null>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const shownOnce = useRef(false);
  const [preview, setPreview] = useState<PreviewKey>("programs");
  const [expanded, setExpanded] = useState<MenuKey | null>(null);
  const [armed, setArmed] = useState(false);
  if (open && !armed) setArmed(true);
  const links = nav.header.links as NavLink[];
  const headerHrefs = new Set(links.map((l) => l.href));
  const extras = nav.footer.company.filter((l) => !headerHrefs.has(l.href));
  const cta = nav.header.primaryCta;
  const close = () => setOpen(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      shownOnce.current = true;
      const box = originRef.current?.getBoundingClientRect();
      const x = box ? box.left + box.width / 2 : window.innerWidth - 48;
      const y = box ? box.top + box.height / 2 : 32;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 24;
      const html = document.documentElement;
      const previous = html.style.overflow;
      html.style.overflow = "hidden";

      timeline.current?.kill();
      const layers = root.querySelectorAll("[data-menu-layer]");
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.set(root, { visibility: "visible" });
      if (reduced) {
        tl.set(layers, { clipPath: "none" });
      } else {
        tl.fromTo(
          layers,
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${r}px at ${x}px ${y}px)`, duration: 0.8, stagger: 0.12 },
          0,
        )
          .fromTo(
            root.querySelectorAll("[data-menu-word]"),
            { yPercent: 115 },
            { yPercent: 0, duration: 0.85, stagger: 0.07, ease: "power4.out" },
            0.42,
          )
          .fromTo(
            root.querySelectorAll("[data-menu-fade]"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
            0.6,
          );
      }
      tl.call(() => closeRef.current?.focus({ preventScroll: true }), undefined, 0.1);
      timeline.current = tl;

      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        html.style.overflow = previous;
      };
    }

    if (!shownOnce.current) return;
    shownOnce.current = false;
    const tl = timeline.current;
    if (tl && !reduced) {
      tl.eventCallback("onReverseComplete", () => {
        gsap.set(root, { visibility: "hidden" });
      });
      tl.timeScale(1.8).reverse();
    } else {
      gsap.set(root, { visibility: "hidden" });
    }
    originRef.current?.focus({ preventScroll: true });
  }, [open, setOpen, originRef]);

  useEffect(
    () => () => {
      timeline.current?.kill();
    },
    [],
  );

  return (
    <div
      ref={rootRef}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className="invisible fixed inset-0 z-[60]">
      <div data-menu-layer className="absolute inset-0 bg-primary" />
      <div data-menu-layer className="absolute inset-0 bg-cs-ink text-cs-on-ink">
        <div className="flex h-full flex-col overflow-y-auto">
          <Container className="flex h-[88px] shrink-0 items-center justify-between gap-6">
            <Link href="/" onClick={close} aria-label={`${site.brand.name} home`} className={`shrink-0 rounded-sm ${focusRing}`}>
              <Image src={codingLogo} alt={site.brand.name} className="h-7 w-auto sm:h-8" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className={`group grid size-16 place-items-center rounded-full bg-primary text-white transition-transform duration-500 hover:scale-110 lg:size-[76px] ${focusRing}`}>
              <X className="size-6 transition-transform duration-500 group-hover:rotate-90" aria-hidden />
            </button>
          </Container>

          <Container className="grid flex-1 gap-10 pb-8 pt-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pt-8">
            <nav aria-label="Primary" className="flex flex-col lg:justify-center">
              <ul className="border-t border-cs-on-ink/10">
                {links.map((item) => {
                  const key = previewOf(item);
                  const menu = item.menu as MenuKey | undefined;
                  const active = isActive(pathname, item.href);
                  const lit = preview === key;
                  return (
                    <li key={item.href} className="border-b border-cs-on-ink/10">
                      <div className="flex items-center justify-between gap-4">
                        <Link
                          href={item.href}
                          onClick={close}
                          onPointerEnter={() => setPreview(key)}
                          onFocus={() => setPreview(key)}
                          aria-current={active ? "page" : undefined}
                          className={`group flex min-w-0 items-center gap-4 rounded-sm py-3 font-heading text-[44px] font-semibold leading-none tracking-[-0.04em] transition-colors duration-300 sm:text-[60px] lg:py-4 lg:text-[clamp(52px,8.4vh,100px)] ${
                            lit ? "text-cs-on-ink" : "text-cs-on-ink lg:text-cs-on-ink/32 lg:hover:text-cs-on-ink"
                          } ${focusRing}`}>
                          <span
                            aria-hidden
                            className={`hidden h-[0.07em] w-[0.6em] origin-left rounded-full bg-primary transition-transform duration-300 lg:block ${lit ? "scale-x-100" : "scale-x-0"}`}
                          />
                          <span className="block overflow-hidden pb-[0.08em]">
                            <span data-menu-word className="block">
                              {item.label}
                              {active ? <span className="text-primary">.</span> : null}
                            </span>
                          </span>
                        </Link>
                        {menu ? (
                          <button
                            type="button"
                            onClick={() => setExpanded((e) => (e === menu ? null : menu))}
                            aria-expanded={expanded === menu}
                            aria-label={`Show ${item.label.toLowerCase()}`}
                            className={`grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-inset ring-cs-on-ink/20 lg:hidden ${focusRing}`}>
                            <ChevronDown
                              aria-hidden
                              className={`size-5 transition-transform duration-300 ${expanded === menu ? "rotate-180" : ""}`}
                            />
                          </button>
                        ) : null}
                      </div>
                      {menu && expanded === menu ? (
                        <div className="pb-5 lg:hidden">
                          <SubLinks kind={menu} data={data} onNavigate={close} />
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
              {extras.length > 0 ? (
                <ul data-menu-fade className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
                  {extras.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={close}
                        className={`rounded-sm text-[15px] text-cs-on-ink/64 transition-colors duration-150 hover:text-cs-on-ink ${focusRing}`}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </nav>

            <div data-menu-fade className="relative hidden min-h-[440px] overflow-hidden rounded-[28px] bg-cs-ink-2 lg:block">
              {(Object.keys(PREVIEWS) as PreviewKey[]).map((kind) => (
                <Preview key={kind} kind={kind} shown={preview === kind} armed={armed} data={data} onNavigate={close} />
              ))}
            </div>
          </Container>

          <Container className="shrink-0 pb-8">
            <div
              data-menu-fade
              className="flex flex-col gap-6 border-t border-cs-on-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1 text-[15px]">
                <a href={`tel:${site.contact.phoneE164}`} className={`w-fit rounded-sm font-semibold hover:text-primary ${focusRing}`}>
                  {site.contact.phone}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className={`w-fit rounded-sm text-cs-on-ink/64 hover:text-cs-on-ink ${focusRing}`}>
                  {site.contact.email}
                </a>
                <span className="text-cs-on-ink/48">
                  {site.address.city}, {site.address.region}
                </span>
              </div>
              <div className="flex flex-col items-stretch gap-2 sm:items-end">
                <button
                  type="button"
                  onClick={() => {
                    close();
                    openLeadModal("menu");
                  }}
                  className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-cs-accent-press ${focusRing}`}>
                  {cta.label}
                  <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden />
                </button>
                <p className="text-center text-[13px] text-cs-on-ink/56 sm:text-right">{cta.note}</p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

function toneAt(header: HTMLElement | null): "light" | "dark" {
  const x = 48;
  const y = 44;
  for (const hit of document.elementsFromPoint(x, y)) {
    if (header?.contains(hit) || hit.closest("#site-menu")) continue;
    let node: Element | null = hit;
    while (node && node !== document.documentElement) {
      const marked = (node as HTMLElement).dataset?.headerTone;
      if (marked === "dark" || marked === "light") return marked;
      const bg = getComputedStyle(node).backgroundColor;
      const parts = bg.match(/[\d.]+/g)?.map(Number) ?? [];
      const alpha = parts.length > 3 ? parts[3] : parts.length === 3 ? 1 : 0;
      if (alpha > 0.5) {
        const [r, g, b] = parts;
        return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140 ? "dark" : "light";
      }
      node = node.parentElement;
    }
  }
  return "dark";
}

export function SiteHeader({ nav: data }: { nav: NavData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");
  const menuRef = useRef<HTMLButtonElement>(null);
  const spinRef = useRef<SVGSVGElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const sample = () => {
      frame = 0;
      const y = window.scrollY;
      if (spinRef.current) spinRef.current.style.transform = `rotate(${y * 0.14}deg)`;
      setTone(toneAt(headerRef.current));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sample);
    };
    sample();
    const settle = window.setTimeout(sample, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const button = menuRef.current;
    if (!button || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = gsap.quickTo(button, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(button, "y", { duration: 0.6, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      const box = button.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const near = Math.hypot(dx, dy) < 130;
      x(near ? dx * 0.32 : 0);
      y(near ? dy * 0.32 : 0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[88px]">
        <Container className="flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.brand.name} home`}
            className={`group pointer-events-auto relative block rounded-sm ${focusRing}`}>
            <Image
              src={codingLogoDark}
              alt={site.brand.name}
              priority
              className={`-my-2 -ml-[7px] h-12 w-auto transition-opacity duration-500 sm:h-[52px] ${tone === "light" ? "opacity-100" : "opacity-0"}`}
            />
            <Image
              src={codingLogo}
              alt=""
              aria-hidden
              priority
              className={`absolute left-0 top-1/2 h-8 w-auto -translate-y-1/2 transition-opacity duration-500 sm:h-9 ${tone === "dark" ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          <button
            ref={menuRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
            className={`group pointer-events-auto relative grid size-16 place-items-center rounded-full lg:size-[76px] ${focusRing}`}>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-110"
            />
            <svg ref={spinRef} aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full text-white">
              <defs>
                <path id="menu-orbit" d="M50 50 m-35 0 a35 35 0 1 1 70 0 a35 35 0 1 1 -70 0" />
              </defs>
              <text className="fill-current font-heading text-[12.5px] font-semibold uppercase">
                <textPath href="#menu-orbit" textLength="216" lengthAdjust="spacing">
                  Menu · Menu · Menu · Menu ·
                </textPath>
              </text>
            </svg>
            <span aria-hidden className="relative flex w-4 flex-col gap-[3px] lg:w-5">
              <span className="h-0.5 rounded-full bg-white transition-transform duration-300 group-hover:translate-x-[3px]" />
              <span className="h-0.5 rounded-full bg-white transition-transform duration-300 group-hover:-translate-x-[3px]" />
            </span>
          </button>
        </Container>
      </header>
      <SiteMenu open={open} setOpen={setOpen} data={data} pathname={pathname} originRef={menuRef} />
    </>
  );
}
