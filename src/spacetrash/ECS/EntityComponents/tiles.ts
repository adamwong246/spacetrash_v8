import * as PIXI from "pixi.js";
import * as THREE from "three";

import { Component } from "../../../engine/VECS.ts/Component";

import {
  blueMaterial,
  voidMaterial,
  wallTexture,
  floorTexture,
  redMaterial,
} from "../../threejs";
import brick from "./../../Assets/brick.png";
import stone from "./../../Assets/stone.png";
import voidPng from "./../../Assets/void.png";

import { TileSize } from "../../Constants";

import { SpaceTrashEntity } from "../Entity";
import {
  DirectionComponent,
  IDirs,
  OrdinalDirectionComponent,
  PositionComponent,
} from "../../../engine/game/physical";

import { SpaceTrashEntityComponent, ITiles } from ".";
import { degToRad } from "three/src/math/MathUtils.js";
import { LightIncastingComponent } from "../Components/v1/casting/in";
import { TileComponent } from "../Components/v2/tileable";
import { HeatConductorComponent } from "../Components/v3/heat";
import { SP_IntegerPositionComponent } from "../Components/v4/IntegerPosition";
import { PixiJsRenderableComponent } from "../../../engine/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../engine/rendering/threejs";
import { ArcadePhysics } from "arcade-physics";
import { ArcadePhysicsComponent } from "../Components/v4/PhaserArcade";
// import { MatterComponent } from "../../../engine/physics/matterjs";
// import Matter from "matter-js";
// import { RapierPhysicalComponent } from "../../../engine/physics/rapier";
// import RAPIER from "@dimforge/rapier2d-simd";

const PrismGeometry = function (): THREE.ExtrudeGeometry {
  // Define the triangle vertices
  // const A = new THREE.Vector2(0, 0);
  // const B = new THREE.Vector2(0, TileSize);
  // const C = new THREE.Vector2(TileSize, 0);

  const A = new THREE.Vector2(-16, -16);
  const B = new THREE.Vector2(-16, 16);
  const C = new THREE.Vector2(16, -16);
  const height = TileSize;

  // Create a shape from the triangle
  const triangleShape = new THREE.Shape([
    A,
    B,
    C,
    // new THREE.Vector2(-10,  15), new THREE.Vector2(-10, -15), new THREE.Vector2( 10, -15)
  ]);

  // Create the extrusion geometry
  const geometry = new THREE.ExtrudeGeometry(triangleShape, {
    depth: height,
    bevelEnabled: false,
  });

  return geometry;

  // return m
};

// PrismGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);

const floorGeometry = new THREE.PlaneGeometry(TileSize, TileSize);

var cubeGeo = new THREE.BoxGeometry(TileSize, TileSize, TileSize);

const floorTile = () => {
  const m = new THREE.Mesh(floorGeometry, floorTexture);
  m.position.z = TileSize / 2;
  m.rotateY(degToRad(180));

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
  return m;
};

const blankTile = () => {
  const m = new THREE.Mesh(floorGeometry, blueMaterial);
  m.position.z = TileSize / 2;
  return m;
};

const voidSprite = () => {
  const s = new PIXI.Sprite(PIXI.Texture.from(voidPng));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const stoneSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-EMPTY`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const brickSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-FULL`));
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

const northEastSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-NORTHEAST`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const northEastMesh = () => {
  const geometry = PrismGeometry();
  geometry.rotateZ(degToRad(-90));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  return m;
};

const northWestSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-NORTHWEST`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const northWestMesh = () => {
  const geometry = PrismGeometry();
  geometry.rotateZ(degToRad(180));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  return m;
};

const southEastSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-SOUTHEAST`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const southEastMesh = () => {
  const geometry = PrismGeometry();
  geometry.rotateZ(degToRad(0));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  return m;
};

const southWestSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-SOUTHWEST`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const southWestMesh = () => {
  const geometry = PrismGeometry();
  geometry.rotateZ(degToRad(90));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  return m;
};

export class Tile extends SpaceTrashEntityComponent {
  tiletype: ITiles;

  position: PositionComponent;

  constructor(
    x: number,
    y: number,
    tiletype: ITiles,
    {
      // matter,
      pixi,
      threejs,
      arcade,
      dir,
    }: {
      // rapier?: RapierPhysicalComponent;
      // matter?: MatterComponent;
      pixi?: PixiJsRenderableComponent;
      threejs?: ThreeJsRenderableComponent;
      arcade?: ArcadePhysicsComponent;
      dir?: DirectionComponent;
    }
  ) {
    let position = new SP_IntegerPositionComponent(x, y);
    const spe = new SpaceTrashEntity();

    const comps: Component<any, any>[] = [
      position,
      new LightIncastingComponent(),
      new TileComponent(tiletype),
      new HeatConductorComponent(1),
    ];

    super(spe, comps);

    this.position = position;

    if (dir !== undefined) {
      comps.push(dir);
    }

    if (arcade !== undefined) {
      comps.push(arcade);
    }

    if (threejs !== undefined) {
      comps.push(threejs);
    }

    if (pixi !== undefined) {
      comps.push(pixi);
    } else {
      throw "must have sprite";
    }

    // if (matter !== undefined) {
    //   comps.push(matter);
    // }

    this.tiletype = tiletype;
  }

  // position(): SP_IntegerPosition {
  //   const c = this.components.find((c) => {
  //     return c.constructor.name === "IntegerPositionComponent";
  //   }) as SP_IntegerPosition | undefined;

  //   if (!c) throw "missing component";

  //   return c;
  // }
}

export class FloorTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "FloorTile", {
      pixi: new PixiJsRenderableComponent(stoneSprite()),
      threejs: new ThreeJsRenderableComponent(floorTile()),
    });
  }
}

export class WallTile extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    super(
      x,
      y,
      "WallTile",

      {
        dir: new OrdinalDirectionComponent(d),
        pixi: new PixiJsRenderableComponent(brickSprite()),
        threejs: new ThreeJsRenderableComponent(wallTile()),
        arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
          const cube = ap.add.staticBody(
            x * TileSize,
            y * TileSize,
            TileSize,
            TileSize
          );
          return cube;
        }),

        // matter: new MatterComponent(
        //   // Matter.Bodies.rectangle((MapSize * TileSize) / 2, (MapSize * TileSize) / 2, TileSize, TileSize, {
        //   Matter.Bodies.rectangle(
        //     (x * TileSize) / 4,
        //     (y * TileSize) / 4,
        //     TileSize / 4,
        //     TileSize / 4,
        //     {
        //       isStatic: true,
        //       // collisionFilter: {
        //       //   category: 0,
        //       // },
        //       render: {
        //         fillStyle: "green",
        //         strokeStyle: "orange",
        //         lineWidth: 3,
        //       },
        //     }
        //   )
        // ),

        // rapier: new RapierPhysicalComponent(
        //   RAPIER.RigidBodyDesc.fixed().setTranslation(x, y),
        //   RAPIER.ColliderDesc.cuboid(TileSize, TileSize)
        // ),
      }
    );
  }
}

export class VoidTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    super(x, y, "VoidTile", {
      pixi: new PixiJsRenderableComponent(voidSprite()),
      threejs: new ThreeJsRenderableComponent(voidTile()),
    });
  }
}

export class NorthEast extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    super(
      x,
      y,
      "NorthEast",

      {
        dir: new OrdinalDirectionComponent(d),

        pixi: new PixiJsRenderableComponent(northEastSprite()),

        threejs: new ThreeJsRenderableComponent(northEastMesh()),
        arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
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

export class NorthWest extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    super(
      x,
      y,
      "NorthEast",

      {
        dir: new OrdinalDirectionComponent(d),

        pixi: new PixiJsRenderableComponent(northWestSprite()),

        threejs: new ThreeJsRenderableComponent(northWestMesh()),
        arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
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

export class SouthEast extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    super(
      x,
      y,
      "SouthEast",

      {
        dir: new OrdinalDirectionComponent(d),

        pixi: new PixiJsRenderableComponent(southEastSprite()),

        threejs: new ThreeJsRenderableComponent(southEastMesh()),
        arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
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

export class SouthWest extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    super(
      x,
      y,
      "SouthEast",

      {
        dir: new OrdinalDirectionComponent(d),

        pixi: new PixiJsRenderableComponent(southWestSprite()),

        threejs: new ThreeJsRenderableComponent(southWestMesh()),
        arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
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