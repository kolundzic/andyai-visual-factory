import { AssetCard } from "@/components/asset-card";
import { assets } from "@/lib/sample-data";

export default function AssetsPage() {
  return (
    <main>
      <p className="kicker">Asset Registry</p>
      <h1>Generated files become registered products</h1>
      <section className="grid grid-3">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </section>
    </main>
  );
}
