import { LiveDataBadge } from "@/components/live-data-badge";
import { getRuntimeCounts } from "@/lib/supabase/runtime-queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const counts = await getRuntimeCounts();

  return (
    <main>
      <p className="kicker">Runtime Dashboard</p>
      <h1>Factory control room</h1>
      <LiveDataBadge configured={counts.configured} />
      <section className="grid grid-3" style={{ marginTop: 18 }}>
        <div className="card"><p className="muted">Workspaces</p><div className="metric">{counts.workspaces}</div></div>
        <div className="card"><p className="muted">Jobs</p><div className="metric">{counts.jobs}</div></div>
        <div className="card"><p className="muted">Assets</p><div className="metric">{counts.assets}</div></div>
        <div className="card"><p className="muted">Memory Records</p><div className="metric">{counts.memory}</div></div>
        <div className="card"><p className="muted">Case Studies</p><div className="metric">{counts.caseStudies}</div></div>
        <div className="card"><p className="muted">Runtime</p><div className="metric">v5.0</div></div>
      </section>
    </main>
  );
}
