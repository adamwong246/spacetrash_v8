import { System } from "../../engine/System";

import { FOV } from "./fov";
import { GUIable } from "./guiable";
import { Physical } from "./physical";

export type ISpaceTrashSystems = `physical` | 'casting';  //| `physical` | `casting`; // | `upgradeable` | `power` | `atmosphere` | `fluids` | `doors` | `hack`;
export const MapSize = 32;
export const TileSize = 10;
export const SpaceTrashSystems = {
  // gui: new GUIable(),
  physical: new Physical(MapSize),
  casting: new FOV(),
};