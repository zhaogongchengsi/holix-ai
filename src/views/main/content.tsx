import { useChatContext } from "@/context/chat";
import { useChatMessages } from "@/hooks/message";
import { Virtuoso } from "react-virtuoso";
import { MessageItem } from "./message-item";
import { useRef } from "react";

export function MainContent() {
  const { chat } = useChatContext();
  const virtuoso = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 使用优化的 Hook，带浅比较
  const messages = useChatMessages(chat?.uid);

  return (
    <main className="h-(--app-chat-content-height)" ref={wrapperRef}>
      <Virtuoso
        ref={virtuoso}
        style={{ height: "var(--app-chat-content-height)" }}
        data={messages}
        followOutput="smooth"
        className="custom-scrollbar"
        initialTopMostItemIndex={{
          index: messages.length - 1,
          align: "end",
        }}
        itemContent={(index, msg) => {
          return <MessageItem index={index} key={msg.uid} message={msg} />;
        }}
      />
    </main>
  );
}
