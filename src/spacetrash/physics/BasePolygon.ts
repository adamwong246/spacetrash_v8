import { SP_2d_Vector } from "../../demiurge/physics/SP_2d_Vector";
import { TileSize } from "../Constants";

export class SamuraiTile {
  vectors: SP_2d_Vector[];

  constructor(v: any) {
    this.vectors = v;
  }
}

export const TiledIndices = {
  0: ["FloorTile", "tile0"],
  1: ["WallTile", "tile100"],
  2: ["WallTile", "tile100"],
};
export type IBasePolygons =
  | "tile0"
  | "tile100"
  | "corner"
  | "tile20"
  | "tile25"
  | "tile33"
  | "tile40"
  | "tile50"
  | "tile60"
  | "tile66"
  | "tile75"
  | "tile80"
  | "crossbar"
  | "corner25"
  | "corner50"
  | "anticrossbar"
  | "IBeam"
  | "TBeam"
  | "LBeam"
  | "thinReducer"
  | "incutTile50"
  | "fatReducer";

export const BasePolygons: Record<IBasePolygons, SamuraiTile> = {
  tile0: new SamuraiTile([]),

  tile100: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize),
    new SP_2d_Vector(0, TileSize),
  ]),

  corner: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize, TileSize),
    new SP_2d_Vector(0, TileSize),
  ]),

  tile20: new SamuraiTile([
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize),
    new SP_2d_Vector(0, TileSize),
    new SP_2d_Vector(0, TileSize / 2),
    new SP_2d_Vector(TileSize / 2, 0),
  ]),

  tile25: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize / 2, 0),
    new SP_2d_Vector(TileSize / 2, TileSize / 2),
    new SP_2d_Vector(TileSize, TileSize / 2),
    new SP_2d_Vector(TileSize, TileSize),
    new SP_2d_Vector(0, TileSize),
  ]),

  tile40: new SamuraiTile([
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize),
    new SP_2d_Vector(0, TileSize),
    new SP_2d_Vector(TileSize / 2, 0),
  ]),

  tile50: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize / 2, 0),
    new SP_2d_Vector(TileSize / 2, TileSize),
    new SP_2d_Vector(0, TileSize),
  ]),

  tile60: new SamuraiTile([
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize),
    new SP_2d_Vector(TileSize / 2, TileSize),
  ]),

  tile75: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize / 2, 0),
    new SP_2d_Vector(TileSize / 2, TileSize / 2),
    new SP_2d_Vector(0, TileSize / 2),
  ]),

  tile80: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize / 2, 0),
    new SP_2d_Vector(0, TileSize / 2),
  ]),

  crossbar: new SamuraiTile([
    new SP_2d_Vector(TileSize / 2, 0),
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize / 2),
    new SP_2d_Vector(TileSize / 2, TileSize),
    new SP_2d_Vector(0, TileSize),
    new SP_2d_Vector(0, TileSize / 2),
  ]),

  tile33: new SamuraiTile([
    new SP_2d_Vector(TileSize / 2, 0),
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize),
    new SP_2d_Vector(TileSize / 2, TileSize / 2),
  ]),

  tile66: new SamuraiTile([
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize),
    new SP_2d_Vector(0, TileSize),
    new SP_2d_Vector(TileSize / 2, TileSize / 2),
    new SP_2d_Vector(TileSize / 2, 0),
  ]),

  corner25: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize / 2, TileSize / 2),
    new SP_2d_Vector(0, 0),
  ]),

  corner50: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize * 0.75, TileSize * 0.75),
    new SP_2d_Vector(TileSize * 0.25, TileSize * 0.75),
    new SP_2d_Vector(0, 0),
  ]),

  anticrossbar: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize / 2, 0),
    new SP_2d_Vector(0, TileSize / 2),
    new SP_2d_Vector(0, 0),

    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize),

    new SP_2d_Vector(TileSize / 2, TileSize),
    new SP_2d_Vector(TileSize, TileSize / 2),
    new SP_2d_Vector(TileSize, TileSize),
  ]),

  IBeam: new SamuraiTile([
    new SP_2d_Vector(0, TileSize * 0.25),
    new SP_2d_Vector(TileSize, TileSize * 0.25),
    new SP_2d_Vector(TileSize, TileSize * 0.75),
    new SP_2d_Vector(0, TileSize * 0.75),
  ]),

  TBeam: new SamuraiTile([
    new SP_2d_Vector(0, TileSize * 0.25),
    new SP_2d_Vector(TileSize * 0.25, TileSize * 0.25),

    new SP_2d_Vector(TileSize * 0.25, 0),
    new SP_2d_Vector(TileSize * 0.75, 0),

    new SP_2d_Vector(TileSize * 0.75, TileSize),
    new SP_2d_Vector(TileSize * 0.25, TileSize),

    new SP_2d_Vector(TileSize * 0.25, TileSize * 0.75),
    new SP_2d_Vector(0, TileSize * 0.75),
  ]),

  LBeam: new SamuraiTile([
    new SP_2d_Vector(0, TileSize * 0.25),
    new SP_2d_Vector(TileSize * 0.25, TileSize * 0.25),

    new SP_2d_Vector(TileSize * 0.25, 0),
    new SP_2d_Vector(TileSize * 0.75, 0),

    new SP_2d_Vector(TileSize * 0.75, TileSize * 0.75),
    new SP_2d_Vector(0, TileSize * 0.75),

    // new SP_2d_Vector(TileSize * 0.25, TileSize * 0.75),
    // new SP_2d_Vector(0, TileSize * 0.75),
  ]),

  thinReducer: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize * 0.75, TileSize),
    new SP_2d_Vector(TileSize * 0.25, TileSize),
    new SP_2d_Vector(0, 0),
  ]),

  incutTile50: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize / 2, 0),
    new SP_2d_Vector(0, TileSize / 2),
    new SP_2d_Vector(TileSize / 2, TileSize),
    new SP_2d_Vector(0, TileSize),
  ]),

  fatReducer: new SamuraiTile([
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(TileSize, 0),
    new SP_2d_Vector(TileSize, TileSize / 2),
    new SP_2d_Vector(TileSize * 0.75, TileSize),
    new SP_2d_Vector(TileSize * 0.25, TileSize),
    new SP_2d_Vector(0, TileSize / 2),
    new SP_2d_Vector(0, 0),
  ]),
};
