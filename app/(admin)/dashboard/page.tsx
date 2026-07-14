import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Icon } from "@/components/ui/icon";
import { adminApi, Dashboard } from "@/services/admin.service";

export const metadata: Metadata = { title: "Overview" };

const formatDate = (value: string) => new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
const number = new Intl.NumberFormat("en-US");

export default async function DashboardPage() {
  const data = await adminApi<Dashboard>("/v1/admin/dashboard");
  const activationRate = data.metrics.active_licenses ? Math.round((data.metrics.activated_devices / data.metrics.active_licenses) * 100) : 0;
  const paymentRate = data.metrics.payments ? Math.round((data.metrics.paid_payments / data.metrics.payments) * 100) : 0;
  const stats = [
    { label: "Total revenue", value: `$${data.metrics.revenue}`, sub: `${number.format(data.metrics.paid_payments)} successful payments`, icon: "trend" as const, tone: "bg-[#e5f3eb] text-[#17664c]" },
    { label: "Active licenses", value: number.format(data.metrics.active_licenses), sub: `${number.format(data.metrics.licenses)} licenses issued`, icon: "key" as const, tone: "bg-[#eaf1ff] text-[#315fba]" },
    { label: "Activated devices", value: number.format(data.metrics.activated_devices), sub: `${activationRate}% activation rate`, icon: "users" as const, tone: "bg-[#f0ebff] text-[#6b4bb6]" },
    { label: "Expired licenses", value: number.format(data.metrics.expired_licenses), sub: "Renewal opportunities", icon: "card" as const, tone: "bg-[#fff3df] text-[#9a651d]" },
  ];

  return (
    <>
      <PageHeader title="Business overview" description="Revenue, licenses, and customer activity across Khmer Video Dubber." actions={<Link href="/licenses" className="btn btn-primary"><Icon name="plus" size={16} />Issue license</Link>} />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article className="card group relative overflow-hidden p-5" key={stat.label}>
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f5f8f5] transition-transform duration-300 group-hover:scale-125" />
            <div className="relative flex items-start justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[.08em] text-[#7a857e]">{stat.label}</p>
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${stat.tone}`}><Icon name={stat.icon} size={17} /></span>
            </div>
            <p className="relative mt-5 text-[29px] font-semibold tracking-[-.04em] text-[#18231d]">{stat.value}</p>
            <p className="relative mt-1 text-[11px] font-medium text-[#8a938d]">{stat.sub}</p>
          </article>
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.55fr]">
        <div className="grid gap-5 lg:grid-cols-2">
          <ActivityTable title="Recent payments" description="Latest checkout activity" href="/payments" headers={["Customer", "Amount", "Status"]} empty="No payment activity yet.">
            {data.recent_payments.map((payment) => <tr key={payment.id}><td><div className="font-semibold text-[#27342d]">{payment.customer_email}</div><div className="mt-1 text-[10px] text-gray-400">{formatDate(payment.created_at)}</div></td><td className="font-bold text-[#27342d]">${payment.amount}</td><td><StatusBadge status={payment.status} /></td></tr>)}
          </ActivityTable>

          <ActivityTable title="Recent licenses" description="Newest subscriptions issued" href="/licenses" headers={["Customer", "Plan", "Status"]} empty="No licenses issued yet.">
            {data.recent_licenses.map((license) => <tr key={license.id}><td><div className="font-semibold text-[#27342d]">{license.customer_email}</div><div className="mt-1 font-mono text-[10px] text-gray-400">•••• {license.key_last4}</div></td><td className="capitalize">{license.plan.replace("_", " ")}</td><td><StatusBadge status={!license.active ? "revoked" : new Date(license.expires_at) < new Date() ? "expired" : "active"} /></td></tr>)}
          </ActivityTable>
        </div>

        <aside className="card h-fit overflow-hidden">
          <div className="border-b border-[#edf0ed] px-5 py-4"><p className="text-sm font-bold">Operational health</p><p className="mt-1 text-[11px] text-gray-400">Current conversion indicators</p></div>
          <div className="space-y-5 p-5">
            <Progress label="Payment completion" value={paymentRate} />
            <Progress label="Device activation" value={activationRate} />
            <div className="rounded-xl bg-[#f2f7f4] p-4"><div className="flex items-center gap-2 text-xs font-bold text-[#2b5c49]"><span className="h-2 w-2 rounded-full bg-emerald-500" />Services operational</div><p className="mt-2 text-[11px] leading-5 text-[#6f7c74]">The admin API is responding and live data is available.</p></div>
          </div>
        </aside>
      </section>
    </>
  );
}

function ActivityTable({ title, description, href, headers, empty, children }: { title: string; description: string; href: string; headers: string[]; empty: string; children: React.ReactNode }) {
  const hasRows = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return <div className="card overflow-hidden"><div className="flex items-center justify-between px-5 py-4"><div><h2 className="text-sm font-bold">{title}</h2><p className="mt-1 text-[11px] text-gray-400">{description}</p></div><Link href={href} className="flex items-center gap-1 text-[11px] font-bold text-[#17664c] hover:text-[#0e503b]">View all <Icon name="arrow" size={13} /></Link></div><div className="table-wrap"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{children}{!hasRows && <tr><td colSpan={headers.length} className="py-10 text-center text-gray-400">{empty}</td></tr>}</tbody></table></div></div>;
}

function Progress({ label, value }: { label: string; value: number }) {
  return <div><div className="mb-2 flex items-center justify-between text-[11px]"><span className="font-semibold text-[#58645d]">{label}</span><span className="font-bold text-[#1b6049]">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#edf1ee]"><div className="h-full rounded-full bg-[#28785d]" style={{ width: `${Math.min(value, 100)}%` }} /></div></div>;
}
