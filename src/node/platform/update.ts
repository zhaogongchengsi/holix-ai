import { AsyncBatcher } from "@tanstack/pacer";
import { nanoid } from "nanoid";
import type { EventEnvelope } from "@/types/updates/base";
import { sendChannelMessage } from "./channel";
import { logger } from "./logger";

const batcher = new AsyncBatcher<EventEnvelope>(
	async (items) => {
		sendChannelMessage(items);
	},
	{
		maxSize: 100,
		wait: 100,
		onError: (error, batch) => {
			logger.error("Failed to send update batch:", error, batch);
		},
		asyncRetryerOptions: {
			maxAttempts: 3,
			backoff: "exponential",
			baseWait: 1000,
			jitter: 0.3,
		},
	},
);

export function update(name: string, payload: Record<string, unknown>) {
	batcher.addItem({
		id: nanoid(),
		timestamp: Date.now(),
		type: "update",
		name,
		payload,
	});
}
