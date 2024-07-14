import { ECS } from "./ECS";
import { StateSpace } from "./StateSpace";
import { System } from "./System";

export class Game<SystemKeys extends string> {
  postMessage: (message: any, options?: WindowPostMessageOptions | undefined) => void
  state: StateSpace;
  canvasContexts: Record<string, {
    run: boolean,
    context?: CanvasRenderingContext2D,
    callback?: (a: any) => void,

  }>;
  ecs: ECS<SystemKeys>

  constructor(
    state: StateSpace,
    systems: Record<SystemKeys, System<SystemKeys>>,
    postMessage: (message: any, options?: WindowPostMessageOptions | undefined) => void
  ) {
    this.state = state;
    this.postMessage = postMessage;
    this.ecs = new ECS(systems);
    this.canvasContexts = {};

    this.update = this.update.bind(this)
  }

  update(to: string) {
    // debugger
    this.state.setCurrent(to);
    const newScene = this.state.getCurrent();
    // const clbk = this.canvasContexts[this.state.currrent].callback;
    newScene.boot(to, this.ecs, this.postMessage);
    // const newScene = this.state.current()
    // this.ecs.flash(scene);
    
    
  }

  register(
    key: string,
    run: boolean,
    context?: CanvasRenderingContext2D,
    callback?: (data: any) => void,
  ) {
    this.canvasContexts[key] = { run, context, callback };
    this.animationLoop(key);
    console.log("animation loop running", key)

    const s = this.state.get(this.state.currrent);
    const clbk = this.canvasContexts[key].callback;
    s.boot(key, this.ecs, clbk || (()=>{}));
    
  }

  start() {
    this.ecs.logicLoop();
    Object.keys(this.canvasContexts).forEach(((k) => {
      const { run, context } = this.canvasContexts[k];
      if (run) {
        this.animationLoop(k);
      }
    }))
    return this;
  }

  animationLoop(key: string) {
    this.draw(key);
    requestAnimationFrame(() => this.canvasContexts[key].run && this.animationLoop(key));
  }

  draw(key: string) {
    // console.log("Game.draw", this.state.currrent)
    const s = this.state.get(this.state.currrent);

    const ctx = this.canvasContexts[key].context;
    const clbk = this.canvasContexts[key].callback;

    if (ctx) {
      ctx.clearRect(0, 0, 800, 600);
    }

    s.draw(
      ctx,
      key,
      clbk || (() => { }),
      this.ecs.entityComponents,
    );
    
    // if (ctx) {
    //   console.log("mark1",key)
    //   ctx.clearRect(0, 0, 800, 600);
      
    // }
    // if (clbk) {
    //   // ctx.clearRect(0, 0, 800, 600);
    //   // s.draw(ctx, key);  
    // }
    
    
  }

}