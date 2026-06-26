import { Quote, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SmartImage } from "@/components/ui/smart-image";
import {
  type BlogTemplateProps,
  Byline,
  Tags,
  BlogFaqList,
  RelatedPosts,
} from "./shared";

export function CaseStudyTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="border-b border-border bg-secondary pb-12 pt-16 md:pb-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              Case Study · {article.category}
            </p>
            <h1 className="mt-5 font-heading text-foreground">{article.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
            <div className="mt-8">
              <Byline article={article} />
            </div>
            <div className="mt-4">
              <Tags tags={article.tags} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12 md:py-16">
        <Container>
          <div className="relative aspect-[21/9] overflow-hidden">
            <SmartImage src={article.featuredImage} alt={article.title} className="h-full w-full" priority />
          </div>
        </Container>
      </Section>

      {/* Results band */}
      {article.stats && article.stats.length > 0 && (
        <Section className="border-y border-border bg-muted/40 py-10">
          <Container>
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--acc)]">
              <TrendingUp className="h-4 w-4" /> The results
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {article.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold text-[var(--acc)]">{s.v}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            {article.lead && (
              <p className="mb-10 text-lg leading-relaxed text-foreground/80">{article.lead}</p>
            )}
            <div className="space-y-12">
              {article.sections?.map((section, i) => (
                <div key={i}>
                  <h2 className="mb-4 text-2xl font-semibold text-foreground">{section.heading}</h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="mb-4 leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                  {section.bullets && (
                    <ul className="mb-4 space-y-2">
                      {section.bullets.map((b, k) => (
                        <li key={k} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--acc)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.quote && (
                    <div className="my-8 border-l-2 border-[var(--acc)] bg-muted/40 py-6 pl-6">
                      <Quote className="mb-2 h-6 w-6 text-[var(--acc)]/50" />
                      <p className="text-lg italic leading-relaxed text-foreground/80">{section.quote.text}</p>
                      {section.quote.by && (
                        <p className="mt-3 text-sm font-medium text-[var(--acc)]">— {section.quote.by}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {article.faqs && <BlogFaqList faqs={article.faqs} />}
      <RelatedPosts related={related} />
    </article>
  );
}
