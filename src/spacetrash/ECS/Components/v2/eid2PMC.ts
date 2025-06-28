import { Component } from "../../../../engine/VECS.ts/Component";
import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";
import {} from "../../../../engine/VECS.ts/types";
import { ISpaceTrashComponents } from "../v1";
import { DrawableComponent } from "./drawable";

import { PositionComponent } from "./physical";

export class Eid2PMComponent extends Component<any, ISpaceTrashComponents> {
  position: PositionComponent;
  classification: string;

  constructor(position: PositionComponent, classification: string) {
    super();
    this.position = position;
    this.classification = classification;
  }

  getAbsoluteXandY(eid: number) {
    return this.position.getAbsoluteXandY();
  }

}

export class Eid2PMStore extends MapStoreV2<Eid2PMComponent> {
  
  getAbsoluteXandY(eid: number) {
    const { classification, position } = this.take(eid);
    return position.getAbsoluteXandY();
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
