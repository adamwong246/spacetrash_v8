import * as THREE from "three";
import { TwoDOneD_Component } from "../../../../engine/VECS.ts/Component";
import { TwoDStore } from "../../../../engine/VECS.ts/types";
import { MapSize } from "../../../Constants";
import { ISpaceTrashComponents } from "../v1";
import { DrawableComponent } from "../v2/drawable";

export class SetPieceComponent extends TwoDOneD_Component<
  unknown,
  ISpaceTrashComponents
> {
  setId = -1;
  actorIds = [];
  litIds = [];
  incasterId = -1;
  tileType: string;
  luminance: number;
  mesh?: THREE.Mesh;
  x: number;
  y: number;
  culledWebgl: boolean;
  FOV: number[][];
  drawing: DrawableComponent;

  constructor() {
    super();

    this.x = -1;
    this.y = -1;
    this.FOV = [[]];
  }
}

export class SetPieceStore extends TwoDStore<SetPieceComponent> {
  constructor() {
    super();
    this.store = [[]];
  }

  at(x: number, y: number) {
    if (x < 0) return false;
    if (y < 0) return false;
    if (x >= MapSize) return false;
    if (y >= MapSize) return false;

    return this.store[x][y];
  }

  tileIsAt(x: number, y: number, t: string): boolean {
    return this.store[x][y].tileType !== t;
  }

  add(a: any) {
    throw new Error("Method not implemented.");
  }

  make() {
    return new SetPieceComponent();
  }
}
