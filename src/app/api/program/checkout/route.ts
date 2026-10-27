import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeIndianMobile } from "@/lib/validators";
import { createRazorpayOrder, getPublicKeyId } from "@/lib/razorpay";
import { saveSubmittedDraft } from "@/lib/program-drafts";
import { sendMetaEvent, trackingFromRequest } from "@/lib/meta-capi";
import {
  PROGRAM_NAME,
  RESERVATION_AMOUNT_PAISE,
  attachOrder,
  insertRegistration,
  markOrderCreationFailed,
} from "@/lib/program-registrations";

export const runtime = "nodejs";

const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(80),
  whatsapp: z
    .string()
    .transform((v) => sanitizeIndianMobile(v))
    .refine((v) => /^[6-9]\d{9}$/.test(v), "Invalid WhatsApp number"),
  email: z.string().trim().toLowerCase().email().max(120),
  status: z.string().trim().min(1).max(60),
  college: z.string().trim().min(2).max(120),
  reality_check_score: z.number().int().min(0).max(50).nullable().optional(),
  indore: z.boolean().optional(),
  draft_id: z.string().uuid().optional(),
  page: z.string().trim().max(300).optional(),
  utm: z.record(z.string(), z.string().max(200)).optional(),
  lead_event_id: z.string().trim().max(80).optional(),
});

function respond(status: number, body: Record<string, unknown>) {
  return NextResponse.json({ ...body, requestId: crypto.randomUUID() }, { status });
}

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return respond(400, { success: false, error: "Invalid request body" });
  }

  const parsed = checkoutSchema.safeParse(json);
  if (!parsed.success) {
    return respond(400, { success: false, error: "Please check your details and try again." });
  }
  const input = parsed.data;
  const whatsapp = `+91${input.whatsapp}`;
  const tracking = { ...trackingFromRequest(request, input.utm?.fbclid), lead_event_id: input.lead_event_id };

  let registrationId: string;
  try {
    const row = await insertRegistration({
      name: input.name,
      whatsapp,
      email: input.email,
      status: input.status,
      college: input.college,
      reality_check_score: input.reality_check_score ?? null,
      source_page: input.page ?? null,
      utm: input.utm ?? {},
      tracking,
    });
    registrationId = row.id;
  } catch (err) {
    console.error("[program/checkout] insert failed", err);
    return respond(500, { success: false, error: "Could not save your details. Please try again." });
  }

  await sendMetaEvent({
    eventName: "Lead",
    eventId: input.lead_event_id ?? `lead_${registrationId}`,
    eventSourceUrl: input.page,
    email: input.email,
    phone: whatsapp,
    name: input.name,
    externalId: registrationId,
    tracking,
  });

  try {
    const order = await createRazorpayOrder({
      amountPaise: RESERVATION_AMOUNT_PAISE,
      receipt: registrationId,
      notes: {
        registration_id: registrationId,
        program: PROGRAM_NAME,
        name: input.name,
        whatsapp,
        email: input.email,
      },
    });
    await attachOrder(registrationId, order.id);

    await saveSubmittedDraft({
      draftId: input.draft_id ?? crypto.randomUUID(),
      registrationId,
      orderId: order.id,
      fields: {
        name: input.name,
        whatsapp: input.whatsapp,
        email: input.email,
        status: input.status,
        college: input.college,
        indore: input.indore ?? true,
        reality_check_score: input.reality_check_score ?? null,
        utm: input.utm ?? {},
        page: input.page ?? null,
      },
    }).catch((err) => console.error("[program/checkout] draft sync failed", err));

    return respond(200, {
      success: true,
      data: {
        registrationId,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: getPublicKeyId(),
        prefill: { name: input.name, email: input.email, contact: whatsapp },
      },
    });
  } catch (err) {
    console.error("[program/checkout] order failed", err);
    await markOrderCreationFailed(
      registrationId,
      err instanceof Error ? err.message : "order creation failed"
    ).catch(() => undefined);
    return respond(502, {
      success: false,
      error: "Payment could not be started. Please try again in a moment.",
    });
  }
}
