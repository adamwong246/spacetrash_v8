import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";

import { TileSize } from "../../../Constants";
import { PhaserArcadePhysicalComponent } from "../../../../engine/physics/phaserArcade";

export class ArcadePhysicsComponent extends PhaserArcadePhysicalComponent {
  
  X() {
    return this.y * TileSize;
  }
  
  Y() {
    return this.y * TileSize;
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
  updateFromArcadePhysics(eid: any, f: ArcadePhysicsComponent) {
    const d = this.take(eid);

    // if (d.sprite) {
    //   d.sprite.position.x = f.arcadeObject.position.x + TileSize / 2;
    //   d.sprite.position.y = f.arcadeObject.position.y + TileSize / 2;
    //   d.sprite.rotation = f.arcadeObject.rotation;
    // }
    // if (d.mesh) {
    //   d.mesh.position.x = f.arcadeObject.position.x;
    //   d.mesh.position.y = f.arcadeObject.position.y;
    // }
    // if (updateChars) {
    //   d.char.position.x = Math.round(p.x) * TileSize;
    //   d.char.position.y = Math.round(p.y) * TileSize;
    // }
    // throw new Error("Method not implemented.");
  }

  getTileXAndY(eid: number) {
    return this.take(eid).getTileXAndY();
  }
  getAbsoluteXandY(eid: number) {
    return this.take(eid).getAbsoluteXandY();
  }
}
