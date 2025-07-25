
import { DirectedGraph } from "./DirectedGraph";
import { Scene } from "./Scene";

export class StateSpace extends DirectedGraph {
  
  start: string;
  end: string;
  currrent: string;

  constructor(
    name: string,
    start: string,
    end: string
  ) {
    super(name);
    this.start = start;
    this.end = end;
    this.currrent = start;
  }

  setCurrent(key): void {
    return this.currrent = key;
  }

  getCurrent(): Scene {
    return this.graph.getNodeAttribute(this.currrent, 'Scene');
  }
  
  get(key): Scene {
    return this.graph.getNodeAttribute(key, 'Scene');
  }

  set(key, scene: Scene) {
    this.graph.setNodeAttribute(key, 'Scene', scene);
  }

  inputEvent(
    inputEvent: Event,
    appKey: string,
    ecs, ECS,
  ): void {
    (this.graph.getNodeAttribute(this.currrent, 'Scene') as Scene)
      .inputEvent(inputEvent, appKey, ecs);
  }

}
