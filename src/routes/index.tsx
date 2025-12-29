import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "@/components/editor/editor";

function Index() {
	return (
		<div className="w-full flex justify-center items-center">
			<div className="w-full max-w-2xl p-4">
				<Editor
					placeholder="请输入问题"
					ariaPlaceholder="请输入问题"
					onError={(err) => {
						console.error(`editor:`, err ? err.message : "unknown error");
					}}
					onChange={(stat) => {
						console.log(stat);
					}}
				/>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});
