import { useChatContext } from "@/context/chat";
import { useChatMessages } from "@/hooks/message";

export function MainContent() {
  const { chat } = useChatContext();
  
  // 使用优化的 Hook，带浅比较
  const messages = useChatMessages(chat?.uid);

  return (
    <main className="h-(--app-chat-content-height) overflow-auto">
      {messages.map((msg) => (
        <div key={msg.uid} className="p-2 border-b">
          <div className="text-sm text-gray-500 mb-1">{msg.role}</div>
          <div>{msg.content}</div>
        </div>
      ))}
    </main>
  );
}
