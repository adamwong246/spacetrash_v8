import { ITestSpecification } from "testeranto/src/CoreTypes";

import { I, O } from "./expressionDSL.test.types";

export const ExpressionDSLTesterantoSpecification: ITestSpecification<I, O> = 
  (Suite, Given, When, Then, Check) => [
    Suite.Default(
      "Expression Evaluator Tests",
      {
        "Prefix.BasicAddition": Given.Default(
          [],
          [When.EvaluatePrefix("+ 3 4")],
          [Then.Returns(7)]
        ),
        "Prefix.NestedOperations": Given.Default(
          [],
          [When.EvaluatePrefix("* + 3 4 5")],
          [Then.Returns(35)]
        ),
        "Postfix.BasicAddition": Given.Default(
          [],
          [When.EvaluatePostfix("3 4 +")],
          [Then.Returns(7)]
        ),
        "Infix.OperatorPrecedence": Given.Default(
          [],
          [When.EvaluateInfix("3 + 4 * 5")],
          [Then.Returns(23)]
        ),
        "Custom.UnaryOperator": Given.Default(
          [],
          [
            When.RegisterOperator("double", (a: number) => a * 2),
            When.EvaluatePrefix("double 5")
          ],
          [Then.Returns(10)]
        ),
        "Errors.InvalidPrefix": Given.Default(
          [],
          [When.EvaluatePrefix("+ 3")],
          [Then.Throws("Invalid prefix expression")]
        )
      },
      []
    )
  ];
