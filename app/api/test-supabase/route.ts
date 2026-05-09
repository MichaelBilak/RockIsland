import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

/** Optional: set to a real table name to verify PostgREST + DB (e.g. `profiles`). */
const TEST_TABLE = process.env.SUPABASE_TEST_TABLE?.trim();

function isMissingRelationError(err: { code?: string; message?: string }): boolean {
  const code = err.code ?? '';
  const msg = (err.message ?? '').toLowerCase();
  return (
    code === '42P01' ||
    code === 'PGRST205' ||
    (msg.includes('relation') && msg.includes('does not exist')) ||
    msg.includes('could not find the table')
  );
}

export async function GET() {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: 'MISSING_ENV',
        message:
          'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      },
      { status: 503 },
    );
  }

  try {
    if (TEST_TABLE) {
      const { error } = await supabase.from(TEST_TABLE).select('*').limit(1);
      if (!error) {
        return NextResponse.json({ ok: true });
      }
      if (!isMissingRelationError(error)) {
        return NextResponse.json(
          {
            ok: false,
            error: 'QUERY_FAILED',
            message: error.message,
            code: error.code,
          },
          { status: 502 },
        );
      }
      // Table missing: fall through to auth reachability check.
    }

    const { error: authError } = await supabase.auth.getSession();
    if (authError) {
      return NextResponse.json(
        {
          ok: false,
          error: 'SUPABASE_AUTH_UNREACHABLE',
          message: authError.message,
          code: authError.code,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json(
      { ok: false, error: 'CONNECTION_FAILED', message },
      { status: 502 },
    );
  }
}
