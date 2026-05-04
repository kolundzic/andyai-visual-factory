import Link from "next/link";

export function VisualFactoryHero() {
  return (
    <section className="hero">
      <p className="kicker">AndyAI Visual Factory</p>
      <h1>Build visuals like a system, not like a lottery.</h1>
      <p>
        A Vercel-ready visual production runtime for turning brand context,
        human intent, and model generation into registered, reusable,
        export-ready visual assets.
      </p>
      <div className="button-row">
        <Link className="button" href="/dashboard">Open dashboard</Link>
        <Link className="button secondary" href="/showcase">View showcase</Link>
      </div>
    </section>
  );
}
