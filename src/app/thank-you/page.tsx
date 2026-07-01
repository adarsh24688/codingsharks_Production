"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import codingLogo from "@/assets/images/Coding_white.png";

const REDIRECT_SECS = 60; // 1 minute for workshop source

function ThankYouContent() {
  const params = useSearchParams();
  const router = useRouter();
  const from = params.get("from") || "/";
  const source = params.get("source");
  const pdf = params.get("pdf"); // e.g. "/pdfs/Data-Analytics.pdf"
  const courseName = params.get("course") || "";
  const isWorkshop = source === "workshop";

  const [count, setCount] = useState(isWorkshop ? REDIRECT_SECS : 3);
  const downloadedRef = useRef(false);

  /* trigger PDF download once */
  useEffect(() => {
    if (!pdf || downloadedRef.current) return;
    downloadedRef.current = true;
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = pdf;
      a.download = pdf.split("/").pop() ?? "brochure.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 600);
  }, [pdf]);

  /* countdown + redirect */
  useEffect(() => {
    if (count <= 0) {
      router.push(from);
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, from, router]);

  const progress = isWorkshop
    ? ((REDIRECT_SECS - count) / REDIRECT_SECS) * 100
    : ((3 - count) / 3) * 100;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#0a0a0a" }}>
      {/* ── Background glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,107,44,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "60vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse at center bottom, rgba(255,107,44,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Animated sparks ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              background: `rgba(255,${80 + i * 20},44,${0.5 - i * 0.06})`,
              left: `${10 + i * 14}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `floatSpark ${3 + i * 0.7}s ease-in-out ${i * 0.4}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── Card ── */}
      <div
        className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center text-center"
        style={{
          animation: "fadeUp 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
        }}>
        {/* Logo */}
        <div className="mb-10">
          <Image
            src={codingLogo}
            alt="CodingSharks"
            width={140}
            height={46}
            className="h-9 w-auto mx-auto opacity-80"
          />
        </div>

        {/* Animated check circle */}
        <div className="relative mb-8">
          {/* Outer pulse ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "rgba(255,107,44,0.12)",
              animation: "pulseRing 2s ease-out infinite",
              transform: "scale(1.35)",
            }}
          />
          {/* Inner circle */}
          <div
            className="relative size-24 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,107,44,0.25) 0%, rgba(255,60,0,0.15) 100%)",
              border: "2px solid rgba(255,107,44,0.4)",
              boxShadow:
                "0 0 40px rgba(255,107,44,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              style={{ animation: "drawCheck 0.5s ease 0.3s both" }}>
              <path
                d="M9 22l9 9 17-17"
                stroke="#d24509"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset="0"
                style={{ animation: "drawCheck 0.5s ease 0.3s both" }}
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight"
          style={{
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
          }}>
          You&apos;re{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #d24509, #ff9a5c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            all set!
          </span>
        </h1>

        <p className="text-white/60 text-base leading-relaxed mb-2">
          {isWorkshop
            ? "Join our WhatsApp group for workshop updates!"
            : "A CodingSharks advisor will reach out within"}
        </p>
        {!isWorkshop && (
          <p className="text-white font-bold text-lg mb-8">
            24 hours via call &amp; WhatsApp
          </p>
        )}

        {/* WhatsApp Group for Workshop */}
        {isWorkshop && (
          <a
            href="https://chat.whatsapp.com/JXIDT8qcBOE0yNskd25wb1?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 mb-8 group"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
            }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <div className="text-left">
              <p className="text-white font-extrabold text-base leading-tight">
                Join WhatsApp Group
              </p>
              <p className="text-white/80 text-xs mt-0.5">
                Get instant updates & resources
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="white"
              className="ml-auto group-hover:translate-x-1 transition-transform">
              <path
                d="M7 4l6 6-6 6"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}

        {/* PDF notification */}
        {pdf && (
          <div
            className="w-full flex items-center gap-3 px-4 py-3 mb-8 text-left"
            style={{
              background: "rgba(255,107,44,0.08)",
              border: "1px solid rgba(255,107,44,0.2)",
            }}>
            <div
              className="shrink-0 size-9 rounded flex items-center justify-center"
              style={{ background: "rgba(255,107,44,0.15)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 2v10M5 8l4 4 4-4M2 16h14"
                  stroke="#d24509"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-white/90 text-sm font-semibold">
                {courseName ? `${courseName} brochure` : "Your brochure"} is
                downloading…
              </p>
              <p className="text-white/60 text-xs mt-0.5">
                Check your Downloads folder
              </p>
            </div>
          </div>
        )}

        {/* What's next */}
        {!isWorkshop && (
          <div
            className="w-full mb-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/55 uppercase px-5 pt-4 pb-3 border-b border-white/5">
              What happens next
            </p>
            {[
              { step: "01", text: "Advisor reviews your application" },
              { step: "02", text: "You get a call within 24 hours" },
              { step: "03", text: "Free 1-on-1 counselling session" },
              { step: "04", text: "Get your personalised roadmap" },
            ].map(({ step, text }) => (
              <div
                key={step}
                className="flex items-center gap-4 px-5 py-3 border-b border-white/5 last:border-0">
                <span
                  className="shrink-0 text-[10px] font-bold tabular-nums"
                  style={{ color: "#d24509" }}>
                  {step}
                </span>
                <span className="text-white/55 text-sm">{text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Countdown redirect */}
        <div className="flex flex-col items-center gap-3">
          {/* Progress bar */}
          <div
            className="w-48 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-linear"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #d24509, #ff9a5c)",
              }}
            />
          </div>
          <p className="text-white/55 text-xs">
            Redirecting in{" "}
            <span className="text-white/60 font-semibold tabular-nums">
              {count}s
            </span>
          </p>
        </div>

        {/* Manual back link */}
        <button
          onClick={() => router.push(from)}
          className="mt-6 text-xs text-white/40 hover:text-white/60 transition-colors underline underline-offset-2">
          Go back now
        </button>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%   { opacity: 0.8; transform: scale(1.35); }
          100% { opacity: 0;   transform: scale(1.7); }
        }
        @keyframes floatSpark {
          from { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          to   { transform: translateY(-20px) rotate(180deg); opacity: 0.15; }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 40; }
          to   { stroke-dashoffset: 0; }
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
