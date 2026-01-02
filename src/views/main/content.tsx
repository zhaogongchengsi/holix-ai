import { useChatContext } from "@/context/chat";

export function MainContent() {
  const { chat } = useChatContext();
  return <main className="h-(--app-chat-content-height) overflow-auto">Main Content Area for chat: {chat?.uid}</main>;
}
