import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur-md"><SidebarTrigger className="-ml-1" /><Separator orientation="vertical" className="mr-2 data-vertical:h-4" /><span className="text-sm font-medium text-muted-foreground">Khmer Video Dubber</span><div className="ml-auto flex items-center gap-2"><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-emerald-500" />Production</div><ThemeToggle/></div></header>
        <main className="flex-1 p-4 pb-12 sm:p-6 lg:p-8"><div className="mx-auto max-w-[1380px]">{children}</div></main>
      </SidebarInset>
    </SidebarProvider>
  );
}
