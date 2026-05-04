import { JobCard } from "@/components/job-card";
import { jobs } from "@/lib/sample-data";

export default function JobsPage() {
  return (
    <main>
      <p className="kicker">Visual Jobs</p>
      <h1>Production requests as runtime objects</h1>
      <section className="grid grid-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </main>
  );
}
