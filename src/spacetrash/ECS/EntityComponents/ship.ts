import { Entity } from "../../../engine/VECS.ts/Entity";

import { SpaceTrashEntityComponent } from ".";
import { Tile, FloorTile, WallTile } from "./tiles";

import { IntegerPositionComponent } from "../Components/v2/physical";
import { MapSize } from "../System/MainSystem";


export class SpaceTrashShip extends SpaceTrashEntityComponent {
  map: (Tile)[][];

  shipSize = MapSize;

  subComponents: SpaceTrashEntityComponent[] = [];

  addToMap(t: Tile){
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
      console.error("out of bounds")!

    }
    if (!this.map[y]) {
      console.error("idk")!
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

    // V0
    // for (let y = 0; y < this.shipSize; y++) {
    //   for (let x = 0; x < this.shipSize; x++) {
    //     // this.subComponents.push(new FloorTile(x, y));
    //     this.addToMap(new FloorTile(x, y));
    //   }
    // }

    // V1
    // the base floor
    for (let y = 1; y < this.shipSize-1; y++) {
      for (let x = 1; x < this.shipSize-1; x++) {
        // this.subComponents.push(new FloorTile(x, y));
        const z = new FloorTile(x, y)
        // debugger
        this.addToMap(z);
      }
    }

    // 4 walls on the perimenter
    for (let z = 0; z < this.shipSize-1; z++) {
      this.addToMap(new WallTile(z, 0));
      this.addToMap(new WallTile(this.shipSize - 1, z));
      this.addToMap(new WallTile(z+1, this.shipSize - 1));
      this.addToMap(new WallTile(0, z+1));
    }


    // this.addToMap(new WallTile(15, 15));

    // a room
    this.addToMap(new WallTile(15, 15));
    this.addToMap(new WallTile(16, 15));
    this.addToMap(new WallTile(17, 15));
    this.addToMap(new WallTile(18, 15));
    this.addToMap(new WallTile(19, 15));
    this.addToMap(new WallTile(20, 15));

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


    for (let i = 0; i < 10; i++){
      this.addToMap(new WallTile(
        Math.floor(Math.random() * MapSize),
        Math.floor(Math.random() * MapSize),
      ));
    }

    // this should error
    // this.subComponents.push(new WallTile(20, 20));
    // this.subComponents.push(new WallTile(20, 20));

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

    this.make()

    // this.make().then((s) => {
    //   return this
    // })

    // // some geometry
    // this.subComponents.push(new SouthEast(1, 1));
    // // this.subComponents.push(new TileB(2, 1))
    // this.subComponents.push(new SouthWest(3, 1));
    // this.subComponents.push(new WallTile(4, 1));
    // // this.subComponents.push(new NorthWest(5, 1))
    // // this.subComponents.push(new NorthEast(6, 1))

    // this.subComponents.push(new NorthWest(5, 4));
    // this.subComponents.push(new WallTile(5, 5));
    // this.subComponents.push(new SouthWest(5, 6));
    // this.subComponents.push(new WallTile(6, 6));
    // this.subComponents.push(new SouthEast(7, 6));
    // this.subComponents.push(new WallTile(7, 5));
    // this.subComponents.push(new NorthEast(7, 4));
    // this.subComponents.push(new WallTile(6, 4));

    // this.subComponents.push(new WallTile(6, 7));
    // this.subComponents.push(new WallTile(6, 8));
    // this.subComponents.push(new WallTile(6, 9));
    // this.subComponents.push(new WallTile(6, 10));
    // this.subComponents.push(new WallTile(6, 11));
    // this.subComponents.push(new SouthWest(6, 12));
    // this.subComponents.push(new WallTile(7, 12));
    // this.subComponents.push(new WallTile(8, 12));

    

    

    // new Array(100).fill(true).forEach((i) => {
    //   this.subComponents.push(
    //     new WallTile(
    //       Math.round(Math.random() * (this.shipSize - 1)),
    //       Math.round(Math.random() * (this.shipSize - 1))
    //     )
    //   );
    // });

    // this.subComponents.push(new DoorTile(6, 6, 1))
    // this.subComponents.push(new DoorTile(16, 16, 1))
    // return e;
  }

  validate() {
    // console.log("validate ship!");
  }

  toTiles(): SpaceTrashEntityComponent[] {
    // return this.subComponents;

    const t: SpaceTrashEntityComponent[] = [];

    for (let y = 0; y < this.shipSize; y++) {
      for (let x = 0; x < this.shipSize; x++) {
        if (this.map[y][x] === null) {
          console.error("Cannot leave blank spaces!");
          debugger
        }
        t.push(this.map[y][x]);
        // this.map[y][x]?.components.forEach((c) => {
        //   t.push(c);
        // })
        
        // this.subComponents.push(new FloorTile(x, y));
      //  this.addToMap(new FloorTile(x, y));
      }
    }

    return t;

  }
}
