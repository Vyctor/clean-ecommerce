export interface Usecase {
  execute: (input: unknown) => Promise<unknown>;
}
