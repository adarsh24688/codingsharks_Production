import { SITE_URL, BUSINESS } from "@/lib/site-config";
import courses from "@/data/courses.json";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * ONE business node, referenced by @id everywhere.
 * Type = EducationalOrganization + LocalBusiness (most specific that fits).
 * NO self-serving aggregateRating (LAW 5 — stars come from Google Business Profile
 * or genuine first-party Review data on /reviews only).
 * NO price on services (owner rule — fees are never shown).
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORG_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: BUSINESS.logo, width: 512, height: 512 },
    image: [BUSINESS.ogImage],
    description: BUSINESS.description,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    foundingDate: BUSINESS.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    areaServed: [
      { "@type": "City", name: "Indore" },
      { "@type": "State", name: "Madhya Pradesh" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coding Programs",
      itemListElement: courses.map((c) => ({
        "@type": "Course",
        name: c.title,
        description: c.tagline ?? c.description ?? c.title,
        url: `${SITE_URL}/courses/${c.slug}`,
        provider: { "@id": ORG_ID },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/book-demo`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Book a free demo session" },
    },
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
    // NOTE: aggregateRating intentionally omitted — see LAW 5. Add genuine Review data on /reviews.
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BUSINESS.name,
    url: `${SITE_URL}/`,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** FAQPage — DOM text must match these strings verbatim (AI-extraction signal). */
export function faqSchema(faqs: { q: string; a: string }[]) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

export { ORG_ID, WEBSITE_ID };
