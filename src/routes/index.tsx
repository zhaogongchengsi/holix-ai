import { debounce } from "@tanstack/pacer/debouncer";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "@/components/editor/editor";
import { command } from "@/lib/command";
import { Button } from "@/components/ui/button";
import { holixSSE } from "@/lib/sse";

function Index() {
	const [value, setValue] = useState("");

	const onTextChange = useCallback(
		debounce((text: string) => {
			setValue(text);
		}, {
			wait: 300,
		}),
		[],
	);

	const onSend = useCallback(() => {
		if (value.trim().length === 0) {
			return;
		}
		command("chat.start", { context: value })
	}, [value]);

	useEffect(() => {
		console.log("Setting up SSE listener");
		return holixSSE.on("message", (data: any) => {
			console.log("Received message via SSE:", data);
		})
	}, [])

	return (
		<div className="w-full flex justify-center items-center">
			<div className="w-full max-w-2xl p-4">
				<Editor
					placeholder="请输入问题"
					ariaPlaceholder="请输入问题"
					onError={(err) => {
						console.error(`editor:`, err ? err.message : "unknown error");
					}}
					onTextChange={onTextChange}
				/>
				<Button onClick={onSend}>发送</Button>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
