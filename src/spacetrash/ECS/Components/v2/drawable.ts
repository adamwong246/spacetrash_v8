import * as THREE from "three";
import * as PIXI from "pixi.js";

import { Sprite } from "pixi.js";
import { ISpaceTrashComponents } from "..";
import {
  Component,
} from "../../../../engine/VECS.ts/Component";
import {
  EntityComponentStore,
} from "../../../../engine/VECS.ts/types";

import {
  FloatPositionComponent,
  FloatPositionStore,
} from "./physical";

import { LitableComponent } from "../casting/in";
import { TileSize } from "../../../Constants";


export class DrawableComponent extends Component<any, ISpaceTrashComponents> {
  sprite: PIXI.Sprite;
  mesh: THREE.Mesh;

  constructor(sprite: PIXI.Sprite, mesh: THREE.Mesh) {
    super();
    this.mesh = mesh;
    this.sprite = sprite;
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
      d.sprite.position.x = p.x * TileSize;
      d.sprite.position.y = p.y * TileSize;
    }
    if (d.mesh) {
      d.mesh.position.x = p.x * TileSize;
      d.mesh.position.y = p.y * TileSize;
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

  updateLuminance(eid: number, illuminated) {
    const d = this.get(eid);

    if (d.sprite) {
      d.sprite.visible = illuminated;
    }
    if (d.mesh) {
      d.mesh.visible = illuminated;
    }
  }

  updateLuminanceByLittable(rid: number, reciver: LitableComponent) {
    const d = this.get(rid);

    if (d.sprite) {
      d.sprite.visible = reciver.luminance > 0;
    }
    if (d.mesh) {
      d.mesh.visible = reciver.luminance > 0
    }
  }
}
