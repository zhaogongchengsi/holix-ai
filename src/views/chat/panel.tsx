import { Link } from "@tanstack/react-router";
import { timeAgo } from "@/lib/time";
import type { Chat } from "@/node/database/schema/chat";
import { cn } from "@/lib/utils";

export function ChatPanel(props: Chat) {
	return (
		<Link
			to="/chat/$id"
			params={{ id: props.uid }}
			className={cn(
				"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent/50 select-none",
				"border-transparent"
			)}
			activeProps={{
				className: "bg-accent text-accent-foreground border-border shadow-sm",
			}}
			aria-label={`Open chat: ${props.title}`}
		>
			<div className="flex w-full flex-col gap-1">
				<div className="flex items-center justify-between">
					<span className="font-semibold truncate max-w-[70%]">
						{props.title}
					</span>
					<span className="ml-auto text-[10px] text-muted-foreground/80">
						{timeAgo(props.updatedAt)}
					</span>
				</div>

				<span className="line-clamp-2 text-xs text-muted-foreground w-full break-words opacity-90">
					{props.lastMessagePreview || "No messages yet"}
				</span>
			</div>
		</Link>
	);
}
