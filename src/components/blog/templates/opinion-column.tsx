import { Quote } from "lucide-react";
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

export function OpinionColumnTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="bg-background pt-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              Opinion · {article.category}
            </p>
            <h1 className="mt-5 font-heading text-foreground">{article.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <div className="mt-8 border-y border-border py-5">
              <Byline article={article} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-16 md:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            {article.lead && (
              <p className="mb-10 text-xl leading-relaxed text-foreground/90 first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-[var(--acc)]">
                {article.lead}
              </p>
            )}

            <div className="space-y-10">
              {article.sections?.map((section, i) => (
                <div key={i}>
                  <h2 className="mb-4 text-2xl font-semibold text-foreground">{section.heading}</h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="mb-5 text-lg leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                  {section.quote && (
                    <blockquote className="my-10 border-l-4 border-[var(--acc)] pl-6">
                      <Quote className="mb-3 h-7 w-7 text-[var(--acc)]/50" />
                      <p className="font-heading text-2xl font-medium italic leading-snug text-foreground">
                        {section.quote.text}
                      </p>
                      {section.quote.by && (
                        <footer className="mt-3 text-sm font-medium text-[var(--acc)]">— {section.quote.by}</footer>
                      )}
                    </blockquote>
                  )}
                  {section.bullets && (
                    <ul className="mb-4 space-y-2">
                      {section.bullets.map((b, k) => (
                        <li key={k} className="flex items-start gap-3 text-lg text-muted-foreground">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--acc)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Tags tags={article.tags} />
            </div>
          </div>
        </Container>
      </Section>

      {article.faqs && <BlogFaqList faqs={article.faqs} />}
      <RelatedPosts related={related} />
    </article>
  );
}
