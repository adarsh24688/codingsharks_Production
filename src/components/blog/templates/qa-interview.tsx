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

export function QaInterviewTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="bg-background pt-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              Interview · {article.category}
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

            <div className="space-y-10">
              {article.sections?.map((section, i) => (
                <div key={i} className="border-b border-border pb-10 last:border-0">
                  {/* Question */}
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--acc)] text-sm font-bold text-white">
                      Q
                    </span>
                    <h2 className="pt-1 text-xl font-semibold text-foreground">{section.heading}</h2>
                  </div>
                  {/* Answer */}
                  <div className="mt-4 flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--acc)]/40 bg-[var(--acc)]/10 text-sm font-bold text-[var(--acc)]">
                      A
                    </span>
                    <div className="pt-1">
                      {section.paragraphs.map((p, j) => (
                        <p key={j} className="mb-4 leading-relaxed text-muted-foreground last:mb-0">{p}</p>
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
