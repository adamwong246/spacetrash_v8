import { System } from "../../../engine/System";

import { ISpaceTrashSystems } from ".";

export class GUIable extends System<ISpaceTrashSystems> {
  constructor() {
    super()
  }
  doPreLogic(entitiesComponent): any {
    // console.log("gui pre loop")
    return {};
  }
  doLogic(prelogic) {
    // console.log("gui loop")
  }
  doPostLogic(logic) {
    // console.log("gui post loop")
  }
}
