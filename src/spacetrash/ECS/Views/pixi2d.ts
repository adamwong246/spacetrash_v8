import { Application, Loader, Sprite } from "pixi.js";

import { MapSize, TileSize } from "../System";

import { IView } from "../../../engine/VECS.ts/View";
import { SpaceTrash } from "../..";
// import { DrawingStore } from "../Components/v2/drawings";
import { DrawableComponent, DrawableStore } from "../Components/v2/drawable";
import { Assets } from "@pixi/assets";

import brick from "./../../Assets/brick.png";
import stone from "./../../Assets/stone.png";

let pixi2dApp: Application;
let tick = -1;
let drawables: DrawableStore;
let ctx: HTMLCanvasElement;

let brickTexture;
let stoneTexture;
let bunnyTexture;

const render: IView<any> = async (game, canvas) => {
  if (!game) debugger;
  if (tick === -1) {
    drawables = game.componentStores["DrawableComponent"] as DrawableStore;

    await firstRender(game, canvas);
    tick++;
  } else {
    pixi2dApp.render();
  }

  return;
};

const firstRender = async (game: SpaceTrash, canvas) => {
  pixi2dApp = new Application({
    width: (MapSize + 7) * TileSize,
    height: (MapSize + 7) * TileSize,
    antialias: true, // 抗锯齿，圆滑边界
    resolution: 1,
    view: canvas.getContext("webgl2")?.canvas,
    backgroundColor: 0x00ff00,
    sharedTicker: false,
  });

  pixi2dApp.ticker.stop();
  pixi2dApp.ticker.destroy();
  pixi2dApp.renderer.plugins.interaction.useSystemTicker = false;

  const g = game;

  const loader = new Loader();
  loader.add("stone", stone); // Replace with your image path
  loader.load((loader, resources) => {


    Object.keys(drawables.store).forEach(async ([k, i]) => {

      const bunny = new Sprite(resources.stone.texture);
    // bunny.x = 100 * Math.random();
    // bunny.y = 100 * Math.random();
      // bunny.anchor.set(0.5);
      
      pixi2dApp.stage.addChild(bunny)
      await drawables.store[k][1].setSprite(bunny);

      // console.log(i);
      // drawables.store[k][1];

      // if (
      //   drawables.store[k][1].textureURL === "https://pixijs.com/assets/bunny.png"
      // ) {
      //   // const s = Sprite.from(brickTexture);
      //   // s.position.x = 100 * Math.random();
      //   // s.position.y = 100 * Math.random();
      //   await drawables.store[k][1].setSprite(pixi2dApp.stage.addChild(bunny));
      //   // console.log("pixi", drawables.store[k][1].sprite);
      // }

      // pixi2dApp.stage.addChild(d.drawable.sprite);
    });

    // debugger

    // pixi2dApp.stage.addChild(bunny);
  });

  // brickTexture = await Assets.load(brick);
  // stoneTexture = await Assets.load(stone);
  // bunnyTexture = await Assets.load("https://pixijs.com/assets/bunny.png");

  return;
};

////////////////////////////////////////////////////////

// const everyOtherRender = async (game: SpaceTrash) => {
//   drawings.store.forEach(([i, a]: [number, DrawingComponent], dnx) => {
//     console.log(i, a)
//     if (a.drawable.sprite) {
//       if (a.drawState === "new") {
//         pixi2dApp.stage.addChild(a.drawable.sprite);
//         a.drawState = "rendered";
//       }

//       if (a.drawState === "culled") {
//         pixi2dApp.stage.removeChild(a.drawable.sprite);
//       }

//       if (a.drawState === "invisible") {
//         a.drawable.sprite.visible = false;
//       }

//       if (a.drawState === "visible") {
//         a.drawable.sprite.visible = true;
//       }

//       if (a.drawState === "no-op") {
//         // do nothing
//       }

//       delete drawings.store[dnx];
//     }
//   });

//   pixi2dApp.render();

//   // if pixi2dApp.stage.c
//   // actors.store.forEach((actor, i) => {
//   //   if (actors.store[i]) {
//   //     actors.store[i].x = actor.floatPosition.x * TileSize;
//   //     actors.store[i].y = actor.floatPosition.y * TileSize;
//   //     // actors[i].render(  )
//   //   } else {
//   //     throw "no actor?";
//   //   }
//   // });

//   // for (let y = 0; y < MapSize; y++) {
//   //   // tiles[y] = [];
//   //   for (let x = 0; x < MapSize; x++) {
//   //     const l = setPieces.get(y, x).luminance;
//   //     if (l > 0) {
//   //       tiles[y][x][0].visible = true;
//   //     } else {
//   //       tiles[y][x][0].visible = false;
//   //     }
//   //   }
//   // }
// };

export default render;

// Assets.load("https://pixijs.com/assets/bunny.png").then((texture) => {
//   // Create a sprite
//   bunny = new Sprite(texture);

//   // Set the sprite's anchor point to its center
// rectangle.anchor.set(0.5);

//   // Set the sprite's position
// rectangle.x = pixi2dApp.screen.width / 2;
// rectangle.y = pixi2dApp.screen.height / 2;

//   // Add the sprite to the stage
// pixi2dApp.stage.addChild(rectangle);

//   // pixi2dApp.render()

//   // Animate the sprite
//   // pixi2dApp.ticker.add((delta) => {
//   //   bunny.rotation += 0.01 * delta;
//   // });
// });

// bunny.rotation = rotation++;
// console.log(tiles)
// for (let y = 0; y < MapSize; y++) {
//   for (let x = 0; x < MapSize; x++) {
//     tiles[y][x][0].rotation = rotation++;
//     // cubes[y][x].position.x = x* 2.1;
//     // cubes[y][x].position.y = y*2.1;
//     // cubes[y][x].rotationQuaternion.setEulerAngles(rotation, rotation, rotation);
//     if (!twoD[y][x].culledWebgl) {
//       // console.log(setpiece.renderedWebgl);
//       if (twoD[y][x].renderedWebgl === "fresh") {
//         // if (!twoD[y][x].mesh) {
//         //   console.error(twoD[y][x]);
//         //   throw "no mesh";
//         //   // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//         // }
//         // cubes[y][x].position.x = x * 2.1;
//         // cubes[y][x].position.y = y * TileSize;
//         // counter++;
//         // scene.add(twoD[y][x].mesh);
//         pixi2dApp.stage.addChild(tiles[y][x][0]);
//         tiles[y][x][1] = true;
//         // console.log(`${counter} / ${MapSize * MapSize}`, y, x, twoD[y][x].mesh)
//         twoD[y][x].renderedWebgl = "rendered";
//       } else if (twoD[y][x].renderedWebgl === "changed") {
//         if (tiles[y][x][1] === false) {
//           pixi2dApp.stage.addChild(tiles[y][x][0]);
//         }
//         // if (!twoD[y][x].mesh) {
//         //   console.error(twoD[y][x]);
//         //   throw "no mesh, changed";
//         // }
//         // cubes[y][x].position.x = x * TileSize;
//         // cubes[y][x].position.y = y * TileSize;
//       } else if (twoD[y][x].renderedWebgl === "unchanged") {
//         if (!twoD[y][x].mesh) {
//           // console.error(twoD[y][x]);
//           // throw "no mesh, unchanged";
//           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//         }
//         // no-op
//       } else if (twoD[y][x].renderedWebgl === "rendered") {
//         if (!twoD[y][x].mesh) {
//           // console.error(twoD[y][x]);
//           // throw "no mesh, rendered";
//           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//         }
//         // no-op
//       } else {
//         throw `should not be in renderState ${JSON.stringify(twoD[y][x])}`;
//       }
//       // drawOperations.push(SpaceTrashDrone.draw2d(s));
//     } else {
//       // scene.remove(twoD[y][x].mesh);
//       if (tiles[y][x][1]) {
//         pixi2dApp.stage.removeChild(tiles[y][x][0]);
//       }
//       tiles[y][x][1] = false;
//       // scene.remove(setpiece.mesh);
//     }
//   }
// }
// oneD.forEach((actor, i) => {
//   // do things
// });

// brickTexture = await Assets.load(brick);
// stoneTexture = await Assets.load(stone);
// bunnyTexture = await Assets.load("https://pixijs.com/assets/bunny.png");

// for (let y = 0; y < MapSize; y++) {
//   tiles[y] = [];
//   for (let x = 0; x < MapSize; x++) {
//     const t = setPieces.get(y, x).tileType;

//     let s: Sprite;
//     if (t === "FloorTile") {
//       s = Sprite.from(stoneTexture);
//     } else if (t === "WallTile") {
//       s = Sprite.from(brickTexture);
//     } else {
//       debugger
//       s = Sprite.from(bunnyTexture);
//     }

//     s.width = TileSize;
//     s.height = TileSize;
//     // s.tint = 0xff0000;

//     // cubes[y][x] = [] as Mesh3D;

//     // const bunny = new Sprite(texture);

//     // Set the sprite's anchor point to its center
//     // s.anchor.set(0.5);

//     // Set the sprite's position
//     s.x = x * TileSize * 1.1;
//     s.y = y * TileSize * 1.1;

//     // Add the sprite to the stage
//     pixi2dApp.stage.addChild(s);

//     tiles[y][x] = [s, true];

//     // t.position.x = x * 2.1;
//     // cube.position.y = y * 2.1;
//     // cube.position.z =y;
//     // cube.position.z = y * TileSize;
//     // cube.position.set(x *2, y *2,  y *2)
//     // const t = new Transform3D()
//     // t.position.x = x * TileSize;
//     // t.position.y = y * TileSize;
//     // cube.transform = t;
//     // cube.visible = true;
//     // console.log(cube.position.x, cube.position.y)
//     // pixi3dApp.stage.addChild(cube);
//     // const e = cube;
//     // cubes[y][x] = [e, true];
//     // pixi3dApp.render()
//   }
// }

// setPieces.store.forEach((actor, i) => {
//   actors[i] = Sprite.from(bunnyTexture);
//   actors[i].width = ActorSize;
//   actors[i].height = ActorSize;
//   actors[i].x = actor.actorX * TileSize;
//   actors[i].y = actor.actorY * TileSize;
//   console.log(actor.friendly);
//   if (!actor.friendly) {
//     actors[i].tint = 0x000000aa;
//   } else {
//     actors[i].tint = 0x000aa000;
//   }

//   pixi2dApp.stage.addChild(actors[i]);
// });
