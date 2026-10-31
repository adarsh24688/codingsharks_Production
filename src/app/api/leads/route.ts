import { NextRequest, NextResponse } from 'next/server';
import { trackingFromRequest } from '@/lib/meta-capi';

function fbclidFromReferer(referer: string | null): string | undefined {
  if (!referer) return undefined;
  try {
    return new URL(referer).searchParams.get('fbclid') || undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const referer = request.headers.get('referer');
  const t = trackingFromRequest(request, fbclidFromReferer(referer));
  const payload = {
    ...(body && typeof body === 'object' ? body : {}),
    tracking: { fbp: t.fbp, fbc: t.fbc, ip: t.ip, ua: t.ua, url: referer },
  };

  const send = (data: unknown) =>
    fetch(`${process.env.NEXT_PUBLIC_CRM_API_URL}/api/public/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CRM_EXTERNAL_API_KEY ?? '',
      },
      body: JSON.stringify(data),
    });

  let res = await send(payload);
  let data = await res.json();

  if (res.status === 400 && /tracking/i.test(String(data?.error ?? ''))) {
    res = await send(body);
    data = await res.json();
  }

  return NextResponse.json(data, { status: res.status });
}
