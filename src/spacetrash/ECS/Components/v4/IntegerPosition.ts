import { IntegerPositionComponent } from "../../../../demiurge/game/physical";
import { TileSize } from "../../../Constants";

export class SP_IntegerPositionComponent extends IntegerPositionComponent {
  constructor(x: number, y: number) {
    if (!Number.isInteger(x)) throw `x cannot be a float`;
    if (!Number.isInteger(y)) throw `y cannot be a float`;

    super(x, y);
  }

  X() {
    return this.x * TileSize;
  }
  Y() {
    return this.y * TileSize;
  }

  getTileXAndY(): { x: number; y: number } {
    throw new Error("Method not implemented.");
  }

  getAbsoluteXandY() {
    return {
      x: this.x * TileSize,
      y: this.y * TileSize,
    };
  }
}
