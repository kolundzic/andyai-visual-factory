export function LiveDataBadge({ configured }: { configured: boolean }) {
  return <span className="badge">{configured ? "Supabase live data" : "Supabase not configured"}</span>;
}
