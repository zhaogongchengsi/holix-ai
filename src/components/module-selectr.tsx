import { OPENAI_CHAT_MODELS, ANTHROPIC_MODELS, GEMINI_MODELS, OLLAMA_MODELS } from "@/share/models";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export default function ModuleSelector() {
  const [model, setModel] = useState<string | undefined>(() => {
    try {
      return localStorage.getItem("holix:selectedModel") ?? undefined;
    } catch {
      return undefined;
    }
  });

  useEffect(() => {
    try {
      if (model) localStorage.setItem("holix:selectedModel", model);
    } catch {}
  }, [model]);

  return (
    <Select value={model} onValueChange={(v) => setModel(v)}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="选择模型" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Open AI</SelectLabel>
          {OPENAI_CHAT_MODELS.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Gemini AI</SelectLabel>
          {GEMINI_MODELS.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Anthropic AI</SelectLabel>
          {ANTHROPIC_MODELS.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Ollama AI</SelectLabel>
          {OLLAMA_MODELS.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
