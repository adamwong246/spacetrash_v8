import { ArcadePhysics } from "arcade-physics";

import * as PIXI from "pixi.js";
import * as THREE from "three";

import { Component } from "../../../engine/VECS.ts/Component";

import {
  blueMaterial,
  voidMaterial,
  wallTexture,
  floorTexture,
} from "../../threejs";
import brick from "./../../Assets/brick.png";
import stone from "./../../Assets/stone.png";
import voidPng from "./../../Assets/void.png";

import { TileSize } from "../../Constants";

import { SpaceTrashEntity } from "../Entity";
import {
  DirectionComponent,
  IDirs,
  IntegerPositionComponent,
  OrdinalDirectionComponent,
} from "../Components/v2/physical";
import { ClassificationComponent } from "../Components/v2/classifiable";
import { DrawableComponent } from "../Components/v2/drawable";


import { ArcadePhysicsComponent } from "../Components/v2/arcadePhysics";

import { SpaceTrashEntityComponent, ITiles } from ".";
import { degToRad } from "three/src/math/MathUtils.js";
import { LightIncastingComponent } from "../Components/v1/casting/in";
import { TileComponent } from "../Components/v2/tileable";

const floorGeometry = new THREE.PlaneGeometry(TileSize, TileSize);

var cubeGeo = new THREE.BoxGeometry(TileSize, TileSize, TileSize);

const floorTile = () => {
  const m = new THREE.Mesh(floorGeometry, floorTexture);
  m.position.z = TileSize / 2;
  m.rotateY(degToRad(180))

  return m;
};

const wallTile = () => {
  const m = new THREE.Mesh(cubeGeo, wallTexture);

  return m;
};

// const wallTile = () => {
//   const m = new THREE.Mesh(cubeGeo, orangeMaterial);
//   // m.visible = false; //Math.random() > 0.75
//   return m;
// };

const voidTile = () => {
  const m = new THREE.Mesh(floorGeometry, voidMaterial);
  m.position.z = TileSize / 2;
  // m.visible = Math.random() > 0.9
  return m;
};

const blankTile = () => {
  const m = new THREE.Mesh(floorGeometry, blueMaterial);
  m.position.z = TileSize / 2;
  // m.visible = Math.random() > 0.9
  return m;
};

const voidSprite = () => {
  const s = new PIXI.Sprite(PIXI.Texture.from(voidPng));
  s.width = TileSize;
  s.height = TileSize;
  return s;
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
  const s = new PIXI.Sprite(
    PIXI.Texture.from("https://pixijs.com/assets/bunny.png")
  );
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
    d: DrawableComponent = new DrawableComponent(bunnySprite(), blankTile()),
    dir: DirectionComponent,

    componentsV4?: {
      arcadePhysics?: ArcadePhysicsComponent;
    }
  ) {
    const spe = new SpaceTrashEntity();

    const comps: Component<any, any>[] = [
      d,
      new IntegerPositionComponent(x, y),
      new LightIncastingComponent(),
      new ClassificationComponent("Tile"),
      new TileComponent(tiletype),
    ];

    if (dir !== undefined) {
      comps.push(dir);
    }

    super(spe, comps);

    this.tiletype = tiletype;

    if (componentsV4) {
      
      if (componentsV4.arcadePhysics) {
        comps.push(componentsV4.arcadePhysics);
      }
    }
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
      new DrawableComponent(stoneSprite(), floorTile(), new PIXI.Text(" "))
    );
  }
}

// export class WireframeWallTile extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(
//       x,
//       y,
//       "WallTile",
//       new DrawableComponent(
//         brickSprite(),
//         new THREE.Mesh(cubeGeo, blueMaterial),
//         new PIXI.Text('░')
//       )
//     );
//   }
// }

export class WallTile extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    super(
      x,
      y,
      "WallTile",
      new DrawableComponent(brickSprite(), wallTile(), new PIXI.Text("░")),
      new OrdinalDirectionComponent(d),
      {
       
        arcadePhysics: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
          const cube = ap.add.staticBody(
            x * TileSize,
            y * TileSize,
            TileSize,
            TileSize
          );
          return cube;
        }),
      }
    );
  }
}

export class VoidTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(
      x,
      y,
      "VoidTile",
      new DrawableComponent(voidSprite(), voidTile(), new PIXI.Text("█")),
      new OrdinalDirectionComponent("north"),
      {

      }
    );
  }
}

// export class North extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "North");
//   }
// }

// export class East extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "East");
//   }
// }

// export class West extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "West");
//   }
// }

// export class South extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "South");
//   }
// }

// export class TileA extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileA");
//   }
// }

// export class TileB extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileB");
//   }
// }

// export class TileC extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileC");
//   }
// }

// export class TileD extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileD");
//   }
// }

// export class TileE extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileE");
//   }
// }

// export class TileF extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileF");
//   }
// }

// export class TileG extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileG");
//   }
// }

// export class TileH extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileH");
//   }
// }

// export class TileI extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileI");
//   }
// }

// export class TileJ extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "TileI");
//   }
// }

// export class SouthWest extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "SouthWest");
//   }
// }

// export class SouthEast extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "SouthEast");
//   }
// }

// export class NorthWest extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "NorthWest");
//   }
// }

// export class NorthEast extends Tile {
//   constructor(x: number = 0, y: number = 0) {
//     super(x, y, "NorthEast");
//   }
// }

// // 16 tiles
// // https://www.boristhebrave.com/2021/05/23/triangle-grids/
// export const Tiles = [
//   FloorTile,
//   TileA,
//   TileB,
//   North,
//   TileC,
//   TileD,
//   East,
//   TileE,
//   TileF,
//   West,
//   TileG,
//   TileH,
//   South,
//   TileI,
//   TileJ,
//   WallTile,

//   SouthWest,
//   SouthEast,
//   NorthWest,
//   NorthEast,
// ];

// // export class DoorTile extends SpaceTrashEntityComponent {
// //   constructor(x: number = 0, y: number = 0, r: number = 0) {
// //     const spe = new SpaceTrashEntity();
// //     super(
// //       spe,
// //       [
// //         new PhysicsSetComponent(spe, x, y, true, 'Door'),
// //       // new AttackableComponent(spe),
// //       // new UnmovingComponent(spe),
// //       // new PowerConsumingComponent(spe),
// //       new SolidityComponent(spe, 0),
// //       new LightOutcastingComponent(spe)
// //       ],
// //     );
// //   }
// // }
