import { ArcadePhysics } from "../../../vendor/arcade-physics-main/src";

import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";

import { PositionComponent } from "./physical";
import { TileSize } from "../../../Constants";

export class ArcadePhysicsComponent extends PositionComponent {
  creator: (a: ArcadePhysics) => any;
  arcadeObject: any;

  constructor(creator: any) {
    super();
    this.creator = creator;
  }

  getTileXAndY(): { x: number; y: number } {
    return {
      x: Math.round(this.arcadeObject.position.x / TileSize),
      y: Math.round(this.arcadeObject.position.y / TileSize),
    };
  }

  getAbsoluteXandY() {
    return {
      x: this.arcadeObject.position.x,
      y: this.arcadeObject.position.y,
    };
  }
}

export class ArcadePhysicsStore extends MapStoreV2<ArcadePhysicsComponent> {
  getTileXAndY(eid: number) {
    return this.take(eid).getTileXAndY();
  }
  getAbsoluteXandY(eid: number) {
    return this.take(eid).getAbsoluteXandY();
  }
}
