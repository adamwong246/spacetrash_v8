import {
  FloorTile,
  WallTile,
  SouthEast,
  SouthWest,
  NorthWest,
  NorthEast,
} from "./Entities/setpieces";
import { SpaceTrashEntityComponent } from "./lib/EntityComponent";
import { MapSize } from "./System";

export class SpaceTrashShip {
  shipSize = MapSize;

  toTiles() {
    const e: SpaceTrashEntityComponent[] = [];

    for (let y = 1; y < this.shipSize - 1; y++) {
      for (let x = 1; x < this.shipSize - 1; x++) {
        e.push(new FloorTile(x, y));
      }
    }

    for (let z = 0; z < this.shipSize; z++) {
      e.push(new WallTile(0, z));
      e.push(new WallTile(z, 0));
      e.push(new WallTile(this.shipSize - 1, z));
      e.push(new WallTile(z, this.shipSize - 1));
    }

    e.push(new SouthEast(1, 1));
    // e.push(new TileB(2, 1))
    e.push(new SouthWest(3, 1));
    e.push(new WallTile(4, 1));
    // e.push(new NorthWest(5, 1))
    // e.push(new NorthEast(6, 1))

    e.push(new NorthWest(5, 4));
    e.push(new WallTile(5, 5));
    e.push(new SouthWest(5, 6));
    e.push(new WallTile(6, 6));
    e.push(new SouthEast(7, 6));
    e.push(new WallTile(7, 5));
    e.push(new NorthEast(7, 4));
    e.push(new WallTile(6, 4));

    e.push(new WallTile(6, 7));
    e.push(new WallTile(6, 8));
    e.push(new WallTile(6, 9));
    e.push(new WallTile(6, 10));
    e.push(new WallTile(6, 11));
    e.push(new SouthWest(6, 12));
    e.push(new WallTile(7, 12));
    e.push(new WallTile(8, 12));

    new Array(100).fill(true).forEach((i) => {
      e.push(
        new WallTile(
          Math.round(Math.random() * (this.shipSize - 1)),
          Math.round(Math.random() * (this.shipSize - 1))
        )
      );
    });

    // e.push(new DoorTile(6, 6, 1))
    // e.push(new DoorTile(16, 16, 1))
    return e;
  }
}
