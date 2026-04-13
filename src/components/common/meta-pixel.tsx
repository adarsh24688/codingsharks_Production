"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "970927388458009";
const PIXEL_SDK_URL = "https://connect.facebook.net/en_US/fbevents.js";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type FbqStub = ((...args: unknown[]) => void) & {
  queue?: unknown[][];
};

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

function ensurePixelStub() {
  if (typeof window === "undefined" || typeof window.fbq === "function") {
    return;
  }

  const fbqStub = ((...args: unknown[]) => {
    fbqStub.queue = [...(fbqStub.queue ?? []), args];
  }) as FbqStub;

  window.fbq = fbqStub;
}

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageViewTrackedUrlRef = useRef<string | null>(null);
  const leadTrackedUrlRef = useRef<string | null>(null);
  const pixelInitializedRef = useRef(false);
  const [sdkStatus, setSdkStatus] = useState("loading");
  const [fbqStatus, setFbqStatus] = useState(() => {
    if (typeof window === "undefined") {
      return "unknown";
    }

    return typeof window.fbq === "function" ? "available" : "missing";
  });
  const [lastEvent, setLastEvent] = useState<string>("none");
  const [lastUrl, setLastUrl] = useState<string>("");

  const debugEnabled = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_META_PIXEL_DEBUG === "1" ||
      searchParams.get("pixel-debug") === "1"
    );
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    ensurePixelStub();

    const existingScript = document.querySelector(
      'script[data-meta-pixel-sdk="true"]',
    );

    if (existingScript) {
      return;
    }

    const sdkScript = document.createElement("script");
    sdkScript.async = true;
    sdkScript.src = PIXEL_SDK_URL;
    sdkScript.dataset.metaPixelSdk = "true";

    sdkScript.onload = () => {
      setSdkStatus("loaded");

      if (typeof window.fbq !== "function") {
        setFbqStatus("missing");
        console.warn("[MetaPixel] SDK loaded but fbq is still missing.");
        return;
      }

      if (!pixelInitializedRef.current) {
        window.fbq("init", PIXEL_ID);
        pixelInitializedRef.current = true;
      }

      setFbqStatus("available");

      if (debugEnabled) {
        console.info("[MetaPixel] SDK loaded and initialized", {
          pixelId: PIXEL_ID,
          pathname,
        });
      }
    };

    sdkScript.onerror = () => {
      setSdkStatus("error");
      setFbqStatus("missing");
      console.warn("[MetaPixel] Failed to load Facebook Pixel SDK.");
    };

    document.head.appendChild(sdkScript);

    return () => {
      sdkScript.onload = null;
      sdkScript.onerror = null;
    };
  }, [debugEnabled, pathname]);

  const emitEvent = (eventName: string, nextUrl: string) => {
    window.setTimeout(() => {
      setLastEvent(eventName);
      setLastUrl(nextUrl);
    }, 0);

    if (eventName === "PageView") {
      return trackEvent("PageView", 30);
    }

    if (eventName === "Lead") {
      return trackEvent("Lead", 30);
    }

    return false;
  };

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (pageViewTrackedUrlRef.current !== url) {
      emitEvent("PageView", url);
      pageViewTrackedUrlRef.current = url;
    }

    if (pathname === "/thank-you" && leadTrackedUrlRef.current !== url) {
      emitEvent("Lead", url);
      leadTrackedUrlRef.current = url;
    }
  }, [pathname, searchParams]);

  return (
    <>
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

      {debugEnabled ? (
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
      ) : null}
    </>
  );
}
