import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailPage } from "@/components/pages/courses/course-detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import courses from "@/data/courses.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Program Not Found" };

  const title = `${course.title} Course — ${course.duration} Live Training | Coding Sharks`;
  const description = `${course.description} ${course.placementRate} placement rate. ${course.students} students enrolled. Live classes in Indore. Book a free demo session today.`;
  const url = `${BASE_URL}/courses/${course.slug}`;

  return {
    title,
    description,
    keywords: [
      course.title,
      `${course.title} course`,
      `${course.title} training Indore`,
      `learn ${course.title}`,
      `${course.title} bootcamp India`,
      "coding course with placement",
      "live coding classes",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: `/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${course.title} — Coding Sharks`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.png"],
    },
  };
}

export default async function CourseDetailRoute({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${BASE_URL}/courses/${course.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: "Coding Sharks",
      url: BASE_URL,
      sameAs: `${BASE_URL}/#organization`,
    },
    courseMode: course.mode?.toLowerCase().includes("online") ? "online" : "blended",
    educationalLevel: course.level,
    timeRequired: `P${course.duration?.replace(/\s+months?/i, "M").replace(/\s+weeks?/i, "W")}`,
    numberOfCredits: 0,
    teaches: course.whatYouLearn,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "blended",
      location: {
        "@type": "Place",
        name: "Coding Sharks — Indore",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
      },
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
        repeatCount: parseInt(course.duration ?? "24") * 4,
      },
      instructor: {
        "@type": "Person",
        name: "Coding Sharks Mentor",
        worksFor: { "@type": "Organization", name: "Coding Sharks" },
      },
    },
    offers: {
      "@type": "Offer",
      price: course.price?.replace(/[₹,]/g, "") ?? "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/book-demo`,
      validFrom: new Date().toISOString().split("T")[0],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "180",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${BASE_URL}/courses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.title,
        item: `${BASE_URL}/courses/${course.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />
      <CourseDetailPage slug={slug} />
    </>
  );
}
