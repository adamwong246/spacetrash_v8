import { ISpaceTrashApps } from "../spacetrash/UI";

import { ECS } from "./ECS";
import { StateSpace } from "./StateSpace";
import { System } from "./System";
import { IComponentsStores, IStores } from "./types";

export const FPS = 10;

const Debug = {
  PerformanceLogging: false,
};

export abstract class Game<IRenderings> {
  state: StateSpace;

  canvasContexts: Record<
    ISpaceTrashApps | any,
    {
      run: boolean;
      canvas?: HTMLCanvasElement;
      callback?: (a: any) => void;
      canvasContext?: IRenderings;
      parentComponent?: HTMLElement;
    }
  >;
  ecs: ECS;
  renderings: Set<IRenderings>;

  constructor(
    state: StateSpace,
    system: System,
    componentStore: IComponentsStores<any>,
    stores: IStores<any>,
    renderings: Set<IRenderings>
  ) {
    this.state = state;
    this.ecs = new ECS(system, componentStore, stores);
    this.canvasContexts = {};
    this.changeScene = this.changeScene.bind(this);
    this.renderings = renderings;
  }

  changeScene(to: string) {
    this.state.setCurrent(to);
    const newScene = this.state.getCurrent();
    newScene.boot(this.ecs);
  }

  register(
    key: ISpaceTrashApps,
    run: boolean,
    canvas?: HTMLCanvasElement,
    callback?: (data: any) => void,
    canvasContext?: IRenderings,
    parentComponent?: HTMLElement,

  ) {
    if ((canvasContext === undefined) !== (canvasContext === undefined)) {
      throw `you must pass both canvas and context, or neither. canvas, canvasContext: ${canvas}, ${canvasContext}`;
    }

    if (canvasContext !== undefined && !this.renderings.has(canvasContext)) {
      throw `you passed an illegal context: ${canvasContext}. I expected ${this.renderings.entries}`;
    }

    this.canvasContexts[key] = {
      run,
      canvas,
      callback,
      canvasContext,
      parentComponent
    };
    this.canvasContexts[key].callback &&
      this.canvasContexts[key].callback(false);
  }

  async start() {
    // var fps = FPS;
    let then = performance.now();
    const interval = 1000 / FPS;
    let delta = 0;

    // run the logic loop as fast as possible
    let d;
    let p = performance.now();
    const repeatedFunction = async () => {
      d = performance.now();
      const timeDelta = d - p;
      await this.ecs.tick(timeDelta);
      if (Debug.PerformanceLogging) {
        console.debug("ECS tick time delta", timeDelta);
      }
      p = d;
    };

    setInterval(repeatedFunction, 1);

    // run the render loop at FPS
    while (true) {
      let now = await new Promise(requestAnimationFrame);
      if (now - then < interval - delta) {
        continue;
      }
      delta = Math.min(interval, delta + now - then - interval);
      then = now;

      if (Debug.PerformanceLogging) {
        console.debug("Draw time delta, total", delta);
      }

      for (const canvaskey in this.canvasContexts) {
        let p;
        if (Debug.PerformanceLogging) {
          p = performance.now();
        }

        await this.drawAll(canvaskey);

        if (Debug.PerformanceLogging) {
          let d = performance.now();
          console.debug("Draw time delta for canvas", canvaskey, d - p);
        }
      }
    }
  }

  drawAll(key: string): Promise<any> {
    const s = this.state.get(this.state.currrent);
    const canvas = this.canvasContexts[key].canvas;
    const clbk = this.canvasContexts[key].callback;
    const drawOps: ((canvas: any) => Promise<any>)[] = s.draw(
      key,
      clbk || (() => {}),
      this.ecs
    );

    return Promise.all(
      drawOps.map(async (d) => {
        if (canvas === null) {
          console.error(this.canvasContexts[key].toString())
          throw `could not find a mapping of ${canvas} to ${key}`;
        }

        await d(canvas);
      })
    );
  }

  // abstract drawSurface(canvas: HTMLCanvasElement | undefined, key: string, parent?: HTMLElement);

  inputEvent(event: Event | string, appKey: string) {
    this.state.getCurrent().inputEvent(event, appKey, this.ecs);
  }
}
