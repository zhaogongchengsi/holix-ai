import { create } from "zustand";
import type { Chat } from "@/node/database/schema/chat";
import { trpcClient } from "@/lib/trpc-client";

interface ChatStore {
	chats: Chat[];
	isLoading: boolean;
	// 创建新会话
	createChat: (params: { provider: string; model: string; title: string }) => Promise<Chat | null>;
	// 加载所有会话
	loadChats: () => Promise<void>;
	// 添加会话到列表
	addChat: (chat: Chat) => void;
}

const useChat = create<ChatStore>((set) => {
	const chats: Chat[] = []

	return {
		chats: chats,
		isLoading: false,

		createChat: async (params) => {
			try {
				set({ isLoading: true });
				const chat = await trpcClient.chat.create(params);
				
				// 添加到列表并设置为当前会话
				set((state) => ({
					chats: [chat, ...state.chats],
					isLoading: false,
				}));
				
				return chat;
			} catch (error) {
				console.error("Failed to create chat:", error);
				set({ isLoading: false });
				return null;
			}
		},

		loadChats: async () => {
			try {
				set({ isLoading: true });
				const chats = await trpcClient.chat.list();
				set({ chats, isLoading: false });
			} catch (error) {
				console.error("Failed to load chats:", error);
				set({ isLoading: false });
			}
		},

		addChat: (chat) => {
			set((state) => ({
				chats: [chat, ...state.chats],
			}));
		},
	};
});

export default useChat;
