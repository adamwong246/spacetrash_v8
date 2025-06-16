import * as THREE from "three";

import { Game } from "../engine/Game";
import { Scene } from "../engine/Scene";
import { StateSpace } from "../engine/StateSpace";

import SpaceTrashPlayer from "./Player";
import {} from "./Components/physics";
import { ISpaceTrashApps, IState } from "./UI";
import { SpaceTrashShip } from "./ship";
import {
  ActorSize,
  MapSize,
  NumberOfActors,
  SpaceTrashMainSystem,
  TileSize,
} from "./System";
import {
  AttackableStore,
  CameraStore,
  LittableStore,
} from "./Components/casting/in";
import { LitStore } from "./Components/casting/out";

import { renderDrone } from "./renderDrone";
import { Phase0Store } from "./Components/phase0";
import { Phase1Store } from "./Components/phase1";
import { PhysicsActorStore } from "./Components/actor";
import { PhysicsSetPieceStore } from "./Components/setPiece";
import { SpaceTrashTerminal } from "./lib/Terminal";
import { renderDroneV2 } from "./renderDronev2";
import { SpaceTrashBot } from "./Entities/SpaceTrashBot";
import { Pixi2dShipMap } from "./Renderings/Pixi2dShipMap";
import { BotSlots } from "./Constants";

let shipMapMouseX = 0;
let shipMapMouseY = 0;

export type IRenderings = "2d" | "webgl2" | "pixi2d" | "threejs" | null;

class SpacetrashGame extends Game<IRenderings> {
  terminal: SpaceTrashTerminal;
  uiState: IState;

  constructor() {
    const ship = new SpaceTrashShip();
    const state = new StateSpace("stateSpace_v0", "boot", "goodbye");

    state.connect(`boot`, `mainloop`);
    state.connect(`mainloop`, `goodbye`);

    state.set(
      "boot",
      new Scene<ISpaceTrashApps>(
        "bootscene_view_v0",
        {
          terminal: [
            (ecs, reply) => {
              // reply(this.terminal.boot());
            },
            (ecs, update) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
          manual: [
            (ecs, reply) => {
              return [];
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
          drone: [
            (ecs, reply) => {
              // return []
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "webgl2",
          ],
          shipmap: [
            (ecs, reply) => {
              return [];
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
          drones: [
            (ecs, reply) => {
              return [];
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {
              return [];
            },
            "html",
          ],
          shipmapV2: [
            (ecs, reply) => {
              return [];
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
          droneV2: [
            (ecs, reply) => {
              return [];
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {
              return [];
            },
            "html",
          ],
        },
        async (ecs) => {
          return;
        }
      )
    );

    state.set(
      "mainloop",
      new Scene<ISpaceTrashApps>(
        "menuscene_view_v0",
        {
          terminal: [
            (ecs, reply) => {
              // reply(["login", ""]);
              // reply(["terminal-update", this.terminal.login()]);
              // ecs.unpause();
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
          manual: [
            (ecs, reply) => {
              // return []
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],

          drone: [
            // boot function
            (ecs, reply) => {
              return [(ctx) => {}];
            },

            //   function
            (ecs, reply) => {
              return [
                async (ctx) => {
                  renderDrone(ecs, ctx);
                },
              ];
            },
            (ecs, event: any) => {
              if (event === "1") {
                SpaceTrashPlayer.videoFeed = 1;
              }
              if (event === "2") {
                SpaceTrashPlayer.videoFeed = 2;
              }
              if (event.key === "ArrowUp") {
                SpaceTrashPlayer.yup();
              }
              if (event.key === "ArrowDown") {
                SpaceTrashPlayer.ydown();
              }
              if (event.key === "ArrowLeft") {
                SpaceTrashPlayer.xleft();
              }
              if (event.key === "ArrowRight") {
                SpaceTrashPlayer.xright();
              }
            },
            "webgl2",
          ],

          shipmap: [
            (ecs, reply) => {
              return [];
            },
            (ecs, reply) => {
              const thingsToDraw = [];  //shipMapUpdateLoop(ecs);

              return [
                ...thingsToDraw,
                (canvas) => {
                  if (
                    canvas.constructor.name ===
                    "OffscreenCanvasRenderingContext2D"
                  ) {
                    const canvas2d =
                      canvas as OffscreenCanvasRenderingContext2D;
                    canvas2d.beginPath();
                    canvas2d.arc(
                      shipMapMouseX,
                      shipMapMouseY,
                      TileSize / 1,
                      0,
                      2 * Math.PI
                    );
                    canvas2d.lineWidth = 1;
                    canvas2d.strokeStyle = "green";
                    canvas2d.stroke();
                  }
                },
              ];
            },
            (ecs, event: any) => {
              if (event.type === "mousemove") {
                var rect = event.boundingClient;
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;

                shipMapMouseX = x;
                shipMapMouseY = y;
              }
            },
            "2d",
          ],

          droneV2: [
            // boot function
            (ecs, reply) => {
              return [(ctx) => {}];
            },

            //   function
            (ecs, reply) => {
              return [
                async (ctx) => {
                  if (ctx.constructor.name === "WebGLRenderer") {
                    await renderDroneV2(ecs, ctx);
                  }
                },
              ];
            },
            (ecs, event: any) => {
              if (event === "1") {
                SpaceTrashPlayer.videoFeed = 1;
              }
              if (event === "2") {
                SpaceTrashPlayer.videoFeed = 2;
              }
              if (event.key === "ArrowUp") {
                SpaceTrashPlayer.yup();
              }
              if (event.key === "ArrowDown") {
                SpaceTrashPlayer.ydown();
              }
              if (event.key === "ArrowLeft") {
                SpaceTrashPlayer.xleft();
              }
              if (event.key === "ArrowRight") {
                SpaceTrashPlayer.xright();
              }
            },
            "webgl2",
          ],

          shipmapV2: [
            (ecs, reply) => {
              return [];
            },
            (ecs, reply) => {
              // const thingsToDraw = renderShipMapv2(ecs);

              return [
                async (ctx) => {
                  await Pixi2dShipMap(ecs, ctx);
                },
              ];

              // return [
              //   ...thingsToDraw,
              //   (canvas) => {
              //     if (
              //       canvas.constructor.name ===
              //       "OffscreenCanvasRenderingContext2D"
              //     ) {
              //       const canvas2d =
              //         canvas as OffscreenCanvasRenderingContext2D;
              //       canvas2d.beginPath();
              //       canvas2d.arc(
              //         shipMapMouseX,
              //         shipMapMouseY,
              //         TileSize / 1,
              //         0,
              //         2 * Math.PI
              //       );
              //       canvas2d.lineWidth = 1;
              //       canvas2d.strokeStyle = "green";
              //       canvas2d.stroke();
              //     }
              //   },
              // ];
            },
            (ecs, event: any) => {
              if (event.type === "mousemove") {
                var rect = event.boundingClient;
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;

                shipMapMouseX = x;
                shipMapMouseY = y;
              }
            },
            "2d",
          ],

          drones: [
            (ecs, reply) => {
              // debugger
              // workerPostMessage([`drones-update`, 'hello']);
            },
            (ecs, reply) => {
              // debugger
              // workerPostMessage([`drones-update`, 'hello']);
              return [];
            },
            (ecs, events) => {
              // debugger
              // workerPostMessage([`drones-update`, 'hello']);
            },
            "html",
          ],
        },
        (ecs) => {
          const drones = [...new Array(BotSlots)].map((n) => {
            
            return new SpaceTrashBot(
              Math.random() * MapSize,
              Math.random() * MapSize,
              ActorSize,
              (Math.random() - 0.5) / 5,
              (Math.random() - 0.5) / 5
            );
          });

          const moreBots = [...new Array(NumberOfActors - BotSlots)].map(
            (n) => {
              return new SpaceTrashBot(
                Math.random() * MapSize,
                Math.random() * MapSize,
                ActorSize,
                (Math.random() - 0.5) / 5,
                (Math.random() - 0.5) / 5
              );
            }
          );

          


          ecs.setEntitiesComponent([
            ship,
            ...ship.toTiles(),
            // ...drones,
            ...moreBots,
          ]);

          const myDoneIds = ecs.setEntitiesComponent([
            ...drones,
          ]);

          
          SpaceTrashPlayer.bots = {
            1: [myDoneIds[0], "larry"],
            2: [myDoneIds[1], "curly"],
            3: [myDoneIds[2], "moe"],
            4: [myDoneIds[3], "kirk"],
            5: [myDoneIds[4], "spock"],
            6: [myDoneIds[5], "bones"],
            7: [myDoneIds[6], "han"],
            8: [myDoneIds[7], "luke"],
            9: [myDoneIds[8], "obiwan"],
          };

          return new Promise((res, rej) => {
            res();
          });
        }
      )
    );

    const physicActors = new PhysicsActorStore();

    super(
      state,
      SpaceTrashMainSystem,
      {
        PhysicsSetPieceComponent: new PhysicsSetPieceStore(),
        PhysicsActorComponent: new PhysicsActorStore(),
        LitableComponent: new LittableStore(),
        LitComponent: new LitStore(),
        CameraComponent: new CameraStore(),
        AttackableComponent: new AttackableStore(),
      },
      {
        Phase0: new Phase0Store(),
        Phase1: new Phase1Store(),
      },
      new Set(["2d", "webgl2", "pixi2d", "threejs"])
    );
    this.terminal = new SpaceTrashTerminal();
    // this.physicsActors = physicActors
  }

  positionOfEntity(eid: number): { x: number; y: number } {
    // const e = this.physicsActors.get(eid);
  const e = this.ecs.componentStores["PhysicsActorComponent"].get(eid);

    if (!e) throw "missing entitiy";

    return {
      x: e.x,
      y: e.y,
    };
  }

  updateFromUI(s: IState) {
    this.uiState = s;
  }

  // drawSurface(canvas: HTMLCanvasElement | undefined, key: string) {
  //   // const s = this.state.get(this.state.currrent);
  //   // const canvas = this.canvasContexts[key].canvas;
  //   // const clbk = this.canvasContexts[key].callback;

  //   if (canvas) {
  //     // const drawOps: ((
  //     //   canvas: any
  //     //   // | THREE.WebGLRenderer
  //     // ) => Promise<any>)[] = s.draw(key, clbk || (() => {}), this.ecs);

  //     // if (this.canvasContexts[key].canvasContext === "2d" && canvas) {
  //     //   return canvas?.getContext("2d");
  //     //   // Promise.all(
  //     //   //   drawOps.map((d) => {
  //     //   //     return d(canvas?.getContext("2d"));
  //     //   //   })
  //     //   // );
  //     // }
  //     // if (this.canvasContexts[key].canvasContext === "webgl2") {
  //     //   return canvas?.getContext("webgl2");
  //     //   // Promise.all(
  //     //   //   drawOps.map((d) => {
  //     //   //     return d(canvas.getContext("webgl2"));
  //     //   //   })
  //     //   // );
  //     // }

  //     if (this.canvasContexts[key].canvasContext === "pixi2d" && canvas) {
  //       return canvas?.getContext("webgl2");
        
  //     }

  //     if (this.canvasContexts[key].canvasContext === "threejs" && canvas) {
  //       return new THREE.WebGLRenderer({
  //         canvas,
  //         context: canvas.getContext("webgl2") as WebGL2RenderingContext,
  //         antialias: true,
  //       });
        
  //     }

  //     return null
  //   }
  // }
}

export default new SpacetrashGame();
