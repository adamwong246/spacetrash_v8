import { DockviewDefaultTab, DockviewReadyEvent, IDockviewPanelHeaderProps, IDockviewPanelProps } from "dockview";
import React from "react";

import { StateSpace } from "../engine/StateSpace";
import pixiShipMap from "./ECS/Views/pixi2d";
import threejsDroneVideo from "./ECS/Views/threejs3d";

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
import { ITermWindowState, TerminalWindow } from "./UI/terminal";
import bootScene from "./Scenes/Boot";
import mainLoopScene from "./Scenes/MainLoop";
import { BotWindow } from "./UI/BotWindow";
import { MapWindow } from "./UI/map";
import { BotsWindow } from "./UI/BotsWindow";
import { ITerminalLine, TerminalGame, WindowedTerminalGame } from "./Terminal";
import { DesktopGame } from "../DesktopGame";

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


const bootScreenTermLine: ITerminalLine = {
  status: "pass",
  out: `
  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                                        │
  │ ███████╗██████╗  █████╗  ██████╗███████╗████████╗██████╗  █████╗ ███████╗██╗  ██╗    ██╗   ██╗ █████╗  │
  │ ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║  ██║    ██║   ██║██╔══██╗ │
  │ ███████╗██████╔╝███████║██║     █████╗     ██║   ██████╔╝███████║███████╗███████║    ██║   ██║╚█████╔╝ │
  │ ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝     ██║   ██╔══██╗██╔══██║╚════██║██╔══██║    ╚██╗ ██╔╝██╔══██╗ │
  │ ███████║██║     ██║  ██║╚██████╗███████╗   ██║   ██║  ██║██║  ██║███████║██║  ██║     ╚████╔╝ ╚█████╔╝ │
  │ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═══╝   ╚════╝  │
  │                                                                                                        │
  └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
            
boot sequence initiated...
Oonix v457.3.2 by Demiurge Labs, 3003
QPU 1998885d-3ec5-4185-9321-e618a89b34d8 aka "Wintermute" is now online
boot sequence complete!
  `,
};

export type IState = {
  game: SpaceTrash;
};

export type IRenderings = "2d" | "webgl2" | "pixi2d" | "threejs" | null;

function isAlphabetic(str: string): boolean {
  return /^[A-Za-z]+$/.test(str) && str.length === 1;
}

function isNumeric(str: string): boolean {
  return /^[1-9]+$/.test(str) && str.length === 1;
}

export class SpaceTrash extends TerminalGame<IRenderings, {
  Phase0: Phase0Store,
  Phase1: Phase1Store
}, number> {

  // uiHooks: any;

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
  terminalWindowHook: React.Dispatch<React.SetStateAction<ITermWindowState | undefined>>;

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
        fps: 45,
        performanceLogging: false,
      },
      new Set(["2d", "webgl2", "pixi2d", "threejs"]),
      domNode,
    );

    this.addToHistory(bootScreenTermLine)

    const self = this;
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        self.focusMapWindow();
      }
      else if (event.key === "`") {
        self.focusTerminalWindow();
      }
      else if (event.key === 'ArrowUp') {
        self.driveForward();
      }
      else if (event.key === 'ArrowDown') {
        self.driveBack();
      }
      else if (event.key === 'ArrowLeft') {
        self.turnLeft();
      }
      else if (event.key === 'ArrowRight') {
        self.turnRight();
      }
      else if (isNumeric((event.key)) && self.buffer === "") {
        self.focusVideoWindow(event.key)
      }
      else if (isAlphabetic(event.key)) {
        self.focusTerminalWindow(event.key)
      }
      else {
        console.log(event);
      }

    });

  }

  bufferRef: React.MutableRefObject<null>;

  registerTerminalBuffer(inputRef: React.MutableRefObject<null>) {
    this.bufferRef = inputRef;
  }

  dockViewComponents: Record<string, React.FunctionComponent<IDockviewPanelProps>> = {

    default: (props: IDockviewPanelHeaderProps<IState>) => {
      return (
        <div>
          <p>default</p>
          {/* <div>{`custom tab: ${props.api.title}`}</div>
              <span>{`value: ${props.params.myValue}`}</span> */}
        </div>
      );
    },

    map: (props: IDockviewPanelHeaderProps<IState>) => {
      return (
        <MapWindow game={this} />
      );
    },

    vid: (props: IDockviewPanelHeaderProps<IState>) => {
      return (
        <BotWindow game={this} />
      );
    },

    bots: (props: IDockviewPanelHeaderProps<IState>) => (<BotsWindow game={this} />),
    term: (props: IDockviewPanelHeaderProps<IState>) => <TerminalWindow game={this} />,
  }


  // dockViewComponents() {
  //   return {

  //     default: (props: IDockviewPanelHeaderProps<IState>) => {
  //       return (
  //         <div>
  //           <p>default</p>
  //           {/* <div>{`custom tab: ${props.api.title}`}</div>
  //               <span>{`value: ${props.params.myValue}`}</span> */}
  //         </div>
  //       );
  //     },

  //     map: (props: IDockviewPanelHeaderProps<IState>) => {
  //       return (
  //         <MapWindow game={this} />
  //       );
  //     },

  //     vid: (props: IDockviewPanelHeaderProps<IState>) => {
  //       return (
  //         <BotWindow game={this} />
  //       );
  //     },

  //     bots: (props: IDockviewPanelHeaderProps<IState>) => (<BotsWindow game={this} />),
  //     term: (props: IDockviewPanelHeaderProps<IState>) => <TerminalWindow game={this} />,
  //   }
  // }


  onDockviewReady(event: DockviewReadyEvent) {
    super.onDockviewReady(event);
    event.api.addPanel({
      id: 'term',
      component: 'term',
      floating: {
        position: { left: 10, top: 10 },
        width: 900,
        height: 600
      },
      params: {
        game: this
      }
    })
  }

  loginHook() {
    this.changeScene("mainloop")
    this.openAllWindows()
  }

  focusMapWindow() {
    this.unFocusOnTermInput();
    super.focusWindowById(`map`);
  }

  focusTerminalWindow() {
    super.focusWindowById(`term`)
    this.focusOnTermInput()
  }

  focusVideoWindow(s: string) {
    const n: number = Number(s);
    if (!n || n < 1 || n > 9) throw `${n} is out of range, given ${s}`
    this.videoFeed = n;

    this.unFocusOnTermInput();
    super.focusWindowById(`vid`)

  }

  //   focusVideoWindowAndSwitchVideoFeed(s: string) {
  //   this.videoFeed = Number(s);
  //   this.dockviewAPI.panels.forEach((dp) => {
  //     if (dp.id === "vid") {
  //       dp.focus()
  //     }
  //   })
  // }


  driveForward() {
    const beid = this.bots[this.videoFeed][0];
    const pac = this.componentStores['PhysicsActorComponent'].get(beid);
    pac.dy = pac.dy - .001;
  }
  driveBack() {
    const beid = this.bots[this.videoFeed][0];
    const pac = this.componentStores['PhysicsActorComponent'].get(beid);
    pac.dy = pac.dy + 0.01;
  }
  turnLeft() {
    const beid = this.bots[this.videoFeed][0];
    const pac = this.componentStores['PhysicsActorComponent'].get(beid);
    pac.dx = pac.dx - 0.01;
  }
  turnRight() {
    const beid = this.bots[this.videoFeed][0];
    const pac = this.componentStores['PhysicsActorComponent'].get(beid);
    pac.dx = pac.dx + 0.01;
  }

  openAllWindows() {
    this.dockviewAPI.component.addPanel({
      id: 'vid',
      component: 'vid',
      floating: {
        position: { left: 50, top: 50 },
        width: 600,
        height: 400
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'map',
      component: 'map',
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


  focusWindowById(s: string, p: string) {
    if (s == 'map') {
      this.focusMapWindow();
    } else if (s === `term`) {
      this.focusTerminalWindow();
    } else if (s === `vid`) {
      this.focusVideoWindow(p);
    } else {
      throw `no window by id ${s}, ${p}`
    }
  }

  focusOnTermInput() {
    this.bufferRef.current.focus()
  }

  unFocusOnTermInput() {
    this.bufferRef.current.blur()
  }

}

// private buffer: string = "";

// submitBuffer(s: string) {

// }
// setBuffer(s: string) {

// }
// addToBuffer(s: string) {
//   this.processCommand(s);
// }

// alreadyLoggedIn(): void {
//   this.returnCommand({
//     out: `You are already logged in`,
//     status: "fail",
//   });
// }



// updateTerminal() {
//   this.terminalWindowHook({
//     history: this.terminalHistory,
//     buffer: this.buffer,
//     submitBuffer: this.submitBuffer,
//     setBuffer: this.setBuffer,
//   })
// }

// loggedIn: boolean;

// login(): void {

//   if (!this.loggedIn) {
//     this.loggedIn = true;
//     this.loginHook()
//     this.returnCommand(
//       // props,
//       {
//         ...props,
//         uiState: {
//           ...props.uiState,
//           loggedIn: true,
//         },

//         // state: {
//         //   ...props.params.state,
//         //   terminal: {
//         //     ...props.params.state.terminal,
//         //     loggedIn: true,
//         //   },
//         // },

//         // ...state,
//       },

//       loggedInTermLine
//     );

//   } else {
//     this.returnCommand(
//       // props,
//       {
//         ...props,
//         uiState: {
//           ...props.uiState,
//           loggedIn: false,
//         },

//       },

//       alreadyLoggedInTermLine
//     );
//   }




// }

// buffer: string;

// private history : ITerminalLine[]=[];

// returnCommand(props: IDockviewPanelProps<IState>, t: ITerminalLine) {
//   this.buffer = "";
//   this.history.push(t);
//   this.updateTerminal()
//   // props.uiState.uiUpdateCallback({
//   //   uiState: {
//   //     ...props.uiState,
//   //     buffer: "",
//   //       history: [
//   //         ...props.uiState.history,
//   //         {
//   //           ...t,
//   //           in: props.uiState.buffer,
//   //         },
//   //       ],

//   //     // ...state,
//   //     // terminal: {
//   //     //   ...state.terminal,
//   //     //   buffer: "",
//   //     //   history: [
//   //     //     ...state.terminal.history,
//   //     //     {
//   //     //       ...t,
//   //     //       in: state.terminal.buffer,
//   //     //     },
//   //     //   ],
//   //   },
//   // });
// }



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




// const st = new SpaceTrash();