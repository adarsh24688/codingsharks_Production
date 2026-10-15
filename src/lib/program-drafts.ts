import { supabaseRest } from "@/lib/supabase-admin";

const TABLE = "program_form_drafts";

export type DraftEvent = "typing" | "closed" | "left_page" | "submitted" | "paid";

export interface DraftFields {
  name?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  status?: string | null;
  college?: string | null;
  indore?: boolean | null;
  reality_check_score?: number | null;
  utm?: Record<string, string>;
  page?: string | null;
}

function hasAnyValue(fields: DraftFields): boolean {
  return Boolean(
    fields.name?.trim() ||
      fields.whatsapp?.trim() ||
      fields.email?.trim() ||
      fields.status?.trim() ||
      fields.college?.trim() ||
      fields.indore
  );
}

export async function saveDraft(input: {
  draftId: string;
  fields: DraftFields;
  event: DraftEvent;
}): Promise<void> {
  if (!hasAnyValue(input.fields)) return;

  const row = {
    ...input.fields,
    last_event: input.event,
    updated_at: new Date().toISOString(),
  };

  const updated = await supabaseRest<unknown[]>(
    `${TABLE}?draft_id=eq.${encodeURIComponent(input.draftId)}&stage=eq.draft`,
    { method: "PATCH", body: row }
  );
  if (updated.length === 0) {
    await supabaseRest(`${TABLE}?on_conflict=draft_id`, {
      method: "POST",
      body: { draft_id: input.draftId, stage: "draft", ...row },
      returning: false,
      ignoreDuplicates: true,
    });
  }
}

export async function saveSubmittedDraft(input: {
  draftId: string;
  fields: DraftFields;
  registrationId: string;
  orderId: string;
}): Promise<void> {
  const row = {
    ...input.fields,
    stage: "submitted" as const,
    last_event: "submitted" as const,
    registration_id: input.registrationId,
    razorpay_order_id: input.orderId,
    updated_at: new Date().toISOString(),
  };

  const updated = await supabaseRest<unknown[]>(
    `${TABLE}?draft_id=eq.${encodeURIComponent(input.draftId)}&stage=neq.paid`,
    { method: "PATCH", body: row }
  );
  if (updated.length === 0) {
    await supabaseRest(`${TABLE}?on_conflict=draft_id`, {
      method: "POST",
      body: { draft_id: input.draftId, ...row },
      returning: false,
      ignoreDuplicates: true,
    });
  }
}

export async function markDraftPaid(input: {
  orderId: string;
  paymentId: string;
}): Promise<void> {
  const now = new Date().toISOString();
  await supabaseRest(
    `${TABLE}?razorpay_order_id=eq.${encodeURIComponent(input.orderId)}&stage=neq.paid`,
    {
      method: "PATCH",
      body: {
        stage: "paid",
        last_event: "paid",
        razorpay_payment_id: input.paymentId,
        paid_at: now,
        updated_at: now,
      },
      returning: false,
    }
  );
}

export async function markDraftFailed(orderId: string): Promise<void> {
  await supabaseRest(
    `${TABLE}?razorpay_order_id=eq.${encodeURIComponent(orderId)}&stage=eq.submitted`,
    {
      method: "PATCH",
      body: { stage: "failed", updated_at: new Date().toISOString() },
      returning: false,
    }
  );
}
