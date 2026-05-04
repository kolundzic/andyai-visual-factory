import Link from "next/link";

const links = [
  ["/dashboard", "Dashboard"],
  ["/workspaces", "Workspaces"],
  ["/jobs", "Jobs"],
  ["/assets", "Assets"],
  ["/showcase", "Showcase"],
  ["/requests/new", "New Request"],
  ["/api/runtime/summary", "Runtime Summary"]
];

export function OperatorLinkGrid() {
  return (
    <section className="grid grid-3">
      {links.map(([href, label]) => (
        <Link className="card" href={href} key={href}>
          <p className="kicker">Operator</p>
          <h3>{label}</h3>
          <p className="muted">{href}</p>
        </Link>
      ))}
    </section>
  );
}
