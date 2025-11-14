// components/ChatArea.tsx
"use client";

import MessageInput from "./MessageInput";

export default function ChatArea() {
  const handleSendMessage = (content: string) => {
    console.log("Message HTML:", content);
  };

  return (
    <div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
