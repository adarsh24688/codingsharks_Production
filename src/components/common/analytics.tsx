"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Client-only globals. Trackers are heavy (Pixel + GTM + Clarity) and not needed
// for first paint — defer them until the browser is idle OR the user first
// interacts, whichever comes first. This keeps them off the critical path so
// LCP/INP stay fast, while still capturing PageView on every real visit.
const MetaPixel = dynamic(() => import("./meta-pixel").then((m) => m.MetaPixel), { ssr: false });
const GoogleAds = dynamic(() => import("./google-ads").then((m) => m.GoogleAds), { ssr: false });
const Clarity = dynamic(() => import("./clarity").then((m) => m.Clarity), { ssr: false });
const AppToaster = dynamic(() => import("./toaster").then((m) => m.AppToaster), { ssr: false });

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

function useDeferredReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let fired = false;
    const go = () => {
      if (fired) return;
      fired = true;
      setReady(true);
    };

    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "mousemove",
      "touchstart",
      "keydown",
      "click",
    ];
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));

    const w = window as IdleWindow;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(go, { timeout: 4000 });
    } else {
      timeoutId = window.setTimeout(go, 3000);
    }

    return () => {
      events.forEach((e) => window.removeEventListener(e, go));
      if (idleId !== undefined && typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return ready;
}

export function Analytics() {
  const ready = useDeferredReady();

  return (
    <>
      <AppToaster />
      {ready && (
        <>
          <MetaPixel />
          <GoogleAds />
          <Clarity />
        </>
      )}
    </>
  );
}
