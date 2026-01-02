import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Message } from "@/node/database/schema/chat";
import { Bot, User, Loader2, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useMemo } from "react";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const isError = message.status === "error";
  const isStreaming = message.status === "streaming";
  const isPending = message.status === "pending";

  // 如果是 system 消息，暂时简单展示
  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full gap-3 p-4 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <Avatar className="w-8 h-8 border shrink-0">
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
            <AvatarFallback className="bg-muted text-muted-foreground">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </>
        )}
      </Avatar>

      {/* Content Bubble */}
      <div
        className={cn(
          "relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : "bg-muted/50 text-foreground rounded-tl-none border",
          isError && "border-destructive/50 bg-destructive/10 text-destructive",
          isPending && "opacity-70"
        )}
      >
        {/* Status Indicator for AI */}
        {!isUser && (isStreaming || isPending) && (
          <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-muted-foreground">
            {isStreaming && (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Generating...</span>
              </>
            )}
            {isPending && <span>Thinking...</span>}
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
        <div className={cn("text-sm leading-relaxed break-words")}>
          {message.content ? (
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
                    const inline = !String(children).includes('\n');
                    return inline ? (
                        <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded font-mono text-xs" {...props}>
                            {children}
                        </code>
                    ) : (
                        <pre className="bg-black/10 dark:bg-white/10 p-2 rounded mb-2 overflow-x-auto font-mono text-xs">
                            <code {...props}>{children}</code>
                        </pre>
                    );
                },
                a: ({ children, href }) => <a href={href} className="underline underline-offset-2 hover:text-primary/80" target="_blank" rel="noopener noreferrer">{children}</a>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-primary/50 pl-4 italic mb-2">{children}</blockquote>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
             <span className="italic opacity-50">
               {isStreaming ? "..." : "No content"}
             </span>
          )}
        </div>
        
        {/* Error Message Detail */}
        {isError && message.error && (
            <div className="mt-2 text-xs opacity-80 border-t border-destructive/20 pt-2">
                {message.error}
            </div>
        )}
      </div>
    </div>
  );
}
