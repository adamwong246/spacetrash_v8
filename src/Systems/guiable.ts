

import { ISpaceTrashSystems } from ".";

import { System } from "../engine/System";

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
