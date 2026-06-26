import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/seo-schema";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: { absolute: "Frequently Asked Questions | Coding Sharks" },
  description:
    "Answers to common questions about Coding Sharks: programs, placement rate, eligibility, non-CS backgrounds, class format, mentorship, and how to get started.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/faq`,
    title: "Frequently Asked Questions — Coding Sharks",
    description:
      "Programs, placement, eligibility, format, and mentorship — answered.",
  },
};

const GROUPS: { title: string; faqs: { q: string; a: string }[] }[] = [
  {
    title: "About Coding Sharks",
    faqs: [
      {
        q: "What is Coding Sharks?",
        a: "Coding Sharks is a placement-focused coding bootcamp in Indore, India, offering live, project-based programs in Full Stack Web Development, AI Agents, Data Science, DSA, and System Design. It reports a 91 to 96 percent placement rate and has trained over 15,000 developers.",
      },
      {
        q: "Where is Coding Sharks located?",
        a: "Coding Sharks runs from 3rd Floor, Veda Complex, Bhawarkua Main Road, Bhawarkua Square, Indore, Madhya Pradesh. Every program is also available online as a live cohort.",
      },
      {
        q: "Is Coding Sharks good for complete beginners?",
        a: "Yes. Many top placements had zero prior coding experience. A pre-cohort prep module brings beginners up to speed before Day 1, and 1-on-1 mentorship guides every student.",
      },
    ],
  },
  {
    title: "Programs",
    faqs: [
      {
        q: "What programs does Coding Sharks offer?",
        a: "Coding Sharks offers Full Stack Web Development, AI Agents and Automation, Data Science and Machine Learning, Data Analytics, DSA Mastery, a System Design and DSA Masterclass, Python for Data Science, and C/C++ Programming.",
      },
      {
        q: "What technologies will I learn?",
        a: "The Full Stack track covers JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB, Redis, AWS, and Docker. The AI track adds Python, LangChain, LLM APIs, and vector databases.",
      },
      {
        q: "Are classes live or pre-recorded?",
        a: "All core sessions are live with your cohort. Every session is recorded and available within 24 hours, while workshops, code reviews, and 1-on-1 mentor sessions stay live.",
      },
      {
        q: "Do students build real projects?",
        a: "Yes. By the end of a program you will have 3 to 5 production-grade projects on GitHub with real users, not tutorial clones, which is what interviewers actually review.",
      },
    ],
  },
  {
    title: "Placement & outcomes",
    faqs: [
      {
        q: "What is the placement rate at Coding Sharks?",
        a: "Coding Sharks reports a 91 to 96 percent placement rate across programs. Most students receive a first offer within 4 to 8 weeks of finishing, with an average first package of ₹8 to 15 LPA and a top package above ₹21 LPA.",
      },
      {
        q: "Which companies hire from Coding Sharks?",
        a: "Graduates work as full-time software engineers at companies including Zepto, Razorpay, Swiggy, CRED, Meesho, and Coforge, supported by 50+ hiring partners.",
      },
      {
        q: "What placement support is provided?",
        a: "Placement support includes mock interviews with practising engineers, resume and portfolio reviews, and direct referrals to 50+ hiring partners.",
      },
    ],
  },
  {
    title: "Eligibility & format",
    faqs: [
      {
        q: "Can I join without a CS degree?",
        a: "Yes. 61 percent of Coding Sharks students come from non-CS backgrounds such as sales, teaching, and operations. No CS degree or prior coding experience is required.",
      },
      {
        q: "Who teaches at Coding Sharks?",
        a: "Mentors are senior engineers and founders from companies like Bolt (Europe), Dingg, and Crewnox. They run 1-on-1 sessions, review code, and prepare you for real interviews.",
      },
      {
        q: "Can I do the program while working?",
        a: "Programs work best for people who can commit 6 to 8 hours a day. If you can only give limited hours, discuss the right track and schedule with a mentor during your free demo.",
      },
      {
        q: "How do I get started?",
        a: "Book a free demo session through the website. You meet a mentor, see the live cohort format, and get an honest assessment of which program fits your goals. No payment is required to attend.",
      },
    ],
  },
];

const ALL_FAQS = GROUPS.flatMap((g) => g.faqs);

export default function FaqPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

  return (
    <>
      <JsonLd data={faqSchema(ALL_FAQS)!} />
      <JsonLd data={breadcrumb} />

      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="relative overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-12">
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
                FAQ
              </span>
              <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Frequently asked questions
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55">
                Everything about Coding Sharks programs, placement, eligibility, and format.
              </p>
            </div>
          </Container>
        </div>

        <Section className="py-10 md:py-14">
          <Container>
            <div className="mx-auto max-w-3xl space-y-12">
              {GROUPS.map((group) => (
                <div key={group.title}>
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">
                    {group.title}
                  </h2>
                  <div className="divide-y divide-white/8 border-y border-white/8">
                    {group.faqs.map((f) => (
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
              ))}
            </div>
          </Container>
        </Section>

        <Section className="border-t border-white/8 py-14 md:py-20">
          <Container>
            <div className="mx-auto max-w-3xl border border-white/8 bg-white/[0.03] p-6 text-center sm:p-10">
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                Still have a question?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
                Book a free demo and ask a mentor directly. No sales pitch.
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
