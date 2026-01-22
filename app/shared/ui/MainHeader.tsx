"use client";

import { useAuth } from "@/app/components/context/userId_and_connection/provider";
import ButtonGroup from "@/app/components/ui/button-group";
import TabsModalDemo from "@/app/components/ui/groupmember";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { FaHeadphones } from "react-icons/fa6"
import { FaRegBell } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface MainHeaderProps {
  id?: string;
  type?: "channel" | "dm";
  dmUser?: {
    id: number;
    name: string;
    avatar_url?: string;
  } | null;
  isPrivate?: boolean;
}


interface Channel {
  id: string;
  name: string;
  type: string;
  isPrivate?: boolean;
}

interface Member {
  id: number;
  name: string;
  email: string;
}

export default function MainHeader({ id, type, dmUser, isPrivate }: MainHeaderProps) {
  const { isOnline,socket } = useAuth();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

const buttons = [
  { label: "Message", href: `/channel/${id}` },
  { label: "Files", href: `/channel/${id}/files` },
  { label: "Pins", href: `/channel/${id}/pins` },
];

const handleLeaveChannel = async () => {
  if (!id) return;

  try {
    await api.post(`/channels/${id}/leave`);

    socket?.emit("leaveChannel", { channel_id: id });

    window.location.href = "/";
  } catch (err) {
    console.error("Failed to leave channel", err);
  }
};



  useEffect(() => {
    if (!id || type !== "channel") return;

    const fetchChannelDetails = async () => {
      try {
        const res = await api.get(`/channels/${id}`);
        const data = res.data;
        setChannel(data.channel);
        setMembers(data.members);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelDetails();
  }, [id, type]);

  return (
    <div className="px-4 pt-4 pb-0 border-b flex justify-between sticky top-[55px] z-50 bg-white">
      <div>
        <div className="flex gap-2">

        {type === "dm" && dmUser && (
  <img
    src={dmUser.avatar_url ? `/avatar/${dmUser.avatar_url}` : "/avatar/fallback.webp"}
    className="w-8 h-8 rounded-sm"
    alt={dmUser.name ?? "User"}
  />
)}


      <h2 className="mb-1 text-2xl font-semibold">
        {loading
          ? "Loading..."
          : type === "dm"
          ? dmUser?.name ?? "Direct Message"
          : `# ${channel?.name ?? "Unnamed Channel"}`}
      </h2>


        </div>

        <ButtonGroup items={buttons} />
      </div>

      <div className="flex flex-row justify-center items-start gap-3 text-sm text-gray-600">
        {type === "channel" && isPrivate == true && channel && (
          <TabsModalDemo channelId={channel.id} />
        )}
        <div className="rounded-lg bg-gray-100 p-2 border border-gray-200">
            <FaHeadphones size={18}/>
        </div>
        <div className="rounded-lg bg-gray-100 p-2 border border-gray-200">
            <FaRegBell size={18}/>
        </div>
        <button className="rounded-lg bg-gray-100 p-2 border border-gray-200">
          <IoSearchOutline size={18}/>
        </button>
        {type === "channel" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-lg bg-gray-100 p-2 border border-gray-200">
                <MoreVertical size={18} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 cursor-pointer"
                onClick={handleLeaveChannel}
              >
                Leave Channel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {isOnline ? "" : ""}
      </div>
    </div>
  );
}
