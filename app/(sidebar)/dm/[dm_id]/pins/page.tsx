"use client";

import { useEffect, useState } from "react";
import MainHeader from "@/app/shared/ui/MainHeader";
import DOMPurify from "dompurify";

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
  const [messages, setMessages] = useState<PinnedMessage[]>([]);

  useEffect(() => {
    // Replace with your API call
    fetch("/api/pinned-messages") // Adjust endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.data.pinned_messages);
        }
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      {messages.length === 0 && (
        <p className="text-gray-500 text-center">No pinned messages</p>
      )}
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
