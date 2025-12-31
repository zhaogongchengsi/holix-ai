import { AsyncBatcher } from "@tanstack/pacer";
import { nanoid } from "nanoid";
import type { CommandNames } from "@/types/commands";
import type { Command } from "@/types/commands/base";
import type { Update, UpdateNames } from "@/types/updates";
import { kyInstance } from "./ky";
import { holixSSE } from "./sse";

const onUpdateMap = new Map<string, Set<Function>>();

const batcher = new AsyncBatcher<Command>(
	async (items) => {
		return await kyInstance.post("command", { json: items });
	},
	{
		maxSize: 100,
		wait: 100,
		onError: (error, batch) => {
			console.error("Failed to send command batch:", error, batch);
		},
		asyncRetryerOptions: {
			maxAttempts: 3,
			backoff: "exponential",
			baseWait: 1000,
			jitter: 0.3,
		},
	},
);

export function command<
	T extends CommandNames,
	D extends Record<string, unknown>,
>(name: T, preload: D) {
	batcher.addItem({
		id: nanoid(),
		timestamp: Date.now(),
		name,
		payload: preload,
	});
}

const commandKeys = new Set<string>([
	"id",
	"timestamp",
	"name",
	"payload",
	"type",
]);

holixSSE.on("message", (data: unknown) => {
	if (typeof data === "object" && Array.isArray(data)) {
		for (const command of data as Command[]) {
			if (
				typeof command === "object" &&
				Object.keys(command).every((key) => commandKeys.has(key))
			) {
				const handlers = onUpdateMap.get(command.name);
				if (handlers) {
					for (const h of handlers) {
						try {
							// first arg: payload, second arg: full command
							(h as any)(command.payload, command as any);
						} catch (err) {
							console.error("onUpdate handler error:", err);
						}
					}
				}
			}
		}
	}
});

export function onUpdate<N extends UpdateNames>(
	name: N,
	fn: (
		payload: Extract<Update, { name: N }>["payload"],
		command: Extract<Update, { name: N }>,
	) => void,
) {
	const key = name as string;
	const set = onUpdateMap.get(key) ?? new Set<Function>();
	set.add(fn as unknown as Function);
	onUpdateMap.set(key, set);
	return () => set.delete(fn as unknown as Function);
}
