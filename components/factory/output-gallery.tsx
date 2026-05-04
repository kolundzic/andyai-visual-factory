const outputs = [
  ["Hero Visual Candidate", "Website hero", "Ready for generation"],
  ["Social Grid Candidate", "LinkedIn / X", "Needs model provider"],
  ["README Diagram Candidate", "GitHub README", "Planned"],
  ["Case Study Visual", "Showcase", "Planned"]
];

export function OutputGallery() {
  return (
    <section className="card">
      <p className="kicker">Output Gallery</p>
      <h2>Where the visual products appear.</h2>
      <section className="grid grid-2">
        {outputs.map(([title, target, status]) => (
          <article className="card" key={title}>
            <p className="kicker">{target}</p>
            <h3>{title}</h3>
            <p className="muted">{status}</p>
            <div className="button-row">
              <button className="button secondary" type="button">Approve</button>
              <button className="button secondary" type="button">Regenerate</button>
              <button className="button secondary" type="button">Export</button>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
