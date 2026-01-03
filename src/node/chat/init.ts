import {
	getChatByUid,
	updateLastMessagePreview,
} from "../database/chat-operations";
import { createUserMessage } from "../database/message-operations";
import { onCommand } from "../platform/commands";
import { logger } from "../platform/logger";
import { providerStore } from "../platform/provider";
import { update } from "../platform/update";
import { createLlm } from "./llm";


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
		const providers = providerStore.get("providers")

		const provider = providers.find(p => p.name === chat.provider)
		const model = chat.model.toLocaleLowerCase()

		if (!provider || !provider.apiKey) {
			logger.error(`[Chat] Provider ${chat.provider} not found for chat ${chatId}.`);
			return;
		}

		logger.info(
			`[Chat] Using provider ${provider.name} for model ${model} in chat ${chatId}.`,
		);

		const llm = createLlm(model, {
			provider: provider.name,
			apiKey: provider.apiKey,
			streaming: true,
		})

		logger.info(
			`[Chat] Created user message ${userMessages.uid} for chat ${chatId}`,
		);
	});
}
