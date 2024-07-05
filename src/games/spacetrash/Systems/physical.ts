import { IEntitiesComponent, System } from "../../../engine/ECS";

export class Physical extends System<unknown> {
  constructor() {
    super()
  }
  doPreLogic(entitiesComponent: IEntitiesComponent): any {
    // console.log("physics pre loop")
    return {};
  }
  doLogic(prelogic) {
    // console.log("physics loop")
  }
  doPostLogic(logic) {
    // console.log("physics post loop")
  }
}