"use client"

import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export function NavSystem({
  systems,
}: {
  systems: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const pathname = usePathname();
  const isActiveRoute = (url: string) => {
    if (url === "/" && pathname === "/") return true;
    if (url !== "/") return pathname.startsWith(url);
    return false;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>System Configuration</SidebarGroupLabel>
      <SidebarMenu>
        {systems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={isActiveRoute(item.url)}>
              <Link href={item.url}>
              {item.icon && <item.icon />}
              {item.name}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
