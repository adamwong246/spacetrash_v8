

// import { ECS } from "../../engine/ECS";

// import { ActorSize, MapSize, TileSize } from "../System";
// import { Phase0Store } from "../Components/phase0";
// import { Phase1Store } from "../Components/phase1";



// import { Ticker } from "pixi.js";


// Ticker.system.stop();

// const ticker = Ticker.shared;
// // Set this to prevent starting this ticker when listeners are added.
// // By default this is true only for the PIXI.Ticker.shared instance.
// ticker.autoStart = false;

// // FYI, call this to ensure the ticker is stopped. It should be stopped
// // if you have not attempted to render anything yet.
// ticker.stop();
// // ticker._ticker = () => { };
// // Call this when you are ready for a running shared ticker.
// // ticker.start();

// let tick = -1;
// let pixi2dApp: Application;

// const tiles: [any, boolean][][] = [[]];

// let rotation = 0;
// // let texture;

// const rectangle = Sprite.from(Texture.WHITE);
// rectangle.width = TileSize;
// rectangle.height = TileSize;
// rectangle.tint = 0xff0000;
// // stage.addChild(rectangle);



// let actors: Sprite[] = [];

// export const Pixi2dShipMap = async (
//   ecs: ECS,
//   canvas: HTMLCanvasElement
// ): Promise<any> => {
//   return new Promise(async (res, rej) => {
//     tick++;
//     // console.log("Pixi2dShipMap hello", tick, tiles);
//     const twoD = (ecs.stores["Phase0"] as Phase0Store).store;
//     const oneD = (ecs.stores["Phase1"] as Phase1Store).store;

//     if (tick === 0) {
//       let ctx = canvas.getContext("webgl2");

//       pixi2dApp = new Application({
//         width: (MapSize + 7) * TileSize,
//         height: (MapSize + 7) * TileSize,
//         antialias: true, // 抗锯齿，圆滑边界
//         resolution: 1,
//         view: ctx?.canvas,
//         backgroundColor: 0x00ff00,
//         sharedTicker: false,
//       });
//       pixi2dApp.ticker.stop();
//       pixi2dApp.ticker.destroy();
//       pixi2dApp.renderer.plugins.interaction.useSystemTicker = false

//       brickTexture = await Assets.load(brick);
//       stoneTexture = await Assets.load(stone);
//       bunnyTexture = await Assets.load("https://pixijs.com/assets/bunny.png");

//       // Assets.load("https://pixijs.com/assets/bunny.png").then((texture) => {
//       //   // Create a sprite
//       //   bunny = new Sprite(texture);

//       //   // Set the sprite's anchor point to its center
//       // rectangle.anchor.set(0.5);

//       //   // Set the sprite's position
//       // rectangle.x = pixi2dApp.screen.width / 2;
//       // rectangle.y = pixi2dApp.screen.height / 2;

//       //   // Add the sprite to the stage
//       // pixi2dApp.stage.addChild(rectangle);

//       //   // pixi2dApp.render()

//       //   // Animate the sprite
//       //   // pixi2dApp.ticker.add((delta) => {
//       //   //   bunny.rotation += 0.01 * delta;
//       //   // });
//       // });

//       for (let y = 0; y < MapSize; y++) {
//         tiles[y] = [];
//         for (let x = 0; x < MapSize; x++) {
//           const t = (ecs.stores["Phase0"] as Phase0Store).get(x, y).tileType;

//           let s: Sprite;
//           if (t === "FloorTile") {
//             s = Sprite.from(stoneTexture);
//           } else if (t === "WallTile") {
//             s = Sprite.from(brickTexture);
//           } else {
//             s = Sprite.from(bunnyTexture);
//           }

//           s.width = TileSize;
//           s.height = TileSize;
//           // s.tint = 0xff0000;

//           // cubes[y][x] = [] as Mesh3D;

//           // const bunny = new Sprite(texture);

//           // Set the sprite's anchor point to its center
//           // s.anchor.set(0.5);

//           // Set the sprite's position
//           s.x = x * TileSize * 1.1;
//           s.y = y * TileSize * 1.1;

//           // Add the sprite to the stage
//           pixi2dApp.stage.addChild(s);

//           const e = s;
//           tiles[y][x] = [e, true];

//           // t.position.x = x * 2.1;
//           // cube.position.y = y * 2.1;
//           // cube.position.z =y;
//           // cube.position.z = y * TileSize;
//           // cube.position.set(x *2, y *2,  y *2)
//           // const t = new Transform3D()
//           // t.position.x = x * TileSize;
//           // t.position.y = y * TileSize;
//           // cube.transform = t;
//           // cube.visible = true;
//           // console.log(cube.position.x, cube.position.y)
//           // pixi3dApp.stage.addChild(cube);
//           // const e = cube;
//           // cubes[y][x] = [e, true];
//           // pixi3dApp.render()
//         }
//       }

//       oneD.forEach((actor, i) => {
//         actors[i] = Sprite.from(bunnyTexture);
//         actors[i].width = ActorSize;
//         actors[i].height = ActorSize;
//         actors[i].x = actor.actorX * TileSize;
//         actors[i].y = actor.actorY * TileSize;
//         pixi2dApp.stage.addChild(actors[i]);
//       });

//       res(true);
//     } else {
//       oneD.forEach((actor, i) => {
//         if (actors[i]) {
//           actors[i].x = actor.actorX * TileSize;
//           actors[i].y = actor.actorY * TileSize;
//         } else {
//           throw "no actor?";
//         }
//       });

//       pixi2dApp.render();
//       // console.log("Pixi2dShipMap gooodbye B", tick);
//       res(true);

//       // bunny.rotation = rotation++;
//       // console.log(tiles)
//       // for (let y = 0; y < MapSize; y++) {
//       //   for (let x = 0; x < MapSize; x++) {
//       //     tiles[y][x][0].rotation = rotation++;
//       //     // cubes[y][x].position.x = x* 2.1;
//       //     // cubes[y][x].position.y = y*2.1;
//       //     // cubes[y][x].rotationQuaternion.setEulerAngles(rotation, rotation, rotation);
//       //     if (!twoD[y][x].culledWebgl) {
//       //       // console.log(setpiece.renderedWebgl);
//       //       if (twoD[y][x].renderedWebgl === "fresh") {
//       //         // if (!twoD[y][x].mesh) {
//       //         //   console.error(twoD[y][x]);
//       //         //   throw "no mesh";
//       //         //   // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//       //         // }
//       //         // cubes[y][x].position.x = x * 2.1;
//       //         // cubes[y][x].position.y = y * TileSize;
//       //         // counter++;
//       //         // scene.add(twoD[y][x].mesh);
//       //         pixi2dApp.stage.addChild(tiles[y][x][0]);
//       //         tiles[y][x][1] = true;
//       //         // console.log(`${counter} / ${MapSize * MapSize}`, y, x, twoD[y][x].mesh)
//       //         twoD[y][x].renderedWebgl = "rendered";
//       //       } else if (twoD[y][x].renderedWebgl === "changed") {
//       //         if (tiles[y][x][1] === false) {
//       //           pixi2dApp.stage.addChild(tiles[y][x][0]);
//       //         }
//       //         // if (!twoD[y][x].mesh) {
//       //         //   console.error(twoD[y][x]);
//       //         //   throw "no mesh, changed";
//       //         // }
//       //         // cubes[y][x].position.x = x * TileSize;
//       //         // cubes[y][x].position.y = y * TileSize;
//       //       } else if (twoD[y][x].renderedWebgl === "unchanged") {
//       //         if (!twoD[y][x].mesh) {
//       //           // console.error(twoD[y][x]);
//       //           // throw "no mesh, unchanged";
//       //           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//       //         }
//       //         // no-op
//       //       } else if (twoD[y][x].renderedWebgl === "rendered") {
//       //         if (!twoD[y][x].mesh) {
//       //           // console.error(twoD[y][x]);
//       //           // throw "no mesh, rendered";
//       //           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//       //         }
//       //         // no-op
//       //       } else {
//       //         throw `should not be in renderState ${JSON.stringify(twoD[y][x])}`;
//       //       }
//       //       // drawOperations.push(SpaceTrashDrone.draw2d(s));
//       //     } else {
//       //       // scene.remove(twoD[y][x].mesh);
//       //       if (tiles[y][x][1]) {
//       //         pixi2dApp.stage.removeChild(tiles[y][x][0]);
//       //       }
//       //       tiles[y][x][1] = false;
//       //       // scene.remove(setpiece.mesh);
//       //     }
//       //   }
//       // }
//       // oneD.forEach((actor, i) => {
//       //   // do things
//       // });
//     }

//     // rotation = rotation + 0.01;
//   });
// };
