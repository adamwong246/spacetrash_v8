import { BasePolygons, IBasePolygons } from "./BasePolygon";

import { MapStoreV2 } from "../../engine/VECS.ts/Store";
import { SamuraiTile } from "./BasePolygon";
import { SP_IntegerPositionComponent } from "../ECS/Components/v4/IntegerPosition";

export class SamuraiComponent extends SP_IntegerPositionComponent {
  samuraiTile: SamuraiTile;
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
    this.flippedHorizontally = flippedHorizontally;
    this.flippedDiagonally = flippedDiagonally;
    this.flippedVertically = flippedVertically;
  }
}

export class SamuraiStore extends MapStoreV2<SamuraiComponent> {}
