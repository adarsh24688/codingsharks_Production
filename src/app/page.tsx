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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: "Coding Sharks — Learn Coding. Get Placed. | #1 Coding Bootcamp India",
  description:
    "India's #1 placement-focused coding bootcamp in Indore. Learn Full Stack Development, AI Agents & Automation, Data Science, and System Design with live mentorship from senior engineers. 91%+ placement rate, 2K+ careers transformed.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    url: BASE_URL,
    title: "Coding Sharks — Learn Coding. Get Placed.",
    description:
      "India's #1 placement-focused coding bootcamp. Live mentorship from senior engineers at Bolt, CRED, Zepto. Full Stack, AI Agents, Data Science. 91%+ placement rate.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${BASE_URL}/#organization`,
  name: "Coding Sharks",
  alternateName: "CodingSharks",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  description:
    "India's #1 placement-focused coding bootcamp offering Full Stack Development, AI Agents, Data Science, and System Design courses with live mentorship and 91%+ placement rate.",
  email: "info@thecodingsharks.com",
  telephone: "+919424586286",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "3rd Floor, Veda Complex, Room No. 301, Bhawarkua Main Road, Bhawarkua Square",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/thecodingsharks",
    "https://www.linkedin.com/company/codingsharks",
    "https://www.youtube.com/@codingsharks",
  ],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
  foundingDate: "2022",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Coding Sharks",
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/courses?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Coding Sharks",
  image: `${BASE_URL}/og-default.png`,
  url: BASE_URL,
  telephone: "+919424586286",
  email: "info@thecodingsharks.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "3rd Floor, Veda Complex, Room No. 301, Bhawarkua Main Road, Bhawarkua Square",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.7196,
    longitude: 75.8577,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, UPI, Bank Transfer, EMI",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is CodingSharks suitable for complete beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — many of our top placements had zero prior coding experience. Our pre-cohort prep module gets you up to speed before Day 1, and your mentor guides you through every step.",
      },
    },
    {
      "@type": "Question",
      name: "What programming languages and technologies are taught at Coding Sharks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Full Stack track covers JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB, Redis, AWS, and Docker. AI track adds Python, LangChain, OpenAI APIs, and vector databases.",
      },
    },
    {
      "@type": "Question",
      name: "Are the classes live or pre-recorded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All core sessions are live with your cohort. Every session is recorded and available within 24 hours so you never fall behind. Workshops, code reviews, and mentor sessions are always live.",
      },
    },
    {
      "@type": "Question",
      name: "Do students build real projects at Coding Sharks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every week you ship something. By the end of the program you'll have 3–5 production-grade projects on GitHub with real users — not tutorial clones — which is exactly what interviewers want to see.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to get placed after completing the Coding Sharks program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most students receive their first offer within 4–8 weeks of completing the program. Our placement team actively connects you with hiring partners and prepares you through mock interviews and referrals.",
      },
    },
    {
      "@type": "Question",
      name: "Does Coding Sharks offer a placement guarantee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Coding Sharks has a 91%+ placement rate across all cohorts. Our dedicated placement team provides mock interviews, resume reviews, and direct referrals to 100+ hiring partners to ensure you get placed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the fee for Coding Sharks courses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Course fees vary by program. Full Stack Engineering is ₹1,40,000 and AI Agents & Automation is ₹90,000. We offer EMI options and ISA (Income Share Agreement) so you pay only after getting placed.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

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
