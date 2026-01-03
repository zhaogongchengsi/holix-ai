import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface CodeBlockProps extends ComponentPropsWithoutRef<"code"> {
  isUser?: boolean;
}

interface PreBlockProps extends ComponentPropsWithoutRef<"pre"> {
  isUser?: boolean;
}

/**
 * 内联代码组件
 */
export function InlineCode({ children, className, isUser, ...props }: CodeBlockProps) {
  const codeClass = isUser ? "bg-primary-foreground/20" : "bg-muted-foreground/20";
  
  return (
    <code className={cn("px-1 py-0.5 rounded font-mono text-xs", codeClass, className)} {...props}>
      {children}
    </code>
  );
}

/**
 * 代码块组件（由 shiki 处理语法高亮）
 */
export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return <code className={className} {...props}>{children}</code>;
}

/**
 * Pre 包装器组件
 */
export function PreBlock({ children, isUser, className, ...props }: PreBlockProps) {
  return (
    <pre
      className={cn(
        "p-3 rounded-lg mb-2 overflow-x-auto text-xs border",
        isUser ? "bg-primary-foreground/10" : "bg-muted/50",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  );
}

/**
 * 用于 ReactMarkdown 的 code 组件
 */
export function MarkdownCode({ isUser }: { isUser: boolean }) {
  return function Code({ children, className, ...props }: ComponentPropsWithoutRef<"code">) {
    // @ts-ignore
    const inline = !String(children).includes("\n");

    // 内联代码
    if (inline) {
      return <InlineCode isUser={isUser} className={className} {...props}>{children}</InlineCode>;
    }

    // 代码块（shiki 已处理语法高亮）
    return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
  };
}

/**
 * 用于 ReactMarkdown 的 pre 组件
 */
export function MarkdownPre({ isUser }: { isUser: boolean }) {
  return function Pre({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) {
    return <PreBlock isUser={isUser} className={className} {...props}>{children}</PreBlock>;
  };
}
