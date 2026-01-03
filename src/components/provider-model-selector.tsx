import { useCallback, useEffect, useState } from "react";
import { getDefaultProvider, getProviders } from "@/lib/provider";
import type { AIProvider } from "@/types/provider";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export interface ProviderModelSelectorProps {
  onProviderChange?: (provider: string) => void;
  onModelChange?: (model: string) => void;
  className?: string;
}

export default function ProviderModelSelector({ onProviderChange, onModelChange, className }: ProviderModelSelectorProps) {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // 初始化加载供应商和默认值
  useEffect(() => {
    const init = async () => {
      try {
        const [providerList, defaultProviderName] = await Promise.all([getProviders(), getDefaultProvider()]);

        // 只显示已启用的供应商
        const enabledProviders = providerList.filter((p) => p.enabled);
        setProviders(enabledProviders);

        // 确定初始供应商（从配置文件的默认值开始）
        const initialProvider = enabledProviders.find((p) => p.name === defaultProviderName) || enabledProviders[0];

        if (initialProvider) {
          setSelectedProvider(initialProvider.name);

          // 确定初始模型（使用第一个可用模型）
          const availableModels = initialProvider.models || [];
          const initialModel = availableModels[0] || "";

          if (initialModel) {
            setSelectedModel(initialModel);
            onProviderChange?.(initialProvider.name);
            onModelChange?.(initialModel);
          }
        }
      } catch (error) {
        console.error("Failed to load providers:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleProviderChange = useCallback(
    (providerName: string) => {
      setSelectedProvider(providerName);
      onProviderChange?.(providerName);

      // 切换供应商时，自动选择第一个模型
      const provider = providers.find((p) => p.name === providerName);
      if (provider && provider.models && provider.models.length > 0) {
        const firstModel = provider.models[0];
        setSelectedModel(firstModel);
        onModelChange?.(firstModel);
      }
    },
    [providers, onProviderChange, onModelChange],
  );

  const handleModelChange = useCallback(
    (model: string) => {
      setSelectedModel(model);
      onModelChange?.(model);
    },
    [onModelChange],
  );

  const currentProvider = providers.find((p) => p.name === selectedProvider);
  const availableModels = currentProvider?.models || [];

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-10 w-40 bg-muted animate-pulse rounded-md" />
        <div className="h-10 w-56 bg-muted animate-pulse rounded-md" />
      </div>
    );
  }

  if (providers.length === 0) {
    return <div className="text-sm text-muted-foreground">请先在设置中配置 AI 供应商</div>;
  }

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {/* 供应商选择器 */}
      <Select value={selectedProvider} onValueChange={handleProviderChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="选择供应商" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {providers.map((provider) => (
              <SelectItem key={provider.name} value={provider.name}>
                <span className="flex items-center gap-2">
                  <span>{provider.avatar}</span>
                  <span>{provider.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* 模型选择器 */}
      <Select value={selectedModel} onValueChange={handleModelChange} disabled={availableModels.length === 0}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="选择模型" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {availableModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
