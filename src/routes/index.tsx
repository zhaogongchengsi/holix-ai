import { debounce } from "@tanstack/pacer/debouncer";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Editor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import ModuleSelector from "@/components/module-selectr";
import useChat from "@/store/chat";
import { inferProvider } from "@/share/models";

// 从 value 中提取标题：取前面部分内容
const generateTitle = (text: string) => {
  const trimmed = text.trim();
  // 尝试在句号、问号、感叹号或换行符处断开
  const match = trimmed.match(/^(.{1,50}[。？！\n])/);
  if (match) {
    return match[1].replace(/\n/g, " ").trim();
  }
  // 如果没有标点，直接截取前 50 个字符
  return trimmed.length > 50 ? trimmed.substring(0, 50) + "..." : trimmed;
};

function Index() {
  const [value, setValue] = useState("");
  const [model, setModel] = useState<string | undefined>();
  const chat = useChat();

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

  const onSend = useCallback(() => {
    if (value.trim().length === 0) return;
    if (!model) return;
    const provider = inferProvider(model);

    if (!provider) {
      console.error(`Cannot infer provider for model: ${model}`);
      return;
    }

    const title = generateTitle(value);

    chat
      .createChat({ provider, model, title })
      .then((newChat) => {
        if (newChat) {
          console.log("Created new chat:", newChat);
          setValue("");
        }
      })
      .catch((err) => {
        console.error("Failed to create chat:", err);
      });
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
