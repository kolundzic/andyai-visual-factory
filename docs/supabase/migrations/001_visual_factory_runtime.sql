create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  workspace_key text unique not null,
  name text not null,
  owner_label text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_workspaces_updated_at on public.workspaces;
create trigger trg_workspaces_updated_at before update on public.workspaces
for each row execute function public.set_updated_at();

create table if not exists public.brand_packs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  brand_pack_key text unique not null,
  brand_name text not null,
  website text,
  primary_colors jsonb not null default '[]'::jsonb,
  typography text,
  visual_style jsonb not null default '[]'::jsonb,
  audience jsonb not null default '[]'::jsonb,
  negative_constraints jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_brand_packs_updated_at on public.brand_packs;
create trigger trg_brand_packs_updated_at before update on public.brand_packs
for each row execute function public.set_updated_at();

create table if not exists public.production_requests (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  brand_pack_id uuid references public.brand_packs(id) on delete set null,
  request_key text unique not null,
  requester text,
  output_type text not null,
  goal text not null,
  target_platforms jsonb not null default '[]'::jsonb,
  quality_level text not null default 'high',
  human_review_required boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.visual_jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  production_request_id uuid references public.production_requests(id) on delete set null,
  brand_pack_id uuid references public.brand_packs(id) on delete set null,
  job_key text unique not null,
  title text not null,
  output_type text not null,
  status text not null default 'planned',
  selected_variant integer,
  export_targets jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_visual_jobs_updated_at on public.visual_jobs;
create trigger trg_visual_jobs_updated_at before update on public.visual_jobs
for each row execute function public.set_updated_at();

create table if not exists public.visual_briefs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  visual_job_id uuid references public.visual_jobs(id) on delete cascade,
  brief_key text unique not null,
  visual_goal text not null,
  style_direction text,
  layout_direction text,
  required_text jsonb not null default '[]'::jsonb,
  negative_constraints jsonb not null default '[]'::jsonb,
  output_targets jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.variation_grids (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  visual_job_id uuid references public.visual_jobs(id) on delete cascade,
  grid_key text unique not null,
  grid_size text not null default '5x5',
  variant_count integer not null default 25,
  prompt text,
  status text not null default 'generated',
  created_at timestamptz not null default now()
);

create table if not exists public.selection_ledgers (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  visual_job_id uuid references public.visual_jobs(id) on delete cascade,
  variation_grid_id uuid references public.variation_grids(id) on delete set null,
  ledger_key text unique not null,
  selected_variant integer not null,
  selection_reason text not null,
  scores jsonb not null default '{}'::jsonb,
  reviewer_label text,
  created_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  visual_job_id uuid references public.visual_jobs(id) on delete set null,
  asset_key text unique not null,
  title text not null,
  format text not null,
  target_platform text,
  source_prompt_key text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.export_packs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  asset_id uuid references public.assets(id) on delete cascade,
  export_pack_key text unique not null,
  targets jsonb not null default '[]'::jsonb,
  formats jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.visual_memory (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  visual_job_id uuid references public.visual_jobs(id) on delete set null,
  memory_key text unique not null,
  style_pattern text not null,
  reason text,
  promote boolean not null default false,
  source_asset_id uuid references public.assets(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  case_study_key text unique not null,
  title text not null,
  problem text,
  selected_direction text,
  final_assets jsonb not null default '[]'::jsonb,
  business_value text,
  created_at timestamptz not null default now()
);

alter table public.workspaces enable row level security;
alter table public.brand_packs enable row level security;
alter table public.production_requests enable row level security;
alter table public.visual_jobs enable row level security;
alter table public.visual_briefs enable row level security;
alter table public.variation_grids enable row level security;
alter table public.selection_ledgers enable row level security;
alter table public.assets enable row level security;
alter table public.export_packs enable row level security;
alter table public.visual_memory enable row level security;
alter table public.case_studies enable row level security;

drop policy if exists "public read workspaces" on public.workspaces;
create policy "public read workspaces" on public.workspaces for select using (true);
drop policy if exists "public read brand_packs" on public.brand_packs;
create policy "public read brand_packs" on public.brand_packs for select using (true);
drop policy if exists "public read production_requests" on public.production_requests;
create policy "public read production_requests" on public.production_requests for select using (true);
drop policy if exists "public read visual_jobs" on public.visual_jobs;
create policy "public read visual_jobs" on public.visual_jobs for select using (true);
drop policy if exists "public read visual_briefs" on public.visual_briefs;
create policy "public read visual_briefs" on public.visual_briefs for select using (true);
drop policy if exists "public read variation_grids" on public.variation_grids;
create policy "public read variation_grids" on public.variation_grids for select using (true);
drop policy if exists "public read selection_ledgers" on public.selection_ledgers;
create policy "public read selection_ledgers" on public.selection_ledgers for select using (true);
drop policy if exists "public read assets" on public.assets;
create policy "public read assets" on public.assets for select using (true);
drop policy if exists "public read export_packs" on public.export_packs;
create policy "public read export_packs" on public.export_packs for select using (true);
drop policy if exists "public read visual_memory" on public.visual_memory;
create policy "public read visual_memory" on public.visual_memory for select using (true);
drop policy if exists "public read case_studies" on public.case_studies;
create policy "public read case_studies" on public.case_studies for select using (true);
