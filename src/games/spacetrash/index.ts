import { StateSpace } from "../../engine/StateSpace";
import { Game } from "../../engine/Game";
import { Scene } from "../../engine/Scene";

import { ISpaceTrashSystems, SpaceTrashSystems } from "./Systems";
import { ISpaceTrashApps } from "./UI";
import { SpaceTrashTerminal } from "./Terminal";


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

let mouseX = 0;
let mouseY = 0;


export class Spacetrash extends Game<ISpaceTrashSystems> {
  terminal: SpaceTrashTerminal;
  constructor(workerPostMessage: (message: any, options?: WindowPostMessageOptions | undefined) => void) {

    const state = new StateSpace("stateSpace_v0", "boot", "goodbye");

    state.connect(`boot`, `menu`);
    state.connect(`menu`, `mainloop`);

    state.set('boot', new Scene<ISpaceTrashApps>('bootscene_view_v0',
      {
        terminal: [(ecs, reply) => {
          console.log("-")
          // console.log(terminal.boot())

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
          if (canvas) {
            canvas.beginPath();
            canvas.arc(44, 11, 10, 0, 2 * Math.PI);
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

              mouseX = x;
              mouseY = y;
            }
          })

          if (canvas) {
            canvas.beginPath();
            canvas.arc(mouseX, mouseY, 10, 0, 2 * Math.PI);
            canvas.fillStyle = "red";
            canvas.fill();
            canvas.lineWidth = 1;
            canvas.strokeStyle = "blue";
            canvas.stroke();  
          }
          
          
      
          // ecs.forEach((ec) => {
          //   const d = ec.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
      
          //   ctx.beginPath();
          //   ctx.arc(d.x * 10, d.y * 20, 4, 0, 2 * Math.PI);
          //   ctx.fillStyle = "black";
          //   ctx.fill();
          //   ctx.lineWidth = 1;
          //   ctx.strokeStyle = "red";
          //   ctx.stroke();
      
          // })
        }],

      }
    ));

    super(
      state,
      SpaceTrashSystems,
      workerPostMessage
    );

    this.terminal = new SpaceTrashTerminal();

  }

  async terminalIn(
    input: string,
    callback: (x: { out: string; status: string; }) => void,
  ): Promise<{ in: string, out: string }> {
    return {
      in: input,
      out: this.terminal.processCommand(input, this.update, callback).out
    };
  }

}
