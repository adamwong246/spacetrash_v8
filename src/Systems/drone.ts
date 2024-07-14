

import { ISpaceTrashSystems } from ".";
import { System } from "../engine/System";

export class Upgradeable extends System<ISpaceTrashSystems> {
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

