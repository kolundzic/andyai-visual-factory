-- AndyAI Visual Factory v9.0.0 Image Render Engine Storage + Asset Patch

grant usage on schema public to anon, authenticated, service_role;

-- Assets table compatibility patch.
alter table public.assets
add column if not exists visual_job_id uuid;

alter table public.assets
add column if not exists storage_bucket text;

alter table public.assets
add column if not exists storage_path text;

alter table public.assets
add column if not exists public_url text;

alter table public.assets
add column if not exists mime_type text;

alter table public.assets
add column if not exists width integer;

alter table public.assets
add column if not exists height integer;

alter table public.assets
add column if not exists provider text;

alter table public.assets
add column if not exists model text;

alter table public.assets
add column if not exists prompt_used text;

alter table public.assets
add column if not exists status text default 'created';

alter table public.assets
add column if not exists title text;

alter table public.assets
add column if not exists asset_key text;

-- Helpful defaults for legacy required columns if present.
alter table public.assets
alter column title set default 'Visual Factory Rendered Asset';

alter table public.assets
alter column status set default 'created';

grant select, insert, update on public.assets to anon, authenticated, service_role;
grant select, insert, update on public.visual_jobs to anon, authenticated, service_role;
grant select, insert on public.runtime_events to anon, authenticated, service_role;

alter table public.assets enable row level security;

drop policy if exists "public read assets" on public.assets;
create policy "public read assets"
on public.assets
for select
using (true);

drop policy if exists "public insert assets" on public.assets;
create policy "public insert assets"
on public.assets
for insert
with check (true);

drop policy if exists "public update assets" on public.assets;
create policy "public update assets"
on public.assets
for update
using (true)
with check (true);

-- Create storage bucket if missing.
insert into storage.buckets (id, name, public)
values ('visual-assets', 'visual-assets', true)
on conflict (id) do update set public = true;

-- Public read policy for storage objects in visual-assets bucket.
drop policy if exists "public read visual assets objects" on storage.objects;
create policy "public read visual assets objects"
on storage.objects
for select
using (bucket_id = 'visual-assets');

drop policy if exists "public insert visual assets objects" on storage.objects;
create policy "public insert visual assets objects"
on storage.objects
for insert
with check (bucket_id = 'visual-assets');

drop policy if exists "public update visual assets objects" on storage.objects;
create policy "public update visual assets objects"
on storage.objects
for update
using (bucket_id = 'visual-assets')
with check (bucket_id = 'visual-assets');

notify pgrst, 'reload schema';
