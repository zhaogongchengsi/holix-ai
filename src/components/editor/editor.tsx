import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useMemo } from "react";
import type { EditorProps } from "./props";

export function Editor(props: EditorProps) {
	const initialConfig = useMemo(
		() => ({
			namespace: props.namespace || "MyEditor",
			theme: Object.assign(
				{
					root: "editor-root w-full border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				},
				props.theme || {},
			),
			onError: props.onError,
		}),
		[props.namespace, props.theme, props.onError],
	);

	return (
		<div className="relative w-full">
			<LexicalComposer initialConfig={initialConfig}>
				<RichTextPlugin
					contentEditable={
						<ContentEditable
							aria-placeholder={props.ariaPlaceholder || ""}
							placeholder={
								<div className="editor-placeholder px-3 py-2 text-base md:text-sm text-muted-foreground select-none absolute top-0 left-0 pointer-events-none">
									{props.placeholder || ""}
								</div>
							}
						/>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<HistoryPlugin />
				<AutoFocusPlugin />
				{props.onChange && <OnChangePlugin onChange={props.onChange} />}
			</LexicalComposer>
		</div>
	);
}
