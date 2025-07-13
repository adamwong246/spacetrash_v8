import { ITestInterface } from "testeranto/src/CoreTypes"

import { ai } from "../ai";
import { IPM } from "testeranto/src/lib/types";
import { I } from "./ai.test";

export const interf: ITestInterface<I> = {
  beforeEach: async (subject: ai, initializer: () => Promise<ai>, testResource?: unknown) => {
    return initializer();
  },
  andWhen: async function (store: ai, whenCB: (...x: unknown[]) => (aiInstance: ai) => ai, testResource: unknown, pm: IPM) {
    return whenCB(store);
  },
  butThen: async (store: ai, thenCB: (aiInstance: ai, utils: IPM) => ai, testResource: ITTestResourceConfiguration, pm: IPM) => {
    return thenCB(store);
  },
  afterEach: async (subject: ai) => {
    return subject;
  },
  afterAll: async (store: ai, pm: IPM) => {
    return true;
  },
  assertThis: (actual: unknown, expected: unknown): boolean => {
    if (actual instanceof ai && expected === undefined) {
      return true;
    }
    if (actual !== expected) {
      throw new Error(`Assertion failed: ${String(actual)} !== ${String(expected)}`);
    }
    return true;
  },
};
export { I };

