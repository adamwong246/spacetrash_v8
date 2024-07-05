import { IEntitiesComponent, System } from "../../../engine/ECS";
import { Upgradeable } from "./drone";
import { FOV } from "./fov";
import { Hackable } from "./hackable";
import { Physical } from "./physical";
import { ShipPower, ShipDoor, ShipAtmosphere, ShipFluids } from "./ship";

export type ISpaceTrashSystems = `gui` | `physical` | `casting`; // | `upgradeable` | `power` | `atmosphere` | `fluids` | `doors` | `hack`;

// import { IEntitiesComponent, System } from "../engine/ECS";

export class GUIable extends System<unknown> {
  constructor() {
    super()
  }
  doPreLogic(entitiesComponent: IEntitiesComponent): any {
    console.log("gui pre loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("gui loop")
  }
  doPostLogic(logic) {
    console.log("gui post loop")
  }
}

export const SpaceTrashSystems: Record<ISpaceTrashSystems, System<ISpaceTrashSystems>> = {
  gui: new GUIable(),
  physical: new Physical(),
  casting: new FOV(),
  // upgradeable: new Upgradeable(),
  // power: new ShipPower(),
  // doors: new ShipDoor(),
  // atmosphere: new ShipAtmosphere(),
  // fluids: new ShipFluids(),
  // hack: new Hackable(),
};