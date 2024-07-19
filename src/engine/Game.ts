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
    // canvasContext: "2d" | "webgl"

  }>;
  ecs: ECS<SystemKeys>

  constructor(
    state: StateSpace,
    systems: Record<SystemKeys, System<SystemKeys>>,
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
    canvas?: OffscreenCanvas,
    callback?: (data: any) => void,
  ) {
    this.canvasContexts[key] = { run, canvas, callback };
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

    const ctx = this.canvasContexts[key].canvas?.getContext("2d") as OffscreenCanvasRenderingContext2D;
    const clbk = this.canvasContexts[key].callback;

    if (ctx) {
      const drawOps: ((ctx: OffscreenCanvasRenderingContext2D) => void)[] = s.draw(
        key,
        clbk || (() => { }),
        this.ecs.getComponents(),
      );

      ctx.clearRect(0, 0, 800, 600);

      
  
      drawOps.forEach((d) => {
        // debugger
        d(ctx);
      })

    }

    

  }

  inputEvent(event: Event, appKey: string) {
    this.state.getCurrent().inputEvent(
      event, appKey, this.ecs,
    )
  }

}