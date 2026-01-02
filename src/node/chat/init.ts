import { onCommand } from "../platform/commands";
import { logger } from "../platform/logger";

export function initChat() {
	// 监听聊天消息发送
	onCommand("chat.message", async (payload) => {
		const { chatId, content, replyTo } = payload;
		logger.info(`[Chat] New message for chat ${chatId}: ${content} (replyTo: ${replyTo ?? "none"})`);

	});
}
