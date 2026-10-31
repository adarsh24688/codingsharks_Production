export interface ProgramLeadInput {
  name: string;
  email: string;
  mobile: string;
  notes: string;
  tracking?: CrmLeadTracking;
}

export interface CrmLeadTracking {
  fbp?: string;
  fbc?: string;
  ip?: string;
  ua?: string;
  url?: string | null;
}

export async function sendProgramLeadToCrm(input: ProgramLeadInput): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_CRM_API_URL;
  const apiKey = process.env.CRM_EXTERNAL_API_KEY;
  const courseId = process.env.CRM_PROGRAM_COURSE_ID;
  if (!baseUrl || !apiKey || !courseId) return;

  const lead = {
    name: input.name,
    email: input.email,
    mobile: input.mobile,
    courseInterest: courseId,
    notes: input.notes.slice(0, 500),
  };
  const post = (body: unknown) =>
    fetch(`${baseUrl}/api/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

  try {
    let res = await post(input.tracking ? { ...lead, tracking: input.tracking } : lead);
    let text = res.ok ? "" : await res.text().catch(() => "");
    if (res.status === 400 && input.tracking && /tracking/i.test(text)) {
      res = await post(lead);
      text = res.ok ? "" : await res.text().catch(() => "");
    }
    if (!res.ok) {
      console.error("[crm-leads]", res.status, text.slice(0, 300));
    }
  } catch (err) {
    console.error("[crm-leads] request failed", err);
  }
}
