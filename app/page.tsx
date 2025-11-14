
import ChatArea from "@/components/custom/ChatArea";

export default function Home() {
  const handleSendMessage = (content: string) => {
    console.log("Message to send:", content);
    // TODO: Send to WebSocket / backend
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {/* Sidebar */}
      {/* ...your sidebar code... */}

      {/* Chat Area */}
      <main className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-black dark:text-white">John Doe</h2>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Online</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Example messages */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-zinc-300 rounded-full" />
            <div className="bg-zinc-200 dark:bg-zinc-800 p-3 rounded-xl max-w-md">
              <p className="text-sm text-black dark:text-white">Hey! How are you?</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-black text-white dark:bg-zinc-700 p-3 rounded-xl max-w-md">
              <p className="text-sm">I’m good! Working on the new chat UI 👌</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
          <ChatArea />
        </div>
      </main>
    </div>
  );
}
