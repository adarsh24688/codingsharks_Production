"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "970927388458009";
const PIXEL_SDK_URL = "https://connect.facebook.net/en_US/fbevents.js";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackEvent(eventName: string, retries = 10) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", eventName);
    return;
  }

  if (retries > 0) {
    window.setTimeout(() => trackEvent(eventName, retries - 1), 200);
    return;
  }

  console.warn(`[MetaPixel] fbq is unavailable, dropped event: ${eventName}`);
}

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageViewTrackedUrlRef = useRef<string | null>(null);
  const leadTrackedUrlRef = useRef<string | null>(null);
  const pixelInitializedRef = useRef(false);

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (pageViewTrackedUrlRef.current !== url) {
      trackEvent("PageView", 30);
      pageViewTrackedUrlRef.current = url;
    }

    if (pathname === "/thank-you" && leadTrackedUrlRef.current !== url) {
      trackEvent("Lead", 30);
      leadTrackedUrlRef.current = url;
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined" && !PIXEL_ID) {
      console.warn("[MetaPixel] NEXT_PUBLIC_FB_PIXEL_ID is missing.");
    }
  }, []);

  return (
    <>
      <Script
        id="facebook-pixel-stub"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;
n.loaded=!0;n.version='2.0';n.queue=[];}(window, document,'script');`,
        }}
      />

      <Script
        id="facebook-pixel-sdk"
        strategy="afterInteractive"
        src={PIXEL_SDK_URL}
        onLoad={() => {
          if (pixelInitializedRef.current || typeof window.fbq !== "function") {
            return;
          }

          window.fbq("init", PIXEL_ID);
          pixelInitializedRef.current = true;
        }}
        onError={() => {
          console.warn("[MetaPixel] Failed to load Facebook Pixel SDK.");
        }}
      />

      <noscript>
        <Image
          alt="Meta Pixel noscript tracking pixel"
          height="1"
          unoptimized
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
