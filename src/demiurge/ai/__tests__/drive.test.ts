import Testeranto from "testeranto/src/Node";

import { DriveTesterantoBaseTestImplementation } from "./drive.test.implementation";
import { DriveTesterantoBaseTestSpecification } from "./drive.test.specification";
import { DriveTesterantoBaseInterface } from "./drive.test.interface";

export default Testeranto(
  null,
  DriveTesterantoBaseTestSpecification,
  DriveTesterantoBaseTestImplementation,
  DriveTesterantoBaseInterface
);
