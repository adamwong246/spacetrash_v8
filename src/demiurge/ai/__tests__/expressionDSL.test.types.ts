import { Ibdd_in, Ibdd_out } from "testeranto/src/CoreTypes";

import { ExpressionEvaluator } from "../expressionDSL";

export type I = Ibdd_in<
  null,
  null,
  ExpressionEvaluator,
  any,
  () => ExpressionEvaluator,
  (eval: ExpressionEvaluator) => any,
  (result: any) => boolean
>;

export type O = Ibdd_out<
  { Default: [string] },
  { Default: [] },
  {
    EvaluatePrefix: [string];
    EvaluatePostfix: [string]; 
    EvaluateInfix: [string];
    RegisterOperator: [string, Function];
  },
  {
    Returns: [any];
    Throws: [string];
  },
  { Default: [] }
>;

export type M = {
  whens: {
    [K in keyof O["whens"]]: (
      ...args: O["whens"][K]
    ) => (eval: ExpressionEvaluator) => any;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...args: O["thens"][K]
    ) => (result: any) => boolean;
  };
};
