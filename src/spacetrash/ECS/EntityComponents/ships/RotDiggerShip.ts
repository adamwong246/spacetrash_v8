import { Map as rotMap, RNG as rotRng } from "rot-js";
import { SpaceTrashEntityComponent } from "..";
import { Entity } from "../../../../engine/VECS.ts/Entity";
import { MapSize } from "../../../Constants";
import { IntegerPositionComponent } from "../../Components/v2/physical";
import { Tile, WallTile, FloorTile } from "../tiles";


export class RotDiggerShip extends SpaceTrashEntityComponent {
  map: Tile|null[][];

  shipSize = MapSize;

  subComponents: SpaceTrashEntityComponent[] = [];

  makeRoom(
    id: number,
    x: number,
    y: number,
    w: number,
    h: number,
    northDoors: number[],
    eastDoors: number[],
    southDoors: number[],
    westDoors: number[]
  ) {
    for (let yy = y; yy < h + y; yy++) {
      this.addToMap(new WallTile(x, yy));
      this.addToMap(new WallTile(x + w, yy));
    }

    for (let xx = x; xx < w + x; xx++) {
      this.addToMap(new WallTile(xx, y));
      this.addToMap(new WallTile(xx, y + h - 1));
    }

    for (let d of northDoors) {
      this.addToMap(new FloorTile(x + d + 1, y));
    }

    for (let d of eastDoors) {
      this.addToMap(new FloorTile(x + w, y + d + 1));
    }

    for (let d of southDoors) {
      this.addToMap(new FloorTile(w + x - d - 1, y + h - 1));
    }

    for (let d of westDoors) {
      this.addToMap(new FloorTile(x, h + y - d - 2));
    }

    for (let yy = y + 1; yy < h + y - 1; yy++) {
      for (let xx = x + 1; xx < w + x; xx++) {
        this.addToMap(new FloorTile(xx, yy));
      }
    }
  }

  addManyToMap(ts: Tile[]) {
    for (let t of ts) {
      this.addToMap(t);
    }
  }

  addToMap(t: Tile) {
    if (!t) debugger;

    if (t.position().x >= this.shipSize) {
      console.error("Cannot add tile beyond the upper bound of 32");
      return;
    }
    if (t.position().y < 0) {
      console.error("Cannot add tile beyond the lower bound of 0");
      return;
    }

    if (t.position().y >= this.shipSize) {
      console.error("Cannot add tile beyond the upper bound of 32");
      return;
    }
    if (t.position().y < 0) {
      console.error("Cannot add tile beyond the lower bound of 0");
      return;
    }

    const p = t.components.find((c) => {
      return c.constructor.name === "IntegerPositionComponent";
    }) as IntegerPositionComponent;

    const x = p.x;
    const y = p.y;

    if (y >= this.shipSize) {
      console.error("out of bounds")!;
    }
    if (!this.map[y]) {
      console.error("idk")!;
    }
    // const z = this.map[y][x];

    // debugger
    this.map[y][x] = t;
    // check the map for other pre-existing tiles
    // if (!this.map[y][x]) {
    //   // this.subComponents.push(t);
    //   this.map[y][x] = t;
    // } else {
    //   console.error("This EntityComponent has errors! For X and Y", x, y, "the value is", JSON.stringify(this.map[y][x], null, 2), "but I expected it to be null. Be sure not to add a Tile to an existing space!");
    //   debugger;
    // }
  }

  make() {
    rotRng.setSeed(performance.now());
    var map = new rotMap.Digger(MapSize, MapSize);
    map.create((x, y, v) => {
      if (v === 0) {
        this.addToMap(new FloorTile(x, y));
      } else {
        this.addToMap(new WallTile(x, y));
      }
    });
    this.cullInteriorWall();
    // debugger
    // var display = new ROT.Display({ fontSize: 8 });
    // SHOW(display.getContainer());
    // map.create(display.DEBUG);

    // var drawDoor =  (x, y) => {
    //   // display.draw(x, y, "", "", "red");
    //   this.addToMap(new WireframeWallTile(x, y));
    // };

    // var rooms = map.getRooms();
    // for (var i = 0; i < rooms.length; i++) {
    //   var room = rooms[i];
    //   SHOW(
    //     ROT.Util.format(
    //       "Room #%s: [%s, %s] => [%s, %s]",
    //       i + 1,
    //       room.getLeft(),
    //       room.getTop(),
    //       room.getRight(),
    //       room.getBottom()
    //     )
    //   );

    //   room.getDoors(drawDoor);
    // }

    // // the base floor
    // for (let y = 0; y < this.shipSize; y++) {
    //   for (let x = 0; x < this.shipSize; x++) {
    //     // this.subComponents.push(new FloorTile(x, y));
    //     // const z = new FloorTile(x, y);
    //     const z = new VoidTile(x, y);
    //     this.addToMap(z);
    //   }
    // }

    // this.makeRoom(0, 1, 1, 7, 8, [0], [0], [0], [0, 3]);

    // this.makeRoom(1, 4, 10, 10, 13, [2], [2, 7], [2], [2]);

    // this.makeRoom(2, 16, 12, 10, 3, [], [0], [], [0]);

    // this.makeRoom(3, 0, 24, 12, 4, [10], [0], [], [0]);

    // this.makeRoom(4, 0, 12, 2, 10, [], [6], [], [0]);

    // this.makeRoom(5, 20, 20, 16, 16, [0], [0], [0], [0]);
    // this.addToMap(new WireframeWallTile(24, 22));
    // this.addToMap(new WireframeWallTile(30, 22));
    // this.addToMap(new WireframeWallTile(31, 22));

    // this.makeRoom(6, 16, 16, 3, 4, [0], [0], [0], [0]);

    // // 4 walls on the perimenter
    // for (let z = 0; z < this.shipSize - 1; z++) {
    //   this.addToMap(new WallTile(z, 0));
    //   this.addToMap(new WallTile(this.shipSize - 1, z));
    //   this.addToMap(new WallTile(z + 1, this.shipSize - 1));
    //   this.addToMap(new WallTile(0, z + 1));
    // }

    // // this.addToMap(new WallTile(15, 15));

    // // a room
    // this.addToMap(new WallTile(15, 15));
    // this.addToMap(new WallTile(16, 15));
    // this.addToMap(new WallTile(17, 15));
    // this.addToMap(new WallTile(18, 15));
    // this.addToMap(new WallTile(19, 15));
    // this.addToMap(new WallTile(20, 15));

    // this.addToMap(new WallTile(20, 16));
    // this.addToMap(new WallTile(20, 17));
    // this.addToMap(new WallTile(20, 18));
    // this.addToMap(new WallTile(20, 19));
    // this.addToMap(new WallTile(20, 20));

    // this.addToMap(new WallTile(19, 20));
    // this.addToMap(new WallTile(18, 20));
    // this.addToMap(new WallTile(17, 20));
    // this.addToMap(new WallTile(16, 20));
    // this.addToMap(new WallTile(15, 20));

    // this.addToMap(new WallTile(0, 20));
    // this.addToMap(new WallTile(18, 20));
    // this.addToMap(new WallTile(17, 20));
    // this.addToMap(new WallTile(16, 20));
    // this.addToMap(new WallTile(15, 20));

    // this.addToMap(new WallTile(15, 16));
    // this.addToMap(new WallTile(15, 17));
    // this.addToMap(new WallTile(15, 18));
    // this.addToMap(new WallTile(15, 19));
    // this.addToMap(new WallTile(15, 20));
    // // this.addToMap(new WallTile(20, 15));
    // this.addToMap(new WallTile(20, 16));
    // this.addToMap(new WallTile(20, 17));
    // this.addToMap(new WallTile(20, 18));
    // this.addToMap(new WallTile(20, 19));
    // this.addToMap(new WallTile(20, 20));
    // this.addToMap(new WallTile(15, 20));
    // this.addToMap(new WallTile(16, 20));
    // this.addToMap(new WallTile(17, 20));
    // this.addToMap(new WallTile(18, 20));
    // this.addToMap(new WallTile(19, 20));

    // for (let i = 0; i < MapSize * 3; i++) {
    //   this.addToMap(
    //     new WallTile(
    //       Math.floor(Math.random() * MapSize),
    //       Math.floor(Math.random() * MapSize)
    //     )
    //   );
    // }

    // this should error
    // this.subComponents.push(new WallTile(20, 20));
    // this.subComponents.push(new WallTile(20, 20));
  }

  cullInteriorWall() {

    const facing = (x: number, y: number): boolean => {
      if (x < 0 || x >= MapSize || y < 0 || y >= MapSize) return true
      return this.map[y][x].tiletype === "WallTile";
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

        if (s.tiletype === "WallTile") {
          let interiorFaces = 0;
          if (
            northFacing(x, y) &&
            southFacing(x, y) &&
            eastFacing(x, y) &&
            westFacing(x, y)
          ) {
            cullings.push([x, y])
          }
        }
      }
    }

    cullings.forEach((c) => {
      this.map[c[1]][c[0]] = null
    })
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
