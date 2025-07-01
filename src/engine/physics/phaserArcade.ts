import { ArcadePhysics } from "arcade-physics";
import { TileSize } from "../../spacetrash/Constants";
import { ArcadePhysicsComponent } from "../../spacetrash/ECS/Components/v2/arcadePhysics";
import { MapStoreV2 } from "../VECS.ts/Store";
import { PhysicalComponent } from "./PhysicalComponent";

export class PhaserArcadePhysicalComponent extends PhysicalComponent {
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
