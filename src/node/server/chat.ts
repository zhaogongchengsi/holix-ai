import { HolixProtocolRouter } from "@holix/router";
import { z } from "zod";
import { procedure, router } from "./trpc";
import { createChat, getChatByUid, updateChatModel } from "../database/chat-operations";


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