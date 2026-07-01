import Link from "next/link";
import { Calendar, Clock, User, Check, Plus, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SmartImage } from "@/components/ui/smart-image";
import type { BlogArticle } from "@/types/blog";

export interface BlogTemplateProps {
  article: BlogArticle;
  related: BlogArticle[];
}

export const DEFAULT_BLOG_THEME = { acc: "#d24509", ink: "#0f0f1a" };

export function getBlogTheme(article: BlogArticle) {
  return article.theme ?? DEFAULT_BLOG_THEME;
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function Byline({
  article,
  tone = "light",
}: {
  article: BlogArticle;
  tone?: "light" | "dark";
}) {
  const base = tone === "dark" ? "text-white/65" : "text-muted-foreground";
  const strong = tone === "dark" ? "text-white" : "text-foreground";
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm ${base}`}>
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--acc)]/15 text-[var(--acc)]">
          <User className="h-4 w-4" />
        </span>
        <span className={`font-medium ${strong}`}>{article.author}</span>
        {article.authorRole ? <span>· {article.authorRole}</span> : null}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4" /> {formatDate(article.publishDate)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4" /> {article.readingTime} min read
      </span>
    </div>
  );
}

export function Tags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="border border-border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground">
          #{t}
        </span>
      ))}
    </div>
  );
}

export function Takeaways({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="border-l-2 border-[var(--acc)] bg-muted/30 p-7 md:p-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--acc)]">
        Key takeaways
      </p>
      <ul className="grid gap-3">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-3 text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--acc)]" />
            <span className="leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogFaqList({
  faqs,
  heading = "Frequently asked questions",
}: {
  faqs?: { q: string; a: string }[];
  heading?: string;
}) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <Section className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--acc)]">
            FAQ
          </p>
          <h2 className="mb-8 text-foreground">{heading}</h2>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <details key={i} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="h-5 w-5 shrink-0 text-[var(--acc)] transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function RelatedPosts({ related }: { related: BlogArticle[] }) {
  if (!related || related.length === 0) return null;
  return (
    <Section className="border-t border-border bg-muted/20 py-16 md:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="text-foreground">Keep reading</h2>
          <Link
            href="/blog"
            className="hidden items-center gap-1 text-sm font-medium text-[var(--acc)] hover:underline sm:inline-flex">
            All articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden border border-border bg-card transition-all duration-300 hover:border-[var(--acc)]/40 hover:shadow-lg">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={a.featuredImage}
                  alt={a.title}
                  label={a.title}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--acc)]">
                  {a.category}
                </span>
                <h3 className="mb-2 text-base font-semibold leading-snug text-card-foreground">
                  {a.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {a.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
