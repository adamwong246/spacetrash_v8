import { BasePolygons, IBasePolygons } from "./BasePolygon";

import { MapStoreV2 } from "../../engine/VECS/Store";
import { SamuraiTile } from "./BasePolygon";
import { SP_IntegerPositionComponent } from "../ECS/Components/v4/IntegerPosition";

export class SamuraiTileComponent extends SP_IntegerPositionComponent {
  
  setX(x: number) {
    throw new Error("Method not implemented.");
  }
  setY(y: number) {
    throw new Error("Method not implemented.");
  }

  samuraiTile: SamuraiTile;
  samuraiTileKey: IBasePolygons;
  flippedHorizontally: boolean;
  flippedVertically: boolean;
  flippedDiagonally: boolean;

  // Store the cleared GID, which identifies the base tile type 
  // (e.g., a generic corner wall)
  protected baseGid: number;

  constructor(
    x: number,
    y: number,
    flippedHorizontally: boolean,
    flippedVertically: boolean,
    flippedDiagonally: boolean,
    s: IBasePolygons,
  ) {
    super(x, y);
    this.samuraiTile = BasePolygons[s];
    this.samuraiTileKey = s;
    this.flippedHorizontally = flippedHorizontally;
    this.flippedDiagonally = flippedDiagonally;
    this.flippedVertically = flippedVertically;
  }
}

export class SamuraiTileStore extends MapStoreV2<SamuraiTileComponent> {}
