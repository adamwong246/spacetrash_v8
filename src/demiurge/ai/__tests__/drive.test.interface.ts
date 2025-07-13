import type { ITestInterface, Ibdd_in } from "testeranto/src/CoreTypes";
import { ai } from "../ai";

type I = Ibdd_in<
  null, // IInput
  ai,   // ISubject
  ai,   // IStore 
  ai,   // ISelection
  (initializer?: () => ai) => ai, // IGiven
  (...args: unknown[]) => (aiInstance: ai, tr: unknown, utils: unknown) => Promise<ai>, // IWhen
  (...args: unknown[]) => (aiInstance: ai, utils: unknown) => ai // IThen
>;

export const DriveTesterantoBaseInterface: ITestInterface<I> = {
  beforeEach: async (subject, initializer) => {
    console.log(`[SETUP_DEBUG] Running beforeEach`);
    const instance = initializer();
    console.log(`[SETUP_DEBUG] Instance created:`, instance);
    
    if (!('updateVisualization' in instance)) {
      console.log(`[SETUP_DEBUG] Mocking updateVisualization`);
      instance.updateVisualization = () => {
        console.log(`[VISUALIZATION_DEBUG] Visualization update called`);
      };
    }
    return instance;
  },
  andWhen: async (store, whenCB) => {
    const result = await whenCB(store);
    return Promise.resolve(typeof result === 'function' ? await result(store) : result);
  },
  butThen: async (store, thenCB) => {
    const result = await thenCB(store);
    return Promise.resolve(typeof result === 'function' ? await result(store) : result);
  },
  afterEach: (store) => store,
  afterAll: () => {},
  assertThis: (result: unknown) => {
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
};
