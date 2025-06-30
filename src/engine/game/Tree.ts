import { DirectedGraph as GraphologyDirectedGraph } from "graphology";

import { DirectedGraph } from "./DirectedGraph";
import { Scene } from "./Scene";

export abstract class Tree   {
  // name: string;

  // constructor(
  //   name: string
  // ) {
  //   this.name = name;
  // }
}

export class Root extends Tree   {
  // name: string;
  root: Scene;

  // constructor(
  //   name: string,
  //   root: Scene,
  // ) {
  //   super(name);
  // }
}

export class Branch extends Tree   {
  // name: string;
  // parent: Scene;
  children: Scene;

  // constructor(
  //   name: string,
  //   // parent: Scene,
  // ) {
  //   super(name);
  // }
}

export class Leaf extends Tree   {
  // name: string;
  // parent: Scene;

  // constructor(
  //   name: string,
  //   // parent: Scene,
  // ) {
  //   super(name);
  // }
}