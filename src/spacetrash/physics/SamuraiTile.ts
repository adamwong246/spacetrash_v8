import { BasePolygons, IBasePolygons } from "./BasePolygon";

import { SP_MapStore } from "../../demiurge/ecs/Store";
import { SamuraiTile } from "./BasePolygon";
import { SP_IntegerPositionComponent } from "../ECS/Components/v4/IntegerPosition";
import { SP_Polygon } from "../../demiurge/physics/SP_Polygon";
import { SP_2d_Vector } from "../../demiurge/physics/SP_2d_Vector";

export class SamuraiTileComponent extends SP_IntegerPositionComponent {
  polygon(): SP_Polygon {
    return new SP_Polygon(
      new SP_2d_Vector(this.x * 32, this.y * 32),
      this.samuraiTile.vectors
    )
  }
  
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

export class SamuraiTileStore extends SP_MapStore<SamuraiTileComponent> {}
