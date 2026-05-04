import type { RuntimeStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: RuntimeStatus }) {
  return <span className="badge status">{status.replaceAll("_", " ")}</span>;
}
