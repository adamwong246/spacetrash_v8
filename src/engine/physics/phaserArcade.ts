import { ArcadePhysics } from "../../spacetrash/vendor/arcade-physics-main/src";

import { MapStoreV2 } from "../VECS.ts/Store";
import { PhysicalComponent } from "./PhysicalComponent";

export class PhaserArcadePhysicalComponent extends PhysicalComponent {
  X() {
    throw new Error("Method not implemented.");
  }
  Y() {
    throw new Error("Method not implemented.");
  }
  creator: (a: ArcadePhysics) => any;
  arcadeObject: any;

  constructor(creator: any) {
    super();
    this.creator = creator;
  }

  // getTileXAndY(): { x: number; y: number } {
  //   return {
  //     x: Math.round(this.arcadeObject.position.x / TileSize),
  //     y: Math.round(this.arcadeObject.position.y / TileSize),
  //   };
  // }

  // getAbsoluteXandY() {
  //   return {
  //     x: this.arcadeObject.position.x,
  //     y: this.arcadeObject.position.y,
  //   };
  // }
}

export class PhaserArcadePhysicalStore extends MapStoreV2<PhaserArcadePhysicalComponent> {
  // getTileXAndY(eid: number) {
  //   return this.take(eid).getTileXAndY();
  // }
  // getAbsoluteXandY(eid: number) {
  //   return this.take(eid).getAbsoluteXandY();
  // }
}
