export function EmptyState({
  title,
  message
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="card">
      <p className="kicker">Empty State</p>
      <h3>{title}</h3>
      <p className="muted">{message}</p>
    </div>
  );
}
