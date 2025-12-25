import { createFileRoute } from "@tanstack/react-router";

function Index() {
	return (
		<>
			<div>
				chat
			</div>
		</>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
