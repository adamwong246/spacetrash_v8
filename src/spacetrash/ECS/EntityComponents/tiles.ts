import * as PIXI from "pixi.js";
import * as THREE from "three";
import { LitableComponent } from "../Components/casting/in";


import { SpaceTrashEntityComponent, ITiles } from ".";
import { SpaceTrashEntity } from "../Entity";
import { IntegerPositionComponent } from "../Components/v2/physical";
import { ClassificationComponent } from "../Components/v2/classifiable";
import { DrawableComponent } from "../Components/v2/drawable";
import { redMaterial, blueMaterial, blankMaterial } from "../../threejs";

import brick from "./../../Assets/brick.png";
import stone from "./../../Assets/stone.png";
import { TileComponent } from "../Components/v2/tileable";
import { TileSize } from "../../Constants";

const floorGeometry = new THREE.PlaneGeometry(TileSize, TileSize);

var cubeGeo = new THREE.BoxGeometry(TileSize, TileSize, TileSize);

const floorTile = () => {
  const m = new THREE.Mesh(floorGeometry, redMaterial);
  m.position.z = -TileSize / 2;
  return m;
};

const blankTile = () => {
  const m = new THREE.Mesh(floorGeometry, blankMaterial);
  m.position.z = -TileSize / 2;
  return m;
};

const stoneSprite = () => {
  const s = new PIXI.Sprite(PIXI.Texture.from(stone));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const brickSprite = () => {
  const s = new PIXI.Sprite(PIXI.Texture.from(brick));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const bunnySprite = () => {
  const s = new PIXI.Sprite(PIXI.Texture.from("https://pixijs.com/assets/bunny.png"));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

export class Tile extends SpaceTrashEntityComponent {
  tiletype: ITiles;

  constructor(
    x: number,
    y: number,
    tiletype: ITiles,
    d: DrawableComponent = new DrawableComponent(
      bunnySprite(),
      blankTile()
    )
  ) {
    const spe = new SpaceTrashEntity();
    super(spe, [
      ...[
        new IntegerPositionComponent(x, y),
        new LitableComponent(),
        new ClassificationComponent("Tile"),
        new TileComponent(tiletype)
      ],
      d,
    ]);
    this.tiletype = tiletype;
  }

  position(): IntegerPositionComponent {
    const c = this.components.find((c) => {
      return c.constructor.name === "IntegerPositionComponent";
    }) as IntegerPositionComponent | undefined;

    if (!c) throw "missing component";

    return c;
  }
}

export class FloorTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      "FloorTile",
      new DrawableComponent(
        stoneSprite(),
        floorTile()
      )
    );
  }
}

export class WallTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      "WallTile",
      new DrawableComponent(
        brickSprite(),
        new THREE.Mesh(cubeGeo, blueMaterial)
      )
    );
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
