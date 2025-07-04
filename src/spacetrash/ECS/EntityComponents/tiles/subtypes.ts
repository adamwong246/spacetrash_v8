import * as PIXI from "pixi.js";
import * as THREE from "three";

import {
  Box,
  Circle,
  Ellipse,
  Line,
  Point,
  Polygon,
  PotentialVector,
} from "detect-collisions";

import {
  blueMaterial,
  voidMaterial,
  wallTexture,
  floorTexture,
  redMaterial,
  greenMaterial,
} from "../../../threejs";
import voidPng from "./../../../Assets/void.png";

import { TileSize } from "../../../Constants";

import {
  IDirs,
  OrdinalDirectionComponent,
} from "../../../../engine/game/physical";

import { degToRad } from "three/src/math/MathUtils.js";
import { PixiJsRenderableComponent } from "../../../../engine/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../../engine/rendering/threejs";
import { ArcadePhysics } from "../../../vendor/arcade-physics-main/src";
import { ArcadePhysicsComponent } from "../../Components/v4/PhaserArcade";
import { SamuraiTileComponent } from "../../../physics/SamuraiTile";
import { SamuraiTile } from "../../../physics/BasePolygon";
import { FlipComponent } from "../../Components/v4/FlipComponent";
import { Tile } from ".";
import { SP_PhysicalComponent } from "../../../../engine/physics/SP_Physical";

const PrismGeometryV2 = function (s: SamuraiTile): THREE.ExtrudeGeometry {
  const vectors = s.vectors.map((s) => {
    return new THREE.Vector2(s.x - 16, s.y - 16);
  });

  const geometry = new THREE.ExtrudeGeometry(new THREE.Shape(vectors), {
    depth: TileSize,
    bevelEnabled: false,
  });

  // geometry.rotateY(degToRad(90))

  geometry.rotateX(degToRad(0));
  geometry.rotateY(degToRad(0));
  geometry.rotateZ(degToRad(0));

  return geometry;

  // return m
};

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

const northEastMesh = (s: SamuraiTile) => {
  // const geometry = PrismGeometry();
  const geometry = PrismGeometryV2(s);
  // geometry.rotateZ(degToRad(-90));
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

const northWestMesh = (s: SamuraiTile) => {
  // const geometry = PrismGeometry();
  const geometry = PrismGeometryV2(s);
  geometry.rotateZ(degToRad(270));
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

const southEastMesh = (s: SamuraiTile) => {
  const geometry = PrismGeometryV2(s);
  geometry.rotateZ(degToRad(90));
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

const southWestMesh = (s: SamuraiTile) => {
  const geometry = PrismGeometryV2(s);
  geometry.rotateZ(degToRad(180));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  return m;
};

export class FloorTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    const samurai = new SamuraiTileComponent(
      x,
      y,
      "tile0",
      false,
      false,
      false
    );

    super({
      pixi: new PixiJsRenderableComponent(stoneSprite()),
      threejs: new ThreeJsRenderableComponent(floorTile()),
      samurai,
    });
  }
}

export class WallTile extends Tile {
  constructor(
    x: number = 0,
    y: number = 0
    
  ) {
    const samurai = new SamuraiTileComponent(
      x,
      y,
      "tile100",
      false,
      false,
      false
    );

    const physical = new Box({ x, y }, TileSize, TileSize);

    physical.setPosition(x*TileSize, y*TileSize, true); 
    // physical.setPosition(x, y, true);
    // physical.setScale(TileSize, TileSize, true);
    physical.setAngle(0, true);
    physical.isStatic = true;

    super({
      samurai,
      pixi: new PixiJsRenderableComponent(brickSprite()),
      threejs: new ThreeJsRenderableComponent(wallTile()),

      sp_physical: new SP_PhysicalComponent(x, y, physical),
      // arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
      //   const cube = ap.add.staticBody(
      //     x * TileSize,
      //     y * TileSize,
      //     TileSize,
      //     TileSize
      //   );
      //   cube.onOverlap = true;
      //   cube.onCollide = true;
      //   return cube;
      // }),
    });
  }
}

export class VoidTile extends Tile {
  constructor(x: number = 0, y: number = 0) {
    const samurai = new SamuraiTileComponent(
      x,
      y,
      "tile0",
      false,
      false,
      false
    );

    super({
      samurai,
      pixi: new PixiJsRenderableComponent(voidSprite()),
      threejs: new ThreeJsRenderableComponent(voidTile()),
    });
  }
}

export class NorthEast extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    const samurai = new SamuraiTileComponent(
      x,
      y,
      "corner",
      false,
      false,
      false
    );

    super({
      samurai,
      pixi: new PixiJsRenderableComponent(northEastSprite()),
      threejs: new ThreeJsRenderableComponent(
        northEastMesh(samurai.samuraiTile)
      ),
      arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
        const cube = ap.add.staticBody(
          x * TileSize,
          y * TileSize,
          TileSize,
          TileSize
        );
        return cube;
      }),
    });
  }
}

export class NorthWest extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    const samurai = new SamuraiTileComponent(
      x,
      y,
      "corner",
      true,
      false,
      false
    );
    super({
      samurai,
      pixi: new PixiJsRenderableComponent(northWestSprite()),
      threejs: new ThreeJsRenderableComponent(
        northWestMesh(samurai.samuraiTile)
      ),
      arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
        const cube = ap.add.staticBody(
          x * TileSize,
          y * TileSize,
          TileSize,
          TileSize
        );
        return cube;
      }),
    });
  }
}

export class SouthEast extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    const samurai = new SamuraiTileComponent(
      x,
      y,
      "corner",
      false,
      true,
      false
    );
    super({
      samurai,
      pixi: new PixiJsRenderableComponent(southEastSprite()),
      threejs: new ThreeJsRenderableComponent(
        southEastMesh(samurai.samuraiTile)
      ),
      arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
        const cube = ap.add.staticBody(
          x * TileSize,
          y * TileSize,
          TileSize,
          TileSize
        );
        return cube;
      }),
    });
  }
}

export class SouthWest extends Tile {
  constructor(x: number = 0, y: number = 0, d: IDirs) {
    const samurai = new SamuraiTileComponent(x, y, "corner", true, true, false);
    super({
      samurai,
      pixi: new PixiJsRenderableComponent(southWestSprite()),
      threejs: new ThreeJsRenderableComponent(
        southWestMesh(samurai.samuraiTile)
      ),
      arcade: new ArcadePhysicsComponent((ap: ArcadePhysics) => {
        const cube = ap.add.staticBody(
          x * TileSize,
          y * TileSize,
          TileSize,
          TileSize
        );
        return cube;
      }),
    });
  }
}
