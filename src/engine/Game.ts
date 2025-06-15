import * as THREE from "three";

import { ECS } from "./ECS";
import { StateSpace } from "./StateSpace";
import { System } from "./System";
import { IComponentsStores, IStores } from "./types";

export class Game {
  state: StateSpace;

  canvasContexts: Record<
    string,
    {
      run: boolean;
      canvas?: OffscreenCanvas;
      drawSurface?:
        | THREE.WebGLRenderer
        | OffscreenCanvasRenderingContext2D
        | undefined;
      callback?: (a: any) => void;
      canvasContext: "2d" | "webgl2";
    }
  >;
  ecs: ECS;

  constructor(
    state: StateSpace,
    system: System,
    componentStore: IComponentsStores<any>,
    stores: IStores<any>,
    // postMessage: (
    //   message: any,
    //   options?: WindowPostMessageOptions | undefined
    // ) => void
  ) {
    this.state = state;

    this.ecs = new ECS(system, componentStore, stores);

    // this.postMessage = postMessage;
    this.canvasContexts = {};
    this.changeScene = this.changeScene.bind(this);
  }

  // postMessage: (
  //   message: any,
  //   options?: WindowPostMessageOptions | undefined
  // ) => void;

  changeScene(to: string) {
    this.state.setCurrent(to);
    const newScene = this.state.getCurrent();
    newScene.boot(this.ecs);
  }

  register(
    key: string,
    run: boolean,
    canvas?: OffscreenCanvas,
    callback?: (data: any) => void,
    canvasContext?: "2d" | "webgl2"
  ) {
    if ((canvasContext === undefined) !== (canvasContext === undefined)) {
      throw `you must pass both canvas and context, or neither. ctx, canvasContext: ${canvasContext}, ${canvasContext}`;
    }

    if (
      canvasContext !== "2d" &&
      canvasContext !== "webgl2" &&
      canvasContext !== undefined
    ) {
      throw `you passed an illegal context: ${canvasContext}`;
    }

    let drawSurface:
      | THREE.WebGLRenderer
      | OffscreenCanvasRenderingContext2D
      | undefined;

    if (canvasContext === "2d") {
      drawSurface = canvas?.getContext("2d", {
        alpha: false,
      }) as OffscreenCanvasRenderingContext2D;
    } else if (canvasContext === "webgl2") {
      const d = canvas?.getContext("webgl2") as WebGL2RenderingContext;

      drawSurface = new THREE.WebGLRenderer({
        canvas: d.canvas,
        context: d,
        antialias: true,
      });

      drawSurface.setSize(600, 400, false);

      drawSurface.setPixelRatio(1);
      drawSurface.setClearColor("#2220111");
      // drawSurface.``
    } else if (canvasContext === undefined) {
      // no-opt
      // no canvas necessary
    }

    this.canvasContexts[key] = {
      run,
      canvas,
      drawSurface,
      callback,
      canvasContext: this.state.getCurrent().appLogic[key][3],
    };
    this.canvasContexts[key].callback &&
      this.canvasContexts[key].callback(false);
  }

  async start() {
    var fps = 30;
    let then = performance.now();
    const interval = 1000 / fps;
    let delta = 0;

    // run the logic loop as fast as possible
    let d;
    let p;
    const repeatedFunction = async () => {
      d = performance.now();
      await this.ecs.tick(d - p);
      p = d;
    };

    setInterval(repeatedFunction, 1);

    // run the render loop at 30FPS
    while (true) {
      let now = await new Promise(requestAnimationFrame);
      if (now - then < interval - delta) {
        continue;
      }
      delta = Math.min(interval, delta + now - then - interval);
      then = now;

      for (const canvaskey in this.canvasContexts) {
        this.draw(canvaskey);
      }
    }
  }

  draw(key: string) {
    const s = this.state.get(this.state.currrent);

    const ds = this.canvasContexts[key].drawSurface;

    const clbk = this.canvasContexts[key].callback;

    if (ds) {
      const drawOps: ((
        ctx: OffscreenCanvasRenderingContext2D | THREE.WebGLRenderer
      ) => void)[] = s.draw(key, clbk || (() => {}), this.ecs);

      if (this.canvasContexts[key].canvasContext === "2d") {
        const twoDimDraw = ds as OffscreenCanvasRenderingContext2D;

        drawOps.forEach((d) => {
          d(twoDimDraw);
        });
      }

      if (this.canvasContexts[key].canvasContext === "webgl2") {
        const threeDimDraw = ds as OffscreenCanvasRenderingContext2D;
        drawOps.forEach((d) => {
          d(threeDimDraw);
        });
      }
    }
  }

  inputEvent(event: Event | string, appKey: string) {
    this.state.getCurrent().inputEvent(event, appKey, this.ecs);
  }
}
