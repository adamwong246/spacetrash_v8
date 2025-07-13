import Testeranto from "testeranto/src/Node";
import type {
  I,
  O,
  M
} from "./Store.test";
import {
  interf,
  spec,
  implementationFactory,
} from "./Store.test";

import { SP_MapStore } from "./SP_MapStore";

export default Testeranto<I, O, M>(
  SP_MapStore.prototype,
  spec,
  implementationFactory(SP_MapStore), 
  interf
);
