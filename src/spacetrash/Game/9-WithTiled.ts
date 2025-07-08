// @ts-ignore
import * as tiledProjectImport from "../tiled/*";

import { GameWithTicks } from "./8-WithTicks";

export class SpaceTrash extends GameWithTicks {
  tiledProjectImport = tiledProjectImport;

  uiHooks: any;
}
