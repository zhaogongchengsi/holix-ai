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

	useEffect(() => {
		// 注册消息创建事件监听
		const unsubscribe = onUpdate("message.created", (payload) => {
			addMessage(payload.chatUid, payload.message);
		});

		// 清理函数
		return () => {
			if (typeof unsubscribe === "function") {
				unsubscribe();
			}
		};
	}, [addMessage]);
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
