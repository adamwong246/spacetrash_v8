import Component from "../../engine/Component";
import { System } from "../../engine/System";

import { ISpaceTrashSystems } from ".";

export class GUIable extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Record<string, Component<any, any>>): Record<string, Component<any, any>> {
    return {};
  }
  // tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
  //   return components;
  // }
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
