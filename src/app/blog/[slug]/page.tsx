import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogs, getBlogBySlug, getRelatedBlogs } from "@/lib/blog-data";
import { getBlogTemplate } from "@/components/blog/templates";
import { MicrositeShell } from "@/components/layout/microsite-shell";
import { getBlogTheme } from "@/components/blog/templates/shared";
import { faqSchema } from "@/lib/seo-schema";
import { SITE_URL } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/json-ld";

const BASE_URL = SITE_URL;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogs().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  const title = `${article.title} — Coding Sharks Blog`;
  const url = `${BASE_URL}/blog/${article.slug}`;

  return {
    title,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: article.excerpt,
      publishedTime: article.publishDate,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: article.featuredImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  };
}

export default async function BlogDetailRoute({ params }: Props) {
  const { slug } = await params;
  const article = getBlogBySlug(slug);
  if (!article) notFound();

  const related = getRelatedBlogs(slug, article.category);
  const theme = getBlogTheme(article);
  const Template = getBlogTemplate(article.design ?? "");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
      ...(article.authorRole ? { jobTitle: article.authorRole } : {}),
    },
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    image: [article.featuredImage],
    articleSection: article.category,
    keywords: article.tags,
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Coding Sharks",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${article.slug}`,
    },
  };

  const blogFaq = article.faqs?.length ? faqSchema(article.faqs) : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${BASE_URL}/blog/${article.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {blogFaq && <JsonLd data={blogFaq} />}
      <MicrositeShell title={article.title} theme={theme}>
        <Template article={article} related={related} />
      </MicrositeShell>
    </>
  );
}
