type Snapshot = {
  requests: any[];
  jobs: any[];
  assets: any[];
  events: any[];
};

export function ProductionBoard({ snapshot }: { snapshot: Snapshot }) {
  return (
    <section className="card">
      <p className="kicker">Production Board</p>
      <h2>Visible production pipeline</h2>
      <section className="grid grid-4">
        <article className="card"><p className="muted">Requests</p><div className="metric">{snapshot.requests.length}</div></article>
        <article className="card"><p className="muted">Jobs</p><div className="metric">{snapshot.jobs.length}</div></article>
        <article className="card"><p className="muted">Assets</p><div className="metric">{snapshot.assets.length}</div></article>
        <article className="card"><p className="muted">Events</p><div className="metric">{snapshot.events.length}</div></article>
      </section>
    </section>
  );
}
