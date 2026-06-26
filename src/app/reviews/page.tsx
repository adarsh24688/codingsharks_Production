import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo-schema";
import home from "@/data/home.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: { absolute: "Coding Sharks Reviews — Student Experiences | Coding Sharks" },
  description:
    "Read what Coding Sharks students say about the mentorship, real projects, and placement support. Verified student experiences from the placement-focused coding bootcamp in Indore.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/reviews`,
    title: "Coding Sharks Reviews — Student Experiences",
    description:
      "What students say about Coding Sharks: 1-on-1 mentorship, real projects, and placement support.",
  },
};

const reviews = home.reviews;

const FAQS = [
  {
    q: "Is Coding Sharks legit and worth it?",
    a: "Coding Sharks is a placement-focused coding bootcamp in Indore with a reported 91 to 96 percent placement rate and more than 15,000 developers trained. Students consistently highlight the 1-on-1 mentorship and real project work as what sets it apart.",
  },
  {
    q: "What do students say about Coding Sharks?",
    a: "Students most often praise the mentorship quality, the focus on building real production-grade projects instead of tutorials, and the placement support that leads to offers within 4 to 8 weeks of finishing a program.",
  },
  {
    q: "Where can I read verified Coding Sharks reviews?",
    a: "Student experiences are shared on this page and on the Coding Sharks Google Business Profile. You can also book a free demo to speak with current mentors and alumni directly.",
  },
  {
    q: "Do reviews come from students with non-CS backgrounds?",
    a: "Yes. 61 percent of Coding Sharks students come from non-CS backgrounds such as sales, teaching, and operations, and many of the reviews reflect successful career switches into software engineering.",
  },
];

export default function ReviewsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Reviews", url: "/reviews" },
  ]);

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(FAQS)!} />
      <JsonLd data={breadcrumb} />

      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Hero */}
        <div className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% -10%, rgba(255,107,44,0.16) 0%, transparent 65%)",
            }}
          />
          <Container className="relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 border border-primary/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                <Star className="h-3.5 w-3.5" /> Student Reviews
              </span>
              <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                What students say about Coding Sharks
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55">
                Students choose Coding Sharks for the 1-on-1 mentorship, real project work, and
                placement support that leads to offers within 4 to 8 weeks. Here is what they
                say in their own words.
              </p>
            </div>
          </Container>
        </div>

        {/* Reviews grid */}
        <Section className="py-12 md:py-16">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <div
                  key={r.name}
                  className="flex flex-col border border-white/8 bg-white/[0.03] p-6">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: Math.min(5, Math.max(0, r.rating)) }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: r.color }}>
                      {r.initial}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{r.name}</p>
                      <p className="text-[11px] text-white/40">{r.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="border-t border-white/8 py-14 md:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                FAQ
              </p>
              <h2 className="mb-8 text-2xl font-bold text-white">Common questions</h2>
              <div className="divide-y divide-white/8 border-y border-white/8">
                {FAQS.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="shrink-0 text-primary transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-white/55">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section className="border-t border-white/8 py-14 md:py-20">
          <Container>
            <div className="mx-auto max-w-3xl border border-white/8 bg-white/[0.03] p-6 text-center sm:p-10">
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                See it for yourself
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
                Book a free demo and talk to a mentor. Decide with real experience, not just
                reviews.
              </p>
              <Link
                href="/book-demo"
                className="mt-6 inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary/85">
                Book Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
