export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: { text: string; by?: string };
  stat?: { v: string; l: string };
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogStat {
  v: string;
  l: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole?: string;
  publishDate: string;
  category: string;
  tags: string[];
  featuredImage: string;
  secondaryImage?: string;
  readingTime: number;
  design?: string;
  theme?: { acc: string; ink: string };
  lead?: string;
  sections?: BlogSection[];
  takeaways?: string[];
  stats?: BlogStat[];
  faqs?: BlogFaq[];
  relatedSlugs?: string[];
}
