import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { inferProvider } from "@/share/models";

export function createAISession(model: string, config?: {
	apiKey: string;
	baseURL: string;
}) {
	const provider = inferProvider(model);

	if (!provider) {
		throw new Error(`Cannot infer provider for model: ${model}`);
	}

	if (provider === "anthropic") {
		return createAnthropicAdapter(model, config);
	}

	if (provider === "openai") {
		return createOpenAIAdapter(model, config);
	}

	throw new Error(`Unsupported provider: ${provider}`);
}

function createAnthropicAdapter(model: string, config?: { apiKey: string; baseURL: string; }) {
	return new ChatAnthropic({
		modelName: model,
		temperature: 0.7,
		apiKey: config?.apiKey || process.env.ANTHROPIC_API_KEY,
		// 指定 Base URL（用于自定义端点或代理）
		clientOptions: {
			baseURL: config?.baseURL || process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com",
		},
	});
}

function createOpenAIAdapter(model: string, config: { apiKey: string; baseURL: string; } | undefined) {
	return new ChatOpenAI({
		modelName: model,
		temperature: 0.7,
		streaming: true,
		// 指定 API Key
		apiKey: config?.apiKey || process.env.OPENAI_API_KEY,
		// 指定 Base URL（用于自定义端点或代理）
		configuration: {
			baseURL:
				config?.baseURL ||
				process.env.OPENAI_BASE_URL ||
				"https://api.openai.com/v1",
		},
	});
}
