import { Quote } from "lucide-react";
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

export function LongformEditorialTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="bg-background pt-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              {article.category}
            </p>
            <h1 className="mt-5 font-heading text-foreground">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {article.excerpt}
              </p>
            ) : null}
            <div className="mt-9 flex justify-center">
              <Byline article={article} />
            </div>
            <div className="mt-6 flex justify-center">
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
              <p className="mb-10 text-lg leading-relaxed text-foreground/80 first-letter:text-3xl first-letter:font-bold first-letter:text-[var(--acc)]">
                {article.lead}
              </p>
            )}

            {article.takeaways && <div className="mb-12"><Takeaways items={article.takeaways} /></div>}

            <div className="space-y-12">
              {article.sections?.map((section, i) => (
                <div key={i}>
                  <h2 className="mb-4 text-2xl font-semibold text-foreground">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="mb-4 leading-relaxed text-muted-foreground">
                      {p}
                    </p>
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
                    <div className="my-8 border-l-2 border-[var(--acc)] bg-muted/30 py-6 pl-6">
                      <Quote className="mb-2 h-6 w-6 text-[var(--acc)]/40" />
                      <p className="text-lg italic leading-relaxed text-foreground/80">
                        {section.quote.text}
                      </p>
                      {section.quote.by && (
                        <p className="mt-3 text-sm font-medium text-[var(--acc)]">
                          — {section.quote.by}
                        </p>
                      )}
                    </div>
                  )}
                  {section.stat && (
                    <div className="my-6 flex items-center gap-4 rounded-lg bg-muted/40 p-5">
                      <span className="text-3xl font-bold text-[var(--acc)]">{section.stat.v}</span>
                      <span className="text-sm text-muted-foreground">{section.stat.l}</span>
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
