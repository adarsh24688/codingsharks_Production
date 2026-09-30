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
import { ProblemSection } from "@/components/pages/home/problem-section";
import { JourneySection } from "@/components/pages/home/journey-section";
import { HowYouLearnSection } from "@/components/pages/home/how-you-learn-section";
import { ParentsSection } from "@/components/pages/home/parents-section";
import { ScrollBand } from "@/components/pages/home/scroll-band";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, webSiteSchema, faqSchema } from "@/lib/seo-schema";
import { SITE_URL } from "@/lib/site-config";
import home from "@/data/home.json";

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
const HOME_FAQS = home.faq.items.map((item) => ({ q: item.question, a: item.answer }));

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={faqSchema(HOME_FAQS)!} />

      <HeroSection />
      <ProblemSection />
      <JourneySection />
      <PlacementsSection />
      <WorkAtSection />
      <CoursesSection />
      <HowYouLearnSection />
      <WhyCodingSharksSection />
      <BookLiveClassSection />
      <MentorsSection />
      <ReviewsSection />
      <ScrollBand words={["Live classes.", "Real projects.", "Code reviews.", "Referrals."]} direction={-1} tone="paper-2" />
      <CommunitySection />
      <ComparisonSection />
      <ParentsSection />
      <HowToApplySection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
