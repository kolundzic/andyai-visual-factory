import { getPipelineSnapshot } from "@/lib/supabase/pipeline";
import { OutputCandidates } from "@/components/pipeline/output-candidates";
import { ProductionBoard } from "@/components/pipeline/production-board";
import { RecentEvents } from "@/components/pipeline/recent-events";

export const dynamic = "force-dynamic";

export default async function OutputsPage() {
  const snapshot = await getPipelineSnapshot();

  return (
    <main>
      <p className="kicker">Outputs</p>
      <h1>Production pipeline outputs</h1>
      <p className="muted">
        Requests become jobs, jobs enter review, and pipeline events make the factory visible.
      </p>
      <ProductionBoard snapshot={snapshot} />
      <div style={{ height: 18 }} />
      <OutputCandidates snapshot={snapshot} />
      <div style={{ height: 18 }} />
      <RecentEvents snapshot={snapshot} />
    </main>
  );
}
