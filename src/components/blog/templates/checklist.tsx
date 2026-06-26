import { Check, ListChecks } from "lucide-react";
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

export function ChecklistTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="border-b border-border bg-secondary pb-12 pt-16 md:pb-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              <ListChecks className="h-4 w-4" /> Checklist · {article.category}
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

            <div className="space-y-6">
              {article.sections?.map((section, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6 md:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--acc)]/10 text-sm font-bold text-[var(--acc)]">
                      {i + 1}
                    </span>
                    <h2 className="text-xl font-semibold text-card-foreground">{section.heading}</h2>
                  </div>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="mb-4 leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                  {section.bullets && (
                    <ul className="grid gap-3">
                      {section.bullets.map((b, k) => (
                        <li key={k} className="flex items-start gap-3 text-foreground">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--acc)]/40 bg-[var(--acc)]/10 text-[var(--acc)]">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span className="leading-relaxed">{b}</span>
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
