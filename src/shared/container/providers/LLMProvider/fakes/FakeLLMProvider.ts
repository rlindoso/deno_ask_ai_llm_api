import type ILLMProvider from "../models/ILLMProvider.ts";

export default class FakeLLMProvider implements ILLMProvider {
    ask(question: string): Promise<string> {
        return Promise.resolve(`Fake answer to the question: ${question}`);
    }
}
