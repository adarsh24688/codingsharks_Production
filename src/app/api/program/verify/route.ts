import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { findByOrderId, markPaid } from "@/lib/program-registrations";

export const runtime = "nodejs";

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1).max(64),
  razorpay_payment_id: z.string().min(1).max(64),
  razorpay_signature: z.string().min(1).max(256),
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

  const parsed = verifySchema.safeParse(json);
  if (!parsed.success) {
    return respond(400, { success: false, error: "Invalid payment data" });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  try {
    const valid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });
    if (!valid) {
      return respond(400, { success: false, error: "Payment verification failed" });
    }

    const registration = await findByOrderId(razorpay_order_id);
    if (!registration) {
      return respond(404, { success: false, error: "Order not found" });
    }

    const result = await markPaid({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amountPaise: registration.amount_paise,
    });

    if (result === "amount_mismatch" || result === "not_found") {
      console.error("[program/verify] unexpected result", result, razorpay_order_id);
      return respond(409, { success: false, error: "Payment could not be confirmed" });
    }

    return respond(200, { success: true, data: { status: "paid" } });
  } catch (err) {
    console.error("[program/verify] failed", err);
    return respond(500, {
      success: false,
      error: "Payment received. Confirmation is being processed.",
    });
  }
}
