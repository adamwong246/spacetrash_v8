

// import { MapStoreV2 } from "../../../../demiurge/ecs/Store";
// import { TileSize } from "../../../Constants";
// import { LightIncastingComponent } from "../v1/casting/in";
// import { DrawableComponent } from "../v2/drawable";
// import { IntegerPositionComponent } from "../v2/physical";


// export class LightPositionStore extends MapStoreV2<IntegerPositionComponent> {


//   // constructor() {
//   //   super();

//   // }

//   // withIf(i: number, cb: (i: [number, DrawableComponent, string]) => void) {
//   //   const x = this.store.get(i)
//   //   if (x) cb([Number(i), x, i]);
//   // }

//   // each(
//   //   arg0: (eid, le: [number, DrawableComponent, string], eidAsString) => void
//   // ) {
//   //   this.store.forEach((value, key) => {
//   //     arg0([Number(key), value, key]);
//   //   });
//   // }

//   // add(lc: IntegerPositionComponent, n: number) {
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

//   positionOf(eidOfLight: number): IntegerPositionComponent {
//     return this.take(eidOfLight)
//   }

//   updatePostion(eid: number, p: IntegerPositionComponent) {
//     const d = this.take(eid);

//     // console.log("mark2", d.sprite)

//     if (d.sprite) {
//       d.sprite.position.x = p.x * TileSize;
//       d.sprite.position.y = p.y * TileSize;
//     }
//     if (d.mesh) {
//       d.mesh.position.x = p.x * TileSize;
//       d.mesh.position.y = p.y * TileSize;
//     }
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
// }