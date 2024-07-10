import { System } from "../../../engine/System";

import { ISpaceTrashSystems } from ".";

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

