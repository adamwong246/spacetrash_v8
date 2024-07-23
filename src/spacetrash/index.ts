import { Game } from "../engine/Game";
import { Scene } from "../engine/Scene";
import { StateSpace } from "../engine/StateSpace";
import { ECS } from "../engine/ECS";

import { PhysicsActorComponent, PhysicsSetComponent } from "./Components/physics";
import {
  FloorTile, WallTile, DoorTile, TileJ, TileA, TileB, SouthWest, SouthEast, NorthEast, NorthWest
} from "./Entities/setpieces";
import { SpaceTrashEntityComponent } from "./lib/EntityComponent";
import { SpaceTrashTerminal } from "./lib/Terminal";

import { SpaceTrashDrone } from "./Entities";

import { ISpaceTrashApps } from "./UI";
import { SpaceTrashMainSystem } from "./System";
import { SpaceTrashShip } from "./ship";


let droneMouseX = 0;
let droneMouseY = 0;
let shipMapMouseX = 0;
let shipMapMouseY = 0;

const tSize = 10;

export default class Spacetrash extends Game<any> {

  terminal: SpaceTrashTerminal;
  constructor(
    workerPostMessage: (
      message: any, options?: WindowPostMessageOptions | undefined
    ) => void) {

    const ship = new SpaceTrashShip();
    const state = new StateSpace("stateSpace_v0", "boot", "goodbye");

    state.connect(`boot`, `menu`);
    state.connect(`menu`, `mainloop`);

    state.set('boot', new Scene<ISpaceTrashApps>('bootscene_view_v0',
      {
        terminal: [(ecs, reply) => {
          reply(this.terminal.boot());
        }, (ecs, reply) => {
          return [];
        }, (ecs, events) => {

        }, "2d"],
        manual: [(ecs, reply) => {
          return []
        }, (ecs, reply) => {
          return [];
        }, (ecs, events) => {

        }, "2d"],
        drone: [(ecs, reply) => {
          // return []
        }, (ecs, reply) => {
          return [];
        }, (ecs, events) => {

        }, "webgl"],
        shipmap: [(ecs, reply) => {
          // return []
        }, (ecs, reply) => {
          return [];
        }, (ecs, events) => {

        }, "2d"],
      },
      async (ecs) => {
        return
      }
    ));

    state.set('menu', new Scene<ISpaceTrashApps>('menuscene_view_v0',
      {
        terminal: [(ecs, reply) => {
          reply(["login", ""]);
          reply(["terminal-update", this.terminal.login()]);
        }, (ecs, reply) => {
          return [];
        }, (ecs, events) => {

        }, "2d"],
        manual: [(ecs, reply) => {
          // return []
        }, (ecs, reply) => {
          return [];
        }, (ecs, events) => {

        }, "2d"],

        drone: [(ecs, reply) => {
          // return []
        }, (ecs, reply) => {
          return [
            (canvas) => {
              if (canvas.constructor.name === "OffscreenCanvasRenderingContext2D") {
                const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
                canvas2d.beginPath();
                canvas2d.arc(droneMouseX, droneMouseY, tSize / 3, 0, 2 * Math.PI);
                canvas2d.fillStyle = "green";
                canvas2d.fill();
                canvas2d.lineWidth = 1;
                canvas2d.strokeStyle = "grey";
                canvas2d.stroke();
              }
              if (canvas.constructor.name === "WebGLRenderingContext") {
                const gl = canvas as WebGLRenderingContext;

                // Set the color of the canvas. 
                // Parameters are RGB colors (red, green, blue, alpha) 
                gl.clearColor(0, 0.6, 0.0, 1.0);
                // Clear the color buffer with specified color 
                gl.clear(gl.COLOR_BUFFER_BIT);

                // canvas2d.beginPath();
                // canvas2d.arc(droneMouseX, droneMouseY, tSize / 3, 0, 2 * Math.PI);
                // canvas2d.fillStyle = "green";
                // canvas2d.fill();
                // canvas2d.lineWidth = 1;
                // canvas2d.strokeStyle = "grey";
                // canvas2d.stroke();
              }

            }
          ];
        }, (ecs, event: any) => {
          if (event.type === "mousemove") {

            var rect = event.boundingClient;
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            droneMouseX = x;
            droneMouseY = y;
          }
        }, "webgl"],


        shipmap: [(ecs, reply) => {
          // return []
        }, (ecs, reply) => {
          const thingsToDraw: Record<string, any> = {};
          Object.keys(ecs).forEach((ecKey) => {
            const ec: any = ecs[ecKey];

            if (!thingsToDraw[ec.entity]) {
              thingsToDraw[ec.entity] = {
                draw: undefined,
                opts: {
                  fill: "",
                }
              };
            }

            if (thingsToDraw[ec.entity] && thingsToDraw[ec.entity].opts) {
              if (ec.constructor.name === "PhysicsSetComponent") {
                const setpiece = ec as PhysicsSetComponent;

                thingsToDraw[ec.entity].draw = (canvas, opts: {
                  fill: string,
                  stroke: string,
                }) => {

                  if (canvas.constructor.name === "OffscreenCanvasRenderingContext2D") {
                    const canvas2d = canvas as OffscreenCanvasRenderingContext2D;

                    // debugger
                    canvas2d.beginPath();

                    if (setpiece.tileType === "NorthEast") {



                      // canvas2d.arc(
                      //   (setpiece.x * tSize) - tSize / 2,
                      //   (setpiece.y * tSize) + tSize/2,
                      //   tSize / 6,
                      //   0,
                      //   2 * Math.PI,
                      // )

                      // canvas2d.arc(
                      //   (setpiece.x * tSize) + tSize / 2,
                      //   (setpiece.y * tSize) + tSize/2,
                      //   tSize / 6,
                      //   0,
                      //   2 * Math.PI,
                      // )

                      var path = new Path2D();

                      path.moveTo((setpiece.x * tSize) - tSize / 2, (setpiece.y * tSize) - tSize / 2);
                      path.lineTo((setpiece.x * tSize) - tSize / 2, (setpiece.y * tSize) + tSize / 2);
                      path.lineTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) + tSize / 2);

                      canvas2d.fillStyle = "darkgrey";
                      canvas2d.fill(path);
                    }

                    if (setpiece.tileType === "NorthWest") {



                      var path = new Path2D();

                      path.moveTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) - tSize / 2);
                      path.lineTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) + tSize / 2);
                      path.lineTo((setpiece.x * tSize) - tSize / 2, (setpiece.y * tSize) + tSize / 2);

                      canvas2d.fillStyle = "darkgrey";
                      canvas2d.fill(path);
                    }

                    if (setpiece.tileType === "SouthEast") {

                      var path = new Path2D();

                      path.moveTo((setpiece.x * tSize) - tSize / 2, (setpiece.y * tSize) - tSize / 2);
                      path.lineTo((setpiece.x * tSize) - tSize / 2, (setpiece.y * tSize) + tSize / 2);
                      path.lineTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) - tSize / 2);

                      canvas2d.fillStyle = "darkgrey";
                      canvas2d.fill(path);
                    }

                    if (setpiece.tileType === "SouthWest") {
                      var sWidth = setpiece.x * tSize;
                      var sHeight = setpiece.y * tSize;

                      var path = new Path2D();

                      path.moveTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) + tSize / 2);
                      path.lineTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) - tSize / 2);
                      path.lineTo((setpiece.x * tSize) - tSize / 2, (setpiece.y * tSize) - tSize / 2);

                      canvas2d.fillStyle = "darkgrey";
                      canvas2d.fill(path);
                    }

                    if (setpiece.tileType === "TileA") {
                      var sWidth = setpiece.x * tSize;
                      var sHeight = setpiece.y * tSize;

                      var path = new Path2D();

                      path.moveTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) + tSize / 2);
                      path.lineTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize));
                      path.lineTo((setpiece.x * tSize), (setpiece.y * tSize) + tSize / 2);

                      canvas2d.fillStyle = "darkgrey";
                      canvas2d.fill(path);
                    }
                    if (setpiece.tileType === "TileB") {
                      // var sWidth = setpiece.x * tSize;
                      // var sHeight = setpiece.y * tSize;

                      // var path = new Path2D();

                      // path.moveTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) + tSize / 2);
                      // path.lineTo((setpiece.x * tSize) + tSize / 2, (setpiece.y * tSize) - tSize / 4);
                      // path.lineTo((setpiece.x * tSize) - tSize / 4, (setpiece.y * tSize) + tSize /2);

                      canvas2d.fillStyle = "darkgrey";


                      canvas2d.rect(
                        ((setpiece.x * tSize) - tSize / 2) + 1,
                        ((setpiece.y * tSize)) + 1,
                        tSize - 1,
                        (tSize / 2) - 1
                      );
                      // canvas2d.fill();
                    }
                    if (setpiece.tileType === "FloorTile") {
                      canvas2d.fillStyle = "white";
                      canvas2d.rect(
                        ((setpiece.x * tSize) - tSize / 2) + 1,
                        ((setpiece.y * tSize) - tSize / 2) + 1,
                        tSize - 1,
                        tSize - 1
                      );
                    }
                    if (setpiece.tileType === "WallTile") {
                      canvas2d.fillStyle = "darkgrey";
                      canvas2d.rect(
                        ((setpiece.x * tSize) - tSize / 2) + 1,
                        ((setpiece.y * tSize) - tSize / 2) + 1,
                        tSize - 1,
                        tSize - 1
                      );
                    }




                    if (opts?.fill) {
                      debugger
                      canvas2d.fillStyle = opts.fill;
                      // canvas2d.fill();
                    }
                    if (opts?.stroke) {
                      // console.log(opts.stroke)
                      canvas2d.strokeStyle = opts.stroke;
                      // canvas2d.stroke();
                    }
                    canvas2d.stroke();
                    canvas2d.fill();
                  }


                }
              }

              if (ec.constructor.name === "PhysicsActorComponent") {
                const actor = ec as PhysicsActorComponent;
                thingsToDraw[ec.entity].draw = (canvas) => {

                  if (canvas.constructor.name === "OffscreenCanvasRenderingContext2D") {
                    const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
                    canvas2d.beginPath();
                    canvas2d.arc(
                      actor.x * tSize,
                      actor.y * tSize,
                      tSize / 6,
                      0,
                      2 * Math.PI,
                    )
                    canvas2d.stroke();
                  }


                }
              }

              if (ec.constructor.name === "SolidityComponent") {
                if (ec.solidity === 0) {
                  thingsToDraw[ec.entity] = {
                    ...thingsToDraw[ec.entity],
                    opts: {
                      ...thingsToDraw[ec.entity].opts,
                      fill: "white"
                    }
                  };
                } else {
                  thingsToDraw[ec.entity] = {
                    ...thingsToDraw[ec.entity],
                    opts: {
                      ...thingsToDraw[ec.entity].opts,
                      fill: "lightgrey"
                    }
                  };
                }
              }

              // console.log(ec.constructor.name);
              if (ec.constructor.name === "LitableComponent") {
                // debugger
                // console.log("mark2", ec.luminance)
                // if (ec.luminance === -1) {
                //   // debugger  
                //   thingsToDraw[ec.entity] = {
                //     ...thingsToDraw[ec.entity],
                //     opts: {
                //       ...thingsToDraw[ec.entity].opts,
                //       stroke: "black"
                //     }
                //   };
                // } 
                if (ec.luminance === -1) {

                  thingsToDraw[ec.entity] = {
                    ...thingsToDraw[ec.entity],
                    opts: {
                      ...thingsToDraw[ec.entity].opts,
                      stroke: "grey"
                    }
                  };
                } else {

                  thingsToDraw[ec.entity] = {
                    ...thingsToDraw[ec.entity],
                    opts: {
                      ...thingsToDraw[ec.entity].opts,
                      stroke: "yellow"
                    }
                  };
                }
              }

            }
          });
          return [
            ...(
              Object.keys(thingsToDraw).map((k) => {
                return (c) => thingsToDraw[k].draw(c, thingsToDraw[k].opts) || ((c) => null)
              })
            ),
            (canvas) => {
              if (canvas.constructor.name === "OffscreenCanvasRenderingContext2D") {
                const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
                canvas2d.beginPath();
                canvas2d.arc(shipMapMouseX, shipMapMouseY, tSize / 3, 0, 2 * Math.PI);
                canvas2d.lineWidth = 1;
                canvas2d.strokeStyle = "grey";
                canvas2d.stroke();
              }

            }
          ];

        }, (ecs, event: any) => {
          if (event.type === "mousemove") {

            var rect = event.boundingClient;
            var x = event.clientX - rect.left; //x position within the element.
            var y = event.clientY - rect.top;

            shipMapMouseX = x;
            shipMapMouseY = y;
          }
        }, "2d"],
      },
      (ecs) => {
        return new Promise((res, rej) => {
          ecs.setEntitiesComponent(
            [
              ...ship.toTiles(),
              ...[
                ...new Array(10)
              ].map((n) => {
                return new SpaceTrashDrone(
                  10, 10,
                  // Math.random() * mapSize,
                  // Math.random() * mapSize,
                  5,

                  (Math.random() - 0.5) / 6,
                  (Math.random() - 0.5) / 6,
                  // 0,
                  // 0
                )

              }),
            ]
          )
          res();
        })
      }
    ));

    super(
      state,
      SpaceTrashMainSystem,
      workerPostMessage
    );
    this.ecs = new ECS(SpaceTrashMainSystem);
    this.terminal = new SpaceTrashTerminal();
  }

  async terminalIn(
    input: string,
    callback: (x: { out: string; status: string; }) => void,
  ): Promise<{ in: string, out: string }> {
    return {
      in: input,
      out: this.terminal.processCommand(
        input,
        this.changeScene,
        callback
      ).out
    };
  }
}



// if (canvas) {
//   Object.keys(ecs).forEach((ecKey) => {
//     const ec = ecs[ecKey];

//     if (ec.constructor.name === "PhysicsSetComponent") {
//       const setpiece = ec as PhysicsActorComponent;

//       canvas.beginPath();
//       canvas.rect(
//         (setpiece.x * tSize) - tSize / 2,
//         (setpiece.y * tSize) - tSize / 2,
//         tSize,
//         tSize
//       );
//       canvas.stroke();

//     }
//     if (ec.constructor.name === "PhysicsActorComponent") {

//       const drone = ec as PhysicsActorComponent;

//       canvas.beginPath();

//       let startAngle = 0; // Starting point on circle
//       let endAngle = Math.PI + (Math.PI * 1) / 2; // End point on circle
//       let counterclockwise = 2 % 2 === 1; // Draw counterclockwise

//       // canvas.rect(
//       //   (Math.round(drone.x) * tSize) - tSize / 2,
//       //   (Math.round(drone.y) * tSize) - tSize / 2,
//       //   tSize,
//       //   tSize
//       // );
//       // canvas.stroke();
//       canvas.beginPath();

//       canvas.arc(
//         drone.x * tSize,
//         drone.y * tSize,
//         tSize / 3,
//         startAngle,
//         endAngle,
//         counterclockwise
//       );
//       canvas.fillStyle = "blue";
//       canvas.fill();
//       canvas.lineWidth = 1;
//       canvas.strokeStyle = "red";
//       canvas.stroke();
//     }
//   })

//   canvas.beginPath();
//   canvas.arc(shipMapMouseX, shipMapMouseY, tSize / 2, 0, 2 * Math.PI);
//   canvas.fillStyle = "transparent";
//   canvas.fill();
//   canvas.lineWidth = 1;
//   canvas.strokeStyle = "white";
//   canvas.stroke();
// }