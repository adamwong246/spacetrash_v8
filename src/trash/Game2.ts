// import * as THREE from "three";
// import { Application, Sprite, Texture } from "pixi.js";
// import { Assets } from "@pixi/assets";

// import { Game } from "../engine/Game";
// import { Scene } from "../engine/Scene";
// import { StateSpace } from "../engine/StateSpace";

// import {} from "./Components/physics";

// import { SpaceTrashShip } from "./ship";
// import {
//   ActorSize,
//   MapSize,
//   NumberOfActors,
//   SpaceTrashMainSystem,
//   TileSize,
// } from "./System";
// import {
//   AttackableStore,
//   CameraStore,
//   LittableStore,
// } from "./Components/casting/in";
// import { LitStore } from "./Components/casting/out";

// import { Phase0Store } from "./Components/phase0";
// import { Phase1Store } from "./Components/phase1";
// import { PhysicsActorStore } from "./Components/actor";
// import { PhysicsSetPieceStore } from "./Components/setPiece";
// import { SpaceTrashTerminal } from "./lib/Terminal";

// import { SpaceTrashBot } from "./Entities/SpaceTrashBot";
// import { BotSlots } from "./Constants";

// import brick from "./Renderings/brick.png";
// import stone from "./Renderings/stone.png";

// import { SpaceTrashGameSingleton } from "./UI";
// import { IState, ISpaceTrashApps } from "./UI/InitState";
// import { Dispatch, SetStateAction } from "react";

// let actors: Sprite[] = [];
// let reRender = true;
// const floorGeometry = new THREE.PlaneGeometry(TileSize, TileSize);
// const unlitFloorMaterial = new THREE.MeshBasicMaterial({ color: "lightgrey" });
// const litFloorMaterial = new THREE.MeshBasicMaterial({
//   color: "yellow",
//   wireframe: true,
// });
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
// var cubeGeometry = new THREE.BoxGeometry(TileSize, TileSize, TileSize);
// const cylinderGeometry = new THREE.CylinderGeometry(
//   TileSize / 3,
//   TileSize / 6,
//   TileSize
// );
// var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
// var camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 10000);

// let shipMapMouseX = 0;
// let shipMapMouseY = 0;

// var scene = new THREE.Scene();

// let brickTexture: any;
// let stoneTexture: any;
// let bunnyTexture: any;

// const tiles: [any, boolean][][] = [[]];

// export type IRenderings = "2d" | "webgl2" | "pixi2d" | "threejs" | null;

// class SpaceTrash extends Game<IRenderings> {
  
//   terminal: SpaceTrashTerminal;

//   constructor() {
//     const ship = new SpaceTrashShip();
//     const state = new StateSpace("stateSpace_v0", "boot", "goodbye");

//     state.connect(`boot`, `mainloop`);
//     state.connect(`mainloop`, `goodbye`);

//     state.set(
//       "boot",
//       new Scene<ISpaceTrashApps>(
//         "bootscene_view_v0",
//         {
//           terminal: [
//             (ecs, reply) => {
//               // reply(this.terminal.boot());
//             },
//             (ecs, update) => {
//               return [];
//             },
//             (ecs, events) => {},
//             "2d",
//           ],
//           manual: [
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {},
//             "2d",
//           ],
//           drone: [
//             (ecs, reply) => {
//               // return []
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {},
//             "webgl2",
//           ],
//           shipmap: [
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {},
//             "2d",
//           ],
//           drones: [
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {
//               return [];
//             },
//             "html",
//           ],
//           shipmapV2: [
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {},
//             "2d",
//           ],
//           droneV2: [
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {
//               return [];
//             },
//             "html",
//           ],
//         },
//         async (ecs) => {
//           return;
//         }
//       )
//     );

//     state.set(
//       "mainloop",
//       new Scene<ISpaceTrashApps>(
//         "menuscene_view_v0",
//         {
//           terminal: [
//             (ecs, reply) => {
//               // reply(["login", ""]);
//               // reply(["terminal-update", this.terminal.login()]);
//               // ecs.unpause();
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {},
//             "2d",
//           ],
//           manual: [
//             (ecs, reply) => {
//               // return []
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {},
//             "2d",
//           ],

//           drone: [
//             (ecs, reply) => {
//               return [(ctx) => {}];
//             },

//             (ecs, reply) => {
//               return [
//                 async (canvas) => {
//                   this.renderDroneVideo(canvas);
//                   // return false
//                 },
//               ];
//             },

//             (ecs, event: any) => {
//               // if (event === "1") {
//               //   this.videoFeed = 1;
//               // }
//               // if (event === "2") {
//               //   this.videoFeed = 2;
//               // }
//               // if (event.key === "ArrowUp") {
//               //   this.yup();
//               // }
//               // if (event.key === "ArrowDown") {
//               //   this.ydown();
//               // }
//               // if (event.key === "ArrowLeft") {
//               //   this.xleft();
//               // }
//               // if (event.key === "ArrowRight") {
//               //   this.xright();
//               // }
//             },
//             "webgl2",
//           ],

//           shipmap: [
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, reply) => {
//               return [];
//               // const thingsToDraw = [];  //shipMapUpdateLoop(ecs);

//               // return [
//               //   ...thingsToDraw,
//               //   (canvas) => {
//               //     if (
//               //       canvas.constructor.name ===
//               //       "OffscreenCanvasRenderingContext2D"
//               //     ) {
//               //       const canvas2d =
//               //         canvas as OffscreenCanvasRenderingContext2D;
//               //       canvas2d.beginPath();
//               //       canvas2d.arc(
//               //         shipMapMouseX,
//               //         shipMapMouseY,
//               //         TileSize / 1,
//               //         0,
//               //         2 * Math.PI
//               //       );
//               //       canvas2d.lineWidth = 1;
//               //       canvas2d.strokeStyle = "green";
//               //       canvas2d.stroke();
//               //     }
//               //   },
//               // ];
//             },
//             (ecs, event: any) => {
//               if (event.type === "mousemove") {
//                 var rect = event.boundingClient;
//                 var x = event.clientX - rect.left;
//                 var y = event.clientY - rect.top;

//                 shipMapMouseX = x;
//                 shipMapMouseY = y;
//               }
//             },
//             "2d",
//           ],

//           droneV2: [

//             (ecs, reply) => {
//               return [(ctx) => {}];
//             },


//             (ecs, reply) => {
//               return [
//                 async (ctx) => {
//                   if (ctx.constructor.name === "WebGLRenderer") {
//                     // await renderDroneV2(ecs, ctx);
//                   }
//                 },
//               ];
//             },
//             (ecs, event: any) => {
//               if (event === "1") {
//                 this.videoFeed = 1;
//               }
//               if (event === "2") {
//                 this.videoFeed = 2;
//               }
//               if (event.key === "ArrowUp") {
//                 this.yup();
//               }
//               if (event.key === "ArrowDown") {
//                 this.ydown();
//               }
//               if (event.key === "ArrowLeft") {
//                 this.xleft();
//               }
//               if (event.key === "ArrowRight") {
//                 this.xright();
//               }
//             },
//             "webgl2",
//           ],

//           shipmapV2: [
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, reply) => {
//               // const thingsToDraw = renderShipMapv2(ecs);

//               return [
//                 async (ctx) => {
//                   // await Pixi2dShipMap(ecs, ctx);
//                   await this.renderShipMap(ctx);
//                 },
//               ];

//               // return [
//               //   ...thingsToDraw,
//               //   (canvas) => {
//               //     if (
//               //       canvas.constructor.name ===
//               //       "OffscreenCanvasRenderingContext2D"
//               //     ) {
//               //       const canvas2d =
//               //         canvas as OffscreenCanvasRenderingContext2D;
//               //       canvas2d.beginPath();
//               //       canvas2d.arc(
//               //         shipMapMouseX,
//               //         shipMapMouseY,
//               //         TileSize / 1,
//               //         0,
//               //         2 * Math.PI
//               //       );
//               //       canvas2d.lineWidth = 1;
//               //       canvas2d.strokeStyle = "green";
//               //       canvas2d.stroke();
//               //     }
//               //   },
//               // ];
//             },
//             (ecs, event: any) => {
//               if (event.type === "mousemove") {
//                 var rect = event.boundingClient;
//                 var x = event.clientX - rect.left;
//                 var y = event.clientY - rect.top;

//                 shipMapMouseX = x;
//                 shipMapMouseY = y;
//               }
//             },
//             "2d",
//           ],

//           drones: [
//             (ecs, reply) => {
//               // debugger
//               // workerPostMessage([`drones-update`, 'hello']);
//             },
//             (ecs, reply) => {
//               // debugger
//               // workerPostMessage([`drones-update`, 'hello']);
//               return [];
//             },
//             (ecs, events) => {
//               // debugger
//               // workerPostMessage([`drones-update`, 'hello']);
//             },
//             "html",
//           ],
//         },
//         (ecs) => {
//           const drones = [...new Array(BotSlots)].map((n) => {
//             return new SpaceTrashBot(
//               Math.random() * MapSize,
//               Math.random() * MapSize,
//               ActorSize,
//               (Math.random() - 0.5) / 5,
//               (Math.random() - 0.5) / 5
//             );
//           });

//           const moreBots = [...new Array(NumberOfActors - BotSlots)].map(
//             (n) => {
//               return new SpaceTrashBot(
//                 Math.random() * MapSize,
//                 Math.random() * MapSize,
//                 ActorSize,
//                 (Math.random() - 0.5) / 5,
//                 (Math.random() - 0.5) / 5
//               );
//             }
//           );

//           ecs.setEntitiesComponent([
//             ship,
//             ...ship.toTiles(),
//             // ...drones,
//             ...moreBots,
//           ]);

//           const myDoneIds = ecs.setEntitiesComponent([...drones]);

//           this.bots = {
//             1: [myDoneIds[0], "larry"],
//             2: [myDoneIds[1], "curly"],
//             3: [myDoneIds[2], "moe"],
//             4: [myDoneIds[3], "kirk"],
//             5: [myDoneIds[4], "spock"],
//             6: [myDoneIds[5], "bones"],
//             7: [myDoneIds[6], "han"],
//             8: [myDoneIds[7], "luke"],
//             9: [myDoneIds[8], "obiwan"],
//           };

//           this.updateUI()


          


//           return new Promise((res, rej) => {
//             res();
//           });
//         }
//       )
//     );

//     // const physicActors = new PhysicsActorStore();

//     super(
//       state,
//       SpaceTrashMainSystem,
//       {
//         PhysicsSetPieceComponent: new PhysicsSetPieceStore(),
//         PhysicsActorComponent: new PhysicsActorStore(),
//         LitableComponent: new LittableStore(),
//         LitComponent: new LitStore(),
//         CameraComponent: new CameraStore(),
//         AttackableComponent: new AttackableStore(),
//       },
//       {
//         Phase0: new Phase0Store(),
//         Phase1: new Phase1Store(),
//       },
//       new Set(["2d", "webgl2", "pixi2d", "threejs"]),
//       document.getElementById('react-root') as HTMLElement
//     );
//     this.terminal = new SpaceTrashTerminal();

//   }

//   updateUI() {
//     console.log("updateUI", this.uiState)
//     if (!this.stateSetter) {
//       console.warn("You haven't called `registerUiHook` yet");
//     } else {
//       debugger
//       this.stateSetter({
//         ...this.uiState,
//         bots: this.bots
//       })
//     }
    
    
//   }

//   videoTick = -1;
//   videoRenderer: THREE.WebGLRenderer;

//   renderDroneVideo(canvas: HTMLCanvasElement) {
//     this.videoTick++;
//     return new Promise((res, rej) => {
//       if (this.videoTick === 0) {
//         this.videoRenderer = new THREE.WebGLRenderer({
//           canvas,
//           context: canvas.getContext("webgl2") as WebGL2RenderingContext,
//           antialias: true,
//         });
//       } else {
//       }
//       const twoD = (this.ecs.stores["Phase0"] as Phase0Store).store;
//       const oneD = (this.ecs.stores["Phase1"] as Phase1Store).store;

//       for (let y = 0; y < MapSize; y++) {
//         for (let x = 0; x < MapSize; x++) {
//           // console.log(y, x, twoD[y][x])
//           // const setpiece = twoD[y][x];

//           // if (setpiece.luminance > 0) {

//           //   if (!setpiece.mesh) {
//           //     const m = new THREE.Mesh(floorGeometry, litFloorMaterial);
//           //     m.position.x = x * TileSize;
//           //     m.position.y = y * TileSize;

//           //     setpiece.mesh = m;

//           //     m.material = litFloorMaterial;
//           //     i++;
//           //     debugger
//           //     scene.add(setpiece.mesh);
//           //   }

//           // } else {

//           //   if (setpiece.mesh && setpiece.luminance === 0) {
//           //     i--
//           //     if (i < 0) i = 0;
//           //     scene.remove(setpiece.mesh as unknown as THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>);
//           //   }

//           // }

//           if (!twoD[y][x].mesh) {
//             if (twoD[y][x].tileType === "FloorTile") {
//               twoD[y][x].mesh = new THREE.Mesh(floorGeometry, litFloorMaterial);
//               twoD[y][x].mesh.position.z = TileSize / 2;
//             } else if (twoD[y][x].tileType === "WallTile") {
//               twoD[y][x].mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//             } else {
//               twoD[y][x].mesh = new THREE.Mesh(floorGeometry, litFloorMaterial);
//             }
//           }
//           // twoD[y][x].mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);

//           if (!twoD[y][x].mesh) {
//             console.error(twoD[y][x]);
//             throw "no mesh";
//             // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//           }

//           if (!twoD[y][x].culledWebgl) {
//             // console.log(setpiece.renderedWebgl);
//             if (twoD[y][x].renderedWebgl === "fresh") {
//               if (!twoD[y][x].mesh) {
//                 console.error(twoD[y][x]);
//                 throw "no mesh";
//                 // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//               }

//               twoD[y][x].mesh.position.x = x * TileSize;
//               twoD[y][x].mesh.position.y = y * TileSize;
//               // counter++;

//               scene.add(twoD[y][x].mesh);
//               // console.log(`${counter} / ${MapSize * MapSize}`, y, x, twoD[y][x].mesh)
//               twoD[y][x].renderedWebgl = "rendered";
//             } else if (twoD[y][x].renderedWebgl === "changed") {
//               if (!twoD[y][x].mesh) {
//                 console.error(twoD[y][x]);
//                 throw "no mesh, changed";
//               }
//             } else if (twoD[y][x].renderedWebgl === "unchanged") {
//               if (!twoD[y][x].mesh) {
//                 console.error(twoD[y][x]);
//                 throw "no mesh, unchanged";
//                 // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//               }
//               // no-op
//             } else if (twoD[y][x].renderedWebgl === "rendered") {
//               if (!twoD[y][x].mesh) {
//                 console.error(twoD[y][x]);
//                 throw "no mesh, rendered";
//                 // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//               }
//               // no-op
//             } else {
//               throw `should not be in renderState ${JSON.stringify(
//                 twoD[y][x]
//               )}`;
//             }

//             // drawOperations.push(SpaceTrashDrone.draw2d(s));
//           } else {
//             // scene.remove(twoD[y][x].mesh);
//             // scene.remove(setpiece.mesh);
//           }

//           // thingsToDraw.push((canvas) => {
//           //   const z = phaseZero[y][x];

//           //   const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
//           //   canvas2d.beginPath();

//           //   if (z.tileType === "FloorTile") {
//           //     if (z.luminance > 0) {
//           //       canvas2d.fillStyle = "yellow";
//           //     } else {
//           //       canvas2d.fillStyle = "white";
//           //     }

//           //     canvas2d.rect(
//           //       Math.floor(x * TileSize - TileSize / 2 + 1),
//           //       Math.floor(y * TileSize - TileSize / 2 + 1),
//           //       TileSize - 1,
//           //       TileSize - 1
//           //     );
//           //   }
//           //   if (z.tileType === "WallTile") {
//           //     canvas2d.fillStyle = "darkgrey";
//           //     canvas2d.rect(
//           //       Math.floor(x * TileSize - TileSize / 2 + 1),
//           //       Math.floor(y * TileSize - TileSize / 2 + 1),
//           //       TileSize - 1,
//           //       TileSize - 1
//           //     );
//           //   }

//           //   canvas2d.fill();
//           //   canvas2d.stroke();
//           // });

//           // const p = twoD[y][x];
//           // const z = ecs.entities[p.setId];
//           // const s: PhysicsSetPieceComponent =
//           //   ecs.componentStores["PhysicsSetPieceComponent"].store[z];

//           // // drawOperations.push(Tile.draw2d(s, p.luminance));

//           // if (p.renderState === "fresh") {
//           //   drawOperations.push(Tile.draw2d(s, p));
//           //   p.renderState = "rendered";
//           // } else if (p.renderState === "changed") {
//           //   drawOperations.push(Tile.draw2d(s, p));
//           //   p.renderState = "rendered";
//           // } else if (p.renderState === "unchanged") {
//           //   // no-op
//           // } else if (p.renderState === "culled") {
//           //   // no-op
//           // } else if (p.renderState === "rendered") {
//           //   // no-op
//           // } else {
//           //   throw `should not be in renderState ${JSON.stringify(p)}`;
//           // }

//           // drawOperations.push(Tile.draw2d(s, p.luminance));
//           // if (tick === 0 || p.dirty) {
//           //   drawOperations.push(Tile.draw2d(s, p.luminance));
//           //   debugger
//           //   p.dirty = false;
//           // }
//         }
//       }

//       oneD.forEach((actor, i) => {
//         const p = oneD[i];
//         // const z = ecs.entities[p.actorId];
//         // const s: PhysicsActorComponent =
//         //   ecs.componentStores["PhysicsActorComponent"].store[z];

//         if (!p.culledWebgl) {
//           if (p.renderedWebgl === "fresh") {
//             const m = new THREE.Mesh(cylinderGeometry, material);
//             m.position.x = p.actorX * TileSize;
//             m.position.y = p.actorY * TileSize;
//             p.mesh = m;
//             scene.add(p.mesh);
//             p.renderedWebgl = "rendered";
//           } else if (p.renderedWebgl === "changed" && p.mesh) {
//             reRender = true;
//             p.mesh.position.x = p.actorX * TileSize;
//             p.mesh.position.y = p.actorY * TileSize;
//             p.renderedWebgl = "rendered";
//           } else if (p.renderedWebgl === "unchanged") {
//             // no-op
//           } else if (p.renderedWebgl === "rendered") {
//             // no-op
//           } else {
//             console.error(`should not be in renderState ${JSON.stringify(p)}`);
//           }
//         }

//         // const e = ecs.getEntityComponent<SpaceTrashDrone>(
//         //   oneD[i].actorId,
//         //   SpaceTrashDrone.constructor
//         // );
//         // if (tick === 0) {
//         //   drawOperations.push(e.draw2d);
//         // } else {
//         //   eraseOperations.push(e.erase2d);
//         //   drawOperations.push(e.draw2d);
//         // }
//       });

//       const position = this.videoFeedPosition();
//       camera.position.x = position.x;
//       camera.position.y = position.y;
//       const p = canvas.parentElement.getBoundingClientRect();
//       this.videoRenderer.setSize(p.width, p.height);

//       this.videoRenderer.render(scene, camera);

//       res(true);
//     });
//   }

//   shipMapTick = -1;
//   pixi2dApp: Application;

//   renderShipMap(canvas: HTMLCanvasElement) {
//     this.shipMapTick++;
//     return new Promise(async (res, rej) => {
//       // console.log("Pixi2dShipMap hello", tick, tiles);
//       const twoD = (this.ecs.stores["Phase0"] as Phase0Store).store;
//       const oneD = (this.ecs.stores["Phase1"] as Phase1Store).store;

//       if (this.shipMapTick === 0) {
//         let ctx = canvas.getContext("webgl2");

//         this.pixi2dApp = new Application({
//           width: (MapSize + 7) * TileSize,
//           height: (MapSize + 7) * TileSize,
//           antialias: true, // 抗锯齿，圆滑边界
//           resolution: 1,
//           view: ctx?.canvas,
//           backgroundColor: 0x00ff00,
//           sharedTicker: false,
//         });
//         this.pixi2dApp.ticker.stop();
//         this.pixi2dApp.ticker.destroy();
//         this.pixi2dApp.renderer.plugins.interaction.useSystemTicker = false;

//         brickTexture = await Assets.load(brick);
//         stoneTexture = await Assets.load(stone);
//         bunnyTexture = await Assets.load("https://pixijs.com/assets/bunny.png");

//         // Assets.load("https://pixijs.com/assets/bunny.png").then((texture) => {
//         //   // Create a sprite
//         //   bunny = new Sprite(texture);

//         //   // Set the sprite's anchor point to its center
//         // rectangle.anchor.set(0.5);

//         //   // Set the sprite's position
//         // rectangle.x = pixi2dApp.screen.width / 2;
//         // rectangle.y = pixi2dApp.screen.height / 2;

//         //   // Add the sprite to the stage
//         // pixi2dApp.stage.addChild(rectangle);

//         //   // pixi2dApp.render()

//         //   // Animate the sprite
//         //   // pixi2dApp.ticker.add((delta) => {
//         //   //   bunny.rotation += 0.01 * delta;
//         //   // });
//         // });

//         for (let y = 0; y < MapSize; y++) {
//           tiles[y] = [];
//           for (let x = 0; x < MapSize; x++) {
//             const t = (this.ecs.stores["Phase0"] as Phase0Store).get(x, y).tileType;

//             let s: Sprite;
//             if (t === "FloorTile") {
//               s = Sprite.from(stoneTexture);
//             } else if (t === "WallTile") {
//               s = Sprite.from(brickTexture);
//             } else {
//               s = Sprite.from(bunnyTexture);
//             }

//             s.width = TileSize;
//             s.height = TileSize;
//             // s.tint = 0xff0000;

//             // cubes[y][x] = [] as Mesh3D;

//             // const bunny = new Sprite(texture);

//             // Set the sprite's anchor point to its center
//             // s.anchor.set(0.5);

//             // Set the sprite's position
//             s.x = x * TileSize * 1.1;
//             s.y = y * TileSize * 1.1;

//             // Add the sprite to the stage
//             this.pixi2dApp.stage.addChild(s);

//             const e = s;
//             tiles[y][x] = [e, true];

//             // t.position.x = x * 2.1;
//             // cube.position.y = y * 2.1;
//             // cube.position.z =y;
//             // cube.position.z = y * TileSize;
//             // cube.position.set(x *2, y *2,  y *2)
//             // const t = new Transform3D()
//             // t.position.x = x * TileSize;
//             // t.position.y = y * TileSize;
//             // cube.transform = t;
//             // cube.visible = true;
//             // console.log(cube.position.x, cube.position.y)
//             // pixi3dApp.stage.addChild(cube);
//             // const e = cube;
//             // cubes[y][x] = [e, true];
//             // pixi3dApp.render()
//           }
//         }

//         oneD.forEach((actor, i) => {
//           actors[i] = Sprite.from(bunnyTexture);
//           actors[i].width = ActorSize;
//           actors[i].height = ActorSize;
//           actors[i].x = actor.actorX * TileSize;
//           actors[i].y = actor.actorY * TileSize;
//           this.pixi2dApp.stage.addChild(actors[i]);
//         });

//         res(true);
//       } else {
//         oneD.forEach((actor, i) => {
//           if (actors[i]) {
//             actors[i].x = actor.actorX * TileSize;
//             actors[i].y = actor.actorY * TileSize;
//           } else {
//             throw "no actor?";
//           }
//         });

//         this.pixi2dApp.render();
//         // console.log("Pixi2dShipMap gooodbye B", tick);
//         res(true);

//         // bunny.rotation = rotation++;
//         // console.log(tiles)
//         // for (let y = 0; y < MapSize; y++) {
//         //   for (let x = 0; x < MapSize; x++) {
//         //     tiles[y][x][0].rotation = rotation++;
//         //     // cubes[y][x].position.x = x* 2.1;
//         //     // cubes[y][x].position.y = y*2.1;
//         //     // cubes[y][x].rotationQuaternion.setEulerAngles(rotation, rotation, rotation);
//         //     if (!twoD[y][x].culledWebgl) {
//         //       // console.log(setpiece.renderedWebgl);
//         //       if (twoD[y][x].renderedWebgl === "fresh") {
//         //         // if (!twoD[y][x].mesh) {
//         //         //   console.error(twoD[y][x]);
//         //         //   throw "no mesh";
//         //         //   // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//         //         // }
//         //         // cubes[y][x].position.x = x * 2.1;
//         //         // cubes[y][x].position.y = y * TileSize;
//         //         // counter++;
//         //         // scene.add(twoD[y][x].mesh);
//         //         pixi2dApp.stage.addChild(tiles[y][x][0]);
//         //         tiles[y][x][1] = true;
//         //         // console.log(`${counter} / ${MapSize * MapSize}`, y, x, twoD[y][x].mesh)
//         //         twoD[y][x].renderedWebgl = "rendered";
//         //       } else if (twoD[y][x].renderedWebgl === "changed") {
//         //         if (tiles[y][x][1] === false) {
//         //           pixi2dApp.stage.addChild(tiles[y][x][0]);
//         //         }
//         //         // if (!twoD[y][x].mesh) {
//         //         //   console.error(twoD[y][x]);
//         //         //   throw "no mesh, changed";
//         //         // }
//         //         // cubes[y][x].position.x = x * TileSize;
//         //         // cubes[y][x].position.y = y * TileSize;
//         //       } else if (twoD[y][x].renderedWebgl === "unchanged") {
//         //         if (!twoD[y][x].mesh) {
//         //           // console.error(twoD[y][x]);
//         //           // throw "no mesh, unchanged";
//         //           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//         //         }
//         //         // no-op
//         //       } else if (twoD[y][x].renderedWebgl === "rendered") {
//         //         if (!twoD[y][x].mesh) {
//         //           // console.error(twoD[y][x]);
//         //           // throw "no mesh, rendered";
//         //           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//         //         }
//         //         // no-op
//         //       } else {
//         //         throw `should not be in renderState ${JSON.stringify(twoD[y][x])}`;
//         //       }
//         //       // drawOperations.push(SpaceTrashDrone.draw2d(s));
//         //     } else {
//         //       // scene.remove(twoD[y][x].mesh);
//         //       if (tiles[y][x][1]) {
//         //         pixi2dApp.stage.removeChild(tiles[y][x][0]);
//         //       }
//         //       tiles[y][x][1] = false;
//         //       // scene.remove(setpiece.mesh);
//         //     }
//         //   }
//         // }
//         // oneD.forEach((actor, i) => {
//         //   // do things
//         // });
//       }

//       // rotation = rotation + 0.01;
//     });
//   }

//   positionOfEntity(eid: number): { x: number; y: number } {
//     // const e = this.physicsActors.get(eid);
//     const e = this.ecs.componentStores["PhysicsActorComponent"].get(eid);

//     if (!e) throw "missing entitiy";

//     return {
//       x: e.x,
//       y: e.y,
//     };
//   }

//   updateFromUI(s: IState) {
//     this.uiState = s;
//   }

//   public videoFeed: number = 1;

//   public bots: {
//     1: [number, string];
//     2: [number, string];
//     3: [number, string];
//     4: [number, string];
//     5: [number, string];
//     6: [number, string];
//     7: [number, string];
//     8: [number, string];
//     9: [number, string];
//   };

//   public videoFeedPosition(): { x: number; y: number } {
//     return SpaceTrashGameSingleton.positionOfEntity(
//       (this.bots[this.videoFeed] as [number, string])[0]
//     );
//   }

//   public yup() {
//     for (let ndx = 1; ndx <= 9; ndx++) {
//       if (this.videoFeed === ndx) {
//         this.bots[this.videoFeed].dy = this.bots[this.videoFeed].dy - 0.001;
//       }
//     }
//   }
//   public ydown() {
//     for (let ndx = 1; ndx <= 9; ndx++) {
//       if (this.videoFeed === ndx) {
//         this.bots[this.videoFeed].dy = this.bots[this.videoFeed].dy + 0.001;
//       }
//     }
//   }

//   public xleft() {
//     for (let ndx = 1; ndx <= 9; ndx++) {
//       if (this.videoFeed === ndx) {
//         this.bots[this.videoFeed].dx = this.bots[this.videoFeed].dx - 0.001;
//       }
//     }
//   }
//   public xright() {
//     for (let ndx = 1; ndx <= 9; ndx++) {
//       if (this.videoFeed === ndx) {
//         this.bots[this.videoFeed].dx = this.bots[this.videoFeed].dx + 0.001;
//       }
//     }
//   }

//   // onStateChange(stateSetter: Dispatch<SetStateAction<IState>>) {
//   //   this.stateSetter = stateSetter
//   // }

// }


// const st = new SpaceTrash();