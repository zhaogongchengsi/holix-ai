import { useChatContext } from "@/context/chat";
import { useChatMessages } from "@/hooks/message";
import { Virtuoso } from "react-virtuoso";
import { MessageItem } from "./message-item";

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
          return <MessageItem key={msg.uid} message={msg} />;
        }}
      />
    </main>
  );
}
