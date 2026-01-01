import type { HolixProtocolRouter } from "@holix/router";
import type { AIProvider } from "@/types/provider";
import { Store } from "./store";

export interface ProviderData {
	providers: AIProvider[];
}

export class ProviderStore extends Store<ProviderData> {
	constructor() {
		super({
			name: "providers",
			defaultData: {
				providers: [],
			},
			basePath: "providers",
		});
	}

	list(): AIProvider[] {
		return this.get("providers");
	}

	findByName(name: string): AIProvider | null {
		return this.list().find((p) => p.name === name) ?? null;
	}

	async add(provider: AIProvider) {
		const existing = this.findByName(provider.name);
		if (existing) {
			throw new Error(`Provider with name "${provider.name}" already exists`);
		}
		const arr = this.list();
		arr.push(provider);
		await this.set("providers", arr);
		return provider;
	}

	async update(name: string, updates: Partial<AIProvider>) {
		const arr = this.list();
		const idx = arr.findIndex((p) => p.name === name);
		if (idx === -1) return null;
		arr[idx] = { ...arr[idx], ...updates };
		await this.set("providers", arr);
		return arr[idx];
	}

	async remove(name: string) {
		const arr = this.list();
		const next = arr.filter((p) => p.name !== name);
		await this.set("providers", next);
	}

	async toggle(name: string, enabled: boolean) {
		return await this.update(name, { enabled });
	}

	use(router: HolixProtocolRouter) {
		const basePath = `/${this.basePath || this.name}`;

		router.get(basePath, async (ctx) => {
			ctx.json(this.list());
		});

		router.get(`${basePath}/:name`, async (ctx) => {
			const name = (ctx.params && (ctx.params as any).name) ?? null;
			if (!name) return ctx.status(400).json({ error: "missing name" });
			const item = this.findByName(name);
			if (!item) return ctx.status(404).json({ error: "not found" });
			ctx.json(item);
		});

		router.post(basePath, async (ctx) => {
			const body = await ctx.req.json();
			try {
				const created = await this.add(body);
				ctx.json(created);
			} catch (err: any) {
				ctx.status(400).json({ error: err.message });
			}
		});

		router.put(`${basePath}/:name`, async (ctx) => {
			const name = (ctx.params && (ctx.params as any).name) ?? null;
			if (!name) return ctx.status(400).json({ error: "missing name" });
			const body = await ctx.req.json();
			const updated = await this.update(name, body);
			if (!updated) return ctx.status(404).json({ error: "not found" });
			ctx.json(updated);
		});

		router.delete(`${basePath}/:name`, async (ctx) => {
			const name = (ctx.params && (ctx.params as any).name) ?? null;
			if (!name) return ctx.status(400).json({ error: "missing name" });
			await this.remove(name);
			ctx.json({ success: true });
		});

		router.patch(`${basePath}/:name/toggle`, async (ctx) => {
			const name = (ctx.params && (ctx.params as any).name) ?? null;
			if (!name) return ctx.status(400).json({ error: "missing name" });
			const body = await ctx.req.json();
			const updated = await this.toggle(name, body.enabled ?? true);
			if (!updated) return ctx.status(404).json({ error: "not found" });
			ctx.json(updated);
		});
	}
}

export const providerStore = new ProviderStore();
