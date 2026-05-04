import { OperatorLinkGrid } from "@/components/operator-link-grid";
import { LiveDataBadge } from "@/components/live-data-badge";
import { getRuntimeCounts } from "@/lib/supabase/runtime-queries";

export const dynamic = "force-dynamic";

export default async function OperatorPage() {
  const counts = await getRuntimeCounts();

  return (
    <main>
      <p className="kicker">Operator Console</p>
      <h1>Visual Factory control surface</h1>
      <p className="muted">Operator console for live data, production requests, proof pages, and runtime status.</p>
      <LiveDataBadge configured={counts.configured} />
      <section className="grid grid-3" style={{ marginTop: 18 }}>
        <div className="card"><p className="muted">Workspaces</p><div className="metric">{counts.workspaces}</div></div>
        <div className="card"><p className="muted">Jobs</p><div className="metric">{counts.jobs}</div></div>
        <div className="card"><p className="muted">Assets</p><div className="metric">{counts.assets}</div></div>
      </section>
      <div style={{ height: 18 }} />
      <OperatorLinkGrid />
    </main>
  );
}
