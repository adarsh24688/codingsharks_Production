"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { StickyHelpBar } from "./sticky-help-bar";
import { LeadModal } from "./lead-modal";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWorkshopDetail = /^\/workshops\/[^/]+/.test(pathname);
  const isInstaProjectPage = pathname.startsWith("/insta-project");
  const isCounselingPage = pathname.startsWith("/counseling");
  // Only the blog DETAIL page is a light microsite with its own chrome.
  // The /blog listing keeps the normal dark site chrome.
  const isBlogDetail = pathname.startsWith("/blog/");

  if (isWorkshopDetail || isInstaProjectPage || isCounselingPage || isBlogDetail) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
      <SiteFooter />
      <StickyHelpBar />
      <LeadModal />
    </>
  );
}
