import site from "@/data/site.json";

/**
 * Single source of truth for brand / NAP / geo / social.
 * Everything SEO-related (schema, metadata, footer, llms.txt) reads from here.
 * Canonical host = thecodingsharks.com (env override allowed). No trailing slash.
 */
const PROD_URL = (site.url ?? "https://www.thecodingsharks.com").replace(/\/$/, "");
const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

// Canonical/SEO URLs must always point at the production domain. Ignore the
// Vercel preview host and localhost even if NEXT_PUBLIC_SITE_URL is set to them,
// so canonical tags, sitemap, and schema never point at *.vercel.app.
export const SITE_URL =
  envUrl && !/vercel\.app|localhost|127\.0\.0\.1/i.test(envUrl) ? envUrl : PROD_URL;

const sameAs = Object.values(site.socials).filter(
  (u): u is string => typeof u === "string" && u.startsWith("http"),
);

export const BUSINESS = {
  name: site.name,
  alternateName: site.alternateName,
  url: SITE_URL,
  tagline: site.tagline,
  description: site.brand.description,
  foundingDate: site.foundingDate,
  email: site.contact.email,
  phone: site.contact.phoneE164,
  phoneDisplay: site.contact.phone,
  address: {
    street: site.address.line1,
    city: site.address.city,
    region: site.address.region,
    postalCode: site.address.postalCode,
    country: site.address.country,
    countryCode: site.address.countryCode,
  },
  geo: { lat: site.geo.latitude, lng: site.geo.longitude },
  hours: site.hours,
  social: site.socials,
  sameAs,
  logo: `${SITE_URL}/logo.png`,
  ogImage: `${SITE_URL}/og-default.png`,
} as const;
