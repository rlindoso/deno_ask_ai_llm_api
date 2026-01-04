import type { Context } from "@hono/hono";
import AskService from "../../../services/AskService.ts";


export default class LLMController {
  async create(context: Context) {
    const { question } = await context.req.json();
    
    const askService = new AskService();
    const response = await askService.execute({ question });

    return context.json(response);
  }
}