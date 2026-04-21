import type { Metadata } from "next";
import { BlogDetailPage } from "@/components/pages/blog/blog-detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogService } from "@/backend/services/blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await BlogService.getBySlug(slug);
    const url = `${BASE_URL}/blog/${slug}`;
    const title = `${blog.title} | Coding Sharks Blog`;
    const description =
      blog.excerpt ??
      "Read expert insights on coding, career growth, and tech from the Coding Sharks team.";

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title,
        description,
        publishedTime: blog.created_at,
        authors: ["Coding Sharks Team"],
        images: blog.base_url
          ? [{ url: blog.base_url, width: 1200, height: 630, alt: blog.title }]
          : [{ url: "/og-default.png", width: 1200, height: 630, alt: blog.title }],
        tags: blog.tags?.map((t) => t.name) ?? [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [blog.base_url ?? "/og-default.png"],
      },
    };
  } catch {
    return {
      title: "Blog Post | Coding Sharks",
      description:
        "Read expert insights on coding, career growth, and tech from the Coding Sharks team.",
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let blogSchema = null;

  try {
    const blog = await BlogService.getBySlug(slug);
    const url = `${BASE_URL}/blog/${slug}`;

    blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt ?? "",
      url,
      image: blog.base_url ?? `${BASE_URL}/og-default.png`,
      datePublished: blog.created_at,
      dateModified: blog.updated_at ?? blog.created_at,
      author: {
        "@type": "Organization",
        name: "Coding Sharks Team",
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Coding Sharks",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      keywords: blog.tags?.map((t) => t.name).join(", ") ?? "",
      articleSection: "Technology & Career",
      inLanguage: "en-IN",
    };
  } catch {
    // Blog not found — BlogDetailPage handles 404 UI
  }

  return (
    <>
      {blogSchema && <JsonLd data={blogSchema} />}
      <BlogDetailPage slug={slug} />
    </>
  );
}
