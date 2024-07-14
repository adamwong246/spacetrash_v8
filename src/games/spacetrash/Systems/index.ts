import { System } from "../../../engine/System";

import { FOV } from "./fov";
import { GUIable } from "./guiable";
import { Physical } from "./physical";

export type ISpaceTrashSystems = `gui` | `physical` | `casting`; // | `upgradeable` | `power` | `atmosphere` | `fluids` | `doors` | `hack`;
export const MapSize = 32;
export const TileSize = 10;
export const SpaceTrashSystems: Record<ISpaceTrashSystems, System<ISpaceTrashSystems>> = {
  gui: new GUIable(),
  physical: new Physical(MapSize),
  casting: new FOV(),
};