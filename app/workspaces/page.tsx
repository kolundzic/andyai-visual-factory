import { EmptyState } from "@/components/empty-state";
import { getWorkspaces } from "@/lib/supabase/runtime-queries";

export const dynamic = "force-dynamic";

export default async function WorkspacesPage() {
  const workspaces = await getWorkspaces();

  return (
    <main>
      <p className="kicker">Live Workspaces</p>
      <h1>Project production rooms</h1>
      <p className="muted">Loaded from Supabase table: public.workspaces</p>
      {workspaces.length === 0 ? (
        <EmptyState title="No workspaces found" message="Run seed SQL or check environment variables." />
      ) : (
        <section className="grid grid-2">
          {workspaces.map((workspace) => (
            <article className="card" key={workspace.id}>
              <p className="kicker">{workspace.status}</p>
              <h3>{workspace.name}</h3>
              <p className="muted">{workspace.workspace_key}</p>
              <p>Owner: {workspace.owner_label ?? "n/a"}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
