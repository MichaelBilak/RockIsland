import { NextResponse } from 'next/server';
import { resendEnvMissing, sendHtmlEmail } from '@/lib/email/resend';
import { escapeHtml } from '@/lib/html';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clamp(s: string, max: number) {
  return s.trim().slice(0, max);
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'BAD_JSON' }, { status: 400 });
  }

  if (!json || typeof json !== 'object') {
    return NextResponse.json({ error: 'VALIDATION' }, { status: 400 });
  }

  const b = json as Record<string, unknown>;
  const honeypot = typeof b.website === 'string' ? b.website.trim() : '';
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const company = clamp(String(b.company ?? ''), 200);
  const contactName = clamp(String(b.contactName ?? b.cname ?? ''), 200);
  const email = clamp(String(b.email ?? b.cemail ?? ''), 320);
  const phone = clamp(String(b.phone ?? b.cphone ?? ''), 80);
  const message = clamp(String(b.message ?? b.cmsg ?? ''), 8000);

  if (!company || !contactName || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'VALIDATION' }, { status: 400 });
  }

  const rows: [string, string][] = [
    ['Azienda', company],
    ['Referente', contactName],
    ['Email', email],
    ['Telefono', phone || '—'],
    ['Messaggio', message],
  ];

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">${escapeHtml(
          k,
        )}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(
          v,
        )}</td></tr>`,
    )
    .join('');

  const html = `<p>Nuova richiesta <strong>Convention</strong> da portosolerimini.it.</p>
<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">${htmlRows}</table>`;

  const sent = await sendHtmlEmail({
    subject: `[Porto Sole] Convention — ${company}`,
    html,
    replyTo: email,
  });

  if (!sent.ok && sent.reason === 'not_configured') {
    const missing = resendEnvMissing();
    return NextResponse.json(
      {
        error: 'NOT_CONFIGURED',
        message:
          'Imposta RESEND_API_KEY, RESEND_FROM e RESEND_TO in .env.local (locale) o su Vercel → Environment Variables.',
        ...(process.env.NODE_ENV === 'development' && missing.length > 0 ? { missing } : {}),
      },
      { status: 503 },
    );
  }

  if (!sent.ok) {
    return NextResponse.json({ error: 'SEND_FAILED' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
