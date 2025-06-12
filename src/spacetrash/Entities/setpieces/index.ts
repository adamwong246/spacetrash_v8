import { ETiles, ITiles, SpaceTrashEntityComponent } from "../../lib/EntityComponent";
import { AttackableComponent, LitableComponent } from "../../Components/casting/in";
import { UnmovingComponent } from "../../Components/conveyance";
import { SolidityComponent } from "../../Components/solidity";
import { PhysicsSetComponent } from "../../Components/physics";
import { PowerConsumingComponent } from "../../Components/power";

import { SpaceTrashEntity } from "..";

export class Tile extends SpaceTrashEntityComponent {
  
  tiletype: ITiles;

  constructor(x: number, y: number, tiletype: ITiles) {
    const spe = new SpaceTrashEntity();
    super(
      spe,
      [
        new PhysicsSetComponent(spe, x, y, true, tiletype),
        new LitableComponent(spe)
      ],
    );
    this.tiletype = tiletype;

  }

  validate ()  {
    console.log("validate tile!");
  }
}

export class FloorTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'FloorTile'
    );
  }
}

export class WallTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'WallTile'
    );
  }
}

export class North extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'North'
    );
  }
}


export class East extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'East'
    );
  }
}

export class West extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'West'
    );
  }
}


export class South extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'South'
    );
  }
}

export class TileA extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileA'
    );
  }
}

export class TileB extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileB'
    );
  }
}

export class TileC extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileC'
    );
  }
}


export class TileD extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileD'
    );
  }
}


export class TileE extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileE'
    );
  }
}

export class TileF extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileF'
    );
  }
}

export class TileG extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileG'
    );
  }
}

export class TileH extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileH'
    );
  }
}


export class TileI extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileI'
    );
  }
}

export class TileJ extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'TileI'
    );
  }
}

export class SouthWest extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'SouthWest'
    );
  }
}

export class SouthEast extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'SouthEast'
    );
  }
}


export class NorthWest extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'NorthWest'
    );
  }
}

export class NorthEast extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      'NorthEast'
    );
  }
}

// 16 tiles
// https://www.boristhebrave.com/2021/05/23/triangle-grids/
export const Tiles = [
  FloorTile, TileA, TileB, North,
  TileC, TileD, East, TileE,
  TileF, West, TileG, TileH,
  South, TileI, TileJ, WallTile,

  SouthWest,SouthEast, NorthWest, NorthEast,
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