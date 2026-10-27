import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveDraft } from "@/lib/program-drafts";

export const runtime = "nodejs";

const draftSchema = z.object({
  draft_id: z.string().uuid(),
  name: z.string().max(80).optional(),
  whatsapp: z.string().max(20).optional(),
  email: z.string().max(120).optional(),
  status: z.string().max(60).optional(),
  college: z.string().max(120).optional(),
  indore: z.boolean().optional(),
  reality_check_score: z.number().int().min(0).max(50).nullable().optional(),
  page: z.string().max(300).optional(),
  utm: z.record(z.string(), z.string().max(200)).optional(),
  event: z.enum(["typing", "closed", "left_page"]),
});

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = JSON.parse(await request.text());
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const parsed = draftSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  const { draft_id, event, ...fields } = parsed.data;

  try {
    await saveDraft({
      draftId: draft_id,
      event,
      fields: {
        ...fields,
        whatsapp: fields.whatsapp?.replace(/\D/g, "").slice(-10),
        utm: fields.utm ?? {},
      },
    });
  } catch (err) {
    console.error("[program/draft] save failed", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
