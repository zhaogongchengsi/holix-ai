import { createFileRoute } from "@tanstack/react-router";
import useChat from "@/store/chat";

export const Route = createFileRoute("/chat/$id")({
	component: Component,
});

function Component() {
	const { id } = Route.useParams();
	const chat = useChat((state) => state.chats.find((chat) => chat.uid === id));

	console.log("Chats in $id route:", chat);

	return (
		<div>
			<h1>Chat ID: {id}</h1>
			{JSON.stringify(chat)}
		</div>
	);
}
