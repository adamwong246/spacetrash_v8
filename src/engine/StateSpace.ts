import { DirectedGraph } from "./DirectedGraph";
import { View } from "./View";

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

  jump(key): void{
    this.currrent = key;
  }

  get(key): View {
    return this.graph.getNodeAttribute(key, 'View');
  }

  set(key, scene: View) {
    this.graph.setNodeAttribute(key, 'View', scene);
  }

  inputEvent(inputEvent: Event): void {
    (this.graph.getNodeAttribute(this.currrent, 'View') as View).inputEvent(inputEvent);
  }

}
