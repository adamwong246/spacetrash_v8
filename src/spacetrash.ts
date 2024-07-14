import { LitableComponent } from "./Components/casting/in";
import { OpacityComponent } from "./Components/opacity";
import { PhysicsActorComponent, PhysicsSetComponent } from "./Components/physics";
import { SpaceTrashECS } from "./EC";
import { SpaceTrashDrone } from "./Entities";
import { FloorTile, WallTile, DoorTile } from "./Entities/setpieces";
import { SpaceTrashEntityComponent } from "./EntityComponent";
import { ISpaceTrashSystems, SpaceTrashSystems } from "./Systems";
import { SpaceTrashTerminal } from "./Terminal";
import { ISpaceTrashApps } from "./UI";
import { Game } from "./engine/Game";
import { Scene } from "./engine/Scene";
import { StateSpace } from "./engine/StateSpace";

let droneMouseX = 0;
let droneMouseY = 0;
let shipMapMouseX = 0;
let shipMapMouseY = 0;

const tSize = 30;

export default class Spacetrash extends Game<ISpaceTrashSystems> {
  terminal: SpaceTrashTerminal;
  constructor(workerPostMessage: (message: any, options?: WindowPostMessageOptions | undefined) => void) {

    // const surface = new SpaceTrashSurface('my-first-surface');
    // console.log(surface.store);

    const state = new StateSpace("stateSpace_v0", "boot", "goodbye");

    state.connect(`boot`, `menu`);
    state.connect(`menu`, `mainloop`);

    state.set('boot', new Scene<ISpaceTrashApps>('bootscene_view_v0',
      {
        terminal: [(ecs, reply) => {
          reply(this.terminal.boot());
        }, (ecs, canvas, events, reply) => {
          // console.log(events)
        }],
        manual: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, events, reply) => {
          // debugger
        }],
        drone: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, events, reply) => {
          // debugger
        }],
        shipmap: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, events, reply) => {
          // debugger
        }],
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
        }, (ecs, canvas, events, reply) => {
          // console.log(events)
        }],
        manual: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, events, reply) => {
          // debugger
        }],
        drone: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, events, reply) => {

          events.forEach((event) => {
            if (event.type === "mousemove") {

              var rect = event.boundingClient;
              var x = event.clientX - rect.left; //x position within the element.
              var y = event.clientY - rect.top;

              droneMouseX = x;
              droneMouseY = y;
            }
          })

          if (canvas) {
            canvas.beginPath();
            canvas.arc(droneMouseX, droneMouseY, tSize / 3, 0, 2 * Math.PI);
            canvas.fillStyle = "green";
            canvas.fill();
            canvas.lineWidth = 1;
            canvas.strokeStyle = "grey";
            canvas.stroke();
          }
        }],
        shipmap: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, events, reply) => {


          events.forEach((event) => {
            if (event.type === "mousemove") {

              var rect = event.boundingClient;
              var x = event.clientX - rect.left; //x position within the element.
              var y = event.clientY - rect.top;

              shipMapMouseX = x;
              shipMapMouseY = y;
            }
          })

          if (canvas) {
            ecs.forEach((ec) => {
              const drone = ec.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
              if (drone) {
                canvas.beginPath();

                let startAngle = 0; // Starting point on circle
                let endAngle = Math.PI + (Math.PI * 1) / 2; // End point on circle
                let counterclockwise = 2 % 2 === 1; // Draw counterclockwise

                canvas.rect(
                  (Math.round(drone.x) * tSize) - tSize / 2,
                  (Math.round(drone.y) * tSize) - tSize / 2,
                  tSize,
                  tSize
                );
                canvas.stroke();
                canvas.beginPath();

                canvas.arc(
                  drone.x * tSize,
                  drone.y * tSize,
                  tSize / 3,
                  startAngle,
                  endAngle,
                  counterclockwise
                );
                canvas.fillStyle = "blue";
                canvas.fill();
                canvas.lineWidth = 1;
                canvas.strokeStyle = "red";
                canvas.stroke();
              }
              // console.log(ec)
              // console.log(ec.components.map((c) => c.constructor.name));
              const setpiece = ec.components.find((c) => c.constructor.name === "PhysicsSetComponent") as PhysicsSetComponent;
              if (setpiece) {
                // console.log("setpiece", setpiece)
                canvas.beginPath();

                canvas.arc(
                  setpiece.x * tSize,
                  setpiece.y * tSize,
                  tSize / 2,
                  0,
                  2 * Math.PI
                );
                canvas.rect(
                  (setpiece.x * tSize) - tSize / 2,
                  (setpiece.y * tSize) - tSize / 2,
                  tSize,
                  tSize
                );

                const opacityComp = ec.components.find((c) => c.constructor.name === "OpacityComponent") as OpacityComponent;
                if (opacityComp && opacityComp.opacity === 0) {
                  canvas.fillStyle = "black";
                  canvas.fill();
                }
                if (opacityComp && opacityComp.opacity === 1) {
                  canvas.fillStyle = "white";
                  canvas.fill();
                }
                if (opacityComp && opacityComp.opacity === 2) {
                  canvas.fillStyle = "red";
                  canvas.fill();
                }

                const littable = ec.components.find((c) => c.constructor.name === "LitableComponent") as LitableComponent;

                // console.log("littable", littable)

                if (littable && littable.albedo === 0) {
                  canvas.strokeStyle = "grey"
                  canvas.stroke();
                } else {
                  canvas.strokeStyle = "yellow"
                  canvas.stroke();
                }

              }

            })

            canvas.beginPath();
            canvas.arc(shipMapMouseX, shipMapMouseY, tSize / 2, 0, 2 * Math.PI);
            canvas.fillStyle = "transparent";
            canvas.fill();
            canvas.lineWidth = 1;
            canvas.strokeStyle = "white";
            canvas.stroke();
          }
        }],
      },
      (ecs) => {

        const e: SpaceTrashEntityComponent[] = [];
        return new Promise((res, rej) => {

          const roomsSize = 16;

          for (let y = 0; y < roomsSize; y++) {
            for (let x = 0; x < roomsSize; x++) {
              e.push(new FloorTile(x, y, 1))
            }

            e.push(new WallTile(0, y, 1))
            e.push(new WallTile(y, 0, 1))
            e.push(new WallTile(roomsSize, y, 1))
            e.push(new WallTile(y, roomsSize, 1))

          }

          e.push(new DoorTile(5, 5, 1))
          e.push(new DoorTile(roomsSize, roomsSize, 1))

          ecs.setEntitiesComponent(
            [


              ...e,
              ...[
                ...new Array(1000)
              ].map((n) => {
                return new SpaceTrashDrone(
                  10, 10,
                  // Math.random() * mapSize,
                  // Math.random() * mapSize,
                  5,
                  (Math.random() - 0.5) / 40,
                  (Math.random() - 0.5) / 40)
              }),
              // new DoorTile(4, 4, 1),
            ]
          )
          // debugger
          res();
        })
      }
    ));

    super(
      state,
      SpaceTrashSystems,
      workerPostMessage
    );
    this.ecs = new SpaceTrashECS(SpaceTrashSystems);
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
