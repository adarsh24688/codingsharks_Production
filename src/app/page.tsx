import type { Metadata } from "next";
import { HeroSection } from "@/components/pages/home/hero-section";
import { BookLiveClassSection } from "@/components/pages/home/book-live-class-section";
import { PlacementsSection } from "@/components/pages/home/placements-section";
import { WorkAtSection } from "@/components/pages/home/work-at-section";
import { WhyCodingSharksSection } from "@/components/pages/home/why-codingsharks-section";
import { CoursesSection } from "@/components/pages/home/courses-section";
import { ReviewsSection } from "@/components/pages/home/reviews-section";
import { CommunitySection } from "@/components/pages/home/community-section";
import { MentorsSection } from "@/components/pages/home/mentors-section";
import { HowToApplySection } from "@/components/pages/home/how-to-apply-section";
import { ComparisonSection } from "@/components/pages/home/comparison-section";
import { FaqSection } from "@/components/pages/home/faq-section";
import { FinalCtaSection } from "@/components/pages/home/final-cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, webSiteSchema, faqSchema } from "@/lib/seo-schema";
import { SITE_URL } from "@/lib/site-config";

const BASE_URL = SITE_URL;

export const metadata: Metadata = {
  title: "Coding Sharks — Learn Coding. Get Placed. | #1 Coding Bootcamp India",
  description:
    "India's #1 placement-focused coding bootcamp in Indore. Learn Full Stack, AI, Data Science and System Design with live mentorship and 91%+ placement.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    url: BASE_URL,
    title: "Coding Sharks — Learn Coding. Get Placed.",
    description:
      "India's #1 placement-focused coding bootcamp. Live mentorship from senior engineers at Bolt, CRED, Zepto. Full Stack, AI Agents, Data Science.",
  },
};

// Visible homepage FAQ (FaqSection) must match these strings verbatim.
// NOTE: no fee/pricing question here — fees are never shown (owner rule).
const HOME_FAQS = [
  {
    q: "Is Coding Sharks suitable for complete beginners?",
    a: "Yes — many of our top placements had zero prior coding experience. Our pre-cohort prep module gets you up to speed before Day 1, and your mentor guides you through every step.",
  },
  {
    q: "What programming languages and technologies are taught at Coding Sharks?",
    a: "Full Stack track covers JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB, Redis, AWS, and Docker. AI track adds Python, LangChain, OpenAI APIs, and vector databases.",
  },
  {
    q: "Are the classes live or pre-recorded?",
    a: "All core sessions are live with your cohort. Every session is recorded and available within 24 hours so you never fall behind. Workshops, code reviews, and mentor sessions are always live.",
  },
  {
    q: "Do students build real projects at Coding Sharks?",
    a: "Every week you ship something. By the end of the program you'll have 3–5 production-grade projects on GitHub with real users — not tutorial clones — which is exactly what interviewers want to see.",
  },
  {
    q: "How long does it take to get placed after completing the Coding Sharks program?",
    a: "Most students receive their first offer within 4–8 weeks of completing the program. Our placement team actively connects you with hiring partners and prepares you through mock interviews and referrals.",
  },
  {
    q: "Does Coding Sharks offer a placement guarantee?",
    a: "Coding Sharks has a 91%+ placement rate across all cohorts. Our dedicated placement team provides mock interviews, resume reviews, and direct referrals to 100+ hiring partners to ensure you get placed.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={faqSchema(HOME_FAQS)!} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <picture className="absolute top-0 left-0 right-0 h-[55vh]">
          <source
            media="(min-width: 768px)"
            srcSet="/images/grid/ezgif_285019e9218540c3_9ef0acb83f.webp"
          />
          <source
            media="(max-width: 767px)"
            srcSet="/images/grid/ezgif_81a45f823f76635f_54311c2d8a.webp"
          />
          <img
            src="/images/grid/ezgif_81a45f823f76635f_54311c2d8a.webp"
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-top opacity-90"
          />
        </picture>
      </div>
      <HeroSection />
      <BookLiveClassSection />
      <PlacementsSection />
      <WhyCodingSharksSection />
      <CoursesSection />
      <ReviewsSection />
      <CommunitySection />
      <MentorsSection />
      <HowToApplySection />
      <WorkAtSection />
      <ComparisonSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
