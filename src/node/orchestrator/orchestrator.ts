import { CommandBatch } from "@/types/commands";
import { HolixProtocolRouter } from "@holix/router";
import { update } from "./update";

export function orchestrate(router: HolixProtocolRouter) {
	router.post("/command", async (ctx, next) => {
		const commands: CommandBatch = await ctx.req.json();
		console.log("Received command batch:", commands);
		ctx.status(200).json({ success: true });

		// Here you can add orchestration logic based on the commands received
		// For example, you might want to route commands to different services
		// or trigger specific workflows based on command types.	
		console.log("Orchestrating commands...");

		update("commands.received", { count: commands.length })

		await next();
	})
}