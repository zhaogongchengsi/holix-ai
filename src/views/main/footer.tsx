import { debounce } from "@tanstack/pacer/debouncer";
import { Send } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Editor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/context/chat";
import { estimateTokens, formatTokenCount } from "@/share/token";

export default function MainFooter() {
  const [value, setValue] = useState("");
  const { chat } = useChatContext();

  const onTextChange = useCallback(
    debounce(
      (text: string) => {
        setValue(text);
      },
      {
        wait: 300,
      },
    ),
    [],
  );

  const estimatedTokens = useMemo(() => estimateTokens(value), [value]);

  return (
    <footer className="w-full mt-auto h-(--app-chat-footer-height) border-t">
      <div className="h-(--app-chat-input-header-height) border-b px-2 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Token: {formatTokenCount(estimatedTokens)}
        </div>
      </div>
      <div className="h-(--app-chat-input-height) my-(--app-chat-input-gap) px-2">
        <Editor
          placeholder="请输入问题"
          ariaPlaceholder="请输入问题"
          rootClassName="min-h-(--app-chat-input-height)"
          wrapperClassName="h-(--app-chat-input-height)"
          onError={(err) => {
            console.error(`editor:`, err ? err.message : "unknown error");
          }}
          onTextChange={onTextChange}
        />
      </div>

      <div className="flex justify-end items-center h-(--app-chat-input-footer-height) px-2">
        <Button disabled={!chat || value.trim().length === 0}>
          <Send />
          Send
        </Button>
      </div>
    </footer>
  );
}
