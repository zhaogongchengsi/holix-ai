import { debounce } from "@tanstack/pacer/debouncer";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { Editor } from "@/components/editor/editor";

function Index() {
	const onTextChange = useCallback(
		debounce((text: string) => {
			console.log("Debounced action executed", text);
		}, {
			wait: 300,
		}),
		[],
	);

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
			</div>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
