"use client"

import { ChevronRight,Plus, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"


type NavItem = {
  title: string
  icon?: LucideIcon
  isActive?: boolean
  onAdd?: () => void
  items?: {
    title: string
    url: string
  }[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <>
      {items.map((item) => (
        <SidebarGroup key={item.title}>
          {/* 🔹 Group Header */}
          <div className="relative">
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.title}</span>
              </div>
            </SidebarGroupLabel>

            {item.onAdd && (
              <SidebarGroupAction
                onClick={item.onAdd}
                aria-label={`Add ${item.title}`}
              >
                <Plus />
              </SidebarGroupAction>
            )}
          </div>

          {/* 🔹 Collapsible menu */}
          <SidebarMenu>
            <Collapsible defaultOpen={item.isActive}>
              <CollapsibleTrigger asChild>
                <SidebarMenuItem className="custom_drop_trigger">
                  <SidebarMenuButton>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((sub) => (
                    <SidebarMenuSubItem key={sub.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={sub.url}>{sub.title}</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}