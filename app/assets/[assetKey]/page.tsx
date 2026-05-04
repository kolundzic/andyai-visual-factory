import { getAssets } from "@/lib/supabase/runtime-queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AssetDetailPage({
  params
}: {
  params: Promise<{ assetKey: string }>;
}) {
  const { assetKey } = await params;
  const assets = await getAssets();
  const asset = assets.find((item) => item.asset_key === assetKey);

  if (!asset) {
    return (
      <main>
        <p className="kicker">Asset Detail</p>
        <h1>Asset not found</h1>
        <Link className="button secondary" href="/assets">Back to assets</Link>
      </main>
    );
  }

  return (
    <main>
      <p className="kicker">Asset Detail</p>
      <h1>{asset.title}</h1>
      <section className="card">
        <p><strong>Key:</strong> {asset.asset_key}</p>
        <p><strong>Format:</strong> {asset.format}</p>
        <p><strong>Target:</strong> {asset.target_platform ?? "n/a"}</p>
        <p><strong>Prompt:</strong> {asset.source_prompt_key ?? "n/a"}</p>
      </section>
    </main>
  );
}
