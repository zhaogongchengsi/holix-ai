
import type { Chat } from '@/node/database/schema/chat'
import { create } from 'zustand'

const useChat = create<{
	chats: Chat[]
}>((set) => {
	const chats: Chat[] = [
		{
			id: 1,
			uid: 'chat-1',
			title: 'First Chat',
			createdAt: Date.now(),
			updatedAt: Date.now(),
			lastMessagePreview: 'Hello, this is the first chat!',
			provider: '',
			model: '',
			status: 'active',
			archived: false,
			pinned: false,
			lastSeq: 0,
			pendingMessages: null,
			prompts: [],
			workspace: null
		},
		{
			id: 2,
			uid: 'chat-2',
			title: 'Second Chat',
			createdAt: Date.now(),
			updatedAt: Date.now(),
			lastMessagePreview: 'This is the second chat session.',
			provider: '',
			model: '',
			status: 'active',
			archived: false,
			pinned: false,
			lastSeq: 0,
			pendingMessages: null,
			prompts: [],
			workspace: null
		},
		{
			id: 3,
			uid: 'chat-3',
			title: 'Third Chat',
			createdAt: Date.now(),
			updatedAt: Date.now(),
			lastMessagePreview: 'Welcome to the third chat!',
			provider: '',
			model: '',
			status: 'active',
			archived: false,
			pinned: false,
			lastSeq: 0,
			pendingMessages: null,
			prompts: [],
			workspace: null
		}
	]

	console.log('Initialized chat store with chats:', chats)

	return {
		chats
	}
})

export default useChat