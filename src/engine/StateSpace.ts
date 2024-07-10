import { DirectedGraph } from "./DirectedGraph";
import { Scene, View } from "./View";

export class StateSpace extends DirectedGraph  {
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
  
  get(key): Scene {
    return this.graph.getNodeAttribute(key, 'scene');
  }
  
  set(key, scene: Scene) {
    this.graph.setNodeAttribute(key, 'scene', scene);
  }

  

}
