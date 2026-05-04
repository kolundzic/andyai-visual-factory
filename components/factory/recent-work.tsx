import { getJobs } from "@/lib/supabase/runtime-queries";

export async function RecentWork() {
  const jobs = await getJobs();

  return (
    <section className="card">
      <p className="kicker">Recent Work</p>
      <h2>Live production history.</h2>
      {jobs.length === 0 ? (
        <p className="muted">No jobs found yet.</p>
      ) : (
        <div className="grid">
          {jobs.map((job) => (
            <article className="flow-step" key={job.id}>
              <span className="badge">{job.status}</span>
              <h3>{job.title}</h3>
              <p className="muted">{job.job_key}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
