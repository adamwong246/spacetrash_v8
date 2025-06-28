import { Component } from "../../../../engine/VECS.ts/Component";

import { FloatMovingComponent, FloatPositionComponent } from "../v2/physical";
import { AiAgentComponent, IBehaviors } from "./ai";
import { SpaceTrash } from "../../..";
import { ISpaceTrashComponents } from "../v1";
import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";
import { TileSize } from "../../../Constants";

export class ActorComponent extends Component<unknown, ISpaceTrashComponents> {
  actorId: number;
  agent: AiAgentComponent;
  arcadeBody: any;
  friendly: boolean;
  motion: FloatMovingComponent;
  position: FloatPositionComponent;
  FOV: any;
}

export class ActorStore extends MapStoreV2<ActorComponent> {
  byXandY(x: number, y: number): number[] {
    let toReturn: number[] = [];

    this.each((ac, eid) => {
      if (
        Math.round(ac.arcadeBody.position.x / TileSize) === x &&
        Math.round(ac.arcadeBody.position.y / TileSize) === y
      ) {
        toReturn.push(eid);
      }
    });

    return toReturn;
  }
}

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
