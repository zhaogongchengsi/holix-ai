import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { ChatContext } from "@/context/chat";
import { updateConfig } from "@/lib/config";
import useChat from "@/store/chat";
import { MainContent } from "@/views/main/content";
import MainFooter from "@/views/main/footer";

export const Route = createFileRoute("/chat/$id")({
  component: Component,
});

function Component() {
  const { id } = Route.useParams();
  const chat = useChat((state) => state.chats.find((chat) => chat.uid === id));

  useEffect(() => {
    updateConfig("currentChatId", id);
  }, [id]);

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
