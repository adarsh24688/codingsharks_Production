import blogs from "@/data/blog.json";
import type { BlogArticle } from "@/types/blog";

export function getBlogs(): BlogArticle[] {
  return blogs as BlogArticle[];
}

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return blogs.find((b) => b.slug === slug) as BlogArticle | undefined;
}

export function getRelatedBlogs(
  slug: string,
  category: string,
  limit = 3
): BlogArticle[] {
  return (blogs as BlogArticle[])
    .filter((b) => b.slug !== slug && b.category === category)
    .slice(0, limit);
}
