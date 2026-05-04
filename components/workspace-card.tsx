import type { Workspace } from "@/lib/types";
import { StatusBadge } from "./status-badge";

export function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  return (
    <article className="card">
      <p className="kicker">Workspace</p>
      <h3>{workspace.name}</h3>
      <p className="muted">Brand Pack: {workspace.brandPack}</p>
      <StatusBadge status={workspace.status} />
      <p><strong>{workspace.jobs}</strong> jobs · <strong>{workspace.assets}</strong> assets · <strong>{workspace.memoryRecords}</strong> memory records</p>
    </article>
  );
}
