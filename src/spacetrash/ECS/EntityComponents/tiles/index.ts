import * as PIXI from "pixi.js";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Box, deg2rad, Polygon } from "detect-collisions";

import { SamuraiTile } from "../../../physics/BasePolygon";
import { SpaceTrashEntityComponent } from "..";
import { SP_PhysicalComponent } from "../../../../engine/physics/SP_Physical";
import { PixiJsRenderableComponent } from "../../../../engine/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../../engine/rendering/threejs";
import { Component } from "../../../../engine/VECS.ts/Component";
import { TileSize } from "../../../Constants";
import { SamuraiTileComponent } from "../../../physics/SamuraiTile";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { HeatConductorComponent } from "../../Components/v3/heat";
import { SpaceTrashEntity } from "../../Entity";

import sj from "../../../tiled/levl20.json";
import {
  floorTexture,
  wallTexture,
  voidMaterial,
  blueMaterial,
} from "../../../threejs";

export const cornerGID = 2;

const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
const FLIPPED_VERTICALLY_FLAG = 0x40000000;
const FLIPPED_DIAGONALLY_FLAG = 0x20000000;
const FLIPPED_HEX_ROTATE_120_FLAG = 0x10000000;

const firstgid = sj.tilesets[0].firstgid;

function isFlippedDiagonally(gid: number) {
  return (gid & FLIPPED_DIAGONALLY_FLAG) !== 0;
}

function isNotFlippedDiagonally(gid: number) {
  return !isFlippedDiagonally(gid);
}

function isFlippedHorizontal(gid: number) {
  return (gid & FLIPPED_HORIZONTALLY_FLAG) !== 0;
}

function isNotFlippedHoizontal(gid: number) {
  return !isFlippedHorizontal(gid);
}

function isFlippedVertical(gid: number) {
  return (gid & FLIPPED_VERTICALLY_FLAG) !== 0;
}

function isNotFlippedVertical(gid: number) {
  return !isFlippedVertical(gid);
}

// const lookup = {
//   0: FloorTile,
//   1: WallTile,
// };

export class Tile extends SpaceTrashEntityComponent {
  x: number;
  y: number;

  constructor({
    pixi,
    threejs,
    samurai,
    sp_physical,
  }: {
    pixi: PixiJsRenderableComponent;
    threejs: ThreeJsRenderableComponent;
    samurai: SamuraiTileComponent;
    sp_physical?: SP_PhysicalComponent;
  }) {
    const spe = new SpaceTrashEntity();

    const comps: Component<any, any>[] = [
      pixi,
      threejs,
      samurai,
      new LightIncastingComponent(),
      new HeatConductorComponent(1),
    ];

    if (sp_physical) {
      comps.push(sp_physical);
    }

    super(spe, comps);

    this.x = samurai.x;
    this.y = samurai.y;
  }

  // decode a Tiled editor Global ID
  static decodeGid = (gid: number) => {
    // Extract flip flags
    const flipFlags =
      gid &
      (FLIPPED_HORIZONTALLY_FLAG |
        FLIPPED_VERTICALLY_FLAG |
        FLIPPED_DIAGONALLY_FLAG |
        FLIPPED_HEX_ROTATE_120_FLAG); // Include this flag even for non-hex maps

    // Clear the flip flags from the GID to get the actual tile ID
    const tileId = gid & ~flipFlags;

    return tileId - firstgid;
  };

  static fromGid(gid: number, x: number, y: number) {
    const tid = Tile.decodeGid(gid);

    // if (!lookup[tid]) throw "wtf";

    const p: [number, number, boolean, boolean, boolean] = [
      x,
      y,
      isFlippedHorizontal(gid),
      isFlippedVertical(gid),
      isFlippedDiagonally(gid),
    ];

    if (tid === 0) {
      return new FloorTile(...p);
    }
    if (tid === 1) {
      return new WallTile(...p);
    }
    if (tid === 2) {
      return new CornerTile(...p);
    }
    
    return new FloorTile(...p)
    

    //     if (tid === 1 || tid === 14) {
    //   const w = new WallTile(x, y);
    //   this.addToMap(w);
    // } else if (tid === 0) {
    //   this.addToMap(new FloorTile(x, y));
    // } else if (tid === 2) {
    //   // const tileKlass = truthTable(tid);

    //   this.addToMap(Tile.fromGid(globalId));

    //   // const x = NorthEast;

    //   // const y = new x(1, 2, "north");
    //   // this.addToMap(new NorthEast(x, y));

    //   // if (isFlippedDiagonally(md[z])) {
    //   //   debugger

    //   // }

    //   // if (isFlippedNiether(md[z])) {
    //   //   this.addToMap(new NorthEast(x, y));

    //   // } else if (isFlippedOnlyHorizontal(md[z])) {
    //   //   this.addToMap(new SouthEast(x, y));

    //   // } else if (isFlippedOnlyVertical(md[z])) {
    //   //   this.addToMap(new NorthWest(x, y));

    //   // } else if (isFlippedBoth(md[z])) {
    //   //   this.addToMap(new SouthWest(x, y));

    //   // } else {
    //   //   throw "that cannot be";
    //   // }
    // } else if (tid === 43) {
    //   console.error("TILE_60 not implemented");
    // } else if (tid === 33) {
    //   console.error("TILE_50 not implemented");
    // } else if (tid === 44) {
    //   console.error("TILE_80 not implemented");
    // } else if (tid === 0) {
    //   this.addToMap(new FloorTile(x, y));
    // } else if (tid === 41) {
    //   console.error("TILE_20 not implemented");
    // } else if (tid === 42) {
    //   console.error("TILE_40 not implemented");
    // } else if (tid === 36) {
    //   console.error("TILE_66 not implemented");
    // } else if (tid === 35) {
    //   console.error("TILE_75 not implemented");
    // } else if (tid === 34) {
    //   console.error("TILE_25 not implemented");
    // } else if (tid === 9) {
    //   console.error("TILE_25 not implemented");
    // } else {
    //   console.error(`unknown tile: ${tid}, ${x}, ${y}`);
    //   // throw `unknown tile`;
    //   // this.addToMap(new FloorTile(x, y));
    //   const w = new WallTile(x, y);
    // }
  }
}

export type ITiles =
  | `VoidTile`
  | `Door`
  | "SouthWest"
  | "SouthEast"
  | "NorthWest"
  | "NorthEast"
  | `FloorTile`
  | `TileA`
  | `TileB`
  | `North`
  | `TileC`
  | `TileD`
  | `East`
  | `TileE`
  | `TileF`
  | `West`
  | `TileG`
  | `TileH`
  | `South`
  | `TileI`
  | `TileJ`
  | `WallTile`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

const floorTile = (x: number, y: number) => {
  const m = new THREE.Mesh(floorGeometry, floorTexture);
  m.position.z = TileSize / 2;
  m.position.x = x * TileSize;
  m.position.y = y * TileSize;

  m.rotateY(degToRad(180));

  return [m];
};

const wallTile = (x: number, y: number) => {
  const geom = new THREE.PlaneGeometry(TileSize, TileSize);

  // geom.translate(0, 0, 16);

  const northFaceingWall = new THREE.Mesh(geom.translate(0, 0, 16), wallTexture);
  northFaceingWall.rotation.x = deg2rad(90);

  const southFaceingWall = new THREE.Mesh(geom.translate(0, 0, 0), wallTexture);
  southFaceingWall.rotation.x = -deg2rad(90);

  const eastFacingWall = new THREE.Mesh(geom.translate(0, 0, 0), wallTexture);;
  eastFacingWall.rotation.y = deg2rad(90);

  const westFacingWall = new THREE.Mesh(geom.translate(0, 0, 0), wallTexture);
  westFacingWall.rotation.y = -deg2rad(90);

  return [
    northFaceingWall,
    southFaceingWall, 
    eastFacingWall, 
    westFacingWall
  ];
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

// const bunnySprite = () => {
//   const s = new PIXI.Sprite(
//     PIXI.Texture.from("https://pixijs.com/assets/bunny.png")
//   );
//   s.width = TileSize;
//   s.height = TileSize;
//   return s;
// };

const northEastSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-NORTHEAST`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const northEastMesh = (s: SamuraiTile, x: number, y: number) => {
  // const geometry = PrismGeometry();
  const geometry = PrismGeometryV2(s);
  // geometry.rotateZ(degToRad(-90));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  m.position.x = x * TileSize;
  m.position.y = y * TileSize;
  return m;
};

const northWestSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-NORTHWEST`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const northWestMesh = (s: SamuraiTile, x: number, y: number) => {
  const geometry = PrismGeometryV2(s);
  geometry.rotateZ(degToRad(270));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  m.position.x = x * TileSize;
  m.position.y = y * TileSize;
  return m;
};

const southEastSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-SOUTHEAST`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const southEastMesh = (s: SamuraiTile, x: number, y: number) => {
  const geometry = PrismGeometryV2(s);
  geometry.rotateZ(degToRad(90));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  m.position.x = x * TileSize;
  m.position.y = y * TileSize;
  return m;
};

const southWestSprite = () => {
  const s = new PIXI.Sprite(PIXI.Cache.get(`slopes32Png-SOUTHWEST`));
  s.width = TileSize;
  s.height = TileSize;
  return s;
};

const southWestMesh = (s: SamuraiTile, x: number, y: number) => {
  const geometry = PrismGeometryV2(s);
  geometry.rotateZ(degToRad(180));
  const m = new THREE.Mesh(geometry, wallTexture);
  m.position.z = -TileSize / 2;
  m.position.x = x * TileSize;
  m.position.y = y * TileSize;
  return m;
};

export class FloorTile extends Tile {
  constructor(
    x: number,
    y: number,
    hFlip: boolean,
    vFlip: boolean,
    dFlip: boolean
  ) {
    super({
      pixi: new PixiJsRenderableComponent(stoneSprite()),
      threejs: new ThreeJsRenderableComponent(floorTile(x, y)),
      samurai: new SamuraiTileComponent(x, y, hFlip, vFlip, dFlip, "tile0"),
    });
  }
}

export class WallTile extends Tile {
  constructor(
    x: number,
    y: number,
    hFlip: boolean,
    vFlip: boolean,
    dFlip: boolean
  ) {
    const samurai = new SamuraiTileComponent(
      x,
      y,
      hFlip,
      vFlip,
      dFlip,
      "corner"
    );

    const physical = new Box({ x, y }, TileSize, TileSize);
    physical.setPosition(x * TileSize, y * TileSize, true);
    physical.setAngle(0, true);
    physical.isStatic = true;

    super({
      samurai,
      pixi: new PixiJsRenderableComponent(brickSprite()),
      threejs: new ThreeJsRenderableComponent(wallTile(x *TileSize, y * TileSize)),
      sp_physical: new SP_PhysicalComponent(physical),
    });
  }
}

export class CornerTile extends Tile {
  constructor(
    x: number,
    y: number,
    hFlip: boolean,
    vFlip: boolean,
    dFlip: boolean
  ) {
    const samurai = new SamuraiTileComponent(
      x,
      y,
      hFlip,
      vFlip,
      dFlip,
      "corner"
    );

    const physical = new Polygon({ x, y }, [
      { x: 0, y: 0 },
      { x: 32, y: 32 },
      { x: 32, y: 0 },
      { x: 0, y: 0 },
    ]);

    physical.isStatic = true;
    physical.setPosition(x * TileSize, y * TileSize, true);

    super({
      samurai,
      pixi: new PixiJsRenderableComponent(southWestSprite()),
      threejs: new ThreeJsRenderableComponent([
        southWestMesh(samurai.samuraiTile, x, y),
      ]),
      sp_physical: new SP_PhysicalComponent(physical),
    });
  }
}


// export class NorthEast extends Tile {
//   constructor(
//     x: number,
//     y: number,
//     tiledGid: number,
//     hFlip: boolean,
//     vFlip: boolean,
//     dFlip: boolean
//   ) {
//     const samurai = new SamuraiTileComponent(
//       x,
//       y,
//       hFlip,
//       vFlip,
//       dFlip,
//       "corner"
//     );

//     const physical = new Polygon({ x, y }, [
//       { x: 0, y: 0 },
//       { x: 32, y: 32 },
//       { x: 0, y: 32 },
//       { x: 0, y: 0 },
//     ]);

//     physical.setPosition(x * TileSize, y * TileSize, true);
//     physical.setAngle(0, true);
//     physical.isStatic = true;

//     super({
//       sp_physical: new SP_PhysicalComponent(physical),
//       samurai,
//       pixi: new PixiJsRenderableComponent(northEastSprite()),
//       threejs: new ThreeJsRenderableComponent([
//         northEastMesh(samurai.samuraiTile, x, y),
//       ]),
//     });
//   }
// }

// export class NorthWest extends Tile {
//   constructor(
//     x: number,
//     y: number,
//     hFlip: boolean,
//     vFlip: boolean,
//     dFlip: boolean
//   ) {
//     const samurai = new SamuraiTileComponent(
//       x,
//       y,
//       hFlip,
//       vFlip,
//       dFlip,
//       "corner"
//     );

//     const physical = new Polygon({ x, y }, [
//       { x: 32, y: 0 },
//       { x: 32, y: 32 },
//       { x: 0, y: 32 },
//       { x: 32, y: 0 },
//     ]);

//     physical.setPosition(x * TileSize, y * TileSize, true);
//     physical.setAngle(0, true);
//     physical.isStatic = true;

//     super({
//       samurai,
//       pixi: new PixiJsRenderableComponent(northWestSprite()),
//       threejs: new ThreeJsRenderableComponent([
//         northWestMesh(samurai.samuraiTile, x, y),
//       ]),
//       sp_physical: new SP_PhysicalComponent(physical),
//     });
//   }
// }

// export class SouthEast extends Tile {
//   constructor(
//     x: number,
//     y: number,
//     hFlip: boolean,
//     vFlip: boolean,
//     dFlip: boolean
//   ) {
//     const samurai = new SamuraiTileComponent(
//       x,
//       y,
//       hFlip,
//       vFlip,
//       dFlip,
//       "corner"
//     );

//     const physical = new Polygon({ x, y }, [
//       { x: 32, y: 0 },
//       { x: 0, y: 0 },
//       { x: 0, y: 32 },
//       { x: 32, y: 0 },
//     ]);
//     physical.isStatic = true;
//     physical.setPosition(x * TileSize, y * TileSize, true);

//     super({
//       samurai,
//       pixi: new PixiJsRenderableComponent(southEastSprite()),
//       threejs: new ThreeJsRenderableComponent([
//         southEastMesh(samurai.samuraiTile, x, y),
//       ]),
//       sp_physical: new SP_PhysicalComponent(physical),
//     });
//   }
// }

// export class SouthWest extends Tile {
//   constructor(
//     x: number,
//     y: number,
//     hFlip: boolean,
//     vFlip: boolean,
//     dFlip: boolean
//   ) {
//     const samurai = new SamuraiTileComponent(
//       x,
//       y,
//       hFlip,
//       vFlip,
//       dFlip,
//       "corner"
//     );

//     const physical = new Polygon({ x, y }, [
//       { x: 0, y: 0 },
//       { x: 32, y: 32 },
//       { x: 32, y: 0 },
//       { x: 0, y: 0 },
//     ]);

//     physical.isStatic = true;
//     physical.setPosition(x * TileSize, y * TileSize, true);

//     super({
//       samurai,
//       pixi: new PixiJsRenderableComponent(southWestSprite()),
//       threejs: new ThreeJsRenderableComponent([
//         southWestMesh(samurai.samuraiTile, x, y),
//       ]),
//       sp_physical: new SP_PhysicalComponent(physical),
//     });
//   }
// }
