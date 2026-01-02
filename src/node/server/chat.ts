import { HolixProtocolRouter } from "@holix/router";
import { z } from "zod";


const InsetChatZ = z.object({
	  context: z.string().min(1),
	  model: z.string().min(1),
	  title: z.string(),
})

function registerChatRoutes(router: HolixProtocolRouter) {
	// register chat-related routes here
	router.get("/chat/start", async (ctx, next) => {
		const body = ctx.req.json();


	})
}