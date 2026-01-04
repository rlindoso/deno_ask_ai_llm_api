import OpenAI from "openai";
import type ILLMProvider from "../models/ILLMProvider.ts";
import llmConfig from "@config/llm.ts";

export default class OpenAILLMProvider implements ILLMProvider {
  private client: OpenAI;

  constructor() {
    // uses the OPENAI_API_KEY environment variable
    this.client = new OpenAI();
  }

  async ask(question: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: llmConfig.model,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: question },
        ],
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content ?? "";
    } catch (error) {
      return `Error connecting to the API: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }
}
