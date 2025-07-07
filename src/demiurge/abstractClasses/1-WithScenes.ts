import { StateSpace } from "../game/StateSpace";
import { IPerformanceConfig } from "../VECS.ts/ECS";
import { ECSWithSystem } from "./0-WithSystem";

export abstract class GameWithScenes extends ECSWithSystem {

  abstract stateSpace: StateSpace;

  constructor(
    config: IPerformanceConfig,

  ) {
    super(config)
    this.changeScene = this.changeScene.bind(this);
  }

  async start(...a) {
    await this.stateSpace.getCurrent().boot(this)
  }

  async changeScene(to: string) {
    console.log("changing scenes from ", this.stateSpace.getCurrent().constructor.name, "to", to);
    if (this.stateSpace.get(to) === this.stateSpace.getCurrent()) throw "why did you change scenes to the same scene?"
    this.stateSpace.setCurrent(to);
    const newScene = this.stateSpace.getCurrent();
    newScene.boot(this);
  }

}