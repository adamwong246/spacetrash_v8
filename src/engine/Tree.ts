import { DirectedGraph as GraphologyDirectedGraph } from "graphology";

import { DirectedGraph } from "./DirectedGraph";
import { View } from "./View";

export abstract class Tree   {
  name: string;

  constructor(
    name: string
  ) {
    this.name = name;
  }
}

export class Root extends Tree   {
  name: string;
  root: View;

  constructor(
    name: string,
    root: View,
  ) {
    super(name);
  }
}

export class Branch extends Tree   {
  name: string;
  // parent: View;
  children: View;

  constructor(
    name: string,
    // parent: View,
  ) {
    super(name);
  }
}

export class Leaf extends Tree   {
  name: string;
  // parent: View;

  constructor(
    name: string,
    // parent: View,
  ) {
    super(name);
  }
}