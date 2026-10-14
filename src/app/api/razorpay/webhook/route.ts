import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { markPaid, markPaymentFailed } from "@/lib/program-registrations";

export const runtime = "nodejs";

const paymentEntitySchema = z.object({
  id: z.string(),
  order_id: z.string().nullable().optional(),
  amount: z.number().int(),
  error_description: z.string().nullable().optional(),
});

const eventSchema = z.object({
  event: z.string(),
  payload: z
    .object({
      payment: z.object({ entity: paymentEntitySchema }).optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ success: false, error: "Missing signature" }, { status: 400 });
  }

  let valid = false;
  try {
    valid = verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    console.error("[razorpay/webhook] misconfigured", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
  if (!valid) {
    return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ success: true });
  }

  const parsed = eventSchema.safeParse(parsedBody);
  if (!parsed.success) {
    return NextResponse.json({ success: true });
  }

  const { event, payload } = parsed.data;
  const payment = payload?.payment?.entity;
  if (!payment?.order_id) {
    return NextResponse.json({ success: true });
  }

  try {
    if (event === "payment.captured" || event === "order.paid") {
      const result = await markPaid({
        orderId: payment.order_id,
        paymentId: payment.id,
        amountPaise: payment.amount,
      });
      if (result === "amount_mismatch" || result === "not_found") {
        console.error("[razorpay/webhook] markPaid", result, payment.order_id, payment.id);
      }
    } else if (event === "payment.failed") {
      await markPaymentFailed({
        orderId: payment.order_id,
        reason: payment.error_description ?? "payment failed",
      });
    }
  } catch (err) {
    console.error("[razorpay/webhook] processing failed", event, err);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
