export class SupabaseError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "SupabaseError";
    this.status = status;
  }
}

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new SupabaseError("Supabase env vars are not configured", 500);
  }
  return { url: url.replace(/\/$/, ""), key };
}

interface RestOptions {
  method?: "GET" | "POST" | "PATCH";
  body?: unknown;
  returning?: boolean;
  ignoreDuplicates?: boolean;
}

export async function supabaseRest<T>(
  path: string,
  { method = "GET", body, returning = true, ignoreDuplicates = false }: RestOptions = {}
): Promise<T> {
  const { url, key } = getConfig();

  const res = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: [
        ignoreDuplicates ? "resolution=ignore-duplicates" : "",
        returning ? "return=representation" : "return=minimal",
      ]
        .filter(Boolean)
        .join(","),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new SupabaseError(`Supabase ${method} ${path} failed: ${text.slice(0, 300)}`, res.status);
  }

  if (!returning || res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
