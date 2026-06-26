import type { Metadata } from "next";
import { CoursesListingPage } from "@/components/pages/courses/courses-listing-page";
import { JsonLd } from "@/components/seo/json-ld";
import courses from "@/data/courses.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: "Coding Courses & Programs — Full Stack, AI Agents, Data Science | Coding Sharks",
  description:
    "Explore all Coding Sharks programs: Full Stack Engineering (6 months), AI Agents & Automation (4 months), Data Science, System Design, DSA Mastery and more.",
  keywords: [
    "coding courses India",
    "full stack course",
    "AI agents course",
    "data science bootcamp",
    "system design course",
    "DSA course",
    "coding bootcamp Indore",
    "best programming courses India",
  ],
  alternates: {
    canonical: `${BASE_URL}/courses`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/courses`,
    title: "Coding Courses & Programs — Coding Sharks",
    description:
      "Full Stack, AI Agents, Data Science, System Design and more. Live mentorship, real projects, 91%+ placement. Find your perfect program.",
  },
};

export default function ProgramsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Coding Sharks Courses",
    description: "Explore all placement-focused coding programs at Coding Sharks: Full Stack, AI, Data Science, Data Analytics, DSA, System Design and Python.",
    url: `${BASE_URL}/courses`,
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: course.title,
      url: `${BASE_URL}/courses/${course.slug}`,
      description: course.tagline,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <CoursesListingPage />
    </>
  );
}
