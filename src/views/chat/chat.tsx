import useChat from "@/store/chat";
import { ChatPanel } from "./panel";

export function AsideChatSidebar() {
  const chats = useChat((state) => state.chats);

  return (
    <nav className="w-full py-2">
      <ul className="w-full space-y-2">
        {chats.map((chat) => {
          return (
            <li key={chat.id} className="px-2">
              <ChatPanel {...chat} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
