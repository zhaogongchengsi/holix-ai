/**
 * Message Streaming Update Types
 * 用于实时推送消息流到渲染进程
 */

import type { DraftSegment, Message } from "@/node/database/schema/chat";
import type { EventEnvelope } from "./base";

/**
 * 消息流开始
 */
export type MessageStreamStartEnvelope = EventEnvelope<
	"message.stream.start",
	{
		chatUid: string;
		messageUid: string;
		requestId: string;
		model: string;
	}
>;

/**
 * 消息流增量更新（streaming chunk）
 */
export type MessageStreamChunkEnvelope = EventEnvelope<
	"message.stream.chunk",
	{
		chatUid: string;
		messageUid: string;
		requestId: string;
		segment: DraftSegment;
	}
>;

/**
 * 消息流完成
 */
export type MessageStreamDoneEnvelope = EventEnvelope<
	"message.stream.done",
	{
		chatUid: string;
		messageUid: string;
		requestId: string;
		finalContent: string;
	}
>;

/**
 * 消息流错误
 */
export type MessageStreamErrorEnvelope = EventEnvelope<
	"message.stream.error",
	{
		chatUid: string;
		messageUid: string;
		requestId: string;
		error: string;
	}
>;

/**
 * 会话创建事件
 */
export type ChatCreatedEnvelope = EventEnvelope<
	"chat.created",
	{
		chatUid: string;
		title: string;
		model: string;
		provider: string;
	}
>;

/**
 * 消息创建事件
 */
export type MessageCreatedEnvelope = EventEnvelope<
	"message.created",
	{
		chatUid: string;
		message: Message;
	}
>;

export type ChatUpdateEnvelope =
	| MessageStreamStartEnvelope
	| MessageStreamChunkEnvelope
	| MessageStreamDoneEnvelope
	| MessageStreamErrorEnvelope
	| ChatCreatedEnvelope
	| MessageCreatedEnvelope;
