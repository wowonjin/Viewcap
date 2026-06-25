import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-800",
  failed: "bg-red-100 text-red-800",
  rendering: "bg-blue-100 text-blue-800",
  processing: "bg-blue-100 text-blue-800",
  queued: "bg-slate-100 text-slate-700",
  active: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  open: "bg-amber-100 text-amber-800",
  draft: "bg-slate-100 text-slate-700",
  analyzing: "bg-violet-100 text-violet-800",
  ready_to_preview: "bg-cyan-100 text-cyan-800",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const key = status.toLowerCase();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[key] ?? "bg-slate-100 text-slate-700",
        className,
      )}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
