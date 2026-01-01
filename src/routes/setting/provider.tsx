import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getProviders } from "@/lib/provider";

export const Route = createFileRoute("/setting/provider")({
	component: RouteComponent,
	loader: async () => {
		const providers = await getProviders();
		return providers;
	},
});

function RouteComponent() {
	const [providers, setProviders] = useState(Route.useLoaderData());

	console.log("Providers data in /setting/provider:", providers);

	return <div>Hello "/setting/provider"!</div>;
}
