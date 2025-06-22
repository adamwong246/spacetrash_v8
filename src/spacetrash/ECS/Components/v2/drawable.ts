import * as THREE from "three";
import * as PIXI from "pixi.js";

import { Sprite } from "pixi.js";
import { ISpaceTrashComponents } from "..";
import { Component } from "../../../../engine/VECS.ts/Component";
import { EntityComponentStore, Store } from "../../../../engine/VECS.ts/types";

import { FloatPositionComponent, FloatPositionStore } from "./physical";

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
  }

  setSprite(s: Sprite) {
    this.sprite = s;
  }
}

export class DrawableStoreV2 extends Store<DrawableComponent> {
  store: Map<number, DrawableComponent>;

  constructor() {
    super();
    this.store = new Map();
  }

  withIf(i: number, cb: (i: [number, DrawableComponent, string]) => void) {
    const x = this.store.get(i)
    if (x) cb([Number(i), x, i]);
  }

  each(
    arg0: (eid, le: [number, DrawableComponent, string], eidAsString) => void
  ) {
    this.store.forEach((value, key) => {
      arg0([Number(key), value, key]);
    });
  }

  add(lc: DrawableComponent, n: number) {
    this.store.set(n, lc);
    return;
  }

  get(n: number): DrawableComponent {
    return this.store.get(n);
  }

  make() {
    throw new Error("Method not implemented.");
    // return new DrawableComponent();
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
      d.mesh.visible = reciver.luminance > 0;
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// export class DrawableStoreV2 extends Store<DrawableComponent> {
//   store: Record<number, DrawableComponent>;

//   constructor() {
//     super();
//     this.store = {};
//   }

//   each(arg0: (eid, le: [number, DrawableComponent, string], eidAsString) => void) {
//     Object.keys(this.store).forEach((k) => {
//       arg0([Number(k), this.store[k], k]);
//     });
//   }

//   add(lc: DrawableComponent, n: number) {
//     return this.store[n] = lc;
//   }

//   get(n: number): DrawableComponent {
//     return this.store[n];
//   }

//   make() {
//     throw new Error("Method not implemented.");
//     return new DrawableComponent();
//   }

//   positionOf(eidOfLight: number): FloatPositionStore {
//     throw new Error("Method not implemented.");
//   }

//   updatePostion(eid: number, p: FloatPositionComponent) {
//     const d = this.get(eid);

//     // console.log("mark2", d.sprite)

//     if (d.sprite) {
//       d.sprite.position.x = p.x * TileSize;
//       d.sprite.position.y = p.y * TileSize;
//     }
//     if (d.mesh) {
//       d.mesh.position.x = p.x * TileSize;
//       d.mesh.position.y = p.y * TileSize;
//     }
//     //
//     // d.x = p.x;
//     // d.y = p.y;
//     // this.sp
//   }

//   updateLuminance(eid: number, illuminated) {
//     const d = this.get(eid);

//     if (d.sprite) {
//       d.sprite.visible = illuminated;
//     }
//     if (d.mesh) {
//       d.mesh.visible = illuminated;
//     }
//   }

//   updateLuminanceByLittable(rid: number, reciver: LitableComponent) {
//     const d = this.get(rid);

//     if (d.sprite) {
//       d.sprite.visible = reciver.luminance > 0;
//     }
//     if (d.mesh) {
//       d.mesh.visible = reciver.luminance > 0
//     }
//   }
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// export class DrawableStoreV0 extends EntityComponentStore<DrawableComponent> {
//   // store: DrawableComponent;

//   // get(...a: any[]) {
//   //   throw new Error("Method not implemented.");
//   // }

//   // add(a: DrawableComponent) {
//   //   // super.add(a);
//   // }

//   make() {
//     throw new Error("Method not implemented.");
//     return new DrawableComponent();
//   }

//   positionOf(eidOfLight: number): FloatPositionStore {
//     throw new Error("Method not implemented.");
//   }

//   updatePostion(eid: number, p: FloatPositionComponent) {
//     const d = this.get(eid);

//     // console.log("mark2", d.sprite)

//     if (d.sprite) {
//       d.sprite.position.x = p.x * TileSize;
//       d.sprite.position.y = p.y * TileSize;
//     }
//     if (d.mesh) {
//       d.mesh.position.x = p.x * TileSize;
//       d.mesh.position.y = p.y * TileSize;
//     }
//     //
//     // d.x = p.x;
//     // d.y = p.y;
//     // this.sp
//   }

//   each(arg0: ([eid, le, k]: [number, DrawableComponent, string]) => void) {
//     Object.keys(this.store).forEach((k) => {
//       arg0([Number(k), this.store[k], k]);
//     });
//   }

//   updateLuminance(eid: number, illuminated) {
//     const d = this.get(eid);

//     if (d.sprite) {
//       d.sprite.visible = illuminated;
//     }
//     if (d.mesh) {
//       d.mesh.visible = illuminated;
//     }
//   }

//   updateLuminanceByLittable(rid: number, reciver: LitableComponent) {
//     const d = this.get(rid);

//     if (d.sprite) {
//       d.sprite.visible = reciver.luminance > 0;
//     }
//     if (d.mesh) {
//       d.mesh.visible = reciver.luminance > 0
//     }
//   }
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////
