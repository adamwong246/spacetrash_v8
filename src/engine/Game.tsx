// The 1st class. It handles the scenes and rendering

import { ECS, IPerformanceConfig } from "./VECS.ts/ECS.ts";
import { StateSpace } from "./StateSpace";
import { System } from "./VECS.ts/System.ts";
import { IArchtypesMapping, IComponentsStores, IStores } from "./VECS.ts/types.ts";

// IRenderings is a list of "render strategies"
// for example:
// export type IRenderings = "2d" | "webgl2" | "pixi2d" | "threejs" | null;
export abstract class Game<IRenderings, I> extends ECS {
  stateSpace: StateSpace;

  constructor(
    stateSpace: StateSpace,
    system: System,
    componentStores: IComponentsStores<any>,
    stores: IStores<any>,
    config: IPerformanceConfig,
    archetypeMappings: IArchtypesMapping

  ) {
    super(system, componentStores, stores, config, archetypeMappings)
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
