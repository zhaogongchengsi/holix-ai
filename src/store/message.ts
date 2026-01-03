import { create } from "zustand";
import { trpcClient } from "@/lib/trpc-client";
import type { Message } from "@/node/database/schema/chat";

/**
 * 按 seq 字段排序消息
 * @param messages - 消息数组
 * @param order - 排序方式，'asc' 为升序，'desc' 为降序
 * @returns 排序后的消息数组
 */
export function sortMessagesBySeq(
	messages: Message[],
	order: "asc" | "desc" = "asc",
): Message[] {
	return [...messages].sort((a, b) => {
		if (order === "asc") {
			return a.seq - b.seq;
		}
		return b.seq - a.seq;
	});
}

interface MessageStore {
	// 使用对象而不是 Map，便于 React 追踪变化
	messagesByChatId: Record<string, Message[]>;
	isLoading: boolean;
	initialized: boolean;
	// 初始化所有消息
	init: () => Promise<void>;
	// 加载指定会话的消息
	loadMessages: (chatUid: string) => Promise<void>;
	// 添加消息到指定会话
	addMessage: (chatUid: string, message: Message) => void;
	// 批量添加消息
	addMessages: (chatUid: string, messages: Message[]) => void;
}

const useMessage = create<MessageStore>((set, get) => {
	return {
		messagesByChatId: {},
		isLoading: false,
		initialized: false,

		init: async () => {
			if (get().initialized) return;
			
			try {
				set({ isLoading: true });
				const chats = await trpcClient.chat.list();
				const messagesByChatId: Record<string, Message[]> = {};
				
				await Promise.all(
					chats.map(async (chat) => {
						const msgs = await trpcClient.message.getByChatUid({
							chatUid: chat.uid,
							limit: 200,
							order: "asc",
						});
						messagesByChatId[chat.uid] = sortMessagesBySeq(msgs, "asc");
					})
				);
				
				set({ messagesByChatId, isLoading: false, initialized: true });
			} catch (error) {
				console.error("Failed to load messages:", error);
				set({ isLoading: false });
			}
		},

		loadMessages: async (chatUid: string) => {
			try {
				set({ isLoading: true });
				const msgs = await trpcClient.message.getByChatUid({
					chatUid,
					limit: 200,
					order: "asc",
				});
				
				const sortedMessages = sortMessagesBySeq(msgs, "asc");
				
				set((state) => ({
					messagesByChatId: {
						...state.messagesByChatId,
						[chatUid]: sortedMessages,
					},
					isLoading: false,
				}));
			} catch (error) {
				console.error("Failed to load messages:", error);
				set({ isLoading: false });
			}
		},

		addMessage: (chatUid: string, message: Message) => {
			set((state) => {
				const currentMessages = state.messagesByChatId[chatUid] || [];
				// 检查消息是否已存在，避免重复添加
				if (currentMessages.some(m => m.uid === message.uid)) {
					return state;
				}
				
				const updatedMessages = [...currentMessages, message];
				
				return {
					messagesByChatId: {
						...state.messagesByChatId,
						[chatUid]: sortMessagesBySeq(updatedMessages, "asc"),
					},
				};
			});
		},

		addMessages: (chatUid: string, messages: Message[]) => {
			set((state) => {
				const currentMessages = state.messagesByChatId[chatUid] || [];
				const currentUids = new Set(currentMessages.map(m => m.uid));
				
				// 只添加不存在的消息
				const newMessages = messages.filter(m => !currentUids.has(m.uid));
				if (newMessages.length === 0) {
					return state;
				}
				
				const updatedMessages = [...currentMessages, ...newMessages];
				
				return {
					messagesByChatId: {
						...state.messagesByChatId,
						[chatUid]: sortMessagesBySeq(updatedMessages, "asc"),
					},
				};
			});
		},
	};
});

export default useMessage;
