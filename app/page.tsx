import { RuntimeFlow } from "@/components/runtime-flow";
import { VisualFactoryHero } from "@/components/visual-factory-hero";

export default function HomePage() {
  return (
    <main>
      <VisualFactoryHero />
      <RuntimeFlow />
      <section className="grid grid-3" style={{ marginTop: 18 }}>
        <div className="card">
          <p className="kicker">Canon</p>
          <h3>Visual Canon defines.</h3>
          <p className="muted">Style, structure, visual rules, diagram logic, and reusable design standards.</p>
        </div>
        <div className="card">
          <p className="kicker">Factory</p>
          <h3>Visual Factory produces.</h3>
          <p className="muted">Workspaces, jobs, variation grids, assets, exports, and memory records.</p>
        </div>
        <div className="card">
          <p className="kicker">Cloud MVP</p>
          <h3>Vercel first. Supabase next.</h3>
          <p className="muted">The app starts with sample data, then moves into real cloud runtime data.</p>
        </div>
      </section>
    </main>
  );
}
