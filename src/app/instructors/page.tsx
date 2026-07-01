import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo-schema";
import home from "@/data/home.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";
const ORG_ID = `${BASE_URL}/#organization`;

export const metadata: Metadata = {
  title: "Our Mentors & Instructors — Coding Sharks",
  description:
    "Learn from senior engineers and founders at Bolt (Europe), Dingg, and Crewnox. Coding Sharks mentors bring real-world product experience to every live session.",
  alternates: { canonical: `${BASE_URL}/instructors` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/instructors`,
    title: "Our Mentors & Instructors — Coding Sharks",
    description:
      "Our mentors are senior engineers and founders from top companies. They have built the products you use every day.",
  },
};

const mentors = home.mentors;

export default function InstructorsPage() {
  // Each mentor as a Person entity (E-E-A-T), affiliated with the Coding Sharks org.
  const personGraph = mentors.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    worksFor: { "@type": "Organization", name: m.company },
    affiliation: { "@id": ORG_ID, name: "Coding Sharks" },
    description: m.description,
    ...(m.imageUrl ? { image: `${BASE_URL}${m.imageUrl}` } : {}),
  }));

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Instructors", url: "/instructors" },
  ]);

  return (
    <>
      <JsonLd data={personGraph} />
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
                Mentors & Instructors
              </span>
              <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                Learn from engineers who ship
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55">
                Coding Sharks mentors are senior engineers and founders from companies like Bolt
                (Europe), Dingg, and Crewnox. They run 1-on-1 sessions, review your code, and
                prepare you for the exact interviews they conduct.
              </p>
            </div>
          </Container>
        </div>

        {/* Mentors */}
        <Section className="py-12 md:py-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mentors.map((m) => (
                <div
                  key={m.name}
                  className="flex flex-col border border-white/8 bg-white/[0.03] p-6">
                  <div className="relative size-20 overflow-hidden rounded-full border border-white/10">
                    {m.imageUrl ? (
                      <Image
                        src={m.imageUrl}
                        alt={m.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : null}
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-white">{m.name}</h2>
                  <p className="text-sm font-medium text-primary">{m.role}</p>
                  <p className="text-xs uppercase tracking-wider text-white/60">{m.company}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{m.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section className="border-t border-white/8 py-14 md:py-20">
          <Container>
            <div className="mx-auto max-w-3xl border border-white/8 bg-white/[0.03] p-6 text-center sm:p-10">
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                Learn directly from them
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
                Book a free demo and sit in on a live session with a mentor.
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
