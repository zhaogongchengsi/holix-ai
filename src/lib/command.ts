import { AsyncBatcher } from "@tanstack/pacer";
import { kyInstance } from "./ky";
import type { Command } from "@/types/commands/base";
import { nanoid } from "nanoid";
import { CommandNames } from "@/types/commands";

const batcher = new AsyncBatcher<Command>(
	async (items) => {
		return await kyInstance.post('command', {json: items})
	},
	{
		maxSize: 100,
		wait: 100,
		onError: (error, batch) => {
			console.error("Failed to send command batch:", error, batch);
		},
		asyncRetryerOptions: {
			maxAttempts: 3,
			backoff: 'exponential',
			baseWait: 1000,
			jitter: 0.3
		}
	},
);

export function command<T extends CommandNames, D extends Record<string, unknown>>(name: T, preload: D) {
	batcher.addItem({
		id: nanoid(),
		timestamp: Date.now(),
		name,
		payload: preload,
	});
}