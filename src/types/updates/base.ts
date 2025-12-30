export type EventEnvelope<
	N = string | symbol,
	T extends Record<string, unknown> = Record<string, unknown>,
> = {
	id: string;
	timestamp: number;
	type: "update";
	name: N;
	preload: T;
};
