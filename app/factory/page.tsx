import { ActiveJobTimeline } from "@/components/factory/active-job-timeline";
import { ExportPanel } from "@/components/factory/export-panel";
import { FactoryRequestPanel } from "@/components/factory/factory-request-panel";
import { OutputGallery } from "@/components/factory/output-gallery";
import { RecentWork } from "@/components/factory/recent-work";

export const dynamic = "force-dynamic";

export default function FactoryPage() {
  return (
    <main>
      <p className="kicker">Human Control Cockpit</p>
      <h1>Tell the factory what to build.</h1>
      <p className="muted">
        This is the main working surface for Visual Factory: request, configure, track, review, and export.
      </p>
      <section className="grid grid-2">
        <FactoryRequestPanel />
        <ActiveJobTimeline />
      </section>
      <div style={{ height: 18 }} />
      <OutputGallery />
      <div style={{ height: 18 }} />
      <section className="grid grid-2">
        <ExportPanel />
        <RecentWork />
      </section>
    </main>
  );
}
