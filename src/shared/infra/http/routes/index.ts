import { Hono } from "@hono/hono";
import { container, LLM_PROVIDER } from "../../../container/providers/LLMProvider/index.ts";
import type ILLMProvider from "../../../container/providers/LLMProvider/models/ILLMProvider.ts";
import llmRouter from "@modules/llm/infra/http/routes/llm.routes.ts";
const routes = new Hono();

routes.get("/", async (c) => {
  console.log(c);
  const llm = container.get<ILLMProvider>(LLM_PROVIDER);
  const result = await llm.ask("Qual o melhor time do mundo e por que é o Clube Náutico Capibaribe?");
  return c.json({ message: result });
});

routes.route("/llm", llmRouter);

export default routes;