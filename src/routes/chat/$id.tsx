import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/$id")({
	component: Component,
});

function Component() {
	return <div>Chat ID Route</div>;
}