create table if not exists public.runtime_events (
  id uuid primary key default gen_random_uuid(),
  event_key text unique not null,
  event_type text not null,
  source_table text,
  source_key text,
  severity text not null default 'info',
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.runtime_events enable row level security;

drop policy if exists "public read runtime_events" on public.runtime_events;
create policy "public read runtime_events" on public.runtime_events for select using (true);

grant select on public.runtime_events to anon;
