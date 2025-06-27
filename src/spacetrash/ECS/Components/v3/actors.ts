import { Component } from "../../../../engine/VECS.ts/Component";

import { FloatMovingComponent, FloatPositionComponent } from "../v2/physical";
import { AiAgentComponent, IBehaviors } from "./ai";
import { SpaceTrash } from "../../..";
import { ISpaceTrashComponents } from "../v1";
import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";

export class ActorComponent extends Component<unknown, ISpaceTrashComponents> {
  actorId: number;
  agent: AiAgentComponent;
  arcadeBody: any;
  friendly: boolean;
  motion: FloatMovingComponent;
  position: FloatPositionComponent;
}

export class ActorStore extends MapStoreV2<ActorComponent> {}

// byXandY(x: number, y: number): number[] {
//   let toReturn: number[] = [];

//   Object.keys(this).forEach((k) => {
//     const ac = this[k];
//     if (
//       Math.round(ac.arcadeBody.arcadeObject.position.x / TileSize) === x &&
//       Math.round(ac.arcadeBody.arcadeObject.position.y / TileSize) === y
//     ) {
//       toReturn.push(Number(k));
//     }
//   });

//   return toReturn;
// }

// each(cb: (l: string, a: ActorComponent) => any) {
//   Object.keys(this).forEach((k) => {
//     const ac = this.get(k);
//     cb(k, ac);
//   });
// }

// // setPieceIdAt(x: number, y: number): number {
// //   return this.store[y][x].setId;
// // }

// // get(n: number): ActorComponent {
// //   return this.store.find((v) => v.actorId === n);
// // }

// add(a: ActorComponent) {
//   super.add(a);
// }

// make() {
//   return new ActorComponent();
// }

// // positionOf(eidOfLight: number): FloatPositionComponent {
// //   return this.store.length();
// // }

// update(n: number, p: FloatPositionComponent) {
//   this.get(n).floatPosition = p;
// }
// }
