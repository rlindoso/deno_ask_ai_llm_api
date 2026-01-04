import type ILLMProvider from "@shared/container/providers/LLMProvider/models/ILLMProvider.ts";
import { container, LLM_PROVIDER } from "@shared/container/providers/LLMProvider/index.ts";

interface IRequest {
  question: string;
}

interface IResponse {
  response: string;
}

class AskService {
  constructor(
    private llmProvider: ILLMProvider = container.get<ILLMProvider>(LLM_PROVIDER),
  ) {}

  async execute({ question }: IRequest): Promise<IResponse> {
    const response = await this.llmProvider.ask(question); 
    return { response };
  }
}

export default AskService;