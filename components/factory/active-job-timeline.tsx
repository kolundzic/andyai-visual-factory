const steps = [
  ["Request received", "The factory has a work order."],
  ["Brief prepared", "The system understands output type, style, platform, and goal."],
  ["Generation planned", "Future model provider call will create variants."],
  ["Review ready", "Human selects, rejects, or regenerates."],
  ["Export ready", "Final product moves into asset registry."]
];

export function ActiveJobTimeline() {
  return (
    <section className="card">
      <p className="kicker">Active Job Timeline</p>
      <h2>What happens after you create a job?</h2>
      <div className="grid">
        {steps.map(([title, body], index) => (
          <div className="flow-step" key={title}>
            <span className="badge">Step {index + 1}</span>
            <h3>{title}</h3>
            <p className="muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
