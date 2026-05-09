export type SendEmailResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'upstream'; status?: number };

/** Nomi env Resend assenti o vuoti (per messaggi di errore in dev). */
export function resendEnvMissing(): string[] {
  const need = ['RESEND_API_KEY', 'RESEND_FROM', 'RESEND_TO'] as const;
  return need.filter((k) => !process.env[k]?.trim());
}

export async function sendHtmlEmail(params: {
  subject: string;
  html: string;
  replyTo?: string | null;
  /** Destinatari (es. conferma al cliente). Se omesso, si usa `RESEND_TO`. */
  to?: string | string[];
}): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  const fallbackTo = process.env.RESEND_TO?.trim();

  const toList = params.to
    ? (Array.isArray(params.to) ? params.to : [params.to])
        .map((a) => a.trim())
        .filter(Boolean)
    : fallbackTo
      ? [fallbackTo]
      : [];

  if (!apiKey || !from || toList.length === 0) {
    return { ok: false, reason: 'not_configured' };
  }

  const body: Record<string, unknown> = {
    from,
    to: toList,
    subject: params.subject,
    html: params.html,
  };

  const reply = params.replyTo?.trim();
  if (reply) body.reply_to = reply;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return { ok: false, reason: 'upstream', status: res.status };
  }

  return { ok: true };
}
