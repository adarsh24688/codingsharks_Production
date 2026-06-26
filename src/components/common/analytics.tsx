"use client";

import dynamic from "next/dynamic";

// Client-only globals: analytics + toast overlay. None of these need SSR — running
// their hooks during static prerender risks a null React dispatcher in the SSR chunk
// (which crashed the static export). ssr:false keeps them off the server render entirely.
const MetaPixel = dynamic(
  () => import("./meta-pixel").then((m) => m.MetaPixel),
  { ssr: false },
);
const GoogleAds = dynamic(
  () => import("./google-ads").then((m) => m.GoogleAds),
  { ssr: false },
);
const Clarity = dynamic(
  () => import("./clarity").then((m) => m.Clarity),
  { ssr: false },
);
const AppToaster = dynamic(
  () => import("./toaster").then((m) => m.AppToaster),
  { ssr: false },
);

export function Analytics() {
  return (
    <>
      <MetaPixel />
      <GoogleAds />
      <Clarity />
      <AppToaster />
    </>
  );
}
