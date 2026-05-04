type Snapshot = {
  requests: any[];
  jobs: any[];
  assets: any[];
  events: any[];
};

export function RecentEvents({ snapshot }: { snapshot: Snapshot }) {
  return (
    <section className="card">
      <p className="kicker">Pipeline Events</p>
      <h2>Recent lifecycle events</h2>
      {snapshot.events.length === 0 ? (
        <p className="muted">No events found yet.</p>
      ) : (
        <div className="grid">
          {snapshot.events.map((event) => (
            <article className="flow-step" key={event.id}>
              <span className="badge">{event.event_type}</span>
              <h3>{event.message}</h3>
              <p className="muted">{event.source_table ?? "n/a"} / {event.source_key ?? "n/a"}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
