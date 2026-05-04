export default function NewProductionRequestPage() {
  return (
    <main>
      <p className="kicker">Production Request</p>
      <h1>Create a new visual request</h1>
      <p className="muted">This page defines the operator intake path. The POST API is available at /api/production-requests.</p>
      <section className="card">
        <h3>Request template</h3>
        <p><strong>Output type:</strong> hero_visual, social_grid, readme_visual, case_study_asset</p>
        <p><strong>Goal:</strong> Describe what the Visual Factory should produce.</p>
        <p><strong>Human review:</strong> required by default.</p>
      </section>
    </main>
  );
}
