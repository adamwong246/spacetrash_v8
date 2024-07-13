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
          // debugger
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
          // debugger
        }],
        shipmap: [(ecs, reply) => {
          // return []
        }, (ecs, canvas, events, reply) => {
          // debugger
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

  async terminalIn(input: string,): Promise<{ in: string, out: string }> {
    return {
      in: input,
      out: this.terminal.processCommand(input, this.update).out
    };
  }

}
