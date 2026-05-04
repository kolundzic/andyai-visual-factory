import type { Asset } from "@/lib/types";

export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <article className="card">
      <p className="kicker">{asset.format}</p>
      <h3>{asset.title}</h3>
      <p className="muted">Target: {asset.target}</p>
      <p>Source job: <strong>{asset.sourceJob}</strong></p>
    </article>
  );
}
