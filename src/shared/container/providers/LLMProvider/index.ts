import { Container } from "@needle-di/core";

import llmConfig from "@config/llm.ts";
import GeminiLLMProvider from "./implementations/GeminiLLMProvider.ts";
import FakeLLMProvider from "./fakes/FakeLLMProvider.ts";
import type ILLMProvider from "./models/ILLMProvider.ts";
import OpenAILLMProvider from "./implementations/OpenAILLMProvider.ts";

export const LLM_PROVIDER = Symbol("LLM_PROVIDER");

const container = new Container();

const providers = {
  gemini: GeminiLLMProvider,
  fake: FakeLLMProvider,
  openai: OpenAILLMProvider,
};

container.bind<ILLMProvider>({
  provide: LLM_PROVIDER,
  useClass: providers[llmConfig.provider],
});

export { container };
