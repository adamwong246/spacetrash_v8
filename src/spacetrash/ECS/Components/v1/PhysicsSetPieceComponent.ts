import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";
import { ITiles } from "../../EntityComponents";

import { PhysicsComponent } from "./physics";

export class PhysicsSetPieceComponent extends PhysicsComponent {
  solid: boolean;
  tileType: ITiles;

  constructor(x: number = 0, y: number = 0, solid: boolean, tileType: ITiles) {
    super(x, y);
    this.tileType = tileType;
    this.solid = solid;
  }
}

export class PhysicsSetPieceStore extends MapStoreV2<PhysicsSetPieceComponent> {
  
}
