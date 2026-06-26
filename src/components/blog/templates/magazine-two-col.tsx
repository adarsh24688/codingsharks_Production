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

export function MagazineTwoColTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="bg-background pt-16 md:pt-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
                {article.category}
              </p>
              <h1 className="mt-4 font-heading text-foreground">{article.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
              <div className="mt-6">
                <Byline article={article} />
              </div>
              <div className="mt-4">
                <Tags tags={article.tags} />
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <SmartImage src={article.featuredImage} alt={article.title} className="h-full w-full" priority />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-16 pt-12 md:pb-24 md:pt-16">
        <Container>
          <div className="mx-auto max-w-5xl">
            {article.lead && (
              <p className="mb-10 text-lg leading-relaxed text-foreground/80">{article.lead}</p>
            )}
            {article.takeaways && <div className="mb-12"><Takeaways items={article.takeaways} /></div>}

            <div className="space-y-16">
              {article.sections?.map((section, i) => (
                <div key={i} className={`grid gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--acc)]">
                      0{i + 1}
                    </span>
                    <h2 className="mt-2 mb-4 text-2xl font-semibold text-foreground">
                      {section.heading}
                    </h2>
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
                    {section.stat && (
                      <div className="mt-4 flex items-center gap-4 rounded-lg bg-muted/40 p-4">
                        <span className="text-2xl font-bold text-[var(--acc)]">{section.stat.v}</span>
                        <span className="text-sm text-muted-foreground">{section.stat.l}</span>
                      </div>
                    )}
                  </div>
                  <div className={i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                    {section.quote && (
                      <div className="sticky top-24 rounded-xl border-l-2 border-[var(--acc)] bg-muted/50 p-8">
                        <Quote className="mb-4 h-8 w-8 text-[var(--acc)]/50" />
                        <p className="text-xl italic leading-relaxed text-foreground/80">
                          {section.quote.text}
                        </p>
                        {section.quote.by && (
                          <p className="mt-4 text-sm font-medium text-[var(--acc)]">
                            — {section.quote.by}
                          </p>
                        )}
                      </div>
                    )}
                    {!section.quote && article.secondaryImage && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <SmartImage src={article.secondaryImage} alt={article.title} className="h-full w-full" />
                      </div>
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
