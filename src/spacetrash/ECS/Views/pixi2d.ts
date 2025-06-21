import { Application, Loader, Sprite } from "pixi.js";

import { IView } from "../../../engine/VECS.ts/View";

import { SpaceTrash } from "../..";

import brick from "./../../Assets/brick.png";
import stone from "./../../Assets/stone.png";

import { MapSize, TileSize } from "../System";
import { DrawableStore } from "../Components/v2/drawable";

let pixi2dApp: Application;
let tick = -1;
let drawables: DrawableStore;

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
  loader.onComplete.add(() => {
    game.pixiLoaded = true
  }); 


  // let binding = mySignal.add(onSignal);
  // mySignal.dispatch("foo", "bar");
  // mySignal.detach(binding);

  // loader.onComplete(mySignal);

  loader.add("stone", stone); // Replace with your image path
  await loader.add("brick", brick); // Replace with your image path
  await loader.add("bunny", "https://pixijs.com/assets/bunny.png"); // Replace with your image path=
  await loader.load((loader, resources) => {
    Object.keys(drawables.store).forEach(async ([i]) => {
      const d = drawables.store[i][1];
      let sprite: Sprite;
      if (d.textureURL === "brick") {
        sprite = new Sprite(resources.brick.texture);
      } else if (d.textureURL === "stone") {
        sprite = new Sprite(resources.stone.texture);
      } else if (d.textureURL === "bunny") {
        sprite = new Sprite(resources.bunny.texture);
      } else {
        console.error(`I don't recognize this texture ${d.textureURL}`);
        return;
      }
      sprite.width = TileSize;
      sprite.height = TileSize;
      pixi2dApp.stage.addChild(sprite);
      drawables.store[i][1].setSprite(sprite);
    });
  });
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
