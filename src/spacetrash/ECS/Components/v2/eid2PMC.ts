import * as THREE from "three";
import { Sprite, SpriteSource, Texture } from "pixi.js";
import { ISpaceTrashComponents } from "..";
import {
  Component,
  TwoDOneD_Component,
} from "../../../../engine/VECS.ts/Component";
import {
  ComponentStore,
  EntityComponentStore,
  OneDStore,
  Store,
} from "../../../../engine/VECS.ts/types";

import { ActorComponent } from "../phase1";
import {
  FloatPositionComponent,
  FloatPositionStore,
  MovingComponent,
  PositionComponent,
} from "./physical";
import { ClassificationComponent } from "./classifiable";

export class Eid2PMComponent extends Component<any, ISpaceTrashComponents> {
  position: PositionComponent;
  classification: ClassificationComponent;

  constructor(
    position: PositionComponent,
    classification: ClassificationComponent
  ) {
    super();
    this.position = position;
    this.classification = classification;
  }
}

export class Eid2PMStore extends Store<Record<number, Eid2PMComponent>> {
  
  store: Record<number, Eid2PMComponent> = {};

  add(e: Eid2PMComponent, n: number) {
    this.store[n] = e;
  }
  // store: DrawableComponent;

  get(n: number) {
    return this.store[n];
  }

  // add(a: DrawableComponent) {
  //   // super.add(a);
  // }

  make() {
    throw new Error("Method not implemented.");
    return new DrawableComponent();
  }

  // positionOf(eidOfLight: number): FloatPositionStore {
  //   throw new Error("Method not implemented.");
  // }

  // updatePostion(eid: number, p: FloatPositionComponent) {
  //   const d = this.get(eid);

  //   // console.log("mark2", d.sprite)

  //   if (d.sprite) {
  //     d.sprite.position.x = p.x;
  //     d.sprite.position.y = p.y;
  //   }
  //   if (d.mesh) {
  //     d.mesh.position.x = p.x;
  //     d.mesh.position.y = p.y;
  //   }
  //   //
  //   // d.x = p.x;
  //   // d.y = p.y;
  //   // this.sp
  // }
}
