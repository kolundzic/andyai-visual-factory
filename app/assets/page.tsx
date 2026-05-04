import { EmptyState } from "@/components/empty-state";
import { getAssets } from "@/lib/supabase/runtime-queries";

export const dynamic = "force-dynamic";

export default async function AssetsPage() {
  const assets = await getAssets();

  return (
    <main>
      <p className="kicker">Live Asset Registry</p>
      <h1>Registered visual products</h1>
      <p className="muted">Loaded from Supabase table: public.assets</p>
      {assets.length === 0 ? (
        <EmptyState title="No assets found" message="Run seed SQL or export a new visual asset." />
      ) : (
        <section className="grid grid-3">
          {assets.map((asset) => (
            <article className="card" key={asset.id}>
              <p className="kicker">{asset.format}</p>
              <h3>{asset.title}</h3>
              <p className="muted">{asset.asset_key}</p>
              <p>Target: {asset.target_platform ?? "n/a"}</p>
              <p>Prompt: {asset.source_prompt_key ?? "n/a"}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
