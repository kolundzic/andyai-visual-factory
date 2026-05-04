export type RuntimeStatus = "planned" | "active" | "review_required" | "completed";

export type Workspace = {
  id: string;
  name: string;
  brandPack: string;
  status: RuntimeStatus;
  jobs: number;
  assets: number;
  memoryRecords: number;
};

export type VisualJob = {
  id: string;
  title: string;
  outputType: string;
  status: RuntimeStatus;
  workspace: string;
  target: string;
};

export type Asset = {
  id: string;
  title: string;
  format: string;
  target: string;
  sourceJob: string;
};

export type ShowcaseItem = {
  id: string;
  title: string;
  summary: string;
  value: string;
};
