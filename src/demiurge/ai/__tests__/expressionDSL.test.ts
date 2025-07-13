import Testeranto from "testeranto/src/Node";
import { ExpressionDSLTesterantoSpecification } from "./expressionDSL.test.specification";
import { ExpressionDSLTesterantoImplementation } from "./expressionDSL.test.implementation";
import { ExpressionDSLTesterantoInterface } from "./expressionDSL.test.interface";

export default Testeranto(
  null,
  ExpressionDSLTesterantoSpecification,
  ExpressionDSLTesterantoImplementation,
  ExpressionDSLTesterantoInterface
);
