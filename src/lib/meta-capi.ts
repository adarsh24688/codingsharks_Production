import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

// Server-side copy of the Meta Pixel events (Conversions API).
// Does nothing until META_CAPI_TOKEN is set. Each event uses the same event_id
// as the browser pixel, so Meta counts it once.

const GRAPH_VERSION = "v23.0";
const PIXEL_ID = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "970927388458009";

export interface MetaTracking {
  fbp?: string;
  fbc?: string;
  ip?: string;
  ua?: string;
  lead_event_id?: string;
}

export interface MetaEventInput {
  eventName: "Lead" | "Purchase";
  eventId: string;
  eventSourceUrl?: string | null;
  email?: string;
  phone?: string;
  name?: string;
  externalId?: string;
  tracking?: MetaTracking;
  value?: number;
}

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

/** Browser IDs, IP and user agent from the checkout request. `fbclid` builds `fbc` when the cookie is missing. */
export function trackingFromRequest(request: NextRequest, fbclid?: string): MetaTracking {
  const fbp = request.cookies.get("_fbp")?.value;
  let fbc = request.cookies.get("_fbc")?.value;
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;
  const ua = request.headers.get("user-agent")?.slice(0, 400) || undefined;
  return { fbp, fbc, ip, ua };
}

export async function sendMetaEvent(input: MetaEventInput): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return;

  const t = input.tracking ?? {};
  const phoneDigits = input.phone?.replace(/\D/g, "");
  const [first, ...rest] = (input.name ?? "").trim().toLowerCase().split(/\s+/);

  const userData: Record<string, unknown> = {
    em: input.email ? [sha256(input.email.trim().toLowerCase())] : undefined,
    ph: phoneDigits ? [sha256(phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits)] : undefined,
    fn: first ? [sha256(first)] : undefined,
    ln: rest.length ? [sha256(rest[rest.length - 1])] : undefined,
    country: [sha256("in")],
    external_id: input.externalId ? [sha256(input.externalId)] : undefined,
    fbp: t.fbp,
    fbc: t.fbc,
    client_ip_address: t.ip,
    client_user_agent: t.ua,
  };

  const body = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl ?? undefined,
        user_data: userData,
        custom_data:
          input.value !== undefined
            ? { value: input.value, currency: "INR", content_name: "AI-Native Developer Program" }
            : { content_name: "AI-Native Developer Program" },
      },
    ],
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
        signal: AbortSignal.timeout(5_000),
      }
    );
    if (!res.ok) {
      console.error("[meta-capi]", input.eventName, res.status, (await res.text().catch(() => "")).slice(0, 300));
    }
  } catch (err) {
    console.error("[meta-capi]", input.eventName, "request failed", err);
  }
}
