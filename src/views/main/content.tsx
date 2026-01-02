import { useChatContext } from "@/context/chat";
import { useChatMessages } from "@/hooks/message";
import { Virtuoso } from "react-virtuoso";

export function MainContent() {
  const { chat } = useChatContext();

  // 使用优化的 Hook，带浅比较
  const messages = useChatMessages(chat?.uid);

  return (
    <main className="h-(--app-chat-content-height)">
      <Virtuoso
        style={{ height: "var(--app-chat-content-height)" }}
        data={messages}
        className="custom-scrollbar"
        itemContent={(index, msg) => {
          return (
            <div key={msg.uid} className="p-2 border-b" data-index={index}>
              <div className="text-sm text-muted-foreground mb-1">{msg.role}</div>
              <div>{msg.content}</div>
            </div>
          );
        }}
      />
    </main>
  );
}
