import { LitableComponent } from "../Components/casting/in";


import { PhysicsSetPieceComponent } from "../Components/setPiece";
import { TileSize } from "../System";
import { Phase0 } from "../Components/phase0";
import { SpaceTrashEntityComponent, ITiles } from ".";
import { SpaceTrashEntity } from "../Entity";


export class Tile extends SpaceTrashEntityComponent {
  tiletype: ITiles;

  constructor(x: number, y: number, tiletype: ITiles) {
    const spe = new SpaceTrashEntity();
    super(spe, [
      new PhysicsSetPieceComponent(x, y, true, tiletype),
      new LitableComponent(),
    ]);
    this.tiletype = tiletype;
  }

  // validate() {
  //   // console.log("validate tile!");
  // }

  erase2d(draw2d: CanvasRenderingContext2D) {
    draw2d.arc(10, 10, 3, 0, 90);
  }

  draw2d(draw2d: CanvasRenderingContext2D) {
    draw2d.clearRect(1, 2, 3, 4);
  }

  static draw2d(
    setPieceAndId: [number, PhysicsSetPieceComponent],
    p: Phase0
  ): (canvas2d: CanvasRenderingContext2D) => void {
    const setPiece = setPieceAndId[1];

    return (ctx: CanvasRenderingContext2D) => {
      
      ctx.beginPath();
      if (setPiece.tileType === "FloorTile") {
        if (p.luminance > 0) {
          ctx.fillStyle = "yellow";
        } else {
          ctx.fillStyle = "white";
        }

        ctx.rect(
          Math.floor(setPiece.x * TileSize - TileSize / 2 + 1),
          Math.floor(setPiece.y * TileSize - TileSize / 2 + 1),
          TileSize - 1,
          TileSize - 1
        );
      }
      if (setPiece.tileType === "WallTile") {
        ctx.fillStyle = "darkgrey";
        ctx.rect(
          Math.floor(setPiece.x * TileSize - TileSize / 2 + 1),
          Math.floor(setPiece.y * TileSize - TileSize / 2 + 1),
          TileSize - 1,
          TileSize - 1
        );
      }

      ctx.fill();
      ctx.stroke();

      
    };
  }

  static erase2d(draw2d: CanvasRenderingContext2D) {
    // draw2d.clearRect(1, 2, 3, 4);
  }
}

export class FloorTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "FloorTile");
  }
}

export class WallTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "WallTile");
  }
}

export class North extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "North");
  }
}

export class East extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "East");
  }
}

export class West extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "West");
  }
}

export class South extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "South");
  }
}

export class TileA extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileA");
  }
}

export class TileB extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileB");
  }
}

export class TileC extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileC");
  }
}

export class TileD extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileD");
  }
}

export class TileE extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileE");
  }
}

export class TileF extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileF");
  }
}

export class TileG extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileG");
  }
}

export class TileH extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileH");
  }
}

export class TileI extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileI");
  }
}

export class TileJ extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "TileI");
  }
}

export class SouthWest extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "SouthWest");
  }
}

export class SouthEast extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "SouthEast");
  }
}

export class NorthWest extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "NorthWest");
  }
}

export class NorthEast extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "NorthEast");
  }
}

// 16 tiles
// https://www.boristhebrave.com/2021/05/23/triangle-grids/
export const Tiles = [
  FloorTile,
  TileA,
  TileB,
  North,
  TileC,
  TileD,
  East,
  TileE,
  TileF,
  West,
  TileG,
  TileH,
  South,
  TileI,
  TileJ,
  WallTile,

  SouthWest,
  SouthEast,
  NorthWest,
  NorthEast,
];

// export class DoorTile extends SpaceTrashEntityComponent {
//   constructor(x: number = 0, y: number = 0, r: number = 0) {
//     const spe = new SpaceTrashEntity();
//     super(
//       spe,
//       [
//         new PhysicsSetComponent(spe, x, y, true, 'Door'),
//       // new AttackableComponent(spe),
//       // new UnmovingComponent(spe),
//       // new PowerConsumingComponent(spe),
//       new SolidityComponent(spe, 0),
//       new LitableComponent(spe)
//       ],
//     );
//   }
// }
