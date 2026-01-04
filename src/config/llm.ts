interface ILLMConfig {
  provider: 'openai' | 'gemini' | 'fake';
  model: string
}

export default {
  provider: Deno.env.get("LLM_PROVIDER") || 'fake',
  model: Deno.env.get("LLM_MODEL") || 'gpt-5-nano',
} as ILLMConfig;
