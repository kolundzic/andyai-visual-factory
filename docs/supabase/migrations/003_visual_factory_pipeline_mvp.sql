grant usage on schema public to anon, authenticated, service_role;

grant select on public.workspaces to anon, authenticated, service_role;
grant select, insert on public.production_requests to anon, authenticated, service_role;
grant select, insert on public.visual_jobs to anon, authenticated, service_role;
grant select, insert on public.runtime_events to anon, authenticated, service_role;
grant select on public.assets to anon, authenticated, service_role;

alter table public.production_requests enable row level security;
alter table public.visual_jobs enable row level security;
alter table public.runtime_events enable row level security;

drop policy if exists "public read visual_jobs" on public.visual_jobs;
create policy "public read visual_jobs"
on public.visual_jobs
for select
using (true);

drop policy if exists "public insert visual_jobs" on public.visual_jobs;
create policy "public insert visual_jobs"
on public.visual_jobs
for insert
with check (true);

drop policy if exists "public insert runtime_events" on public.runtime_events;
create policy "public insert runtime_events"
on public.runtime_events
for insert
with check (true);

drop policy if exists "public read runtime_events" on public.runtime_events;
create policy "public read runtime_events"
on public.runtime_events
for select
using (true);
