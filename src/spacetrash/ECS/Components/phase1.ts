import { Application, Sprite } from "pixi.js";

import { TwoDOneD_Component } from "../../../engine/VECS.ts/Component";
import { OneDStore } from "../../../engine/VECS.ts/types";

import { ISpaceTrashComponents } from ".";
import { FloatMovingComponent, FloatPositionComponent, FloatPositionStore } from "./v2/physical";

export class ActorComponent extends TwoDOneD_Component<
  unknown,
  ISpaceTrashComponents
> {
  actorId: number;
  friendly: boolean;
  position: FloatPositionComponent;
  motion: FloatMovingComponent;
  // sprite: Sprite;

  constructor() {
    super();
  }
}

export class ActorStore extends OneDStore<any> {
  each(cb: (l: string, a: ActorComponent) => any) {
    Object.keys(this.store).forEach((k) => {
      const ac = this.store[k];
      cb(k, ac);
    })
  }

  setPieceIdAt(x: number, y: number): number{
    return this.store[y][x].setId
  }

  get(n: number): ActorComponent {
    return this.store.find((v) => v.actorId === n);
  }

  add(a: ActorComponent) {
    super.add(a);
  }

  make() {
    return new ActorComponent();
  }

  positionOf(eidOfLight: number): FloatPositionComponent {
    this.store.length()
  }
  update(n: number, p: FloatPositionComponent) {
    this.get(n).floatPosition = p;
  }
}
