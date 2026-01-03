import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Message } from "@/node/database/schema/chat";
import { Bot, User, Loader2, AlertCircle, Brain, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { formatWithLocalTZ } from "@/lib/time";
import { useMemo } from "react";

interface MessageItemProps {
  message: Message;
  index: number;
}

export function MessageItem({ message, index }: MessageItemProps) {
  console.log("Rendering MessageItem:", { index, message });

  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const isError = message.status === "error";
  const isStreaming = message.status === "streaming";
  const isPending = message.status === "pending";

  // 如果是 system 消息，暂时简单展示
  if (isSystem) {
    return (
      <div className="flex justify-center my-4" data-message-index={index}>
        <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {message.content}
        </div>
      </div>
    );
  }

  const content = useMemo(() => {
    if (message.error) {
      return message.content || "";
    }

    if (message.draftContent) {
      return message.draftContent
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((segment) => segment.content)
        .join("");
    }

    return message.content || "";
  }, [message.content, message.error, message.draftContent]);

  return (
    <div
      className={cn("flex w-full gap-3 p-4 group", isUser ? "flex-row-reverse" : "flex-row")}
      data-message-index={index}
    >
      {/* Avatar */}
      <Avatar className="w-8 h-8 border shrink-0 shadow-sm">
        {isUser ? (
          <>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="" />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </>
        )}
      </Avatar>

      {/* Content Bubble */}
      <div
        className={cn(
          "relative max-w-[85%] min-w-20 rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : "bg-secondary text-secondary-foreground rounded-tl-none border border-border/50",
          isError && "border-destructive/50 bg-destructive/10 text-destructive",
          isPending && "opacity-90",
        )}
      >
        {/* Status Indicator for AI */}
        {!isUser && (isStreaming || isPending) && (
          <div className="absolute -bottom-6 left-0 flex items-center gap-1.5 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border shadow-sm">
            {isStreaming ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-primary" />
                <span className="font-medium">Generating...</span>
              </>
            ) : (
              <>
                <Brain className="w-3 h-3 animate-pulse text-primary" />
                <span className="font-medium">Thinking...</span>
              </>
            )}
          </div>
        )}

        {/* Error Indicator */}
        {isError && (
          <div className="flex items-center gap-2 mb-2 text-destructive font-medium">
            <AlertCircle className="w-4 h-4" />
            <span>Error</span>
          </div>
        )}

        {/* Message Content */}
        <div className={cn("text-sm leading-relaxed wrap-break-word")}>
          {content ? (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 last:mb-0">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 last:mb-0">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
                code: ({ children, className, ...props }) => {
                  // @ts-ignore
                  const inline = !String(children).includes("\n");
                  const codeClass = isUser ? "bg-primary-foreground/20" : "bg-muted-foreground/20";

                  return inline ? (
                    <code className={cn("px-1 py-0.5 rounded font-mono text-xs", codeClass)} {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className={cn("p-2 rounded mb-2 overflow-x-auto font-mono text-xs", codeClass)}>
                      <code {...props}>{children}</code>
                    </pre>
                  );
                },
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="underline underline-offset-2 hover:opacity-80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    className={cn(
                      "border-l-2 pl-4 italic mb-2",
                      isUser ? "border-primary-foreground/50" : "border-primary/50",
                    )}
                  >
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <span className="italic opacity-50">{isStreaming ? "..." : "No content"}</span>
          )}
        </div>

        {/* Error Message Detail */}
        {isError && message.error && (
          <div className="mt-2 text-xs opacity-80 border-t border-destructive/20 pt-2">{message.error}</div>
        )}

        {/* Time */}
        <div className={cn("flex items-center gap-1 mt-1 select-none", isUser ? "justify-end" : "justify-start")}>
          <span className="text-[10px] opacity-40">{formatWithLocalTZ(message.createdAt, "HH:mm")}</span>
        </div>
      </div>
    </div>
  );
}
