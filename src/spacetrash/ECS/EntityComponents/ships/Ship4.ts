import { SpaceTrashEntityComponent } from "..";
import { Entity } from "../../../../engine/ecs/Entity";
import { MapSize } from "../../../Constants";
import { Tile } from "../tiles";

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
        // this.addToMap(Tile.fromGid(md[z], x, y));
        this.addToMap(Tile.fromGid(md[z], x, y));
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


