"use client";

import * as React from "react";
import axios from "axios";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [channels, setChannels] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Channels
        const ch = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/channels`, {
  withCredentials: true,
});

        setChannels(
          ch.data.map((c: any) => ({
            title: c.name,
            url: `/channels/${c.id}`,
          }))
        );

        // ✅ Users
        const us = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
  withCredentials: true,
});


        setUsers(
          us.data.map((u: any) => ({
            title: u.name,
            url: `/dm/${u.id}`,
            avatar: u.avatar_url,
            is_online: u.is_online,
          }))
        );
      } catch (err) {
        console.error("Sidebar fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
      { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
      { name: "Evil Corp.", logo: Command, plan: "Free" },
    ],
    navMain: [
      {
        title: "Channels",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: channels,
      },
      {
        title: "Direct Messages",
        url: "#",
        icon: Bot,
        items: users,
      },
      {
        title: "Apps & Docs",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "Introduction", url: "#" },
          { title: "Get Started", url: "#" },
        ],
      },
    ],
    projects: [
      { name: "Threads", url: "#", icon: Frame },
      { name: "Calls", url: "#", icon: PieChart },
      { name: "Drafts", url: "#", icon: Map },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
