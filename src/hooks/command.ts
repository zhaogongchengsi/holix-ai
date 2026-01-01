import { useCallback } from "react";
import { command } from "@/lib/command";
import type { CommandNames } from "@/types/commands";

export default function useCommand<N extends CommandNames>(name: N) {
	return useCallback(
		<D extends Record<string, unknown>>(
			preload: D,
		) => {
			command(name, preload);
		},
		[name],
	);
}