import { showcase } from "@/lib/sample-data";

export default function ShowcasePage() {
  return (
    <main>
      <p className="kicker">Showcase</p>
      <h1>Proof from the factory floor</h1>
      <section className="grid grid-2">
        {showcase.map((item) => (
          <article className="card" key={item.id}>
            <p className="kicker">Case Study</p>
            <h3>{item.title}</h3>
            <p className="muted">{item.summary}</p>
            <p><strong>Value:</strong> {item.value}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
