import pixiShipMap from "./ECS/Views/pixi2d";
import threejsDroneVideo from "./ECS/Views/threejs3d";

import { DockviewDefaultTab, DockviewReadyEvent, IDockviewPanelHeaderProps, IDockviewPanelProps } from "dockview";
import React, { FunctionComponent } from "react";

import { StateSpace } from "../engine/StateSpace";

import { } from "./ECS/Components/physics";
import {
  SpaceTrashMainSystem,
} from "./ECS/System";
import {
  AttackableStore,
  CameraStore,
  LittableStore,
} from "./ECS/Components/casting/in";
import { LitStore } from "./ECS/Components/casting/out";
import { Phase0Store } from "./ECS/Components/phase0";
import { Phase1Store } from "./ECS/Components/phase1";
import { PhysicsActorStore } from "./ECS/Components/actor";
import { PhysicsSetPieceStore } from "./ECS/Components/setPiece";

import { TerminalWindow } from "./UI/terminal";

import { ITerminalLine, SpaceTrashTerminal } from "./Terminal";

import bootScene from "./Scenes/Boot";
import mainLoopScene from "./Scenes/MainLoop";
import { WindowedGame } from "../WindowedGame";
import { BotWindow } from "./UI/BotWindow";
import { MapWindow } from "./UI/map";
import { BotsWindow } from "./UI/BotsWindow";

let shipMapMouseX = 0;
let shipMapMouseY = 0;
export type ISpaceTrashApps =
  | "terminal"
  | `shipmap`
  | `manual`
  | `drone`
  | "drones"
  | "shipmapV2"
  | "droneV2";

export type IState = {
  buffer: string;
  history: ITerminalLine[];

  bots: {
    1: [number, string] | null;
    2: [number, string] | null;
    3: [number, string] | null;
    4: [number, string] | null;
    5: [number, string] | null;
    6: [number, string] | null;
    7: [number, string] | null;
    8: [number, string] | null;
    9: [number, string] | null;
  };
};

const initialState: IState = {
  buffer: "",
  history: [{
    out: "hardware check passed",
    status: "pass"
  }],
  bots: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  }
}

export type IRenderings = "2d" | "webgl2" | "pixi2d" | "threejs" | null;

export class SpaceTrash extends WindowedGame<IRenderings, {
  Phase0: Phase0Store,
  Phase1: Phase1Store
}, number> {



  uiHooks = {
    terminalAddHistory: (setter, history: ITerminalLine[]) => {
      console.log('terminalAddHistory', history)
      setter({
        history
      })
      // debugger
    }
  }

  terminal: SpaceTrashTerminal;
  public videoFeed: number = 1;

  public bots: {
    1: [number, string];
    2: [number, string];
    3: [number, string];
    4: [number, string];
    5: [number, string];
    6: [number, string];
    7: [number, string];
    8: [number, string];
    9: [number, string];
  };

  constructor(domNode: HTMLElement) {


    const stateSpace = new StateSpace("stateSpace_v0", "boot", "goodbye");
    stateSpace.connect(`boot`, `mainloop`);
    stateSpace.connect(`mainloop`, `goodbye`);
    stateSpace.set("boot", bootScene);
    stateSpace.set("mainloop", mainLoopScene);

    super(
      stateSpace,
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
      {
        fps: 60,
        performanceLogging: false,
      },
      new Set(["2d", "webgl2", "pixi2d", "threejs"]),
      domNode,

      initialState,

      // onDockviewReadyEvent
      (event: DockviewReadyEvent, s) => {

        this.dockviewAPI = event.api;

        event.api.addPanel({
          id: 'terminal',
          component: 'terminal',
          floating: {
            position: { left: 10, top: 10 },
            width: 900,
            height: 600
          },
          params: {
            ...s,
          }
        })

        // event.api.addPanel({
        //   id: 'bot',

        //   component: 'bot',
        //   floating: {
        //     position: { left: 50, top: 50 },
        //     width: 600,
        //     height: 400
        //   },
        //   params: {
        //     ...s,
        //   }
        // })

        // this.start()
      },

      // dockViewComponents
      (s: IState) => {
        return {

          default: (props: IDockviewPanelHeaderProps<IState>) => {
            return (
              <div>
                <p>default</p>
                {/* <div>{`custom tab: ${props.api.title}`}</div>
                    <span>{`value: ${props.params.myValue}`}</span> */}
              </div>
            );
          },

          shipMap: (props: IDockviewPanelHeaderProps<IState>) => {
            return (
              <MapWindow game={this} />
            );
          },

          bot: (props: IDockviewPanelHeaderProps<IState>) => {
            return (
              <BotWindow game={this} />
            );
          },

          bots: (props: IDockviewPanelHeaderProps<IState>) => (<BotsWindow game={this} />),

          terminal: (props: IDockviewPanelHeaderProps<IState>) => {

            if (!this.terminal) {
              this.terminal = new SpaceTrashTerminal(
                (x) => props.api.updateParameters(x),
                this.uiHooks,
                () => {

                  this.changeScene("mainloop");
                  // this.ecs.unpause();
                }
              );
              this.terminal.boot();
            }

            props.api.updateParameters(this.terminal.state())

            return (
              <TerminalWindow uiState={this.terminal.state()} />
            );
          },
        }
      },
      {
        default: (props: IDockviewPanelHeaderProps) => {
          const onContextMenu = (event: React.MouseEvent) => {
            event.preventDefault();
            alert('context menu');
          };
          return <DockviewDefaultTab
            onContextMenu={onContextMenu}
            hideClose={true}
            closeActionOverride={() => null}

            {...props} />;
        },
      },

    );

    this.start()


  }

  openAllWindows() {
    this.dockviewAPI.component.addPanel({
      id: 'bot',
      component: 'bot',
      floating: {
        position: { left: 50, top: 50 },
        width: 600,
        height: 400
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'shipMap',
      component: 'shipMap',
      floating: {
        position: { left: 100, top: 150 },
        width: 600,
        height: 400
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'bots',
      component: 'bots',
      floating: {
        position: { left: 100, top: 150 },
        width: 600,
        height: 400
      },
      params: {

      }
    })
  }

  gameReady: () => void = () => {
    // this.terminal = new SpaceTrashTerminal(this.stateSetter, this.uiHooks);
    this.start()
  }

  positionOfEntity(eid: number): { x: number; y: number } {
    if (!this.componentStores["PhysicsActorComponent"].get(eid)) throw "missing entity";
    return {
      x: this.componentStores["PhysicsActorComponent"].get(eid).x,
      y: this.componentStores["PhysicsActorComponent"].get(eid).y,
    };
  }

  public videoFeedPosition(): { x: number; y: number } {
    return this.positionOfEntity(
      (this.bots[this.videoFeed] as [number, string])[0]
    );
  }

  renderDroneVideo(ctx: HTMLCanvasElement) {
    threejsDroneVideo(this, ctx);
  }

  renderShipMap(ctx: any) {
    pixiShipMap(this, ctx);
  }

  botsHook: React.Dispatch<any>;
  registerBotsHook(stateSetter: React.Dispatch<any>) {
    this.botsHook = stateSetter;
    this.fireBotsHook()
  }
  fireBotsHook() {
    this.botsHook(this.bots)
  }

  isFriendly(aeid: number): boolean {
    // return Math.random() > 0.5
    let isFriend: boolean = false;

    if (!this.bots) throw "no bots?!";
      
    return Object.keys(this.bots).find((b) => {

      const bot: [number, string] = this.bots[b];
      const bid: number = bot[0]

      if (bot && aeid === bid) {
        return true;
      } else {
        return false;
      }
    }) !== undefined || false
    // throw new Error("Method not implemented.");
  }


  // public yup() {
  //   for (let ndx = 1; ndx <= 9; ndx++) {
  //     if (this.videoFeed === ndx) {
  //       this.bots[this.videoFeed].dy = this.bots[this.videoFeed].dy - 0.001;
  //     }
  //   }
  // }
  // public ydown() {
  //   for (let ndx = 1; ndx <= 9; ndx++) {
  //     if (this.videoFeed === ndx) {
  //       this.bots[this.videoFeed].dy = this.bots[this.videoFeed].dy + 0.001;
  //     }
  //   }
  // }

  // public xleft() {
  //   for (let ndx = 1; ndx <= 9; ndx++) {
  //     if (this.videoFeed === ndx) {
  //       this.bots[this.videoFeed].dx = this.bots[this.videoFeed].dx - 0.001;
  //     }
  //   }
  // }
  // public xright() {
  //   for (let ndx = 1; ndx <= 9; ndx++) {
  //     if (this.videoFeed === ndx) {
  //       this.bots[this.videoFeed].dx = this.bots[this.videoFeed].dx + 0.001;
  //     }
  //   }
  // }

  // onStateChange(stateSetter: Dispatch<SetStateAction<IState>>) {
  //   this.stateSetter = stateSetter
  // }

}


// const st = new SpaceTrash();