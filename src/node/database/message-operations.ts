import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { updateChatLastSeq } from "./chat-operations";
import { getDatabase } from "./connect";
import {
	type DraftContent,
	type Message,
	type MessageInsert,
	message,
} from "./schema/chat";

/**
 * 创建新消息
 * @param params - 创建参数
 * @returns 创建的消息记录
 */
export async function createMessage(params: {
	chatUid: string;
	seq: number;
	role: "user" | "assistant" | "system" | "tool";
	kind: string;
	content?: string;
	draftContent?: DraftContent;
	status?: "pending" | "streaming" | "done" | "aborted" | "error";
	model?: string;
	parentUid?: string;
	requestId?: string;
	streamId?: string;
	toolName?: string;
	toolPayload?: Record<string, any>;
}): Promise<Message> {
	const db = await getDatabase();
	const uid = nanoid();
	const now = Date.now();

	const insert: MessageInsert = {
		uid,
		chatUid: params.chatUid,
		seq: params.seq,
		role: params.role,
		kind: params.kind,
		content: params.content || null,
		draftContent: params.draftContent || null,
		status: params.status || "done",
		model: params.model || null,
		searchable: true,
		searchIndexVersion: null,
		parentUid: params.parentUid || null,
		requestId: params.requestId || null,
		streamId: params.streamId || null,
		toolName: params.toolName || null,
		toolPayload: params.toolPayload
			? (JSON.stringify(params.toolPayload) as any)
			: null,
		error: null,
		createdAt: now,
		updatedAt: now,
	};

	await db.insert(message).values(insert);

	// 更新会话的最后序号
	await updateChatLastSeq(params.chatUid, params.seq);

	const [msg] = await db.select().from(message).where(eq(message.uid, uid));
	return msg;
}

/**
 * 获取消息详情
 * @param messageUid - 消息 UID
 * @returns 消息记录，不存在则返回 null
 */
export async function getMessageByUid(
	messageUid: string,
): Promise<Message | null> {
	const db = await getDatabase();
	const [msg] = await db
		.select()
		.from(message)
		.where(eq(message.uid, messageUid));
	return msg || null;
}

/**
 * 获取会话的所有消息
 * @param chatUid - 会话 UID
 * @param options - 查询选项
 * @returns 消息列表
 */
export async function getMessagesByChatUid(
	chatUid: string,
	options?: {
		limit?: number;
		order?: "asc" | "desc";
	},
): Promise<Message[]> {
	const db = await getDatabase();

	let query = db.select().from(message).where(eq(message.chatUid, chatUid));

	// 排序
	const order = options?.order || "asc";
	if (order === "desc") {
		query = query.orderBy(desc(message.seq)) as any;
	} else {
		query = query.orderBy(message.seq) as any;
	}

	// 限制数量
	if (options?.limit) {
		query = query.limit(options.limit) as any;
	}

	return await query;
}

/**
 * 获取会话的最新 N 条消息
 * @param chatUid - 会话 UID
 * @param limit - 数量限制
 * @returns 消息列表（按时间升序）
 */
export async function getLatestMessages(
	chatUid: string,
	limit: number,
): Promise<Message[]> {
	const messages = await getMessagesByChatUid(chatUid, {
		limit,
		order: "desc",
	});
	return messages.reverse(); // 反转为升序
}

/**
 * 更新消息内容
 * @param messageUid - 消息 UID
 * @param content - 新内容
 */
export async function updateMessageContent(
	messageUid: string,
	content: string,
): Promise<void> {
	const db = await getDatabase();
	await db
		.update(message)
		.set({
			content,
			updatedAt: Date.now(),
		})
		.where(eq(message.uid, messageUid));
}

/**
 * 更新消息的草稿内容
 * @param messageUid - 消息 UID
 * @param draftContent - 草稿内容
 */
export async function updateMessageDraftContent(
	messageUid: string,
	draftContent: DraftContent,
): Promise<void> {
	const db = await getDatabase();
	await db
		.update(message)
		.set({
			draftContent,
			updatedAt: Date.now(),
		})
		.where(eq(message.uid, messageUid));
}

/**
 * 更新消息状态
 * @param messageUid - 消息 UID
 * @param status - 新状态
 */
export async function updateMessageStatus(
	messageUid: string,
	status: "pending" | "streaming" | "done" | "aborted" | "error",
): Promise<void> {
	const db = await getDatabase();
	await db
		.update(message)
		.set({
			status,
			updatedAt: Date.now(),
		})
		.where(eq(message.uid, messageUid));
}

/**
 * 设置消息错误
 * @param messageUid - 消息 UID
 * @param error - 错误信息
 */
export async function setMessageError(
	messageUid: string,
	error: string,
): Promise<void> {
	const db = await getDatabase();
	await db
		.update(message)
		.set({
			error,
			status: "error",
			updatedAt: Date.now(),
		})
		.where(eq(message.uid, messageUid));
}

/**
 * 删除消息
 * @param messageUid - 消息 UID
 */
export async function deleteMessage(messageUid: string): Promise<void> {
	const db = await getDatabase();
	await db.delete(message).where(eq(message.uid, messageUid));
}

/**
 * 删除会话的所有消息
 * @param chatUid - 会话 UID
 */
export async function deleteMessagesByChatUid(chatUid: string): Promise<void> {
	const db = await getDatabase();
	await db.delete(message).where(eq(message.chatUid, chatUid));
}

/**
 * 批量更新消息（通用方法）
 * @param messageUid - 消息 UID
 * @param updates - 要更新的字段
 */
export async function updateMessage(
	messageUid: string,
	updates: Partial<Omit<Message, "id" | "uid" | "chatUid" | "seq">>,
): Promise<void> {
	const db = await getDatabase();
	await db
		.update(message)
		.set({
			...updates,
			updatedAt: Date.now(),
		})
		.where(eq(message.uid, messageUid));
}

/**
 * 获取会话的下一个序号
 * @param chatUid - 会话 UID
 * @returns 下一个可用的序号
 */
export async function getNextSeq(chatUid: string): Promise<number> {
	const db = await getDatabase();
	const [result] = await db
		.select({ maxSeq: message.seq })
		.from(message)
		.where(eq(message.chatUid, chatUid))
		.orderBy(desc(message.seq))
		.limit(1);

	return result ? result.maxSeq + 1 : 1;
}

/**
 * 提交草稿内容到正式内容
 * @param messageUid - 消息 UID
 */
export async function commitDraftContent(messageUid: string): Promise<void> {
	const db = await getDatabase();
	const [msg] = await db
		.select()
		.from(message)
		.where(eq(message.uid, messageUid));

	if (!msg || !msg.draftContent) {
		return;
	}

	// 将草稿内容合并为最终内容
	const content = msg.draftContent.map((segment) => segment.content).join("");

	await db
		.update(message)
		.set({
			content,
			status: "done",
			updatedAt: Date.now(),
		})
		.where(eq(message.uid, messageUid));
}

/**
 * 获取特定请求的所有消息
 * @param requestId - 请求 ID
 * @returns 消息列表
 */
export async function getMessagesByRequestId(
	requestId: string,
): Promise<Message[]> {
	const db = await getDatabase();
	return await db
		.select()
		.from(message)
		.where(eq(message.requestId, requestId))
		.orderBy(message.seq);
}

/**
 * 获取特定流的消息
 * @param streamId - 流 ID
 * @returns 消息记录，不存在则返回 null
 */
export async function getMessageByStreamId(
	streamId: string,
): Promise<Message | null> {
	const db = await getDatabase();
	const [msg] = await db
		.select()
		.from(message)
		.where(eq(message.streamId, streamId));
	return msg || null;
}

/**
 * 搜索消息内容
 * @param chatUid - 会话 UID（可选）
 * @param keyword - 搜索关键词
 * @param limit - 结果数量限制
 * @returns 匹配的消息列表
 */
export async function searchMessages(
	keyword: string,
	options?: {
		chatUid?: string;
		limit?: number;
	},
): Promise<Message[]> {
	const db = await getDatabase();

	const conditions = [eq(message.searchable, true)];

	if (options?.chatUid) {
		conditions.push(eq(message.chatUid, options.chatUid));
	}

	let query = db
		.select()
		.from(message)
		.where(and(...conditions))
		.orderBy(desc(message.createdAt));

	if (options?.limit) {
		query = query.limit(options.limit) as any;
	}

	const messages = await query;

	// 简单的内容过滤（可以后续优化为 FTS）
	return messages.filter((msg) => msg.content && msg.content.includes(keyword));
}
