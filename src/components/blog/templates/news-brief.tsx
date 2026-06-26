import { Megaphone } from "lucide-react";
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

export function NewsBriefTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="bg-background pt-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--acc)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--acc)]">
              <Megaphone className="h-3.5 w-3.5" /> News · {article.category}
            </p>
            <h1 className="mt-5 font-heading text-foreground">{article.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <div className="mt-6 border-t border-border pt-5">
              <Byline article={article} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10 md:py-12">
        <Container>
          <div className="relative mx-auto aspect-[16/9] max-w-3xl overflow-hidden">
            <SmartImage src={article.featuredImage} alt={article.title} className="h-full w-full" priority />
          </div>
        </Container>
      </Section>

      <Section className="pb-16 md:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            {article.lead && (
              <p className="mb-8 text-lg font-medium leading-relaxed text-foreground/85">{article.lead}</p>
            )}

            <div className="space-y-8">
              {article.sections?.map((section, i) => (
                <div key={i}>
                  <h2 className="mb-3 text-xl font-semibold text-foreground">{section.heading}</h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="mb-4 leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2">
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

            <div className="mt-10">
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
