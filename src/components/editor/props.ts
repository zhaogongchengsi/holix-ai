import type { EditorState, EditorThemeClasses, LexicalEditor } from "lexical";

export interface EditorProps {
	/** 初始内容 */
	initialContent?: string;

	rootClassName?: string;
	wrapperClassName?: string;

	/** 只读模式 */
	readOnly?: boolean;

	onError: (error: Error, editor: LexicalEditor) => void;

	namespace?: string;

	theme?: EditorThemeClasses;

	placeholder?: string;

	ariaPlaceholder?: string;

	onChange?: (
		editorState: EditorState,
		editor: LexicalEditor,
		tags: Set<string>,
	) => void;

	onTextChange?: (text: string, editor: LexicalEditor) => void;

	textValue?: string;

	/** 键盘事件回调 */
	keyboard?: {
		/** Enter 键按下 */
		onEnter?: (event: KeyboardEvent) => boolean | void;
		/** Shift+Enter 键按下 */
		onShiftEnter?: (event: KeyboardEvent) => boolean | void;
		/** Ctrl+Enter 或 Cmd+Enter 键按下 */
		onCtrlEnter?: (event: KeyboardEvent) => boolean | void;
		/** Escape 键按下 */
		onEscape?: (event: KeyboardEvent) => boolean | void;
		/** 其他键盘事件 */
		onKeyDown?: (event: KeyboardEvent) => boolean | void;
	};
}
