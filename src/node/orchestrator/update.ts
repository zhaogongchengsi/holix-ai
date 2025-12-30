import { AsyncBatcher } from "@tanstack/pacer";
import type { EventEnvelope } from "@/types/updates/base";
import { sendChannelMessage } from "../platform/channel";
import { logger } from "../platform/logger";

const batcher = new AsyncBatcher<EventEnvelope>(
	async (items) => {
		sendChannelMessage(items)
	},
	{
		maxSize: 100,
		wait: 100,
		onError: (error, batch) => {
			logger.error("Failed to send update batch:", error, batch);
		},
		asyncRetryerOptions: {
			maxAttempts: 3,
			backoff: 'exponential',
			baseWait: 1000,
			jitter: 0.3
		}
	},
);

export function update(name: string, preload: Record<string, unknown>) {
	batcher.addItem({
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "update",
		name,
		preload,
	});
}