import type { Metadata } from "next";
import { BOOTCAMP_VS_COLLEGE as data } from "@/data/seo-landing";
import { SeoLandingPage } from "@/components/pages/seo-landing-page";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/seo-schema";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: { canonical: `/${data.slug}` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/${data.slug}`,
    title: data.metaTitle,
    description: data.metaDescription,
  },
};

export default function BootcampVsCollegePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Coding Bootcamp vs College Degree", url: `/${data.slug}` },
  ]);

  return (
    <>
      <JsonLd data={faqSchema(data.faqs)!} />
      <JsonLd data={breadcrumb} />
      <SeoLandingPage data={data} />
    </>
  );
}
