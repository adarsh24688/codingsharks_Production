import { TrendingUp, Sparkles } from "lucide-react";
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

export function TrendsTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="border-b border-border bg-secondary pb-12 pt-16 md:pb-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              <TrendingUp className="h-4 w-4" /> Trends · {article.category}
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

      <Section className="py-12 md:py-16">
        <Container>
          <div className="relative aspect-[21/9] overflow-hidden">
            <SmartImage src={article.featuredImage} alt={article.title} className="h-full w-full" priority />
          </div>
        </Container>
      </Section>

      <Section className="pb-16 md:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            {article.lead && (
              <p className="mb-10 text-lg leading-relaxed text-foreground/80">{article.lead}</p>
            )}
            {article.takeaways && <div className="mb-12"><Takeaways items={article.takeaways} /></div>}

            <div className="space-y-8">
              {article.sections?.map((section, i) => (
                <div key={i} className="flex gap-5 rounded-xl border border-border bg-card p-6 md:p-7">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--acc)]/10 font-heading text-lg font-bold text-[var(--acc)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < (article.sections?.length ?? 0) - 1 && (
                      <span className="mt-2 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
                      <Sparkles className="h-4 w-4 text-[var(--acc)]" /> {section.heading}
                    </h2>
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="mb-3 leading-relaxed text-muted-foreground">{p}</p>
                    ))}
                    {section.bullets && (
                      <ul className="mt-3 space-y-2">
                        {section.bullets.map((b, k) => (
                          <li key={k} className="flex items-start gap-3 text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--acc)]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
