export function PageHeader({ eyebrow="Admin workspace", title, description, actions }: { eyebrow?: string; title: string; description: string; actions?: React.ReactNode }) {
  return (
    <header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2b8668]" />
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#37735f]">{eyebrow}</p>
        </div>
        <h1 className="text-[28px] font-semibold tracking-[-.035em] text-[#17201b] sm:text-[32px]">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b766f]">{description}</p>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
