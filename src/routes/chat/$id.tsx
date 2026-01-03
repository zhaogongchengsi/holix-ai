import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { ChatContext } from "@/context/chat";
import { updateConfig } from "@/lib/config";
import useChat from "@/store/chat";
import useMessage from "@/store/message";
import { MainContent } from "@/views/main/content";
import MainFooter from "@/views/main/footer";

export const Route = createFileRoute("/chat/$id")({
  component: Component,
});

function Component() {
  const { id } = Route.useParams();
  const chat = useChat((state) => state.chats.find((chat) => chat.uid === id));
  const loadMessages = useMessage((state) => state.loadMessages);
  const hasMessages = useMessage((state) => id ? !!state.messagesByChatId[id] : false);

  useEffect(() => {
    updateConfig("currentChatId", id);
  }, [id]);

  // 当进入聊天页面且该聊天的消息未加载时，加载消息
  useEffect(() => {
    if (id && !hasMessages) {
      loadMessages(id);
    }
  }, [id, hasMessages, loadMessages]);

  // 使用 useMemo 优化 Context value，避免不必要的重渲染
  const contextValue = useMemo(
    () => ({ chat: chat || null, chatId: id }),
    [chat, id]
  );

  return (
    <ChatContext.Provider value={contextValue}>
      <div className="w-full h-[calc(100vh - var(--app-header-height))] flex flex-col">
        <MainContent />
        <MainFooter />
      </div>
    </ChatContext.Provider>
  );
}
