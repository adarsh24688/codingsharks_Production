import { BarChart3 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SmartImage } from "@/components/ui/smart-image";
import {
  type BlogTemplateProps,
  Byline,
  Tags,
  Takeaways,
  BlogFaqList,
  RelatedPosts,
} from "./shared";

export function DataReportTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="border-b border-border bg-secondary pb-12 pt-16 md:pb-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              <BarChart3 className="h-4 w-4" /> Report · {article.category}
            </p>
            <h1 className="mt-5 font-heading text-foreground">{article.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
            <div className="mt-8 flex justify-center">
              <Byline article={article} />
            </div>
            <div className="mt-4 flex justify-center">
              <Tags tags={article.tags} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Headline stats grid */}
      {article.stats && article.stats.length > 0 && (
        <Section className="py-12 md:py-16">
          <Container>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {article.stats.map((s, i) => (
                <div key={i} className="bg-card p-6">
                  <p className="text-3xl font-bold text-[var(--acc)] md:text-4xl">{s.v}</p>
                  <p className="mt-2 text-sm leading-snug text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="pb-16 md:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            {article.lead && (
              <p className="mb-10 text-lg leading-relaxed text-foreground/80">{article.lead}</p>
            )}
            {article.takeaways && <div className="mb-12"><Takeaways items={article.takeaways} /></div>}

            <div className="space-y-12">
              {article.sections?.map((section, i) => (
                <div key={i}>
                  <h2 className="mb-4 text-2xl font-semibold text-foreground">{section.heading}</h2>
                  {section.stat && (
                    <div className="my-5 flex items-baseline gap-4 border-l-2 border-[var(--acc)] bg-muted/40 py-4 pl-5">
                      <span className="text-3xl font-bold text-[var(--acc)]">{section.stat.v}</span>
                      <span className="text-sm text-muted-foreground">{section.stat.l}</span>
                    </div>
                  )}
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
