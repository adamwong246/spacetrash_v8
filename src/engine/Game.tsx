// The 1st class. It handles the scenes and rendering

import { ECS } from "./VECS.ts/ECS.ts";
import { StateSpace } from "./StateSpace";
import { System } from "./VECS.ts/System.ts";
import { IComponentsStores, IStores } from "./VECS.ts/types.ts";

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
    config: {
      fps: number,
      performanceLogging: boolean
    }

  ) {
    super(system, componentStores, stores, config)
    this.stateSpace = stateSpace;
    this.changeScene = this.changeScene.bind(this);
  }

  async start() {
    this.stateSpace.getCurrent().boot(this)
    super.start()
  }

  changeScene(to: string) {
    console.log("changing scenes from ", this.stateSpace.getCurrent().constructor.name, "to", to);
    if (this.stateSpace.get(to) === this.stateSpace.getCurrent()) throw "why did you change scenes to the same scene?"
    this.stateSpace.setCurrent(to);
    const newScene = this.stateSpace.getCurrent();
    newScene.boot(this);
  }

}
