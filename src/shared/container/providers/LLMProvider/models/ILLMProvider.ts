export default interface ILLMProvider {
  ask(question: string): Promise<string>;
}