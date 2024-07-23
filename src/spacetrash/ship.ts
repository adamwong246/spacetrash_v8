import { FloorTile, WallTile, SouthEast, SouthWest, NorthWest, NorthEast } from "./Entities/setpieces";
import { SpaceTrashEntityComponent } from "./lib/EntityComponent";

export class SpaceTrashShip {
  shipSize = 64;

  toTiles() {

    const e: SpaceTrashEntityComponent[] = [];
    
    for (let y = 0; y < this.shipSize; y++) {
      for (let x = 0; x < this.shipSize; x++) {
        e.push(new FloorTile(x, y))
      }

      e.push(new WallTile(0, y))
      e.push(new WallTile(y, 0))
      e.push(new WallTile(this.shipSize, y))
      e.push(new WallTile(y, this.shipSize))

    }

    e.push(new SouthEast(1, 1))
    // e.push(new TileB(2, 1))
    e.push(new SouthWest(3, 1))
    e.push(new WallTile(4, 1))
    // e.push(new NorthWest(5, 1))
    // e.push(new NorthEast(6, 1))


    e.push(new NorthWest(5, 4))
    e.push(new WallTile(5, 5))
    e.push(new SouthWest(5, 6))
    e.push(new WallTile(6, 6))
    e.push(new SouthEast(7, 6))
    e.push(new WallTile(7, 5))
    e.push(new NorthEast(7, 4))
    e.push(new WallTile(6, 4))

    e.push(new WallTile(6, 7))
    e.push(new WallTile(6, 8))
    e.push(new WallTile(6, 9))
    e.push(new WallTile(6, 10))
    e.push(new WallTile(6, 11))
    e.push(new SouthWest(6, 12))
    e.push(new WallTile(7, 12))
    e.push(new WallTile(8, 12))
    // e.push(new DoorTile(6, 6, 1))
    // e.push(new DoorTile(16, 16, 1))
    return e;
  }
}