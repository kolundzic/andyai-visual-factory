import { RecentWork } from "@/components/factory/recent-work";

export const dynamic = "force-dynamic";

export default function HistoryPage() {
  return (
    <main>
      <p className="kicker">History</p>
      <h1>Production request history</h1>
      <RecentWork />
    </main>
  );
}
