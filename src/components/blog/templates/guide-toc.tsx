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

export function GuideTocTemplate({ article, related }: BlogTemplateProps) {
  const tocItems =
    article.sections?.map((s, i) => ({
      id: `section-${i}`,
      heading: s.heading,
    })) ?? [];

  return (
    <article>
      <Section className="bg-background pt-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              Guide · {article.category}
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

            {tocItems.length > 0 && (
              <div className="mb-12 rounded-xl border border-border bg-muted/20 p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--acc)]">
                  In this guide
                </p>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-muted-foreground transition-colors hover:text-[var(--acc)]">
                      {item.heading}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div className="space-y-12">
              {article.sections?.map((section, i) => (
                <div key={i} id={`section-${i}`} className="scroll-mt-24">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--acc)]">
                      Part {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mb-4 text-2xl font-semibold text-foreground">
                    {section.heading}
                  </h2>
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
