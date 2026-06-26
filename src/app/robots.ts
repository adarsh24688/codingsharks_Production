import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * AEO-aware robots policy:
 * - everyone gets the public site
 * - opt OUT of model TRAINING crawlers
 * - explicitly ALLOW retrieval/search bots (these put us IN AI answers)
 * Dev = block everything.
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
      // Everyone (incl. Googlebot + retrieval bots) — full access minus utility paths
      { userAgent: "*", allow: "/", disallow: blockedPaths },

      // Opt out of MODEL TRAINING corpora
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "meta-externalagent", disallow: "/" },

      // Explicitly ALLOW retrieval/search bots — these cite us in AI answers
      { userAgent: "OAI-SearchBot", allow: "/", disallow: blockedPaths },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: blockedPaths },
      { userAgent: "PerplexityBot", allow: "/", disallow: blockedPaths },
      { userAgent: "Googlebot", allow: "/", disallow: blockedPaths },
      { userAgent: "Applebot", allow: "/", disallow: blockedPaths },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
