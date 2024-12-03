"use client"

import * as React from "react"
import { useSidebar } from "@/components/ui/sidebar"

import { NavMain } from "@/components/nav-main"
import { NavSystem } from "@/components/nav-system"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { menuItems } from "@/lib/menuItems"

interface AppSidebarProps {
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: [];
  };
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ user }) => {
  const { isCollapsed } = useSidebar()

  // Check if the user has the 'Admin' role
  const isAdmin = user.roles.includes('Admin');

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="w-full"
            >
              {isCollapsed ? (
                <div className="flex items-center justify-center w-full">
                  <img 
                    src="/logo.png"
                    alt="Logo"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 pl-2">
                  <img 
                    src="/logo.png"
                    alt="Logo"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span className="text-sm font-medium">{process.env.NEXT_PUBLIC_APP_NAME}</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems.main} />
        {/* Conditionally render NavSystem based on user role */}
        {isAdmin && <NavSystem systems={menuItems.system} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
