import { NextResponse, type NextRequest } from "next/server";

/**
 * Keep ONE canonical host indexable (thecodingsharks.com).
 * Any other host serving this same deployment (e.g. *.vercel.app) gets
 * X-Robots-Tag: noindex so it can't compete with the canonical domain as
 * duplicate content. The canonical host is unaffected.
 *
 * Next 16 "proxy" convention (replaces the deprecated "middleware" file).
 */
const CANONICAL_HOST = "thecodingsharks.com";

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const isCanonical = host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`;

  const res = NextResponse.next();
  if (!isCanonical) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  // Run on pages, skip Next internals and static assets.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
