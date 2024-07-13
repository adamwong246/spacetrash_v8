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

  getCurrent(): Scene<any> {
    return this.graph.getNodeAttribute(this.currrent, 'Scene');
  }

  // jump(key): void{
  //   this.currrent = key;
  //   console.log("jumped to", this.currrent)
  // }

  get(key): Scene<any> {
    return this.graph.getNodeAttribute(key, 'Scene');
  }

  set(key, scene: Scene<any>) {
    this.graph.setNodeAttribute(key, 'Scene', scene);
  }

  inputEvent(inputEvent: Event): void {
    (this.graph.getNodeAttribute(this.currrent, 'Scene') as Scene<any>).inputEvent(inputEvent);
  }

}
