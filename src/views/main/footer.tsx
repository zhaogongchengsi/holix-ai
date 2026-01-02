import { debounce } from "@tanstack/pacer/debouncer";
import { Send } from "lucide-react";
import { useCallback, useState } from "react";
import { Editor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/context/chat";

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

  return (
    <footer className="w-full mt-auto h-(--app-chat-footer-height) border-t py-(--app-chat-input-padding)">
      <div className="h-(--app-chat-input-header-height) border-b px-2">header</div>
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
