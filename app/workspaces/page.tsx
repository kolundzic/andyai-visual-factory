import { WorkspaceCard } from "@/components/workspace-card";
import { workspaces } from "@/lib/sample-data";

export default function WorkspacesPage() {
  return (
    <main>
      <p className="kicker">Workspaces</p>
      <h1>Project production rooms</h1>
      <p className="muted">Each workspace carries a brand pack, jobs, outputs, exports, memory, and reports.</p>
      <section className="grid grid-2">
        {workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </section>
    </main>
  );
}
