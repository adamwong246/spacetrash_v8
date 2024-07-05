import { System } from "../../../engine/ECS";

export class Hackable extends System<unknown> {
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

