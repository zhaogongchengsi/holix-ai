import type { EditorState, EditorThemeClasses, LexicalEditor } from "lexical";

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

	onTextChange?: (text: string, editor: LexicalEditor) => void
}
