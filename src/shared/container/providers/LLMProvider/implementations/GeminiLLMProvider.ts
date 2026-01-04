import { GoogleGenerativeAI } from "@google/generative-ai";
import type ILLMProvider from "../models/ILLMProvider.ts";
import llmConfig from "@config/llm.ts";

export default class GeminiLLMProvider implements ILLMProvider {
  private client: GoogleGenerativeAI;

  constructor() {
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }

    this.client = new GoogleGenerativeAI(apiKey);
  }

  async ask(question: string): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({
        model: llmConfig.model,
      });

      const result = await model.generateContent(question);

      return result.response.text();
    } catch (error) {
      return `Error connecting to the API: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
}
