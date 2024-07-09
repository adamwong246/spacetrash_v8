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
  
  check() {
    console.log("do asserts here")
  }

  setView(key, view: Scene) {
    this.graph.setNodeAttribute(key, 'view', view);
  }

  getView(key): View {
    return this.graph.getNodeAttribute(key, 'view');
  }

}
