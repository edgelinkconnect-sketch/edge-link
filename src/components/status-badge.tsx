const STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300",
  under_review: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
  available: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  confirmed: "bg-forest text-cream",
  completed: "bg-gold/30 text-forest dark:text-gold",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STYLES[status] ?? "bg-muted text-foreground"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
