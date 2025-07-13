import { ITestImplementation } from "testeranto/src/CoreTypes";

import { ExpressionEvaluator } from "../expressionDSL";
import { I, O, M } from "./expressionDSL.test.types";

export const ExpressionDSLTesterantoImplementation: ITestImplementation<I, O, M> = {
  suites: {
    Default: "Expression Evaluator Test Suite"
  },

  givens: {
    Default: () => new ExpressionEvaluator()
  },

  whens: {
    EvaluatePrefix: (expr: string) => (eval: ExpressionEvaluator) => 
      eval.evaluatePrefix(expr),
    EvaluatePostfix: (expr: string) => (eval: ExpressionEvaluator) =>
      eval.evaluatePostfix(expr),
    EvaluateInfix: (expr: string) => (eval: ExpressionEvaluator) =>
      eval.evaluateInfix(expr),
    RegisterOperator: (op: string, fn: Function) => (eval: ExpressionEvaluator) => {
      eval.registerOperator(op, fn);
      return eval;
    }
  },

  thens: {
    Returns: (expected: any) => (actual: any) => actual === expected,
    Throws: (expectedMsg: string) => (fn: Function) => {
      try {
        fn();
        return false;
      } catch (e) {
        return e.message.includes(expectedMsg);
      }
    }
  },

  checks: {
    Default: () => new ExpressionEvaluator()
  }
};
