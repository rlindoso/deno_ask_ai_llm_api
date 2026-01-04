# Deno Ask AI LLM API

A modular, extensible REST API built with **Deno** and **Hono** that provides a unified
interface to interact with multiple Large Language Models (LLMs) such as
**OpenAI**, **Google Gemini**, and **fake/mock providers** for testing.

The project follows **SOLID principles**, **Dependency Inversion**, and a **clean,
feature-oriented architecture** designed for scalability and testability.

---

## Key Features

- Deno + TypeScript (ESM, modern runtime)
- Hono as the HTTP framework (fast and lightweight)
- Dependency Injection using `@needle-di/core`
- Pluggable LLM providers (OpenAI, Gemini, Fake)
- Environment-based configuration
- Clean Architecture / Modular structure
- Easy provider switching via `.env`
- Production-ready project layout

---

## Tech Stack

- **Runtime:** Deno  
- **Language:** TypeScript  
- **HTTP Framework:** Hono  
- **Dependency Injection:** `@needle-di/core`  
- **LLM SDKs:**
  - OpenAI (`npm:openai`)
  - Google Generative AI (`npm:@google/generative-ai`)

---

## Project Structure

```text
src/
├── config/
│   └── llm.ts
│
├── modules/
│   └── llm/
│       ├── infra/
│       │   └── http/
│       │       ├── controllers/
│       │       │   └── LLMController.ts
│       │       └── routes/
│       │           └── llm.routes.ts
│       └── services/
│           └── LLMService.ts
│
├── shared/
│   ├── container/
│   │   ├── providers/
│   │   │   └── LLMProvider/
│   │   │       ├── implementations/
│   │   │       │   ├── GeminiLLMProvider.ts
│   │   │       │   └── OpenAILLMProvider.ts
│   │   │       ├── fakes/
│   │   │       │   └── FakeLLMProvider.ts
│   │   │       ├── models/
│   │   │       │   └── ILLMProvider.ts
│   │   │       └── index.ts
│   │   └── index.ts
│   └── infra/
│       └── http/
│           ├── routes/
│           │   └── index.ts
│           └── server.ts
│
├── deno.json
├── deno.lock
└── .env.example
````

---

## Architecture Overview

The system is organized around the **Dependency Inversion Principle**:

* Controllers depend on services
* Services depend on abstractions (interfaces)
* Concrete LLM implementations are resolved at runtime via DI

### Request Flow

```text
HTTP Request
  → Route
    → Controller
      → Service
        → ILLMProvider (interface)
          → OpenAI / Gemini / Fake implementation
```

All provider decisions are centralized in the DI container.

---

## Environment Configuration

Create a `.env` file based on `.env.example`.

### Example

```env
LLM_PROVIDER=fake
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
LLM_MODEL="gemini-2.5-flash-lite"
```

### Supported `LLM_PROVIDER` values

* `fake`
* `openai`
* `gemini`

---

## Running the Project

### Install dependencies

```bash
deno install
```

### Run in development mode

```bash
deno task dev
```

The server will start at:

```text
http://localhost:8000
```

---

## HTTP API

### POST `/llm/ask`

#### Request Body

```json
{
  "question": "What is Deno?"
}
```

#### Response

```json
{
  "answer": "Deno is a secure JavaScript runtime..."
}
```

---

## Dependency Injection

The project uses **`@needle-di/core`** with explicit providers.

* `ILLMProvider` is defined as an interface
* `OpenAILLMProvider`, `GeminiLLMProvider`, and `FakeLLMProvider` implement it
* The selected provider is resolved using the `LLM_PROVIDER` environment variable

### Benefits

* Easy provider replacement
* Simple testing with fake providers
* Zero framework coupling inside business logic

---

## Testing Strategy

The `FakeLLMProvider` allows:

* Fast unit tests
* No external API calls
* Deterministic responses

Switch providers by setting:

```env
LLM_PROVIDER=fake
```

---

## Design Principles Applied

* SOLID (especially Dependency Inversion)
* Separation of Concerns
* Explicit dependencies
* Configuration over hardcoding
* Runtime-safe abstractions (no decorators)

---

## Why Deno?

* Native TypeScript
* Secure by default
* First-class ESM support
* Built-in tooling (formatter, linter, tasks)
* Seamless npm integration

---

## Future Improvements

* Streaming responses (SSE)
* Request validation (Zod)
* Centralized error handling
* OpenAPI / Swagger documentation
* Authentication middleware
* Rate limiting
* Observability (logs, metrics, tracing)

---

## License

MIT License
