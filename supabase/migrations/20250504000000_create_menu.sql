-- Run in Supabase: SQL Editor → New query → paste → Run
-- Or: supabase db push (if you use Supabase CLI linked to this project)

create table if not exists public.menu (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null
    check (category in ('antipasti', 'primi', 'secondi', 'pizza', 'dolci', 'cocktail')),
  name text not null,
  description text,
  price text not null,
  image_url text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_category_sort_idx on public.menu (category, sort_order);
create index if not exists menu_is_active_idx on public.menu (is_active) where is_active = true;

comment on table public.menu is 'Restaurant menu items (public read via RLS; manage with service role or future admin policies).';

alter table public.menu enable row level security;

-- Public site: only active rows, readable by anon + logged-in users
create policy "Active menu rows are readable"
  on public.menu
  for select
  to anon, authenticated
  using (is_active = true);

-- No insert/update/delete for anon by default; use Service Role in server routes or add admin policies later

create or replace function public.set_menu_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists menu_set_updated_at on public.menu;
create trigger menu_set_updated_at
  before update on public.menu
  for each row
  execute function public.set_menu_updated_at();
