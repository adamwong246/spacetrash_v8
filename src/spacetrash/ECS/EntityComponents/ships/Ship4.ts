import { SpaceTrashEntityComponent } from "..";
import { Entity } from "../../../../engine/VECS.ts/Entity";
import { MapSize } from "../../../Constants";
import {
  Tile,
  WallTile,
  FloorTile,
  NorthEast,
  NorthWest,
  SouthEast,
  SouthWest,
} from "../tiles/subtypes";

import sj from "../../../tiled/levl20.json";

const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
const FLIPPED_VERTICALLY_FLAG = 0x40000000;
const FLIPPED_DIAGONALLY_FLAG = 0x20000000;
const FLIPPED_HEX_ROTATE_120_FLAG = 0x10000000; //

const firstgid = sj.tilesets[0].firstgid;

function isFlippedHorizontal(gid: number) {
  return (gid & FLIPPED_HORIZONTALLY_FLAG) !== 0;
}

function isFlippedVertical(gid: number) {
  return (gid & FLIPPED_VERTICALLY_FLAG) !== 0;
}

function isFlippedBoth(gid: number) {
  return isFlippedHorizontal(gid) && isFlippedVertical(gid);
}

function isFlippedNiether(gid: number) {
  return !isFlippedHorizontal(gid) && !isFlippedVertical(gid);
}

function isFlippedOnlyVertical(gid: number) {
  return !isFlippedHorizontal(gid) && isFlippedVertical(gid);
}

function isFlippedOnlyHorizontal(gid: number) {
  return isFlippedHorizontal(gid) && !isFlippedVertical(gid);
}

const decodeGid = (gid: number) => {
  // const isFlippedHorizontally = (gid & FLIPPED_HORIZONTALLY_FLAG) !== 0;
  // const isFlippedVertically = (gid & FLIPPED_VERTICALLY_FLAG) !== 0;
  // const isFlippedDiagonally = (gid & FLIPPED_DIAGONALLY_FLAG) !== 0;
  // const isFlippedHexRotate120 = (gid & FLIPPED_HEX_ROTATE_120_FLAG) !== 0; // Only relevant for hex maps

  // Clear the flip flags from the GID to get the actual tile ID
  const tileId =
    gid &
    ~(
      FLIPPED_HORIZONTALLY_FLAG |
      FLIPPED_VERTICALLY_FLAG |
      FLIPPED_DIAGONALLY_FLAG |
      FLIPPED_HEX_ROTATE_120_FLAG
    );

  return tileId - firstgid;
};

export default class extends SpaceTrashEntityComponent {
  map: Tile | null[][];

  shipSize = MapSize;

  subComponents: SpaceTrashEntityComponent[] = [];

  addToMap(t: Tile) {
    if (!t) debugger;

    const x = t.x;
    const y = t.y;

    if (x >= this.shipSize + 1) {
      console.error(`Cannot add tile beyond the upper bound of ${MapSize}`);
      return;
    }
    if (y < 0) {
      console.error("Cannot add tile beyond the lower bound of 0");
      return;
    }

    if (y >= this.shipSize + 1) {
      console.error(`Cannot add tile beyond the upper bound of ${MapSize}`);
      return;
    }
    if (y < 0) {
      console.error("Cannot add tile beyond the lower bound of 0");
      return;
    }

    if (y >= this.shipSize + 1) {
      console.error("out of bounds")!;
    }
    if (!this.map[y]) {
      console.error("idk")!;
    }

    this.map[y][x] = t;
  }

  make() {
    const md = sj.layers[0].data;

    for (let y = 0; y < this.shipSize; y++) {
      for (let x = 0; x < this.shipSize; x++) {
        const z = y * MapSize + x;

        const tid = decodeGid(md[z]);

        if (tid === 1 || tid === 14) {
          const w = new WallTile(x, y);
          this.addToMap(w);
        } else if (tid === 0) {
          this.addToMap(new FloorTile(x, y));
        } else if (tid === 2) {
          if (isFlippedNiether(md[z])) {
            this.addToMap(new NorthEast(x, y));
          } else if (isFlippedOnlyHorizontal(md[z])) {
            this.addToMap(new SouthEast(x, y));
          } else if (isFlippedOnlyVertical(md[z])) {
            this.addToMap(new NorthWest(x, y));
            
          } else if (isFlippedBoth(md[z])) {
            this.addToMap(new SouthWest(x, y));
          } else {
            throw "that cannot be";
          }
        } else if (tid === 43) {
          console.error("TILE_60 not implemented");
        } else if (tid === 33) {
          console.error("TILE_50 not implemented");
        } else if (tid === 44) {
          console.error("TILE_80 not implemented");
        } else if (tid === 0) {
          this.addToMap(new FloorTile(x, y));
        } else if (tid === 41) {
          console.error("TILE_20 not implemented");
        } else if (tid === 42) {
          console.error("TILE_40 not implemented");
        } else if (tid === 36) {
          console.error("TILE_66 not implemented");
        } else if (tid === 35) {
          console.error("TILE_75 not implemented");
        } else if (tid === 34) {
          console.error("TILE_25 not implemented");
        } else {
          console.error(`unknown tile: ${tid}, ${x}, ${y}`);
          // throw `unknown tile`;
          // this.addToMap(new FloorTile(x, y));
          const w = new WallTile(x, y);
        }
      }
    }

    // this.cullInteriorWall()
  }

  cullInteriorWall() {
    const facing = (x: number, y: number): boolean => {
      if (x < 0 || x >= MapSize || y < 0 || y >= MapSize) return true;

      return this.map[y][x].constructor.name === "WallTile";
    };

    const northFacing = (x: number, y: number): boolean => {
      if (facing(x, y - 1)) return true;
      return false;
    };

    const southFacing = (x: number, y: number): boolean => {
      if (facing(x, y + 1)) return true;
      return false;
    };

    const eastFacing = (x: number, y: number): boolean => {
      if (facing(x - 1, y)) return true;
      return false;
    };

    const westFacing = (x: number, y: number): boolean => {
      if (facing(x + 1, y)) return true;
      return false;
    };

    const cullings: [number, number][] = [];

    for (let y = 0; y < this.shipSize; y++) {
      for (let x = 0; x < this.shipSize; x++) {
        const s = this.map[y][x];

        if (s.constructor.name === "WallTile") {

          if (
            northFacing(x, y) &&
            southFacing(x, y) &&
            eastFacing(x, y) &&
            westFacing(x, y)
          ) {
            cullings.push([x, y]);
          }
        }
      }
    }

    console.log("interior cullings:", cullings.length);
    cullings.forEach((c) => {
      this.map[c[1]][c[0]] = null;
    });
  }

  constructor() {
    super(new Entity(), []);
    // initialize the internal map, used for validation and level-prerendering
    this.map = [[]];
    for (let y = 0; y < this.shipSize; y++) {
      this.map[y] = [];
      for (let x = 0; x < this.shipSize; x++) {
        this.map[y][x] = null;
      }
    }

    this.make();
  }

  validate() {
    // console.log("validate ship!");
  }

  toTiles(): SpaceTrashEntityComponent[] {
    const t: SpaceTrashEntityComponent[] = [];

    for (let y = 0; y < this.shipSize; y++) {
      for (let x = 0; x < this.shipSize; x++) {
        if (this.map[y][x] !== null) {
          t.push(this.map[y][x]);
        }
      }
    }

    return t;
  }
}
