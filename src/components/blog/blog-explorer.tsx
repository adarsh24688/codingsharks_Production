"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Filter, Calendar, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { formatDate } from "@/components/blog/templates/shared";
import type { BlogArticle } from "@/types/blog";

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
        <div className="absolute left-3 top-3">
          <span className="bg-[#d24509]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            {article.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-primary/20 p-5">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/55">
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
        <h2 className="text-base font-bold leading-snug text-white transition-colors line-clamp-2 group-hover:text-primary">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="flex-1 text-xs leading-relaxed text-white/60 line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="mt-1 flex items-center justify-between border-t border-white/5 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/55">
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

export function BlogExplorer({ blogs }: { blogs: BlogArticle[] }) {
  const categories = [...new Set(blogs.map((b) => b.category))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? blogs : blogs.filter((b) => b.category === active);

  return (
    <Container className="pb-20 pt-4 sm:pb-24">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-white/60" />
        <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Categories
        </span>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={
              active === cat
                ? "border border-primary bg-primary px-4 py-1.5 text-xs font-medium text-white"
                : "border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/55 transition-colors hover:border-primary/30 hover:text-white"
            }>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-white/60">
          No articles in this category yet.
        </p>
      )}
    </Container>
  );
}
