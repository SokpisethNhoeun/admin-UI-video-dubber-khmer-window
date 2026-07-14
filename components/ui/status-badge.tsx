export function StatusBadge({ status }: { status: string }) {
  const good = ["active","paid","ready","production"].includes(status.toLowerCase());
  const bad = ["revoked","expired","failed","disabled"].includes(status.toLowerCase());
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold capitalize tracking-wide ${good ? "border-emerald-100 bg-emerald-50 text-emerald-700" : bad ? "border-rose-100 bg-rose-50 text-rose-700" : "border-amber-100 bg-amber-50 text-amber-700"}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{status.replaceAll("_", " ")}</span>;
}
