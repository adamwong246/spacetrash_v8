import { ITestInterface } from "testeranto/src/CoreTypes"
  ;
import { ExpressionEvaluator } from "../expressionDSL";
import { IPM } from "testeranto/src/lib/types";
import { Ibdd_in } from "testeranto/src/CoreTypes";

type I = Ibdd_in<
  null,
  null,
  ExpressionEvaluator,
  any, // iselection
  () => ExpressionEvaluator,
  (eval: ExpressionEvaluator, utils: IPM) => any,
  (result: any, utils: IPM) => boolean
>;

export const ExpressionDSLTesterantoInterface: ITestInterface<I> = {
  beforeEach: async (subject, initializer) => {
    return initializer();
  },
  andWhen: async (store, whenCB, testResource, pm) => {
    return whenCB(store, pm);
  },
  butThen: async (store, thenCB, testResource, pm) => {
    return thenCB(store, pm);
  },
  afterEach: () => {},
  afterAll: () => {},
  assertThis: (thenResult) => thenResult,
};
