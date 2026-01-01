import { debounce } from "@tanstack/pacer/debouncer";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Editor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { command } from "@/lib/command";
import ModuleSelector from "@/components/module-selectr";

function Index() {
  const [value, setValue] = useState("");

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

  const [model, setModel] = useState<string | undefined>();

  const onSend = useCallback(() => {
    if (value.trim().length === 0) return;
    if (!model) return; // require model selection
    command("chat.start", { context: value, model });
  }, [value, model]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-2xl p-4 flex flex-col gap-4">
        <h2 className="text-center font-bold text-xl">Chat with Holix AI</h2>
        <Editor
          placeholder="请输入问题"
          ariaPlaceholder="请输入问题"
          rootClassName="min-h-[100px]"
          onError={(err) => {
            console.error(`editor:`, err ? err.message : "unknown error");
          }}
          onTextChange={onTextChange}
        />

        <div className="flex items-center gap-2">
          <ModuleSelector value={model} onValueChange={(v) => setModel(v)} persistKey="holix:selectedModel" />
          <Button className="ml-auto" onClick={onSend} disabled={!model || value.trim().length === 0}>
            发送
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
