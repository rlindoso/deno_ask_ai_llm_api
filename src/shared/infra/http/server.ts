import "@std/dotenv/load";
import { Hono } from "@hono/hono";
import routes from './routes/index.ts';

const app = new Hono();

app.route("/", routes);

Deno.serve({ port: 8000 }, app.fetch);
