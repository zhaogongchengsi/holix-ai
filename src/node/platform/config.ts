import type { HolixProtocolRouter } from "@holix/router";
import { Store } from "./store";

export interface ConfigData {
	window: {
		width: number;
		height: number;
	};
	theme: string;
}

export class Config extends Store<ConfigData> {
	constructor() {
		super({
			name: "config",
			defaultData: {
				window: {
					width: 1280,
					height: 800,
				},
				theme: "system",
			},
		});
	}
}

export const configStore = new Config();

export function configRegisterRouter(router: HolixProtocolRouter) {
	router.get("/config", async (ctx) => {
		ctx.json(configStore.getStore().data);
	});

	router.post("/config", async (ctx) => {
		const reqBody = await ctx.req.json();
		for (const key in reqBody) {
			if (key in configStore.getStore().data) {
				await configStore.set(key as keyof ConfigData, reqBody[key]);
			}
		}
		ctx.json({ success: true });
	});
}
