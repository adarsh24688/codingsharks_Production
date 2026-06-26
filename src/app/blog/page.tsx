import Link from "next/link";
import Image from "next/image";
import { BookOpen, Filter, Calendar, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { getBlogs } from "@/lib/blog-data";
import { formatDate } from "@/components/blog/templates/shared";
import type { BlogArticle } from "@/types/blog";
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

const GRADIENTS = [
  "from-violet-500 to-purple-800",
  "from-rose-500 to-pink-700",
  "from-orange-500 to-red-700",
  "from-cyan-500 to-blue-800",
  "from-emerald-500 to-teal-700",
  "from-fuchsia-500 to-pink-700",
  "from-indigo-500 to-blue-800",
  "from-amber-500 to-orange-700",
];

function getGradient(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function BlogCard({ article }: { article: BlogArticle }) {
  const gradient = getGradient(article.slug);

  return (
    <Link
      href={`/blog/${article.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden border border-white/8 bg-[#111] transition-all duration-300 hover:border-primary/40">
      {/* Cover */}
      <div className="relative h-48 overflow-hidden">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-linear-to-br ${gradient}`}>
            <span className="select-none text-6xl font-black text-white/15">
              {article.title[0]?.toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-[#111] to-transparent" />

        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span className="bg-[#ff6b2c]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 border-t border-primary/20 p-5">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 shrink-0" />
            {formatDate(article.publishDate)}
          </span>
          <span className="text-white/15">·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 shrink-0" />
            {article.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold leading-snug text-white transition-colors line-clamp-2 group-hover:text-primary">
          {article.title}
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="flex-1 text-xs leading-relaxed text-white/40 line-clamp-2">
            {article.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-1 flex items-center justify-between border-t border-white/5 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
            {article.author}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all group-hover:gap-2.5">
            Read article <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogListingPage() {
  const allBlogs = getBlogs();
  const categories = [...new Set(allBlogs.map((b) => b.category))];

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

      {/* ── Categories + Grid ────────────────────────────────────────── */}
      <Container className="pb-20 pt-4 sm:pb-24">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-white/40" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Categories
          </span>
          {["All", ...categories].map((cat) => (
            <span
              key={cat}
              className={
                cat === "All"
                  ? "border border-primary bg-primary px-4 py-1.5 text-xs font-medium text-white"
                  : "border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/55 transition-colors hover:border-primary/30 hover:text-white"
              }>
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </div>
  );
}
