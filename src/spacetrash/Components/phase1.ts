// import * as THREE from "three";

import { TwoD_Component, TwoDOneD_Component } from "../../engine/Component";
import { OneDStore } from "../../engine/types";

import { ISpaceTrashComponents } from ".";

export class Phase1 extends TwoDOneD_Component<unknown, ISpaceTrashComponents> {
  actorId: number;
  actorX: number;
  actorY: number;
  mesh?: THREE.Mesh;

  constructor() {
    super();
  }
}

export class Phase1Store extends OneDStore<Phase1> {
  constructor() {
    super();
    this.store = [];
  }

  add(a: any) {
    throw new Error("Method not implemented.");
  }

  make() {
    return new Phase1();
  }
}
