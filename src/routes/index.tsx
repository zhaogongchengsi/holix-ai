import { createFileRoute } from "@tanstack/react-router";


function Index () {
	return <div className="p-4">Welcome to Holix AI!</div>
}

export const Route = createFileRoute("/")({
  component: Index,
});