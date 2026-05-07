"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
    return false;
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", eventName);
    return true;
  }

  if (retries > 0) {
    window.setTimeout(() => trackEvent(eventName, retries - 1), 200);
    return false;
  }

  console.warn(`[MetaPixel] fbq is unavailable, dropped event: ${eventName}`);
  return false;
}

function MetaPixelRouteTracker({
  onEvent,
}: {
  onEvent: (eventName: string, url: string) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageViewTrackedUrlRef = useRef<string | null>(null);
  const leadTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (pageViewTrackedUrlRef.current !== url) {
      trackEvent("PageView", 30);
      onEvent("PageView", url);
      pageViewTrackedUrlRef.current = url;
    }

    if (pathname === "/thank-you" && leadTrackedUrlRef.current !== url) {
      trackEvent("Lead", 30);
      onEvent("Lead", url);
      leadTrackedUrlRef.current = url;
    }
  }, [pathname, searchParams, onEvent]);

  return null;
}

function MetaPixelDebugOverlay({
  pathname,
  sdkStatus,
  fbqStatus,
  lastEvent,
  lastUrl,
}: {
  pathname: string;
  sdkStatus: string;
  fbqStatus: string;
  lastEvent: string;
  lastUrl: string;
}) {
  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 2147483647,
        width: 320,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(10, 10, 10, 0.92)",
        color: "#fff",
        boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
        padding: 14,
        fontSize: 12,
        lineHeight: 1.5,
        backdropFilter: "blur(10px)",
      }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
        Meta Pixel Debug
      </div>
      <div>
        Hostname:{" "}
        {typeof window !== "undefined" ? window.location.hostname : "n/a"}
      </div>
      <div>Path: {pathname}</div>
      <div>Pixel ID: {PIXEL_ID}</div>
      <div>SDK: {sdkStatus}</div>
      <div>fbq: {fbqStatus}</div>
      <div>Last event: {lastEvent}</div>
      <div>Last url: {lastUrl || "n/a"}</div>
      <div style={{ marginTop: 8, opacity: 0.75 }}>
        Enable with <strong>?pixel-debug=1</strong> or{" "}
        <strong>NEXT_PUBLIC_META_PIXEL_DEBUG=1</strong>
      </div>
    </div>
  );
}

function DebugController({ onEnabled }: { onEnabled: (v: boolean) => void }) {
  const searchParams = useSearchParams();
  const enabled = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_META_PIXEL_DEBUG === "1" ||
      searchParams.get("pixel-debug") === "1"
    );
  }, [searchParams]);

  useEffect(() => {
    onEnabled(enabled);
  }, [enabled, onEnabled]);

  return null;
}

export function MetaPixel() {
  const pixelInitializedRef = useRef(false);
  const pathnameClientRef = useRef<string>("");
  const [sdkStatus, setSdkStatus] = useState("loading");
  const [fbqStatus, setFbqStatus] = useState<string>("unknown");
  const [lastEvent, setLastEvent] = useState<string>("none");
  const [lastUrl, setLastUrl] = useState<string>("");
  const [debugEnabled, setDebugEnabled] = useState(false);

  const handleEvent = (eventName: string, url: string) => {
    pathnameClientRef.current = url;
    setLastEvent(eventName);
    setLastUrl(url);
  };

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
          setSdkStatus("loaded");

          if (typeof window.fbq !== "function") {
            setFbqStatus("missing");
            console.warn("[MetaPixel] SDK loaded but fbq is still missing.");
            return;
          }

          if (!pixelInitializedRef.current) {
            window.fbq("init", PIXEL_ID);
            window.fbq("track", "PageView");
            pixelInitializedRef.current = true;
          }

          setFbqStatus("available");
        }}
        onError={() => {
          setSdkStatus("error");
          setFbqStatus("missing");
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

      <Suspense fallback={null}>
        <MetaPixelRouteTracker onEvent={handleEvent} />
        <DebugController onEnabled={setDebugEnabled} />
      </Suspense>

      {debugEnabled ? (
        <MetaPixelDebugOverlay
          pathname={pathnameClientRef.current}
          sdkStatus={sdkStatus}
          fbqStatus={fbqStatus}
          lastEvent={lastEvent}
          lastUrl={lastUrl}
        />
      ) : null}
    </>
  );
}
