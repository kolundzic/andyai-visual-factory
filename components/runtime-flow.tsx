import { runtimeSteps } from "@/lib/sample-data";

export function RuntimeFlow() {
  return (
    <section className="card">
      <p className="kicker">Runtime Flow</p>
      <h2>From brand context to export-ready asset.</h2>
      <div className="flow">
        {runtimeSteps.map((step, index) => (
          <div className="flow-step" key={step}>
            <div className="badge">0{index + 1}</div>
            <h3>{step}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
