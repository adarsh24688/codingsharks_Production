"use client";

import { Suspense, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const DEFAULT_WORKSHOP_WHATSAPP =
  "https://chat.whatsapp.com/JXIDT8qcBOE0yNskd25wb1?mode=gi_t";

const WORKSHOP_WHATSAPP_LINKS: Record<string, string> = {
  "/workshops/ai-native-developer-program":
    "https://chat.whatsapp.com/J3XubumChgoHl9BWfs7mDC",
};

const PROGRAM_PHOTO = "/workshops/ai-native-developer-program/img/hero-classroom-900.webp";
const DEFAULT_PHOTO = "/images/hero/workshops-hero.jpg";

type Variant = "program" | "workshop" | "lead";

interface VariantCopy {
  stub: string;
  title: string;
  accent: string;
  body: string;
  next: string[];
}

const COPY: Record<Variant, VariantCopy> = {
  program: {
    stub: "Seat reserved",
    title: "Your seat is",
    accent: "reserved.",
    body: "Your reservation payment is confirmed. Join the WhatsApp group now. Batch timings, class links and reminders go there first.",
    next: [
      "Our team calls you within 24 hours to confirm your batch.",
      "Your reservation amount is adjusted in the final fee and is refundable before the first class.",
      "Keep your phone close. We also message you on WhatsApp.",
    ],
  },
  workshop: {
    stub: "Registered",
    title: "You are",
    accent: "in.",
    body: "Your spot is saved. Join the WhatsApp group to get the joining link, reminders and resources before the session.",
    next: [
      "The joining link reaches you on WhatsApp before the session.",
      "Add the date to your calendar so you do not miss it.",
      "Questions? Ask in the group, our team replies there.",
    ],
  },
  lead: {
    stub: "Request received",
    title: "We have your",
    accent: "request.",
    body: "An advisor will call you within 24 hours on the number you shared. The call is free and there is no obligation.",
    next: [
      "An advisor reads your details before calling.",
      "You get a free one-on-one counselling call.",
      "You leave with a roadmap built for your goal.",
    ],
  },
};

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--ty-accent)" opacity="0.12" />
      <path
        d="M5.8 10.3l2.8 2.8 5.6-6"
        stroke="var(--ty-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThankYouContent() {
  const params = useSearchParams();
  const router = useRouter();
  const from = params.get("from") || "/";
  const source = params.get("source");
  const paid = params.get("paid") === "1";
  const isWorkshop = source === "workshop";
  const pdf = isWorkshop ? null : params.get("pdf");
  const courseName = params.get("course") || "";
  const variant: Variant = isWorkshop ? (paid ? "program" : "workshop") : "lead";
  const copy = COPY[variant];
  const cleanFrom = from.split("?")[0].replace(/\/$/, "");

  const whatsappHref = WORKSHOP_WHATSAPP_LINKS[cleanFrom] ?? DEFAULT_WORKSHOP_WHATSAPP;
  const photo = WORKSHOP_WHATSAPP_LINKS[cleanFrom] ? PROGRAM_PHOTO : DEFAULT_PHOTO;

  const backLabel = from.startsWith("/workshops")
    ? "Back to the workshop page"
    : from === "/"
      ? "Back to home"
      : "Go back";

  const downloadedRef = useRef(false);

  useEffect(() => {
    if (!pdf || downloadedRef.current) return;
    downloadedRef.current = true;
    const t = setTimeout(() => {
      const a = document.createElement("a");
      a.href = pdf;
      a.download = pdf.split("/").pop() ?? "brochure.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 600);
    return () => clearTimeout(t);
  }, [pdf]);

  return (
    <div
      className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pt-32"
      style={
        {
          "--ty-bg": "#0b0907",
          "--ty-paper": "#fffaf4",
          "--ty-text": "#1b1612",
          "--ty-muted": "#665c53",
          "--ty-accent": "#d24509",
          "--ty-accent-2": "#ff7a3d",
          "--ty-wa": "#1fa855",
          background: "var(--ty-bg)",
        } as React.CSSProperties
      }>
      <Image
        src={photo}
        alt=""
        fill
        priority
        sizes="100vw"
        className="ty-photo object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,9,7,0.82) 0%, rgba(11,9,7,0.74) 45%, rgba(11,9,7,0.95) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(210,69,9,0.28) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="ty-rise" style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.55))" }}>
          <div className="ty-ticket flex flex-col md:flex-row">
            <div
              className="flex-1 px-6 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-11 md:px-12 md:py-12"
              style={{ background: "var(--ty-paper)", color: "var(--ty-text)" }}>
              <p className="text-sm font-medium" style={{ color: "var(--ty-muted)" }}>
                Coding Sharks, Indore
              </p>
              <h1
                className="mt-3 text-[2.6rem] font-bold leading-[1.02] sm:text-6xl"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}>
                {copy.title}{" "}
                <span style={{ color: "var(--ty-accent)" }}>{copy.accent}</span>
              </h1>
              <p
                className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--ty-muted)" }}>
                {copy.body}
              </p>

              {isWorkshop && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-6 sm:py-5"
                  style={{
                    background: "var(--ty-wa)",
                    boxShadow: "0 18px 34px -16px var(--ty-wa)",
                    outlineColor: "var(--ty-wa)",
                  }}>
                  <WhatsAppIcon />
                  <span className="flex-1 text-left">
                    <span className="block text-base font-extrabold leading-tight sm:text-lg">
                      Join the WhatsApp group
                    </span>
                    <span className="block text-sm text-white/85">
                      Updates and class links come here first
                    </span>
                  </span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1">
                    <path
                      d="M4 10h11M10.5 5l5 5-5 5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}

              {pdf && (
                <div
                  className="mt-6 flex flex-col gap-2 rounded-xl px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  style={{ background: "rgba(210,69,9,0.08)" }}>
                  <span>
                    {courseName ? `${courseName} brochure` : "Your brochure"} is downloading.
                    Check your Downloads folder.
                  </span>
                  <a
                    href={pdf}
                    download
                    className="shrink-0 font-semibold underline underline-offset-2"
                    style={{ color: "var(--ty-accent)" }}>
                    Download again
                  </a>
                </div>
              )}

              <div className="mt-9 border-t pt-7" style={{ borderColor: "rgba(27,22,18,0.1)" }}>
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}>
                  What happens next
                </h2>
                <ul className="mt-4 space-y-3.5">
                  {copy.next.map((line, i) => (
                    <li
                      key={line}
                      className="ty-line flex items-start gap-3 text-[15px] leading-relaxed"
                      style={{ animationDelay: `${0.9 + i * 0.12}s` }}>
                      <span className="mt-0.5 shrink-0">
                        <TickIcon />
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="ty-stub relative flex shrink-0 flex-row items-center gap-5 px-6 text-white md:w-[260px] md:flex-col md:justify-center md:gap-6 md:px-8 md:py-12 md:text-center"
              style={{
                background:
                  "linear-gradient(160deg, var(--ty-accent-2) 0%, var(--ty-accent) 70%)",
              }}>
              <div className="ty-perf" aria-hidden="true" />
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-full md:size-24"
                style={{
                  background: "rgba(255,255,255,0.16)",
                  border: "2px solid rgba(255,255,255,0.55)",
                }}>
                <svg viewBox="0 0 44 44" fill="none" className="size-8 md:size-12" aria-hidden="true">
                  <path
                    className="ty-check"
                    d="M10 22.5l8 8 16-17"
                    stroke="white"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-2xl font-extrabold leading-tight md:text-[1.7rem]"
                  style={{ fontFamily: "var(--font-heading)" }}>
                  {copy.stub}
                </p>
                {paid && isWorkshop && (
                  <p className="mt-1 text-sm font-semibold text-white/85">Payment received</p>
                )}
                <p className="mt-1 text-sm text-white/75">
                  {new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ty-back mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => router.push(from)}
            className="rounded-full px-6 py-3 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              border: "1.5px solid rgba(255,255,255,0.28)",
              outlineColor: "var(--ty-accent-2)",
            }}>
            {backLabel}
          </button>
        </div>
      </div>

      <style>{`
        .ty-ticket {
          border-radius: 22px;
          overflow: hidden;
          --notch: 16px;
          -webkit-mask:
            radial-gradient(circle var(--notch) at 0 calc(100% - 128px), transparent 98%, #000) top left / 51% 100% no-repeat,
            radial-gradient(circle var(--notch) at 100% calc(100% - 128px), transparent 98%, #000) top right / 51% 100% no-repeat;
          mask:
            radial-gradient(circle var(--notch) at 0 calc(100% - 128px), transparent 98%, #000) top left / 51% 100% no-repeat,
            radial-gradient(circle var(--notch) at 100% calc(100% - 128px), transparent 98%, #000) top right / 51% 100% no-repeat;
        }
        .ty-stub { height: 128px; }
        .ty-perf {
          position: absolute;
          left: 20px;
          right: 20px;
          top: 0;
          border-top: 2px dashed rgba(255,255,255,0.55);
        }
        @media (min-width: 768px) {
          .ty-ticket {
            -webkit-mask:
              radial-gradient(circle var(--notch) at calc(100% - 260px) 0, transparent 98%, #000) top / 100% 51% no-repeat,
              radial-gradient(circle var(--notch) at calc(100% - 260px) 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
            mask:
              radial-gradient(circle var(--notch) at calc(100% - 260px) 0, transparent 98%, #000) top / 100% 51% no-repeat,
              radial-gradient(circle var(--notch) at calc(100% - 260px) 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
          }
          .ty-stub { height: auto; }
          .ty-perf {
            left: 0;
            right: auto;
            top: 22px;
            bottom: 22px;
            border-top: 0;
            border-left: 2px dashed rgba(255,255,255,0.55);
          }
        }
        .ty-photo { animation: tyZoom 9s ease-out both; }
        .ty-rise { animation: tyRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
        .ty-check {
          stroke-dasharray: 40;
          animation: tyDraw 0.55s ease 0.7s both;
        }
        .ty-line { animation: tyFade 0.45s ease both; }
        .ty-back { animation: tyFade 0.5s ease 1.2s both; }
        @keyframes tyZoom {
          from { transform: scale(1.12); }
          to { transform: scale(1); }
        }
        @keyframes tyRise {
          from { opacity: 0; transform: translateY(40px) rotate(-1.5deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes tyDraw {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes tyFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ty-photo, .ty-rise, .ty-line, .ty-back { animation: none; }
          .ty-check { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
