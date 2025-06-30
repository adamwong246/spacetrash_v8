// The 1st class. It handles the scenes and rendering

import { ECS, IPerformanceConfig } from "../VECS.ts/ECS.ts";
import { StateSpace } from "./StateSpace";
import { System } from "../VECS.ts/System.ts";
import { IComponentsStores, Store } from "../VECS.ts/types.ts";

export abstract class Game<IComponents> extends ECS<IComponents> {
  stateSpace: StateSpace;

  constructor(
    stateSpace: StateSpace,
    system: System,
    components: IComponentsStores<any, IComponents>,
    config: IPerformanceConfig,

  ) {
    super(system, components, config)
    this.stateSpace = stateSpace;
    this.changeScene = this.changeScene.bind(this);
  }

  async start() {
    await this.stateSpace.getCurrent().boot(this)
    await super.start()
  }

  async changeScene(to: string) {
    console.log("changing scenes from ", this.stateSpace.getCurrent().constructor.name, "to", to);
    if (this.stateSpace.get(to) === this.stateSpace.getCurrent()) throw "why did you change scenes to the same scene?"
    this.stateSpace.setCurrent(to);
    const newScene = this.stateSpace.getCurrent();
    newScene.boot(this);
  }

}
