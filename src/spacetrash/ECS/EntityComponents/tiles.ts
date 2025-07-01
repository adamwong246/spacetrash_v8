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

  position: PositionComponent;

  constructor(
    x: number,
    y: number,
    tiletype: ITiles,
    {
      pixi,
      threejs,
      arcade,
      dir,
    }: {
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
    }

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
