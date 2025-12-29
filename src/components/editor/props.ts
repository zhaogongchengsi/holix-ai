import type { EditorState, EditorThemeClasses, LexicalEditor } from "lexical";
import type { JSX } from "react";

export interface EditorProps {
	/** 初始内容 */
	initialContent?: string;

	/** 只读模式 */
	readOnly?: boolean;

	onError: (error: Error, editor: LexicalEditor) => void;

	namespace?: string;

	theme?: EditorThemeClasses;

	placeholder?: string;

	ariaPlaceholder?: string

	onChange?: (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void
}
