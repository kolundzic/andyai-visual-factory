import { assets, jobs, workspaces } from "@/lib/sample-data";

export default function DashboardPage() {
  const memoryCount = workspaces.reduce((sum, item) => sum + item.memoryRecords, 0);

  return (
    <main>
      <p className="kicker">Runtime Dashboard</p>
      <h1>Factory control room</h1>
      <section className="grid grid-3">
        <div className="card"><p className="muted">Workspaces</p><div className="metric">{workspaces.length}</div></div>
        <div className="card"><p className="muted">Jobs</p><div className="metric">{jobs.length}</div></div>
        <div className="card"><p className="muted">Assets</p><div className="metric">{assets.length}</div></div>
        <div className="card"><p className="muted">Memory Records</p><div className="metric">{memoryCount}</div></div>
        <div className="card"><p className="muted">Runtime</p><div className="metric">v3.0</div></div>
        <div className="card"><p className="muted">Next</p><h3>Supabase wiring</h3></div>
      </section>
    </main>
  );
}
