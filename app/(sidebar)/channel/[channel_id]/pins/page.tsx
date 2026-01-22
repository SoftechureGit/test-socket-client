"use client";

import { useEffect, useState } from "react";
import MainHeader from "@/app/shared/ui/MainHeader";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";

interface Sender {
  id: number;
  name: string;
  avatar_url?: string | null;
}

interface PinnedMessage {
  message_id: number;
  content: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
  sender: Sender;
}

export default function PinnedMessages() {
  const params = useParams();
  const channelId = params?.channel_id;

  const [messages, setMessages] = useState<PinnedMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channelId) return;

    const fetchPinnedMessages = async () => {
      try {
        const res = await axios.get(`/channels/${channelId}/pinned`);
        if (res.data.success) {
          setMessages(res.data.data.pinned_messages);
        }
      } catch (err) {
        console.error("Failed to fetch pinned messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedMessages();
  }, [channelId]);

  if (loading) return <p className="p-6">Loading pinned messages...</p>;
  if (messages.length === 0) return <p className="p-6">No pinned messages.</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      {messages.map((msg) => (
        <div
          key={msg.message_id}
          className="border rounded-xl p-4 shadow-sm bg-white"
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="p-4 h-10 w-10 rounded-md bg-green-600 text-white flex items-center justify-center font-semibold text-lg">
              {msg.sender.name[0].toUpperCase()}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-black">{msg.sender.name}</p>

              <p className="text-gray-500 text-sm">
                {new Date(msg.created_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <div
                className="mt-2 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(msg.content),
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
