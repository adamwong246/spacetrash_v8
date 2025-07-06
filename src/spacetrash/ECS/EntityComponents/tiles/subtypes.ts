// import * as PIXI from "pixi.js";
// import * as THREE from "three";

// import {
//   Box,
//   deg2rad,
//   Polygon,
// } from "detect-collisions";

// import {
//   blueMaterial,
//   voidMaterial,
//   wallTexture,
//   floorTexture,
// } from "../../../threejs";
// import voidPng from "./../../../Assets/void.png";

// import { TileSize } from "../../../Constants";


// import { degToRad } from "three/src/math/MathUtils.js";
// import { PixiJsRenderableComponent } from "../../../../engine/rendering/pixijs";
// import { ThreeJsRenderableComponent } from "../../../../engine/rendering/threejs";
// import { SamuraiTileComponent } from "../../../physics/SamuraiTile";
// import { SamuraiTile } from "../../../physics/BasePolygon";
// import { Tile } from ".";
// import { SP_PhysicalComponent } from "../../../../engine/physics/SP_Physical";



// // const wallTile = () => {
// //   const m = new THREE.Mesh(cubeGeo, orangeMaterial);
// //   // m.visible = false; //Math.random() > 0.75
// //   return m;
// // };

// const voidTile = () => {
//   const m = new THREE.Mesh(floorGeometry, voidMaterial);
//   m.position.z = TileSize / 2;
//   return m;
// };

// const blankTile = () => {
//   const m = new THREE.Mesh(floorGeometry, blueMaterial);
//   m.position.z = TileSize / 2;
//   return m;
// };

// const voidSprite = () => {
//   const s = new PIXI.Sprite(PIXI.Texture.from(voidPng));
//   s.width = TileSize;
//   s.height = TileSize;
//   return s;
// };



// export class FloorTile extends Tile {
//   constructor(
//     x: number,
//     y: number,
//     hFlip: boolean,
//     vFlip: boolean,
//     dFlip: boolean
//   ) {
//     super({
//       pixi: new PixiJsRenderableComponent(stoneSprite()),
//       threejs: new ThreeJsRenderableComponent(floorTile(x, y)),
//       samurai: new SamuraiTileComponent(x, y, hFlip, vFlip, dFlip, "tile0"),
//     });
//   }
// }

// export class WallTile extends Tile {
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

//     const physical = new Box({ x, y }, TileSize, TileSize);
//     physical.setPosition(x * TileSize, y * TileSize, true);
//     physical.setAngle(0, true);
//     physical.isStatic = true;

//     super({
//       samurai,
//       pixi: new PixiJsRenderableComponent(brickSprite()),
//       threejs: new ThreeJsRenderableComponent(wallTile(x, y)),
//       sp_physical: new SP_PhysicalComponent(physical),
//     });
//   }
// }

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
