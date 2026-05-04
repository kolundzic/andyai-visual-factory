import { EmptyState } from "@/components/empty-state";
import { getCaseStudies } from "@/lib/supabase/runtime-queries";

export const dynamic = "force-dynamic";

export default async function ShowcasePage() {
  const caseStudies = await getCaseStudies();

  return (
    <main>
      <p className="kicker">Live Showcase</p>
      <h1>Proof from the factory floor</h1>
      <p className="muted">Loaded from Supabase table: public.case_studies</p>
      {caseStudies.length === 0 ? (
        <EmptyState title="No case studies found" message="Run seed SQL or create a showcase record." />
      ) : (
        <section className="grid grid-2">
          {caseStudies.map((item) => (
            <article className="card" key={item.id}>
              <p className="kicker">{item.case_study_key}</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.problem ?? "No problem description."}</p>
              <p><strong>Direction:</strong> {item.selected_direction ?? "n/a"}</p>
              <p><strong>Value:</strong> {item.business_value ?? "n/a"}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
