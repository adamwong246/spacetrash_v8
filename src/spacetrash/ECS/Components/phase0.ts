import * as THREE from "three";

import { ISpaceTrashComponents } from ".";
import { Component, TwoDOneD_Component } from "../../../engine/VECS.ts/Component";
import { TwoDStore } from "../../../engine/VECS.ts/types";


export class SetPieceComponent extends TwoDOneD_Component<unknown, ISpaceTrashComponents> {
  setId = -1;
  actorIds = [];
  litIds = [];
  littableId = -1;
  tileType: string;
  luminance: number;
  mesh?: THREE.Mesh;
  x: number;
  y: number;

  constructor() {
    super();

    this.x = -1;
    this.y = -1;
  }
}

export class SetPieceStore extends TwoDStore<SetPieceComponent> {
  constructor() {
    super();
    this.store = [[]];
  }

  add(a: any) {
    throw new Error("Method not implemented.");
  }

  make() {
    return new SetPieceComponent();
  }
}
