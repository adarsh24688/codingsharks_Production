import type { Metadata } from "next";
import { AI_COURSE_INDIA as data } from "@/data/seo-landing";
import { SeoLandingPage } from "@/components/pages/seo-landing-page";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo-schema";

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

export default function AiCourseIndiaPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Course in India", url: `/${data.slug}` },
  ]);

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(data.faqs)!} />
      <JsonLd data={breadcrumb} />
      <SeoLandingPage data={data} />
    </>
  );
}
