type Asset = {
  id?: string;
  asset_key?: string;
  title?: string;
  public_url?: string;
  mime_type?: string;
  status?: string;
  storage_path?: string;
  output_type?: string;
};

export function RenderedAssetsGallery({ assets }: { assets: Asset[] }) {
  return (
    <section className="card">
      <p className="kicker">Rendered Assets</p>
      <h2>Visible factory products</h2>
      {assets.length === 0 ? (
        <p className="muted">No rendered image assets yet. Generate a job to create the first visible product.</p>
      ) : (
        <section className="grid grid-2">
          {assets.map((asset) => (
            <article className="card" key={asset.id ?? asset.asset_key}>
              <span className="badge">{asset.status ?? "asset"}</span>
              <h3>{asset.title ?? asset.asset_key ?? "Rendered asset"}</h3>
              {asset.public_url ? (
                <a href={asset.public_url} target="_blank" rel="noreferrer">
                  <img
                    src={asset.public_url}
                    alt={asset.title ?? "Rendered asset"}
                    style={{
                      width: "100%",
                      borderRadius: 20,
                      border: "1px solid var(--line)",
                      marginTop: 12,
                      background: "#fff"
                    }}
                  />
                </a>
              ) : (
                <p className="muted">No public URL yet.</p>
              )}
              <p className="muted">{asset.output_type ?? asset.mime_type ?? "visual asset"}</p>
              <div className="button-row">
                {asset.public_url ? (
                  <a className="button secondary" href={asset.public_url} target="_blank" rel="noreferrer">Open / Download</a>
                ) : null}
                <button className="button secondary" type="button">Approve</button>
                <button className="button secondary" type="button">Regenerate</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
