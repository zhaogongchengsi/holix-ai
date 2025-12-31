import type { HolixProtocolRouter } from "@holix/router";
import type { CommandBatch } from "@/types/commands";
import { update } from "../platform/update";

export function orchestrate(router: HolixProtocolRouter) {
	router.post("/command", async (ctx, next) => {
		const commands: CommandBatch = await ctx.req.json();
		ctx.status(200).json({ success: true });
		update("commands.received", { count: commands.length });
		await next();
	});
}
