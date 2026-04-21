import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import workshops from "@/data/workshops.json";
import { WorkshopDetailPage } from "@/components/pages/workshop/workshop-detail-page";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

interface WorkshopPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return workshops.filter((w) => w.is_active).map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: WorkshopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workshop = workshops.find((w) => w.slug === slug && w.is_active);
  if (!workshop) return { title: "Workshop Not Found" };

  const url = `${BASE_URL}/workshops/${workshop.slug}`;
  const title = `${workshop.title} — Free Workshop | Coding Sharks`;
  const description = `${workshop.short_description} Join ${workshop.instructor_name} (${workshop.instructor_title}) on ${workshop.event_date}. ${workshop.price === "Free" ? "Free to attend." : `Only ${workshop.price}.`} Register now.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: workshop.base_url
        ? [{ url: workshop.base_url, width: 1200, height: 630, alt: workshop.title }]
        : [{ url: "/og-default.png", width: 1200, height: 630, alt: workshop.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [workshop.base_url ?? "/og-default.png"],
    },
  };
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { slug } = await params;
  const workshop = workshops.find((w) => w.slug === slug && w.is_active);
  if (!workshop) notFound();

  const startDateTime = `${workshop.event_date}T${workshop.event_time_from ?? workshop.event_time}:00+05:30`;
  const endDateTime = `${workshop.event_date}T${workshop.event_time_to ?? "20:00"}:00+05:30`;

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: workshop.title,
    description: workshop.short_description,
    url: `${BASE_URL}/workshops/${workshop.slug}`,
    startDate: startDateTime,
    endDate: endDateTime,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      workshop.mode === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/MixedEventAttendanceMode",
    location:
      workshop.mode === "online"
        ? {
            "@type": "VirtualLocation",
            url: `${BASE_URL}/workshops/${workshop.slug}`,
          }
        : {
            "@type": "Place",
            name: "Coding Sharks — Indore",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Indore",
              addressRegion: "Madhya Pradesh",
              addressCountry: "IN",
            },
          },
    organizer: {
      "@type": "Organization",
      name: "Coding Sharks",
      url: BASE_URL,
    },
    performer: {
      "@type": "Person",
      name: workshop.instructor_name,
      jobTitle: workshop.instructor_title,
    },
    image: workshop.base_url ?? `${BASE_URL}/og-default.png`,
    offers: {
      "@type": "Offer",
      price: workshop.is_free ? "0" : workshop.price?.replace(/[₹,]/g, "") ?? "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/workshops/${workshop.slug}`,
      validFrom: new Date().toISOString().split("T")[0],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Workshops",
        item: `${BASE_URL}/workshops`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: workshop.title,
        item: `${BASE_URL}/workshops/${workshop.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={eventSchema} />
      <JsonLd data={breadcrumbSchema} />
      <WorkshopDetailPage workshop={workshop} />
    </>
  );
}
