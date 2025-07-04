import { BasePolygons, IBasePolygons } from "./BasePolygon";

import { MapStoreV2 } from "../../engine/VECS.ts/Store";
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

  constructor(
    x: number,
    y: number,
    s: IBasePolygons,
    flippedHorizontally: boolean,
    flippedVertically: boolean,
    flippedDiagonally: boolean
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
