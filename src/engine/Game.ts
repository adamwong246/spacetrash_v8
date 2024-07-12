import { ECS } from "./ECS";
import { StateSpace } from "./StateSpace";
import { System } from "./System";

export class Game<SystemKeys extends string> {
  state: StateSpace;
  canvasContexts: Record<string, { run: boolean, context: CanvasRenderingContext2D }>;
  ecs: ECS<SystemKeys>

  constructor(
    state: StateSpace,
    systems: Record<SystemKeys, System<SystemKeys>>
  ) {
    this.state = state;
    this.ecs = new ECS(systems);
    this.canvasContexts = {};
  }

  update(to: string) {
    this.ecs.flash(this.state.get(to));
    this.state.currrent = to;
  }

  registerCanvas(key: string, run: boolean, context: CanvasRenderingContext2D) {
    this.canvasContexts[key] = { run, context };
    this.animationLoop(key);
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
    const s = this.state.get(this.state.currrent);
    this.canvasContexts[key].context.clearRect(0, 0, 800, 600);
    s.draw(this.canvasContexts[key].context);
  }

}