import { ECS } from "./ECS";
import { StateSpace } from "./StateSpace";
import { System } from "./System";

export class Game<SystemKeys extends string> {
  postMessage: (message: any, options?: WindowPostMessageOptions | undefined) => void
  state: StateSpace;
  canvasContexts: Record<string, {
    run: boolean,
    canvas?: OffscreenCanvas,
    callback?: (a: any) => void,
    canvasContext: "2d" | "webgl"

  }>;
  ecs: ECS<SystemKeys>

  constructor(
    state: StateSpace,
    systems: System<SystemKeys>,
    postMessage: (message: any, options?: WindowPostMessageOptions | undefined) => void
  ) {
    this.state = state;
    this.postMessage = postMessage;
    this.canvasContexts = {};
    this.changeScene = this.changeScene.bind(this)
  }

  changeScene(to: string) {
    this.state.setCurrent(to);
    const newScene = this.state.getCurrent();
    newScene.boot(to, this.ecs, this.postMessage);
  }

  register(
    key: string,
    run: boolean,
    // context?: CanvasRenderingContext2D,
    // canvasContext: "2d" | "webgl",
    canvas?: OffscreenCanvas,
    callback?: (data: any) => void,
  ) {
    // console.log(key, this.state.getCurrent().appLogic[key]);
    this.canvasContexts[key] = {
      run,
      canvas,
      callback,
      canvasContext: this.state.getCurrent().appLogic[key][3]
      // canvasContext: this.canvasContexts[key].canvasContext
    };
    // this.animationLoop(key);


    const s = this.state.get(this.state.currrent);
    const clbk = this.canvasContexts[key].callback;
    s.boot(key, this.ecs, clbk || (() => { }));

  }

  async start() {
    var fps = 60;
    let then = performance.now();
    const interval = 1000 / fps;
    let delta = 0;
    while (true) {
      let now = await new Promise(requestAnimationFrame);
      if (now - then < interval - delta) {
        continue;
      }
      delta = Math.min(interval, delta + now - then - interval);
      then = now;


      for (const canvaskey in (this.canvasContexts)) {
        this.draw(canvaskey);
      }

      this.ecs.tick(delta)

    }
  }

  draw(key: string) {
    const s = this.state.get(this.state.currrent);

    const ctx = this.canvasContexts[key].canvas?.getContext(
      this.canvasContexts[key].canvasContext
    );
    const clbk = this.canvasContexts[key].callback;

    if (ctx) {
      const drawOps: (
        (
          ctx: OffscreenCanvasRenderingContext2D | WebGLRenderingContext,
          // opts: any,

        ) => void)[] = s.draw(
        key,
        clbk || (() => { }),
        this.ecs.getComponents(),
      );

      if (this.canvasContexts[key].canvasContext === "2d") {
        const c = ctx as OffscreenCanvasRenderingContext2D;
        c.clearRect(0, 0, 800, 600);
        drawOps.forEach((d) => {
          d(c);
        })  
      }

      if (this.canvasContexts[key].canvasContext === "webgl") {
        const gl = ctx as WebGLRenderingContext;
        gl.clear(gl.COLOR_BUFFER_BIT);
        drawOps.forEach((d) => {
          d(gl);
        })  
      }

      

    }

    

  }

  inputEvent(event: Event, appKey: string) {
    this.state.getCurrent().inputEvent(
      event, appKey, this.ecs,
    )
  }

}