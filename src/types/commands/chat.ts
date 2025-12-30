import type { Command } from "./base";

// 开始聊天命令 只需要一句话
export type StartChatCommand = Command<"chat.start", {
	context: string
}>;
