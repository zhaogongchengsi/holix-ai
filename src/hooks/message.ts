import { useEffect, useMemo } from "react";
import { onUpdate } from "@/lib/command";
import useMessage from "@/store/message";

/**
 * 初始化消息 Store
 * 只在应用启动时调用一次
 */
export function useInitMessages() {
	const init = useMessage((state) => state.init);
	const initialized = useMessage((state) => state.initialized);

	useEffect(() => {
		if (!initialized) {
			init();
		}
	}, [init, initialized]);
}

/**
 * 监听消息更新事件
 * 处理来自后端的实时消息推送
 */
export function useMessageUpdates() {
	const addMessage = useMessage((state) => state.addMessage);
	const updateMessage = useMessage((state) => state.updateMessage);

	useEffect(() => {
		// 注册消息创建事件监听
		const unsubscribeCreated = onUpdate("message.created", (payload) => {
			addMessage(payload.chatUid, payload.message);
		});

		// 注册消息流式更新事件监听
		const unsubscribeStreaming = onUpdate("message.streaming", (payload) => {
			updateMessage(payload.chatUid, payload.messageUid, {
				content: payload.content,
				status: "streaming",
			});
		});

		// 注册消息状态更新事件监听
		const unsubscribeUpdated = onUpdate("message.updated", (payload) => {
			updateMessage(payload.chatUid, payload.messageUid, payload.updates);
		});

		// 清理函数
		return () => {
			if (typeof unsubscribeCreated === "function") {
				unsubscribeCreated();
			}
			if (typeof unsubscribeStreaming === "function") {
				unsubscribeStreaming();
			}
			if (typeof unsubscribeUpdated === "function") {
				unsubscribeUpdated();
			}
		};
	}, [addMessage, updateMessage]);
}

// 空数组常量，避免每次都创建新实例
const EMPTY_MESSAGES: never[] = [];

/**
 * 获取指定 chat 的消息
 */
export function useChatMessages(chatUid: string | undefined) {
	// 使用 selector 获取特定 chat 的消息数组
	const messages = useMessage((state) =>
		chatUid ? state.messagesByChatId[chatUid] : undefined
	);
	
	// 使用 useMemo 缓存结果，避免每次返回新数组引用
	return useMemo(() => {
		return messages || EMPTY_MESSAGES;
	}, [messages]);
}

export function useIsMessageLoading() {
	return useMessage((state) => state.isLoading);
}
