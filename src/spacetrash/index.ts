// import { Game } from "../engine/Game";
// import { Scene } from "../engine/Scene";
// import { StateSpace } from "../engine/StateSpace";
// import SpaceTrashPlayer from "./Player";
// import {
  
// } from "./Components/physics";
// import THE_TERMINAL from "./lib/Terminal";
// import { SpaceTrashDrone } from "./Entities";
// import { ISpaceTrashApps } from "./UI";
// import { SpaceTrashShip } from "./ship";
// import { ActorSize, BotSlots, MapSize, NumberOfActors, SpaceTrashMainSystem, TileSize } from "./System";
// import {
//   AttackableComponent,
//   AttackableStore,
//   CameraComponent,
//   CameraStore,
//   LitableComponent,
//   LittableStore,
// } from "./Components/casting/in";
// import { PowerStoringComponent } from "./Components/power";
// import { LitComponent, LitStore } from "./Components/casting/out";
// import { shipMapUpdateLoop } from "./shipMapUpdateLoop";
// import { renderDrone } from "./renderDrone";
// import { VideoComponent } from "./Components/video";
// import { Phase0, Phase0Store } from "./Components/phase0";
// import { Phase1, Phase1Store } from "./Components/phase1";
// import { PhysicsActorStore } from "./Components/actor";
// import { PhysicsSetPieceStore } from "./Components/setPiece";
// import { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js";
// // import SpaceTrashPlayer from "./Player";

// let shipMapMouseX = 0;
// let shipMapMouseY = 0;

// export default class Spacetrash extends Game {
//   // terminal: SpaceTrashTerminal;

//   constructor(
//     workerPostMessage: (
//       message: any,
//       options?: WindowPostMessageOptions | undefined
//     ) => void
//   ) {
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
//               reply(this.terminal.boot());
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
//               // return []
//             },
//             (ecs, reply) => {
//               return [];
//             },
//             (ecs, events) => {},
//             "2d",
//           ],
//           drones: [
//             (ecs, reply) => {
//               debugger
//               workerPostMessage([`drones-update`, 'hello']);
//             },
//             (ecs, reply) => {
//               debugger
//               workerPostMessage([`drones-update`, 'hello']);
//               return [];
//             },
//             (ecs, events) => {
//               debugger
//               workerPostMessage([`drones-update`, 'hello']);
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
//               reply(["login", ""]);
//               reply(["terminal-update", this.terminal.login()]);
//               ecs.unpause()
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
//             // boot function
//             (ecs, reply) => {
//               return [(ctx) => {}];
//             },

//             // draw function
//             (ecs, reply) => {
//               return [
//                 (ctx) => {
//                   if (ctx.constructor.name === "WebGLRenderer") {
//                     renderDrone(ecs, ctx);
//                   }
//                 },
//               ];
//             },
//             (ecs, event: any) => {
//               if (event === "1") {
//                 SpaceTrashPlayer.videoFeed = 1;
//               }
//               if (event === "2") {
//                 SpaceTrashPlayer.videoFeed = 2;
//               }
//               if (event.key === "ArrowUp") {
//                 SpaceTrashPlayer.yup();
//               }
//               if (event.key === "ArrowDown") {
//                 SpaceTrashPlayer.ydown();
//               }
//               if (event.key === "ArrowLeft") {
//                 SpaceTrashPlayer.xleft();
//               }
//               if (event.key === "ArrowRight") {
//                 SpaceTrashPlayer.xright();
//               }
//             },
//             "webgl2",
//           ],

//           shipmap: [
//             (ecs, reply) => {
//               // return []
//             },
//             (ecs, reply) => {
//               const thingsToDraw = shipMapUpdateLoop(
//                 ecs
//               );



//               return [
//                 ...thingsToDraw,
//                 // ...Object.entries(thingsToDraw).map(([i, k]) => {
//                 //   return k;
//                 //   // return (c) =>
//                 //   //   k(c);
//                 // }),

//                 (canvas) => {

//                   if (
//                     canvas.constructor.name ===
//                     "OffscreenCanvasRenderingContext2D"
//                   ) {
//                     const canvas2d =
//                       canvas as OffscreenCanvasRenderingContext2D;
//                     canvas2d.beginPath();
//                     canvas2d.arc(
//                       shipMapMouseX,
//                       shipMapMouseY,
//                       TileSize / 1,
//                       0,
//                       2 * Math.PI
//                     );
//                     canvas2d.lineWidth = 1;
//                     canvas2d.strokeStyle = "green";
//                     canvas2d.stroke();
//                   }
//                 },
//               ];
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
//               debugger
//               workerPostMessage([`drones-update`, 'hello']);
//             },
//             (ecs, reply) => {
//               debugger
//               workerPostMessage([`drones-update`, 'hello']);
//               return [];
//             },
//             (ecs, events) => {
//               debugger
//               workerPostMessage([`drones-update`, 'hello']);
//             },
//             "html",
//           ],
//         },
//         (ecs) => {
//           const drones = [...new Array(BotSlots)].map((n) => {
//             return new SpaceTrashDrone(
//               Math.random() * MapSize,
//               Math.random() * MapSize,
//               ActorSize,
//               // (Math.random() - 0.5) / 5,
//               // (Math.random() - 0.5) / 5
//             );
//           });
//           SpaceTrashPlayer.setBots(drones);

//           const moreBots = [...new Array(NumberOfActors - BotSlots)].map((n) => {
//             return new SpaceTrashDrone(
//               Math.random() * MapSize,
//               Math.random() * MapSize,
//               ActorSize,
//               // (Math.random() - 0.5) / 5,
//               // (Math.random() - 0.5) / 5
//             );
//           });

//           return new Promise((res, rej) => {
//             ecs.setEntitiesComponent([
//               ship,
//               ...ship.toTiles(),
//               ...drones,
//               ...moreBots
//             ]);
//             res();
//           });
//         }
//       )
//     );

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
//         Phase1: new Phase1Store()
//       },
      
//       workerPostMessage
//     );
//     this.terminal = new SpaceTrashTerminal();
//     this.start();
//   }

//   async terminalIn(
//     input: string,
//     callback: (x: { out: string; status: string }) => void
//   ): Promise<{ in: string; out: string }> {
//     return {
//       in: input,
//       out: this.terminal.processCommand(input, this.changeScene, callback).out,
//     };
//   }
// }
