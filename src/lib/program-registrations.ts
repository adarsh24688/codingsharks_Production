import { SupabaseError, supabaseRest } from "@/lib/supabase-admin";
import { sendMetaEvent, type MetaTracking } from "@/lib/meta-capi";
import { markDraftFailed, markDraftPaid } from "@/lib/program-drafts";

export const PROGRAM_NAME = "AI-Native Developer Program";
export const RESERVATION_AMOUNT_PAISE = 49900;

const TABLE = "program_registrations";

export interface RegistrationRow {
  id: string;
  payment_status: "created" | "paid" | "failed";
  amount_paise: number;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  name?: string;
  email?: string;
  whatsapp?: string;
  source_page?: string | null;
  tracking?: MetaTracking | null;
}

export interface NewRegistration {
  name: string;
  whatsapp: string;
  email: string;
  status: string;
  college: string;
  reality_check_score: number | null;
  source_page: string | null;
  utm: Record<string, string>;
  tracking?: MetaTracking;
}

export async function insertRegistration(input: NewRegistration): Promise<RegistrationRow> {
  const insert = (body: Record<string, unknown>) =>
    supabaseRest<RegistrationRow[]>(TABLE, {
      method: "POST",
      body: {
        ...body,
        program: PROGRAM_NAME,
        amount_paise: RESERVATION_AMOUNT_PAISE,
        currency: "INR",
        payment_status: "created",
      },
    });
  try {
    return (await insert({ ...input }))[0];
  } catch (err) {
    // The `tracking` column is added by a migration; keep checkout working until it exists.
    if (!(err instanceof SupabaseError) || !err.message.includes("tracking")) throw err;
    console.error("[program-registrations] tracking column missing, saving without it");
    const rest: Record<string, unknown> = { ...input };
    delete rest.tracking;
    return (await insert(rest))[0];
  }
}

export async function attachOrder(id: string, orderId: string): Promise<void> {
  await supabaseRest(`${TABLE}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: { razorpay_order_id: orderId, updated_at: new Date().toISOString() },
    returning: false,
  });
}

export async function markOrderCreationFailed(id: string, reason: string): Promise<void> {
  await supabaseRest(`${TABLE}?id=eq.${encodeURIComponent(id)}&payment_status=eq.created`, {
    method: "PATCH",
    body: {
      payment_status: "failed",
      failure_reason: reason.slice(0, 300),
      updated_at: new Date().toISOString(),
    },
    returning: false,
  });
}

export async function findByOrderId(orderId: string): Promise<RegistrationRow | null> {
  const rows = await supabaseRest<RegistrationRow[]>(
    `${TABLE}?razorpay_order_id=eq.${encodeURIComponent(orderId)}&select=id,payment_status,amount_paise,razorpay_order_id,razorpay_payment_id&limit=1`
  );
  return rows[0] ?? null;
}

export type MarkPaidResult = "updated" | "already_paid" | "not_found" | "amount_mismatch";

export async function markPaid(input: {
  orderId: string;
  paymentId: string;
  amountPaise: number;
}): Promise<MarkPaidResult> {
  const updated = await supabaseRest<RegistrationRow[]>(
    `${TABLE}?razorpay_order_id=eq.${encodeURIComponent(input.orderId)}&payment_status=neq.paid&amount_paise=eq.${input.amountPaise}`,
    {
      method: "PATCH",
      body: {
        payment_status: "paid",
        razorpay_payment_id: input.paymentId,
        paid_at: new Date().toISOString(),
        failure_reason: null,
        updated_at: new Date().toISOString(),
      },
    }
  );
  if (updated.length > 0) {
    const row = updated[0];
    await sendMetaEvent({
      eventName: "Purchase",
      eventId: `purchase_${input.orderId}`,
      eventSourceUrl: row.source_page,
      email: row.email,
      phone: row.whatsapp,
      name: row.name,
      externalId: row.id,
      tracking: row.tracking ?? undefined,
      value: input.amountPaise / 100,
    });
    await markDraftPaid({ orderId: input.orderId, paymentId: input.paymentId }).catch((err) =>
      console.error("[program-registrations] draft paid sync failed", err)
    );
    return "updated";
  }

  const existing = await findByOrderId(input.orderId);
  if (!existing) return "not_found";
  if (existing.payment_status === "paid") {
    await markDraftPaid({ orderId: input.orderId, paymentId: input.paymentId }).catch((err) =>
      console.error("[program-registrations] draft paid sync failed", err)
    );
    return "already_paid";
  }
  return "amount_mismatch";
}

export async function markPaymentFailed(input: {
  orderId: string;
  reason: string;
}): Promise<void> {
  await supabaseRest(
    `${TABLE}?razorpay_order_id=eq.${encodeURIComponent(input.orderId)}&payment_status=eq.created`,
    {
      method: "PATCH",
      body: {
        payment_status: "failed",
        failure_reason: input.reason.slice(0, 300),
        updated_at: new Date().toISOString(),
      },
      returning: false,
    }
  );
  await markDraftFailed(input.orderId).catch((err) =>
    console.error("[program-registrations] draft failed sync failed", err)
  );
}
