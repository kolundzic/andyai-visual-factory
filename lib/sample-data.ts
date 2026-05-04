import type { Asset, ShowcaseItem, VisualJob, Workspace } from "./types";

export const workspaces: Workspace[] = [
  {
    id: "ws_andyai_visual_factory_demo",
    name: "AndyAI Visual Factory Demo Workspace",
    brandPack: "AndyAI Visual Factory Default",
    status: "active",
    jobs: 4,
    assets: 8,
    memoryRecords: 3
  },
  {
    id: "ws_visual_canon_bridge",
    name: "Visual Canon Bridge Workspace",
    brandPack: "AndyAI Visual Canon",
    status: "planned",
    jobs: 2,
    assets: 3,
    memoryRecords: 1
  }
];

export const jobs: VisualJob[] = [
  {
    id: "job_hero_001",
    title: "Homepage Hero Visual",
    outputType: "hero_visual",
    status: "completed",
    workspace: "AndyAI Visual Factory Demo",
    target: "website + README + LinkedIn"
  },
  {
    id: "job_grid_001",
    title: "5x5 Social Variation Grid",
    outputType: "variation_grid",
    status: "review_required",
    workspace: "AndyAI Visual Factory Demo",
    target: "social campaign"
  },
  {
    id: "job_case_001",
    title: "Case Study Visual",
    outputType: "case_study_asset",
    status: "active",
    workspace: "Visual Canon Bridge",
    target: "showcase"
  }
];

export const assets: Asset[] = [
  {
    id: "asset_hero_001",
    title: "Visual Factory Hero",
    format: "webp",
    target: "website_hero",
    sourceJob: "job_hero_001"
  },
  {
    id: "asset_readme_001",
    title: "Runtime Flow README Visual",
    format: "png",
    target: "README",
    sourceJob: "job_hero_001"
  },
  {
    id: "asset_social_001",
    title: "Social Campaign Candidate",
    format: "png",
    target: "LinkedIn",
    sourceJob: "job_grid_001"
  }
];

export const showcase: ShowcaseItem[] = [
  {
    id: "case_001",
    title: "From Brand Pack to Runtime Hero",
    summary: "A brand-aware hero visual is planned, generated, selected, exported, and saved into memory.",
    value: "Turns a complex runtime into a clear product story."
  },
  {
    id: "case_002",
    title: "Visual Canon Bridge",
    summary: "Visual Canon rules are converted into production-ready brand input and prompt constraints.",
    value: "Makes the design system reusable across projects."
  }
];

export const runtimeSteps = [
  "Brand Pack",
  "Visual Job",
  "Prompt Compiler",
  "Variation Grid",
  "Asset Registry",
  "Export Pack",
  "Memory"
];
