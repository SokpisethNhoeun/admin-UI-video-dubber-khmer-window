import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar({ value = "", placeholder = "Search…", children }: { value?: string; placeholder?: string; children?: React.ReactNode }) {
  return <form className="flex flex-col gap-2 border-b border-border p-4 sm:flex-row"><label className="relative min-w-0 flex-1"><span className="sr-only">Search</span><SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="h-9 pl-9" name="search" defaultValue={value} placeholder={placeholder} /></label>{children}<Button type="submit" variant="outline" size="lg">Search</Button></form>;
}
