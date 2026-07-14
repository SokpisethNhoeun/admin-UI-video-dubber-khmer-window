"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FormSelect({ name, defaultValue, options, className }: { name: string; defaultValue: string; options: { value: string; label: string }[]; className?: string }) {
  return <Select name={name} defaultValue={defaultValue}><SelectTrigger className={className ?? "h-9 min-w-36"}><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select>;
}
