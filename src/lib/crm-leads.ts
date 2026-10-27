export interface ProgramLeadInput {
  name: string;
  email: string;
  mobile: string;
  notes: string;
}

export async function sendProgramLeadToCrm(input: ProgramLeadInput): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_CRM_API_URL;
  const apiKey = process.env.CRM_EXTERNAL_API_KEY;
  const courseId = process.env.CRM_PROGRAM_COURSE_ID;
  if (!baseUrl || !apiKey || !courseId) return;

  try {
    const res = await fetch(`${baseUrl}/api/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        mobile: input.mobile,
        courseInterest: courseId,
        notes: input.notes.slice(0, 500),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      console.error("[crm-leads]", res.status, (await res.text().catch(() => "")).slice(0, 300));
    }
  } catch (err) {
    console.error("[crm-leads] request failed", err);
  }
}
