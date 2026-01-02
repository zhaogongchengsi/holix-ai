import type { Command } from "./base";

// 发送/追加一条消息到会话（适用于多次交互的每次发言）
export type SendChatMessageCommand = Command<"chat.message", {
	chatId: string;
	content: string;             // 本次消息文本
	replyTo?: string | null;     // 可选：引用的消息 id
}>;

// 结束会话（可用于中止或标记会话完成）
export type EndChatCommand = Command<"chat.end", {
	chatId: string;
	messageId: string
}>;

// 会话相关命令的联合类型（方便 dispatch/handler 使用）
export type ChatCommands =
	SendChatMessageCommand |
	EndChatCommand;