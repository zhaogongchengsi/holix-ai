import { onCommand } from "../platform/commands";
import { logger } from "../platform/logger";

export function initChat() {
	// 处理 chat.start 命令
	onCommand("chat.start", async (payload, command) => {
		logger.debug("Starting new chat:", {
			model: payload.model,
			contextLength: payload.context.length,
		});
	});

	// 后续可添加其他命令处理
	// onCommand("chat.message", async (payload, command) => { ... });
	// onCommand("chat.end", async (payload, command) => { ... });
}
