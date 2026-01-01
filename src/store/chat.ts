import { create } from "zustand";
import type { Chat } from "@/node/database/schema/chat";

const useChat = create<{
	chats: Chat[];
}>((set) => {
	const chats: Chat[] = [];

	return {
		chats,
	};
});

export default useChat;
