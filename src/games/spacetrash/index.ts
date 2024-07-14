import { StateSpace } from "../../engine/StateSpace";
import { Game } from "../../engine/Game";
import { Scene } from "../../engine/Scene";

import { ISpaceTrashSystems, SpaceTrashSystems } from "./Systems";
import { ISpaceTrashApps } from "./UI";
import { SpaceTrashTerminal } from "./Terminal";
import { Surface } from "../../engine/Surface";
import { SpaceTrashSurface } from "./surface";
import { PhysicsActorComponent } from "./Components/physics";
import { DroneApp } from "./UI/drone";
import { SpaceTrashDrone } from "./Entities";
import { ECS_Basic } from "../../engine/ECS/basic";
import { SpaceTrashECS } from "./EC";


export type IRays =
  'light' |
  `sound` |
  'attack' |
  `movement` |
  `thermal` |
  'visible';

export enum ERays {
  'light',
  'sound',
  'attack',
  'movement',
  'thermal',
  'visible',
}

let droneMouseX = 0;
let droneMouseY = 0;
let shipMapMouseX = 0;
let shipMapMouseY = 0;


export class Spacetrash extends Game<ISpaceTrashSystems> {
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
            canvas.arc(droneMouseX, droneMouseY, 10, 0, 2 * Math.PI);
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
              const d = ec.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
              canvas.beginPath();
              canvas.arc(d.x * 10, d.y * 10, 4, 0, 2 * Math.PI);
              canvas.fillStyle = "blue";
              canvas.fill();
              canvas.lineWidth = 1;
              canvas.strokeStyle = "red";
              canvas.stroke();
            })

            canvas.beginPath();
            canvas.arc(shipMapMouseX, shipMapMouseY, 10, 0, 2 * Math.PI);
            canvas.fillStyle = "transparent";
            canvas.fill();
            canvas.lineWidth = 1;
            canvas.strokeStyle = "white";
            canvas.stroke();
          }
        }],
      },
      (ecs) => {
        return new Promise((res, rej) => {
          // const d = new SpaceTrashDrone(1, 2, 3, 4, 5)
          ecs.setEntitiesComponent([...new Array(2000)].map((n) => {
            return new SpaceTrashDrone(
              // 400, 300,
              Math.random() * 800,
              Math.random() * 600,
              3,
              (Math.random() - 0.5) / 10,
              (Math.random() - 0.5) / 10)
          }))
          res();
          // ecs.entityComponents = [new SpaceTrashDrone(1, 2, 3, 0.04, 0.05)]
          // return
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
