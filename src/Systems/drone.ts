

import { ISpaceTrashSystems } from ".";
import Component from "../engine/Component";
import { System } from "../engine/System";

export class Upgradeable extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
  constructor() {
    super()
  }
  doPreLogic() {
    console.log("Casting loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("Casting loop")
  }
  doPostLogic(logic) {
    console.log("Casting loop")
  }
}

