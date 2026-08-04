import { NextResponse } from 'next/server';
import { resendEnvMissing, sendHtmlEmail } from '@/lib/email/resend';
import { escapeHtml } from '@/lib/html';

const TIME_SLOTS = new Set(['17:30', '20:00', '23:00']);
const PARTY = new Set(['2', '4', '8', 'more']);
const TYPES = new Set(['aperitivo', 'cena', 'privato']);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TYPE_LABEL: Record<string, string> = {
  aperitivo: 'Aperitivo',
  cena: 'Cena',
  privato: 'Privato',
};
const PARTY_LABEL: Record<string, string> = {
  '2': '2',
  '4': '4',
  '8': '8',
  more: 'Più di 8',
};

function clamp(s: string, max: number) {
  return s.trim().slice(0, max);
}

function confirmationEmailHtml(input: {
  name: string;
  date: string;
  time: string;
  party: string;
  type: string;
  note: string;
}) {
  const typeIt = TYPE_LABEL[input.type] ?? input.type;
  const partyIt = PARTY_LABEL[input.party] ?? input.party;
  const noteRow =
    input.note && input.note !== '—'
      ? `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">Note</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(
          input.note,
        )}</td></tr>`
      : '';

  return `<p>Ciao ${escapeHtml(input.name)},</p>
<p>abbiamo ricevuto la tua richiesta di prenotazione per <strong>RockIsland</strong> (Rimini).</p>
<p>Ti risponderemo al più presto per confermare disponibilità e dettagli.</p>
<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;margin:16px 0;">
<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">Data</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(
    input.date,
  )}</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">Orario</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(
    input.time,
  )}</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">Persone</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(
    partyIt,
  )}</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">Tipo</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(
    typeIt,
  )}</td></tr>
${noteRow}
</table>
<p style="color:#6b7280;font-size:13px;">Questo è un messaggio automatico; rispondi a questa email per contattarci direttamente.</p>`;
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

  const name = clamp(String(b.name ?? ''), 200);
  const phone = clamp(String(b.phone ?? ''), 80);
  const email = clamp(String(b.email ?? ''), 320);
  const date = clamp(String(b.date ?? ''), 32);
  const time = String(b.time ?? '');
  const party = String(b.party ?? '');
  const type = String(b.type ?? '');
  const note = clamp(String(b.note ?? ''), 4000);

  if (!name || !phone || !email || !DATE_RE.test(date) || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'VALIDATION' }, { status: 400 });
  }

  if (!TIME_SLOTS.has(time) || !PARTY.has(party) || !TYPES.has(type)) {
    return NextResponse.json({ error: 'VALIDATION' }, { status: 400 });
  }

  const rows: [string, string][] = [
    ['Nome', name],
    ['Telefono', phone],
    ['Email', email],
    ['Data', date],
    ['Orario', time],
    ['Persone', party],
    ['Tipo', type],
    ['Note', note || '—'],
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

  const html = `<p>Nuova richiesta di prenotazione da <strong>rockislandrimini.it</strong>.</p>
<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">${htmlRows}</table>`;

  const sentInternal = await sendHtmlEmail({
    subject: `[RockIsland] Prenotazione — ${name}`,
    html,
    replyTo: email,
  });

  if (!sentInternal.ok && sentInternal.reason === 'not_configured') {
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

  if (!sentInternal.ok) {
    return NextResponse.json({ error: 'SEND_FAILED' }, { status: 502 });
  }

  const replyForGuest = process.env.RESEND_TO?.trim() || null;

  const sentConfirm = await sendHtmlEmail({
    to: email,
    subject: 'RockIsland — Richiesta di prenotazione ricevuta',
    html: confirmationEmailHtml({
      name,
      date,
      time,
      party,
      type,
      note: note || '—',
    }),
    replyTo: replyForGuest,
  });

  if (!sentConfirm.ok) {
    return NextResponse.json(
      {
        ok: true,
        confirmationSent: false,
        confirmationError:
          sentConfirm.reason === 'not_configured' ? 'NOT_CONFIGURED' : 'SEND_FAILED',
      },
      { status: 200 },
    );
  }

  return NextResponse.json({ ok: true, confirmationSent: true });
}
