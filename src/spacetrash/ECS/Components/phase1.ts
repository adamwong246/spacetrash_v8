import { Application, Sprite } from "pixi.js";

import { TwoDOneD_Component } from "../../../engine/VECS.ts/Component";
import { OneDStore } from "../../../engine/VECS.ts/types";

import { ISpaceTrashComponents } from ".";
import { FloatPositionComponent, FloatPositionStore } from "./v2/physical";

export class ActorComponent extends TwoDOneD_Component<unknown, ISpaceTrashComponents> {
  actorId: number;
  friendly: boolean;
  floatPosition: FloatPositionComponent;
  sprite: Sprite

  constructor() {
    super();
  }
}

export class ActorStore extends OneDStore<any> {
  
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
    throw new Error("Method not implemented.");
  }
  update(n: number, p: FloatPositionComponent) {
    this.get(n).floatPosition = p;
  }
}
