import { ITestInterface } from "testeranto/src/Types";

import { IPM } from "testeranto/src/lib/types";
import { I } from "./ai.test";
import { EmotionSystem } from "../emotion";

export const interf: ITestInterface<I> = {
  beforeEach: async (
    subject: EmotionSystem,
    initializer: () => Promise<EmotionSystem>,
    testResource?: unknown
  ) => {
    return initializer();
  },
  andWhen: async function (
    store: EmotionSystem,
    whenCB: (aiInstance: EmotionSystem) => EmotionSystem,
    testResource?: unknown
  ) {
    console.log(whenCB.toString())
    return whenCB(store);
  },
  butThen: async (
    store: EmotionSystem,
    thenCB: (aiInstance: EmotionSystem) => EmotionSystem,
    testResource?: unknown
  ) => {
    return thenCB(store);
  },
  afterEach: async (subject: EmotionSystem) => {
    return subject;
  },
  afterAll: async (store: EmotionSystem, pm: IPM) => {
    return true;
  },
  assertThis: (actual: unknown, expected: unknown): boolean => {
    if (actual instanceof EmotionSystem && expected === undefined) {
      return true;
    }
    if (actual !== expected) {
      throw new Error(
        `Assertion failed: ${String(actual)} !== ${String(expected)}`
      );
    }
    return true;
  },
};
export { I };
