"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgePercentIcon, CreditCardIcon, GaugeIcon, KeyRoundIcon, LogOutIcon, Settings2Icon, UsersIcon } from "lucide-react";
import { logoutAction } from "@/app/actions/auth.actions";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from "@/components/ui/sidebar";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: GaugeIcon },
  { href: "/licenses", label: "Licenses", icon: KeyRoundIcon },
  { href: "/payments", label: "Payments", icon: CreditCardIcon },
  { href: "/discounts", label: "Discounts", icon: BadgePercentIcon },
  { href: "/customers", label: "Customers", icon: UsersIcon },
  { href: "/system", label: "System", icon: Settings2Icon },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu><SidebarMenuItem><SidebarMenuButton size="lg" tooltip="Khmer Video Dubber" render={<Link href="/dashboard" prefetch onClick={() => setOpenMobile(false)} />}><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">KD</span><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-semibold">Dubber Admin</span><span className="truncate text-xs text-muted-foreground">License operations</span></div></SidebarMenuButton></SidebarMenuItem></SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup><SidebarGroupLabel>Management</SidebarGroupLabel><SidebarMenu>{navigation.map((item) => { const active = pathname.startsWith(item.href); return <SidebarMenuItem key={item.href}><SidebarMenuButton isActive={active} tooltip={item.label} render={<Link href={item.href} prefetch onClick={() => setOpenMobile(false)} />}><item.icon /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>; })}</SidebarMenu></SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu><SidebarMenuItem><div className="mb-1 flex items-center gap-2 rounded-lg px-2 py-2 group-data-[collapsible=icon]:hidden"><span className="grid size-8 place-items-center rounded-lg bg-muted text-xs font-semibold">AD</span><div className="min-w-0"><p className="truncate text-xs font-medium">Administrator</p><p className="truncate text-[10px] text-muted-foreground">Secure session</p></div></div><form action={logoutAction}><SidebarMenuButton tooltip="Sign out" render={<button type="submit" />}><LogOutIcon /><span>Sign out</span></SidebarMenuButton></form></SidebarMenuItem></SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
