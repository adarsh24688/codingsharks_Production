import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * Max-visibility robots policy for a public marketing site:
 * - allow everyone (including AI training crawlers) so the brand gets maximum
 *   reach across Search AND AI training/answer corpora
 * - explicitly welcome the AI search/retrieval bots that cite us in answers
 * - block only known aggressive/bad scrapers (server-load hygiene)
 * - block utility paths (/api, /thank-you) for everyone
 * Dev = block everything.
 *
 * NOTE: to opt OUT of AI TRAINING (privacy-conservative) while staying in AI
 * answers, add disallow rules for: GPTBot, ClaudeBot, CCBot, Google-Extended,
 * Applebot-Extended — and keep the retrieval bots below allowed.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NODE_ENV === "development") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }

  const blockedPaths = ["/api/", "/thank-you"];

  return {
    rules: [
      // Everyone allowed (max visibility), minus utility paths
      { userAgent: "*", allow: "/", disallow: blockedPaths },

      // Explicitly welcome AI search/retrieval bots — these cite us in AI answers
      { userAgent: "OAI-SearchBot", allow: "/", disallow: blockedPaths },
      { userAgent: "ChatGPT-User", allow: "/", disallow: blockedPaths },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: blockedPaths },
      { userAgent: "Claude-User", allow: "/", disallow: blockedPaths },
      { userAgent: "PerplexityBot", allow: "/", disallow: blockedPaths },
      { userAgent: "Perplexity-User", allow: "/", disallow: blockedPaths },
      { userAgent: "Googlebot", allow: "/", disallow: blockedPaths },
      { userAgent: "Applebot", allow: "/", disallow: blockedPaths },

      // Block only known aggressive scrapers (server-load hygiene)
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
