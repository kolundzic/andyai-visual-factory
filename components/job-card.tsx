import type { VisualJob } from "@/lib/types";
import { StatusBadge } from "./status-badge";

export function JobCard({ job }: { job: VisualJob }) {
  return (
    <article className="card">
      <p className="kicker">{job.outputType}</p>
      <h3>{job.title}</h3>
      <p className="muted">{job.workspace}</p>
      <StatusBadge status={job.status} />
      <p>Target: {job.target}</p>
    </article>
  );
}
