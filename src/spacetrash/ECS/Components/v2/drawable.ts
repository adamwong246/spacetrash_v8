// import * as THREE from "three";
// import * as PIXI from "pixi.js";
// import { Text } from "pixi.js";

// import { Sprite } from "pixi.js";

// import { Component } from "../../../../engine/VECS.ts/Component";

// import {
//   DegreesDirectionComponent,
//   FloatPositionComponent,
//   FloatPositionStore,
//   PositionComponent,
// } from "./physical";

// import { TileSize } from "../../../Constants";
// import { ArcadePhysicsComponent } from "./arcadePhysics";
// import { ISpaceTrashComponents } from "../v1";
// import { LightIncastingComponent } from "../v1/casting/in";
// import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";

// export type IChars = Text;

// const style = new PIXI.TextStyle({
//   fontFamily: '"Courier New", Courier, monospace',
//   fontSize: TileSize,
// });

// const character = (s: string) => {
//   const t = new Text(s, style);
//   return t;
// };

// export class DrawableComponent extends Component<any, ISpaceTrashComponents> {
//   sprite: PIXI.Sprite;
//   mesh: THREE.Mesh;
//   char: IChars = new Text("mark 3");
//   dirty: boolean;

//   constructor(
//     sprite: PIXI.Sprite,
//     mesh: THREE.Mesh,
//     char: IChars = character("?")
//   ) {
//     super();
//     this.mesh = mesh;
//     this.sprite = sprite;
//     this.char = char;
//     this.dirty = true;
//   }

//   setMesh(m: THREE.Mesh) {
//     this.mesh = m;
//     this.dirty = true;
//   }

//   setSprite(s: Sprite) {
//     this.sprite = s;
//     this.dirty = true;
//   }

//   setChar(s: IChars) {
//     this.char = s;
//     this.dirty = true;
//   }

//   makeDirty() {
//     this.dirty = true;
//   }
// }

// export class DrawableStoreV2 extends MapStoreV2<DrawableComponent> {
//   positionOf(eidOfLight: number): FloatPositionStore {
//     throw new Error("Method not implemented.");
//   }

//   updateChar(eid: number, p: IChars) {
//     const d = this.take(eid);
//     d.char = p;
//     return;
//   }

//   findByMeshId(uuid: string) {
//     for (const [eid, dc] of this.store) {
//       if (dc.mesh.uuid === uuid) {
//         return dc;
//       }
//     }

//     throw "You tried to find a mesh but it could not be found";
//   }

//   updatePostionAndRotation(
//     eid: number,
//     p: PositionComponent,

//     direction: DegreesDirectionComponent
//   ) {
//     const d = this.take(eid);
//     if (d.sprite) {
//       d.sprite.position.x = p.x * TileSize + TileSize / 2;
//       d.sprite.position.y = p.y * TileSize + TileSize / 2;
//       d.sprite.rotation = direction.r;
//     }
//     if (d.mesh) {
//       d.mesh.position.x = p.x * TileSize;
//       d.mesh.position.y = p.y * TileSize;
//       d.mesh.rotateY = direction.r;
//     }
//     if (d.char) {
//       d.char.position.x = Math.round(p.x) * TileSize;
//       d.char.position.y = Math.round(p.y) * TileSize;
//     }

//     d.dirty = false;
//   }

//   updatePostion(eid: number, p: FloatPositionComponent, updateChars: boolean) {
//     const d = this.take(eid);
//     if (d.sprite) {
//       d.sprite.position.x = p.x * TileSize;
//       d.sprite.position.y = p.y * TileSize;
//     }
//     if (d.mesh) {
//       d.mesh.position.x = p.x * TileSize;
//       d.mesh.position.y = p.y * TileSize;
//     }
//     if (updateChars) {
//       d.char.position.x = Math.round(p.x) * TileSize;
//       d.char.position.y = Math.round(p.y) * TileSize;
//     }
//   }

//   updateFromArcadePhysics(eid: any, f: ArcadePhysicsComponent) {
//     const d = this.take(eid);
    
//     if (d.sprite) {
//       d.sprite.position.x = f.arcadeObject.position.x + TileSize / 2;
//       d.sprite.position.y = f.arcadeObject.position.y + TileSize / 2;
//       d.sprite.rotation = f.arcadeObject.rotation;
//     }
//     if (d.mesh) {
//       d.mesh.position.x = f.arcadeObject.position.x;
//       d.mesh.position.y = f.arcadeObject.position.y;
//     }
//     // if (updateChars) {
//     //   d.char.position.x = Math.round(p.x) * TileSize;
//     //   d.char.position.y = Math.round(p.y) * TileSize;
//     // }
//     // throw new Error("Method not implemented.");
//   }

//   updateLuminance(eid: number, illuminated) {
//     const d = this.take(eid);

//     if (d.sprite) {
//       d.sprite.visible = illuminated;
//     }
//     if (d.mesh) {
//       d.mesh.visible = illuminated;
//     }
//   }

//   updateLuminanceByLittable(rid: number, reciver: LightIncastingComponent) {
//     const d = this.take(rid);

//     if (d.sprite) {
//       d.sprite.visible = reciver.luminance > 0;
//     }
//     if (d.mesh) {
//       d.mesh.visible = reciver.luminance > 0;
//     }
//   }

//   //   }
//   //   updatePostion(eid: number, p: FloatPositionComponent) {
//   //     const d = this.get(eid);
//   //     // console.log("mark2", d.sprite)
//   //     if (d.sprite) {
//   //       d.sprite.position.x = p.x * TileSize;
//   //       d.sprite.position.y = p.y * TileSize;
//   //     }
//   //     if (d.mesh) {
//   //       d.mesh.position.x = p.x * TileSize;
//   //       d.mesh.position.y = p.y * TileSize;
//   //     }
//   //     //
//   //     // d.x = p.x;
//   //     // d.y = p.y;
//   //     // this.sp
//   //   }
//   //   updateLuminance(eid: number, illuminated) {
//   //     const d = this.get(eid);
//   //     if (d.sprite) {
//   //       d.sprite.visible = illuminated;
//   //     }
//   //     if (d.mesh) {
//   //       d.mesh.visible = illuminated;
//   //     }
//   //   }
//   //   updateLuminanceByLittable(rid: number, reciver: LightOutcastingComponent) {
//   //     const d = this.get(rid);
//   //     if (d.sprite) {
//   //       d.sprite.visible = reciver.luminance > 0;
//   //     }
//   //     if (d.mesh) {
//   //       d.mesh.visible = reciver.luminance > 0
//   //     }
//   //   }
//   // }
//   /////////////////////////////////////////////////////////////////////////////////////////////////////////
//   // export class DrawableStoreV0 extends EntityComponentStore<DrawableComponent> {
//   //   // store: DrawableComponent;
//   //   // get(...a: any[]) {
//   //   //   throw new Error("Method not implemented.");
//   //   // }
//   //   // add(a: DrawableComponent) {
//   //   //   // super.add(a);
//   //   // }
//   //   make() {
//   //     throw new Error("Method not implemented.");
//   //     return new DrawableComponent();
//   //   }
//   //   positionOf(eidOfLight: number): FloatPositionStore {
//   //     throw new Error("Method not implemented.");
//   //   }
//   //   updatePostion(eid: number, p: FloatPositionComponent) {
//   //     const d = this.get(eid);
//   //     // console.log("mark2", d.sprite)
//   //     if (d.sprite) {
//   //       d.sprite.position.x = p.x * TileSize;
//   //       d.sprite.position.y = p.y * TileSize;
//   //     }
//   //     if (d.mesh) {
//   //       d.mesh.position.x = p.x * TileSize;
//   //       d.mesh.position.y = p.y * TileSize;
//   //     }
//   //     //
//   //     // d.x = p.x;
//   //     // d.y = p.y;
//   //     // this.sp
//   //   }
//   //   each(arg0: ([eid, le, k]: [number, DrawableComponent, string]) => void) {
//   //     Object.keys(this.store).forEach((k) => {
//   //       arg0([Number(k), this.store[k], k]);
//   //     });
//   //   }
//   //   updateLuminance(eid: number, illuminated) {
//   //     const d = this.get(eid);
//   //     if (d.sprite) {
//   //       d.sprite.visible = illuminated;
//   //     }
//   //     if (d.mesh) {
//   //       d.mesh.visible = illuminated;
//   //     }
//   //   }
//   //   updateLuminanceByLittable(rid: number, reciver: LightOutcastingComponent) {
//   //     const d = this.get(rid);
//   //     if (d.sprite) {
//   //       d.sprite.visible = reciver.luminance > 0;
//   //     }
//   //     if (d.mesh) {
//   //       d.mesh.visible = reciver.luminance > 0
//   //     }
//   //   }
//   // }
//   /////////////////////////////////////////////////////////////////////////////////////////////////////////

//   // store: Map<number, DrawableComponent>;

//   // constructor() {
//   //   super();
//   //   this.store = new Map();
//   // }

//   // withIf(i: number, cb: (i: [number, DrawableComponent, string]) => void) {
//   //   const x = this.store.get(i);
//   //   if (x) cb([Number(i), x, i]);
//   // }

//   // each(
//   //   arg0: (eid, le: [number, DrawableComponent, string], eidAsString) => void
//   // ) {
//   //   this.store.forEach((value, key) => {
//   //     arg0([Number(key), value, key]);
//   //   });
//   // }

//   // add(lc: DrawableComponent, n: number) {
//   //   this.store.set(n, lc);
//   //   return;
//   // }

//   // get(n: number): DrawableComponent {
//   //   return this.store.get(n);
//   // }

//   // make() {
//   //   throw new Error("Method not implemented.");
//   //   // return new DrawableComponent();
//   // }
// }

// //////////////////////////////////////////////////////////////////////////////////////////////////

// // export class DrawableStoreV2 extends Store<DrawableComponent> {
// //   store: Record<number, DrawableComponent>;

// //   constructor() {
// //     super();
// //     this.store = {};
// //   }

// //   each(arg0: (eid, le: [number, DrawableComponent, string], eidAsString) => void) {
// //     Object.keys(this.store).forEach((k) => {
// //       arg0([Number(k), this.store[k], k]);
// //     });
// //   }

// //   add(lc: DrawableComponent, n: number) {
// //     return this.store[n] = lc;
// //   }

// //   get(n: number): DrawableComponent {
// //     return this.store[n];
// //   }

// //   make() {
// //     throw new Error("Method not implemented.");
// //     return new DrawableComponent();
// //   }

// //   positionOf(eidOfLight: number): FloatPositionStore {
// //     throw new Error("Method not implemented.");
// //   }

// //   updatePostion(eid: number, p: FloatPositionComponent) {
// //     const d = this.get(eid);

// //     // console.log("mark2", d.sprite)

// //     if (d.sprite) {
// //       d.sprite.position.x = p.x * TileSize;
// //       d.sprite.position.y = p.y * TileSize;
// //     }
// //     if (d.mesh) {
// //       d.mesh.position.x = p.x * TileSize;
// //       d.mesh.position.y = p.y * TileSize;
// //     }
// //     //
// //     // d.x = p.x;
// //     // d.y = p.y;
// //     // this.sp
// //   }

// //   updateLuminance(eid: number, illuminated) {
// //     const d = this.get(eid);

// //     if (d.sprite) {
// //       d.sprite.visible = illuminated;
// //     }
// //     if (d.mesh) {
// //       d.mesh.visible = illuminated;
// //     }
// //   }

// //   updateLuminanceByLittable(rid: number, reciver: LightOutcastingComponent) {
// //     const d = this.get(rid);

// //     if (d.sprite) {
// //       d.sprite.visible = reciver.luminance > 0;
// //     }
// //     if (d.mesh) {
// //       d.mesh.visible = reciver.luminance > 0
// //     }
// //   }
// // }
// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// // export class DrawableStoreV0 extends EntityComponentStore<DrawableComponent> {
// //   // store: DrawableComponent;

// //   // get(...a: any[]) {
// //   //   throw new Error("Method not implemented.");
// //   // }

// //   // add(a: DrawableComponent) {
// //   //   // super.add(a);
// //   // }

// //   make() {
// //     throw new Error("Method not implemented.");
// //     return new DrawableComponent();
// //   }

// //   positionOf(eidOfLight: number): FloatPositionStore {
// //     throw new Error("Method not implemented.");
// //   }

// //   updatePostion(eid: number, p: FloatPositionComponent) {
// //     const d = this.get(eid);

// //     // console.log("mark2", d.sprite)

// //     if (d.sprite) {
// //       d.sprite.position.x = p.x * TileSize;
// //       d.sprite.position.y = p.y * TileSize;
// //     }
// //     if (d.mesh) {
// //       d.mesh.position.x = p.x * TileSize;
// //       d.mesh.position.y = p.y * TileSize;
// //     }
// //     //
// //     // d.x = p.x;
// //     // d.y = p.y;
// //     // this.sp
// //   }

// //   each(arg0: ([eid, le, k]: [number, DrawableComponent, string]) => void) {
// //     Object.keys(this.store).forEach((k) => {
// //       arg0([Number(k), this.store[k], k]);
// //     });
// //   }

// //   updateLuminance(eid: number, illuminated) {
// //     const d = this.get(eid);

// //     if (d.sprite) {
// //       d.sprite.visible = illuminated;
// //     }
// //     if (d.mesh) {
// //       d.mesh.visible = illuminated;
// //     }
// //   }

// //   updateLuminanceByLittable(rid: number, reciver: LightOutcastingComponent) {
// //     const d = this.get(rid);

// //     if (d.sprite) {
// //       d.sprite.visible = reciver.luminance > 0;
// //     }
// //     if (d.mesh) {
// //       d.mesh.visible = reciver.luminance > 0
// //     }
// //   }
// // }

// /////////////////////////////////////////////////////////////////////////////////////////////////////////
