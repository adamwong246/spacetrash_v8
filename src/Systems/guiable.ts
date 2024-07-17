

import { ISpaceTrashSystems } from ".";
import Component from "../engine/Component";

import { System } from "../engine/System";

export class GUIable extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
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
