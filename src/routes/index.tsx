import { debounce } from "@tanstack/pacer/debouncer";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { command } from "@/lib/command";
import { holixSSE } from "@/lib/sse";

function Index() {
	const [value, setValue] = useState("");

	const onTextChange = useCallback(
		debounce(
			(text: string) => {
				setValue(text);
			},
			{
				wait: 300,
			},
		),
		[],
	);

	const onSend = useCallback(() => {
		if (value.trim().length === 0) {
			return;
		}
		command("chat.start", { context: value });
	}, [value]);

	return (
		<div className="w-full flex justify-center items-center">
			<div className="w-full max-w-2xl p-4 flex flex-col gap-4">
				<h2 className="text-center font-bold text-xl">Chat with Holix AI</h2>
				<Editor
					placeholder="请输入问题"
					ariaPlaceholder="请输入问题"
					rootClassName="min-h-[100px]"
					onError={(err) => {
						console.error(`editor:`, err ? err.message : "unknown error");
					}}
					onTextChange={onTextChange}
				/>
				<Button className="ml-auto" onClick={onSend}>
					发送
				</Button>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
