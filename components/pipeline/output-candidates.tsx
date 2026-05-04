type Snapshot = {
  requests: any[];
  jobs: any[];
  assets: any[];
  events: any[];
};

export function OutputCandidates({ snapshot }: { snapshot: Snapshot }) {
  const rows = snapshot.jobs.map((job, index) => {
    const request = snapshot.requests.find((item) => item.id === job.production_request_id);
    return {
      id: job.id,
      title: job.title ?? `Candidate ${index + 1}`,
      stage: job.stage ?? "queued",
      status: job.status ?? "queued",
      goal: request?.goal ?? job.brief_summary ?? "No goal summary",
      requestKey: request?.request_key ?? "n/a"
    };
  });

  return (
    <section className="card">
      <p className="kicker">Output Candidates</p>
      <h2>Jobs created from requests</h2>
      {rows.length === 0 ? (
        <p className="muted">No pipeline jobs found yet.</p>
      ) : (
        <section className="grid grid-2">
          {rows.map((item) => (
            <article className="card" key={item.id}>
              <span className="badge">{item.status}</span>
              <h3>{item.title}</h3>
              <p className="muted">{item.goal}</p>
              <p className="muted">Stage: {item.stage}</p>
              <p className="muted">Request: {item.requestKey}</p>
              <div className="button-row">
                <button className="button secondary" type="button">Approve</button>
                <button className="button secondary" type="button">Reject</button>
                <button className="button secondary" type="button">Regenerate</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
