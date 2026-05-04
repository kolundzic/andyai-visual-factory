insert into public.workspaces (workspace_key, name, owner_label, status)
values
  ('ws_andyai_visual_factory_demo', 'AndyAI Visual Factory Demo Workspace', 'Andy', 'active'),
  ('ws_visual_canon_bridge', 'Visual Canon Bridge Workspace', 'Andy', 'planned')
on conflict (workspace_key) do nothing;

insert into public.brand_packs (workspace_id, brand_pack_key, brand_name, website, primary_colors, typography, visual_style, audience, negative_constraints)
select w.id, 'andyai_visual_factory_default', 'AndyAI Visual Factory', 'https://visualfactory.andyai.ai',
'["black","white","red","gold"]'::jsonb, 'clean modern sans',
'["clean SaaS","modern AI","rounded blocks","subtle shadows"]'::jsonb,
'["founders","AI builders","designers","marketers"]'::jsonb,
'["avoid clutter","avoid unreadable text","avoid random visual styles"]'::jsonb
from public.workspaces w where w.workspace_key='ws_andyai_visual_factory_demo'
on conflict (brand_pack_key) do nothing;

insert into public.production_requests (workspace_id, brand_pack_id, request_key, requester, output_type, goal, target_platforms, quality_level, human_review_required)
select w.id, bp.id, 'req_hero_001', 'Andy', 'hero_visual',
'create a premium landing page hero visual for the Visual Factory homepage',
'["website","README","LinkedIn"]'::jsonb, 'high', true
from public.workspaces w join public.brand_packs bp on bp.workspace_id=w.id
where w.workspace_key='ws_andyai_visual_factory_demo'
on conflict (request_key) do nothing;

insert into public.visual_jobs (workspace_id, production_request_id, brand_pack_id, job_key, title, output_type, status, selected_variant, export_targets)
select w.id, pr.id, bp.id, 'job_hero_001', 'Homepage Hero Visual', 'hero_visual', 'completed', 8,
'["website_hero","readme_visual","social_post"]'::jsonb
from public.workspaces w
join public.brand_packs bp on bp.workspace_id=w.id
join public.production_requests pr on pr.workspace_id=w.id
where w.workspace_key='ws_andyai_visual_factory_demo'
on conflict (job_key) do nothing;

insert into public.assets (workspace_id, visual_job_id, asset_key, title, format, target_platform, source_prompt_key, metadata)
select w.id, j.id, 'asset_hero_001', 'Visual Factory Hero', 'webp', 'website_hero', 'prompt_hero_001', '{"source":"demo_seed"}'::jsonb
from public.workspaces w join public.visual_jobs j on j.workspace_id=w.id
where w.workspace_key='ws_andyai_visual_factory_demo'
on conflict (asset_key) do nothing;

insert into public.visual_memory (workspace_id, visual_job_id, memory_key, style_pattern, reason, promote)
select w.id, j.id, 'memory_style_001', 'clean rounded SaaS pipeline with red/gold accents', 'selected as strong brand-aligned explanatory visual', true
from public.workspaces w join public.visual_jobs j on j.workspace_id=w.id
where w.workspace_key='ws_andyai_visual_factory_demo'
on conflict (memory_key) do nothing;

insert into public.case_studies (workspace_id, case_study_key, title, problem, selected_direction, final_assets, business_value)
select w.id, 'case_hero_001', 'From Brand Pack to Runtime Hero',
'The product needed a clear visual explanation of a complex runtime.',
'Clean SaaS pipeline hero visual',
'["asset_hero_001"]'::jsonb,
'Turns a complex runtime into a clear product story.'
from public.workspaces w where w.workspace_key='ws_andyai_visual_factory_demo'
on conflict (case_study_key) do nothing;
