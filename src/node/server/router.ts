/**
 * tRPC Router 定义
 * 导出所有 API 路由
 */

import { z } from "zod";
import { procedure, router } from "./trpc";
import { createChat, updateChatModel, getChatByUid } from "../database/chat-operations";

// 定义聊天相关的 procedures
export const chatRouter = router({
	// 创建会话
	create: procedure()
		.input(
			z.object({
				provider: z.string(),
				model: z.string(),
				title: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const chat = await createChat({
				provider: input.provider,
				model: input.model,
				title: input.title,
			});
			return chat;
		}),

	// 获取会话详情
	getById: procedure()
		.input(
			z.object({
				chatUid: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const chat = await getChatByUid(input.chatUid);
			if (!chat) {
				throw new Error(`Chat not found: ${input.chatUid}`);
			}
			return chat;
		}),

	// 更新模型
	updateModel: procedure()
		.input(
			z.object({
				chatUid: z.string(),
				model: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			await updateChatModel(input.chatUid, input.model);
			return { success: true };
		}),

	// 列出所有会话（无参数）
	list: procedure().query(async () => {
		// TODO: 实现列表查询
		return [];
	}),
});

// 定义消息相关的 procedures
export const messageRouter = router({
	// 发送消息
	send: procedure()
		.input(
			z.object({
				chatUid: z.string(),
				content: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			// TODO: 实现发送消息逻辑
			return { messageUid: "msg-123" };
		}),
});

// 合并所有路由
export const appRouter = router({
	chat: chatRouter,
	message: messageRouter,
});

// 导出类型
export type AppRouter = typeof appRouter;
