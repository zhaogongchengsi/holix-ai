import {
	getChatByUid,
	updateLastMessagePreview,
} from "../database/chat-operations";
import { createUserMessage } from "../database/message-operations";
import { onCommand } from "../platform/commands";
import { logger } from "../platform/logger";
import { update } from "../platform/update";

export function initChat() {
	// 监听聊天消息发送
	onCommand("chat.message", async (payload) => {
		const { chatId, content, replyTo } = payload;
		logger.info(
			`[Chat] New message for chat ${chatId}: ${content} (replyTo: ${replyTo ?? "none"})`,
		);

		const chat = await getChatByUid(chatId);

		if (!chat) {
			logger.error(`[Chat] Chat with UID ${chatId} not found.`);
			return;
		}

		// 创建用户消息
		const userMessages = await createUserMessage(chatId, content);

		// 发送更新事件
		update("message.created", {
			chatUid: chatId,
			message: userMessages,
		});

		await updateLastMessagePreview(chatId, content);

		const newChat = await getChatByUid(chatId);

		update("chat.updated", newChat!)

		// 生成 AI 回复（此处省略具体实现）

		logger.info(
			`[Chat] Created user message ${userMessages.uid} for chat ${chatId}`,
		);
	});
}
