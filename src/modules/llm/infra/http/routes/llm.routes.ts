import { Hono } from "@hono/hono";
import LLMController from "../controllers/LLMController.ts";

const llmRouter = new Hono();
const controller = new LLMController();

llmRouter.post("/ask", controller.create);

export default llmRouter;