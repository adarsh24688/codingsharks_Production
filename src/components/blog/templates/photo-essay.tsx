import { Camera } from "lucide-react";
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

export function PhotoEssayTemplate({ article, related }: BlogTemplateProps) {
  return (
    <article>
      <Section className="bg-background pt-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--acc)]">
              <Camera className="h-4 w-4" /> Photo Essay · {article.category}
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

      <Section className="py-12">
        <Container>
          <div className="relative aspect-[21/9] overflow-hidden">
            <SmartImage src={article.featuredImage} alt={article.title} className="h-full w-full" priority />
          </div>
          {article.lead && (
            <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-foreground/80">
              {article.lead}
            </p>
          )}
        </Container>
      </Section>

      <Section className="pb-16 md:pb-24">
        <Container>
          <div className="mx-auto max-w-4xl space-y-16">
            {article.sections?.map((section, i) => {
              const img = i % 2 === 0 ? article.secondaryImage : article.featuredImage;
              return (
                <div
                  key={i}
                  className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "md:col-start-2" : ""}`}>
                    <SmartImage src={img ?? article.featuredImage} alt={section.heading} className="h-full w-full" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--acc)]">
                      0{i + 1}
                    </span>
                    <h2 className="mb-3 mt-2 text-2xl font-semibold text-foreground">{section.heading}</h2>
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="mb-4 leading-relaxed text-muted-foreground">{p}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {article.faqs && <BlogFaqList faqs={article.faqs} />}
      <RelatedPosts related={related} />
    </article>
  );
}
