import { EmptyState } from "@/components/empty-state";
import { getJobs } from "@/lib/supabase/runtime-queries";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main>
      <p className="kicker">Live Visual Jobs</p>
      <h1>Production jobs from Supabase</h1>
      <p className="muted">Loaded from Supabase table: public.visual_jobs</p>
      {jobs.length === 0 ? (
        <EmptyState title="No jobs found" message="Run seed SQL or add production jobs." />
      ) : (
        <section className="grid grid-3">
          {jobs.map((job) => (
            <article className="card" key={job.id}>
              <p className="kicker">{job.output_type}</p>
              <h3>{job.title}</h3>
              <p className="muted">{job.job_key}</p>
              <span className="badge">{job.status}</span>
              <p>Selected variant: {job.selected_variant ?? "not selected"}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
