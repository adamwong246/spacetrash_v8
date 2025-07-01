// import { ArcadePhysics } from "arcade-physics";
// import { TileSize } from "../../spacetrash/Constants";
// import { ArcadePhysicsComponent } from "../../spacetrash/ECS/Components/v2/arcadePhysics";
// import { MapStoreV2 } from "../VECS.ts/Store";
// import { PhysicalComponent } from "./PhysicalComponent";
// import RAPIER from "@dimforge/rapier2d-simd";

// export class RapierPhysicalComponent extends PhysicalComponent {
//   public body: RAPIER.RigidBodyDesc;
//   public collider: RAPIER.ColliderDesc;

//   constructor(body: RAPIER.RigidBodyDesc, collider: RAPIER.ColliderDesc) {
//     super();
//     this.body = body;
//     this.collider = collider;
//     // this.creator = creator;
//     // this.body =  world.createRigidBody(bodyDesc);
//   }

//   // getTileXAndY(): { x: number; y: number } {
//   //   return {
//   //     x: Math.round(this.arcadeObject.position.x / TileSize),
//   //     y: Math.round(this.arcadeObject.position.y / TileSize),
//   //   };
//   // }

//   // getAbsoluteXandY() {
//   //   return {
//   //     x: this.arcadeObject.position.x,
//   //     y: this.arcadeObject.position.y,
//   //   };
//   // }
// }

// export class RapierPhysicalStore extends MapStoreV2<RapierPhysicalComponent> {
//   // getTileXAndY(eid: number) {
//   //   return this.take(eid).getTileXAndY();
//   // }
//   // getAbsoluteXandY(eid: number) {
//   //   return this.take(eid).getAbsoluteXandY();
//   // }
// }
