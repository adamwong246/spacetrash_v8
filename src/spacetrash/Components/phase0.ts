import * as THREE from "three";

import { ISpaceTrashComponents } from ".";
import { Component, TwoDOneD_Component } from "../../engine/Component";
import { ComponentStore, TwoDStore } from "../../engine/types";

export class Phase0 extends TwoDOneD_Component<unknown, ISpaceTrashComponents> {
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

export class Phase0Store extends TwoDStore<Phase0> {
  constructor() {
    super();
    this.store = [[]];
  }

  add(a: any) {
    throw new Error("Method not implemented.");
  }

  make() {
    return new Phase0();
  }
}
