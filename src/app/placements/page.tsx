import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Briefcase } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo-schema";
import home from "@/data/home.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: { absolute: "Placements & Outcomes | 91%+ Placement Rate | Coding Sharks" },
  description:
    "Coding Sharks reports a 91 to 96 percent placement rate, with graduates hired as software engineers at Zepto, Razorpay, Swiggy, CRED, and Meesho. See real student outcomes.",
  alternates: { canonical: "/placements" },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/placements`,
    title: "Placements & Outcomes — Coding Sharks",
    description:
      "91 to 96 percent placement rate. Real graduates hired at Zepto, Razorpay, Swiggy, CRED, and Meesho.",
  },
};

const STATS = [
  { v: "91–96%", l: "placement rate across cohorts" },
  { v: "4–8 wks", l: "to first offer after the program" },
  { v: "₹8–15 LPA", l: "average first package" },
  { v: "₹21L+", l: "top package" },
  { v: "50+", l: "hiring partners" },
  { v: "61%", l: "placed from non-CS backgrounds" },
];

const COMPANIES = ["Zepto", "Razorpay", "Swiggy", "CRED", "Meesho", "Coforge"];

const stories = home.placementStories;

const FAQS = [
  {
    q: "What is the placement rate at Coding Sharks?",
    a: "Coding Sharks reports a 91 to 96 percent placement rate across its programs. Most students receive a first offer within 4 to 8 weeks of completing a program, with an average starting package of ₹8 to 15 LPA and a top package above ₹21 LPA.",
  },
  {
    q: "Which companies hire from Coding Sharks?",
    a: "Coding Sharks graduates work as full-time software engineers at companies including Zepto, Razorpay, Swiggy, CRED, Meesho, and Coforge, supported by a network of 50+ hiring partners.",
  },
  {
    q: "How soon do students get placed after the program?",
    a: "Most Coding Sharks students receive their first offer within 4 to 8 weeks of finishing a program. The placement team begins interview preparation early, not at the end.",
  },
  {
    q: "Do non-CS background students get placed?",
    a: "Yes. 61 percent of Coding Sharks students come from non-CS backgrounds such as sales, teaching, accounting, and operations, and many secure software engineering roles at product companies.",
  },
  {
    q: "What placement support does Coding Sharks provide?",
    a: "Placement support includes mock interviews with engineers who run real interviews, resume and portfolio reviews, and direct referrals to 50+ hiring partners.",
  },
  {
    q: "What packages do graduates receive?",
    a: "The average first package is ₹8 to 15 LPA, with top offers above ₹21 LPA. Actual packages vary by program, role, and the candidate's interview performance.",
  },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default function PlacementsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Placements", url: "/placements" },
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
                <Briefcase className="h-3.5 w-3.5" /> Placements & Outcomes
              </span>
              <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                Real outcomes, not promises
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55">
                Coding Sharks reports a 91 to 96 percent placement rate across cohorts.
                Graduates work as software engineers at Zepto, Razorpay, Swiggy, CRED, and
                Meesho, with a top package above ₹21 LPA. Many came from non-CS backgrounds.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-2 bg-primary px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary/85">
                  Book a Free Demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/coding-bootcamp-indore"
                  className="inline-flex items-center gap-2 border border-white/15 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white/80 transition hover:border-primary/40 hover:text-white">
                  Bootcamp in Indore
                </Link>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats */}
        <Section className="border-y border-white/8 bg-white/[0.02] py-10">
          <Container>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {STATS.map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-primary md:text-3xl">{s.v}</p>
                  <p className="mt-1 text-[11px] leading-snug text-white/45">{s.l}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Companies */}
        <Section className="py-12">
          <Container>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Graduates hired at
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {COMPANIES.map((c) => (
                <span key={c} className="text-lg font-bold text-white/70">
                  {c}
                </span>
              ))}
              <span className="text-sm text-white/35">+ 50 more hiring partners</span>
            </div>
          </Container>
        </Section>

        {/* Stories */}
        <Section className="py-12 md:py-16">
          <Container>
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
              Where our students were, and where they are now
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col border border-white/8 bg-white/[0.03] p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {initials(s.name)}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{s.name}</p>
                      <p className="text-[11px] uppercase tracking-wider text-white/35">
                        {s.cohort} · {s.city}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs">
                    <span className="text-white/40">{s.fromRole}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    <span className="font-semibold text-white">{s.toRole}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-white/80">{s.company}</span>
                    <span className="bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                      {s.ctc}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-white/50 italic">
                    &ldquo;{s.quote}&rdquo;
                  </p>
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
              <h2 className="mb-8 text-2xl font-bold text-white">Placement questions</h2>
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
                Want outcomes like these?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
                Book a free career session. We discuss your background, target role, and which
                program fits. No sales pitch, just an honest assessment.
              </p>
              <Link
                href="/book-demo"
                className="mt-6 inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary/85">
                Book Free Session <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
