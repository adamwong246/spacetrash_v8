import Graph from "graphology";
import { DirectedGraph as GraphologyDirectedGraph } from "graphology";

export class DirectedGraph  {
  name: string;
  graph: Graph;
  
  constructor(name: string) {
    this.name = name;
    this.graph = new GraphologyDirectedGraph();
  }
  connect(to, from, relation?: string) {
    this.graph.mergeEdge(to, from, { type: relation });
  }
}
