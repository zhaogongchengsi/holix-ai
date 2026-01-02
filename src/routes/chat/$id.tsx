import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { updateConfig } from "@/lib/config";
import useChat from "@/store/chat";

export const Route = createFileRoute("/chat/$id")({
	component: Component,
});

function Component() {
	const { id } = Route.useParams();
	const chat = useChat((state) => state.chats.find((chat) => chat.uid === id));

	useEffect(() => {
		updateConfig("currentChatId", id);
	}, [id]);

	console.log("Chats in $id route:", chat);

	return (
		<div>
			<h1>Chat ID: {id}</h1>
			{JSON.stringify(chat)}
		</div>
	);
}
