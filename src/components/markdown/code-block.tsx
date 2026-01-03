import { Check, Copy } from "lucide-react";
import { type ComponentPropsWithoutRef, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends ComponentPropsWithoutRef<"code"> {
	isUser?: boolean;
}

interface PreBlockProps extends ComponentPropsWithoutRef<"pre"> {
	isUser?: boolean;
}

/**
 * 内联代码组件
 */
export function InlineCode({
	children,
	className,
	isUser,
	...props
}: CodeBlockProps) {
	const codeClass = isUser
		? "bg-primary-foreground/20"
		: "bg-muted-foreground/20";

	return (
		<code
			className={cn(
				"px-1 py-0.5 rounded font-mono text-xs",
				codeClass,
				className,
			)}
			{...props}
		>
			{children}
		</code>
	);
}

/**
 * 代码块组件（由 shiki 处理语法高亮）
 */
export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
	return (
		<code className={className} {...props}>
			{children}
		</code>
	);
}

/**
 * Pre 包装器组件（带复制按钮）
 */
export function PreBlock({
	children,
	isUser,
	className,
	...props
}: PreBlockProps) {
	const [copied, setCopied] = useState(false);
	const preRef = useRef<HTMLPreElement>(null);

	const handleCopy = () => {
		// 从 DOM 元素中提取文本内容
		const codeText = preRef.current?.innerText || "";

		navigator.clipboard.writeText(codeText).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<div className="relative group">
			<pre
				ref={preRef}
				className={cn(
					"p-3 rounded-lg mb-2 overflow-x-auto text-xs border",
					isUser ? "bg-primary-foreground/10" : "bg-muted/50",
					className,
				)}
				{...props}
			>
				{children}
			</pre>
			<Button
				variant="ghost"
				size="sm"
				className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-80 hover:opacity-100 transition-opacity"
				onClick={handleCopy}
				title={copied ? "已复制" : "复制代码"}
			>
				{copied ? (
					<Check className="w-3.5 h-3.5 text-green-500" />
				) : (
					<Copy className="w-3.5 h-3.5" />
				)}
			</Button>
		</div>
	);
}

/**
 * 用于 ReactMarkdown 的 code 组件
 */
export function MarkdownCode({ isUser }: { isUser: boolean }) {
	return function Code({
		children,
		className,
		...props
	}: ComponentPropsWithoutRef<"code">) {
		const inline = !String(children).includes("\n");

		// 内联代码
		if (inline) {
			return (
				<InlineCode isUser={isUser} className={className} {...props}>
					{children}
				</InlineCode>
			);
		}

		// 代码块（shiki 已处理语法高亮）
		return (
			<CodeBlock className={className} {...props}>
				{children}
			</CodeBlock>
		);
	};
}

/**
 * 用于 ReactMarkdown 的 pre 组件
 */
export function MarkdownPre({ isUser }: { isUser: boolean }) {
	return function Pre({
		children,
		className,
		...props
	}: ComponentPropsWithoutRef<"pre">) {
		return (
			<PreBlock isUser={isUser} className={className} {...props}>
				{children}
			</PreBlock>
		);
	};
}
