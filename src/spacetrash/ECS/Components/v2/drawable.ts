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
import { FloatPositionComponent, FloatPositionStore } from "./physical";

export class DrawableComponent extends Component<any, ISpaceTrashComponents> {
  textureURL: string;
  sprite?: Sprite;
  mesh?: THREE.Mesh;

  constructor(textureURL: string) {
    super();
    this.textureURL = textureURL;
  }

  setMesh(m: THREE.Mesh) {
    this.mesh = m;
    // console.log("mark1", this.sprite)
  }

  setSprite(s: Sprite) {
    this.sprite = s;
    // console.log("mark1", this.sprite)
  }
}

export class DrawableStore extends EntityComponentStore<DrawableComponent> {
  // store: DrawableComponent;

  // get(...a: any[]) {
  //   throw new Error("Method not implemented.");
  // }

  // add(a: DrawableComponent) {
  //   // super.add(a);
  // }

  make() {
    throw new Error("Method not implemented.");
    return new DrawableComponent();
  }

  positionOf(eidOfLight: number): FloatPositionStore {
    throw new Error("Method not implemented.");
  }

  updatePostion(eid: number, p: FloatPositionComponent) {
    const d = this.get(eid);

    // console.log("mark2", d.sprite)

    if (d.sprite) {
      d.sprite.position.x = p.x;
      d.sprite.position.y = p.y;
    }
    if (d.mesh) {
      d.mesh.position.x = p.x;
      d.mesh.position.y = p.y;
    }
    //
    // d.x = p.x;
    // d.y = p.y;
    // this.sp
  }

  each(arg0: ([eid, le, k]: [number, DrawableComponent, string]) => void) {
    Object.keys(this.store).forEach((k) => {
      arg0([Number(k), this.store[k], k]);
    });
  }
}
