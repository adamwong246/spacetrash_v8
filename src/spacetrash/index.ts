
import { PhysicsActorComponent } from "./Components/physics";
import { SpaceTrashDrone } from "./Entities";
import { FloorTile, WallTile, DoorTile } from "./Entities/setpieces";
import { ISpaceTrashSystems, SpaceTrashSystems } from "./Systems";
import { SpaceTrashTerminal } from "./lib/Terminal";
import { ISpaceTrashApps } from "./UI";
import { Game } from "../engine/Game";
import { Scene } from "../engine/Scene";
import { StateSpace } from "../engine/StateSpace";
import { SpaceTrashECS } from "./lib/EC";
import { SpaceTrashEntityComponent } from "./lib/EntityComponent";

let droneMouseX = 0;
let droneMouseY = 0;
let shipMapMouseX = 0;
let shipMapMouseY = 0;

const tSize = 30;

export default class Spacetrash extends Game<ISpaceTrashSystems> {

  terminal: SpaceTrashTerminal;
  constructor(
    workerPostMessage: (
      message: any, options?: WindowPostMessageOptions | undefined
    ) => void) {

    const state = new StateSpace("stateSpace_v0", "boot", "goodbye");

    state.connect(`boot`, `menu`);
    state.connect(`menu`, `mainloop`);

    state.set('boot', new Scene<ISpaceTrashApps>('bootscene_view_v0',
      {
        terminal: [(ecs, reply) => {
          reply(this.terminal.boot());
        }, (ecs, canvas, reply) => {
          // console.log(events)
        }],
        manual: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, reply) => {
          // debugger
        }],
        drone: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, reply) => {
          // debugger
        }],
        shipmap: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, reply) => {
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
        }, (ecs, canvas, reply) => {
          // console.log(events)
        }],
        manual: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, reply) => {
          // debugger
        }],
        drone: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, reply) => {

          if (canvas) {
            canvas.beginPath();
            canvas.arc(droneMouseX, droneMouseY, tSize / 3, 0, 2 * Math.PI);
            canvas.fillStyle = "green";
            canvas.fill();
            canvas.lineWidth = 1;
            canvas.strokeStyle = "grey";
            canvas.stroke();
          }
        }, (ecs, event: any) => {
          if (event.type === "mousemove") {

            var rect = event.boundingClient;
            var x = event.clientX - rect.left; //x position within the element.
            var y = event.clientY - rect.top;

            droneMouseX = x;
            droneMouseY = y;
          }
        }],
        shipmap: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, reply) => {
          if (canvas) {
            Object.keys(ecs).forEach((ecKey) => {
              const ec = ecs[ecKey];

              if (ec.constructor.name === "PhysicsSetComponent") {
                const setpiece = ec as PhysicsActorComponent;

                canvas.beginPath();
                canvas.rect(
                  (setpiece.x * tSize) - tSize / 2,
                  (setpiece.y * tSize) - tSize / 2,
                  tSize,
                  tSize
                );
                canvas.stroke();

              }
              if (ec.constructor.name === "PhysicsActorComponent") {

                const drone = ec as PhysicsActorComponent;

                canvas.beginPath();

                let startAngle = 0; // Starting point on circle
                let endAngle = Math.PI + (Math.PI * 1) / 2; // End point on circle
                let counterclockwise = 2 % 2 === 1; // Draw counterclockwise

                // canvas.rect(
                //   (Math.round(drone.x) * tSize) - tSize / 2,
                //   (Math.round(drone.y) * tSize) - tSize / 2,
                //   tSize,
                //   tSize
                // );
                // canvas.stroke();
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
            })

            canvas.beginPath();
            canvas.arc(shipMapMouseX, shipMapMouseY, tSize / 2, 0, 2 * Math.PI);
            canvas.fillStyle = "transparent";
            canvas.fill();
            canvas.lineWidth = 1;
            canvas.strokeStyle = "white";
            canvas.stroke();
          }
        }, (ecs, event: any) => {
          if (event.type === "mousemove") {

            var rect = event.boundingClient;
            var x = event.clientX - rect.left; //x position within the element.
            var y = event.clientY - rect.top;

            shipMapMouseX = x;
            shipMapMouseY = y;
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

          e.push(new WallTile(4, 4, 1))
          e.push(new WallTile(5, 5, 1))
          e.push(new DoorTile(6, 6, 1))
          e.push(new DoorTile(16, 16, 1))

          ecs.setEntitiesComponent(
            [


              ...e,
              ...[
                ...new Array(150)
              ].map((n) => {
                return new SpaceTrashDrone(
                  10, 10,
                  // Math.random() * mapSize,
                  // Math.random() * mapSize,
                  5,
                  (Math.random() - 0.5) / 4,
                  (Math.random() - 0.5) / 4)
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
