import { ISystems } from ".";
import { ECS, System } from "./ECS";
import { StateSpace } from "./StateSpace";

export class Game<SystemKeys extends string> {
  state: StateSpace;
  canvasContext: CanvasRenderingContext2D;
  ecs: ECS<SystemKeys>

  constructor(
    state: StateSpace,
    canvasContext: CanvasRenderingContext2D,
    systems: Record<SystemKeys, System<SystemKeys>>
  ) {
    this.state = state;
    this.canvasContext = canvasContext;
    this.ecs = new ECS(systems);
  }

  start(): Game<string> {
    this.animationLoop();
    this.ecs.logicLoop();
    return this;
  }

  inputEvent(event: any) {
    if (true) {
      const ns = this.state.graph.outNeighbors(this.state.currrent);
      if (ns.length) {
        const n = ns[0];
        console.log(this.state.currrent, ns, n)
        this.state.currrent = n;      
      } else {
        console.log("no further states")
      }  
    }
  }

  animationLoop() {
    this.draw();
    requestAnimationFrame(() => this.animationLoop());
  }

  draw() {
    const s = this.state.getView(this.state.currrent);
    this.canvasContext.clearRect(0, 0, 800, 600);
    s.draw(this.canvasContext);
  }

}