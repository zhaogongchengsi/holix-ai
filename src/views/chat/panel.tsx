import { timeAgo } from "@/lib/time";
import type { Chat } from "@/node/database/schema/chat";
import { Link } from "@tanstack/react-router";

export function ChatPanel(props: Chat) {
  return (
    <Link
      to="/chat/$id"
      params={{ id: props.uid }}
      className="block rounded-md cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-600 select-none"
      activeProps={{
        className: "bg-zinc-200! dark:bg-zinc-700!",
      }}
      aria-label={`Open chat: ${props.title}`}
    >
      <div>
        <div className="flex justify-between items-center">
          <h2 className="w-3/4 min-w-0 truncate">{props.title}</h2>
          <span className="text-sm text-gray-500">{timeAgo(props.updatedAt)}</span>
        </div>
        {props.lastMessagePreview && (
          <p className="text-gray-500 line-clamp-1 wrap-break-word">{props.lastMessagePreview}</p>
        )}
      </div>
    </Link>
  );
}
