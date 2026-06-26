import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/layout/container";
import { getBlogs } from "@/lib/blog-data";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Coding Sharks",
  description:
    "Insights, tutorials, and deep dives on full stack development, AI, DSA, system design, and tech careers from the Coding Sharks team.",
  openGraph: {
    title: "Blog — Coding Sharks",
    description:
      "Insights, tutorials, and deep dives on full stack development, AI, DSA, system design, and tech careers.",
  },
};

export default function BlogListingPage() {
  const allBlogs = getBlogs();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-16">
        <Image
          src="/images/blog/hero-bg.jpg"
          alt=""
          fill
          className="scale-105 object-cover blur-sm"
          priority
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/70" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% -10%, rgba(255,107,44,0.15) 0%, transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
        />

        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center">
            <span className="mb-6 inline-flex items-center gap-2 border border-primary/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
              <BookOpen className="h-3.5 w-3.5" /> Blog & Insights
            </span>
            <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Insights for the{" "}
              <span className="italic text-primary">modern developer</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base">
              Tutorials, deep dives, and career guides — written by the engineers who
              build and teach at Coding Sharks.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Categories filter + grid (client-interactive) ───────────────── */}
      <BlogExplorer blogs={allBlogs} />
    </div>
  );
}
