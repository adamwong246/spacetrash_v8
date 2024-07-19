import Component from "../../engine/Component";
import { System } from "../../engine/System";

import { ISpaceTrashSystems } from ".";

export class Upgradeable extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Record<string, Component<any, any>>): Record<string, Component<any, any>> {
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

