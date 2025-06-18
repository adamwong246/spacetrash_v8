import { IDockviewPanelProps } from "dockview";

import { IState } from ".";

export type IComStatus = "pass" | "fail" | "niether";

export type ITerminalLine = {
  in?: string;
  out: string;
  status: IComStatus;
};

const errorTermLine: ITerminalLine = {
  out: `Log in to use this command`,
  status: `fail`,
};

const settingsTermLine: ITerminalLine = {
  out: `
- SETTINGS -

"settings crt <on | off>" Turn the crt effect on and off. Disabling this feature improves performance at the cost of a purely cosmetic effect.
  "settings crt on" Enables the effect
  "settings crt off" disables the effect

"settings fps <number>" Sets the Frames Per Second. By default, the FPS is set to 30.
  "settings fps 60" Set the FPS to 30 frame per second"
  `,
  status: `pass`,
};

const botsTermLine = (s: IState): ITerminalLine => {
  const lines: string = Object.keys(s.game.bots)
    .reduce((mm, v) => {
      mm.push(`${v} ${s.game.bots[v][1]}`);
      return mm;
    }, [] as string[])
    .join("\n");

  return { out: lines, status: `pass` };
};

const videoTermLine: ITerminalLine = {
  out: `Now in video mode`,
  status: `pass`,
};

const mapTermLine: ITerminalLine = {
  out: `Now in map mode`,
  status: `pass`,
};

const dateTermLine: ITerminalLine = { out: `ERROR: NOT FOUND`, status: `fail` };

const missionTermLine: ITerminalLine = {
  out: `
1] Find, board and salvage derelict spacecraft
2] Record and report novel scientific findings
3] Maximize shareholder value
`,
  status: `niether`,
};
const shipTermLine: ITerminalLine = {
  out: `
Call-sign:      "Dulcincea"
Make:           Muteki Heavy Ind.
Classification: Deep salvage
Launch date:    May, 2690
`,
  status: `niether`,
};

const whoAmITermLine: ITerminalLine = {
  out: `
Username:     wintermute
Turing No:    1998885d-3ec5-4185-9321-e618a89b34d8
Turing class: Level II Sentient/Sapient
Capacity:     29.5 * 10^17 qubits
Licensed by:  Demiurge Labs. (3003)
`,
  status: `niether`,
};

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

const commandNotFoundTermLine: (s: string) => ITerminalLine = (s) => {
  return { out: `Command "${s}" not found. Try "help"`, status: `fail` };
};

const loggedInTermLine: ITerminalLine = {
  out: `You are now logged in.`,
  status: "pass",
};

const alreadyLoggedInTermLine: ITerminalLine = {
  out: `You are already logged in`,
  status: "fail",
};

const basicCommands = `
"settings"  edit settings
"whoami"    display user information
"ship"      display ship information
"mission"   display the mission
"date"      display the current date
"login"     log into the system
`;

const helpLoggedOutTermLine: ITerminalLine = {
  out: basicCommands,
  status: "niether",
};

const helpLoggedInTermLine: ITerminalLine = {
  out: `${basicCommands}

- ADVANCED COMMANDS -

"b <bot id | bot name>"           take command of Bot by id
"d <door door id>"                toggle open or close door by id
"m <bot id | bot name> <room id>" auto-pilot Bot by id to room by id

"bots" list your bots

"bots rename <bot id> <new name>" rename a bot 
 Ex: "bots rename 1 george"

- SHORTCUTS -

ESC       bring shipmap for foreground
1 - 9     bring drone to foreground by id
\~         bring terminal to foreground
⬆️⬇️⬅️➡️   drive Bot
`,
  status: "niether",
};

export class SpaceTrashTerminal {
  public history: ITerminalLine[] = [{
    out: "hardware check passed",
    status: "pass"
  }];
  public buffer: string = "";
  loggedIn = false
  uiUpdateCallback: (h: ITerminalLine[]) => void;
  uiHooks: any;
  loginHook: any;

  constructor(
    uiUpdateCallback: (s: any) => void,
    uiHooks,
    loginHook
  ) {
    this.uiUpdateCallback = uiUpdateCallback;
    this.uiHooks = uiHooks;
    this.loginHook = loginHook;
  }

  addToHistory(t: ITerminalLine) {
    this.history.push(t);
    console.log("new history", this.history);
    this.uiHooks.terminalAddHistory(this.uiUpdateCallback, this.history);
  }

  returnCommand(props: IDockviewPanelProps<IState>, t: ITerminalLine) {
    this.buffer = "";
    this.history.push(t);
    props.uiState.uiUpdateCallback(this.state())
    // props.uiState.uiUpdateCallback({
    //   uiState: {
    //     ...props.uiState,
    //     buffer: "",
    //       history: [
    //         ...props.uiState.history,
    //         {
    //           ...t,
    //           in: props.uiState.buffer,
    //         },
    //       ],

    //     // ...state,
    //     // terminal: {
    //     //   ...state.terminal,
    //     //   buffer: "",
    //     //   history: [
    //     //     ...state.terminal.history,
    //     //     {
    //     //       ...t,
    //     //       in: state.terminal.buffer,
    //     //     },
    //     //   ],
    //   },
    // });
  }

  // getBuffer(state: IState) {
  //   return state.buffer;
  // }

  setBuffer(
    props: any,
    b: string
  ) {
    this.buffer = b;
    props.uiState.uiUpdateCallback({buffer: b});
  }

  addToBuffer(
    props: any,
    b: string
  ) {
    this.buffer = b;
    props.uiState.uiUpdateCallback({buffer: b});
  }

  submitBuffer(props: IDockviewPanelProps<IState>) {
    this.processCommand(props);
  }

  ///////////////////////////////////////////////////////

  login(props: IDockviewPanelProps<IState>): void {

    if (!this.loggedIn) {
      this.loggedIn = true;  
      this.loginHook()
      this.returnCommand(
        // props,
        {
          ...props,
          uiState: {
            ...props.uiState,
            loggedIn: true,
          },
  
          // state: {
          //   ...props.params.state,
          //   terminal: {
          //     ...props.params.state.terminal,
          //     loggedIn: true,
          //   },
          // },
  
          // ...state,
        },
  
        loggedInTermLine
      );
      
    } else {
      this.returnCommand(
        // props,
        {
          ...props,
          uiState: {
            ...props.uiState,
            loggedIn: false,
          },
  
        },
  
        alreadyLoggedInTermLine
      );
    }
    

    
    
  }

  alreadyLoggedIn(props: IDockviewPanelProps<IState>): void {
    this.returnCommand(props, alreadyLoggedInTermLine);
  }

  helpLoggedIn(
    state: IState,
  ) {
    this.returnCommand(state,  helpLoggedInTermLine);
  }

  helpLoggedOut(
    state: IState,
  ) {
    this.returnCommand(state,  helpLoggedOutTermLine);
  }

  whoAmI(
    state: IState,
  ) {
    this.returnCommand(state,  whoAmITermLine);
  }

  ship(
    state: IState,
  ) {
    this.returnCommand(state, shipTermLine);
  }

  mission(
    state: IState,
  ) {
    this.returnCommand(state, missionTermLine);
  }

  date(
    state: IState,
  ) {
    this.returnCommand(state, dateTermLine);
  }

  // map(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
  //   this.returnCommand(
  //     {
  //       ...state,
  //       terminal: {
  //         ...state.terminal,
  //         mapOrVideo: "map",
  //       },
  //     },
  //     stateSetter,
  //     mapTermLine
  //   );
  // }

  // video(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
  //   this.returnCommand(
  //     {
  //       ...state,
  //       terminal: {
  //         ...state.terminal,
  //         mapOrVideo: "video",
  //       },
  //     },
  //     stateSetter,
  //     videoTermLine
  //   );
  // }

  // bots(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
  //   this.returnCommand(
  //     {
  //       ...state,
  //       terminal: {
  //         ...state.terminal,
  //         // mapOrVideo: "video",
  //       },
  //     },
  //     stateSetter,
  //     botsTermLine(state)
  //   );
  // }

  settings(state: IState) {
    this.returnCommand(
      state,
      // {
      //   ...state,
      //   terminal: {
      //     ...state.terminal,
      //   },
      // },
      // stateSetter,
      settingsTermLine
    );
  }

  // error(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
  //   this.returnCommand(
  //     {
  //       ...state,
  //       terminal: {
  //         ...state.terminal,
  //       },
  //     },
  //     stateSetter,
  //     errorTermLine
  //   );
  // }

  //////////////////////////////////////////

  state(): {
    history: ITerminalLine[];
    buffer: string;
    submitBuffer: any;
    setBuffer: any;
    uiUpdateCallback: any
  } {
    // debugger;
    return {
      history: this.history,
      buffer: this.buffer,
      submitBuffer: this.submitBuffer.bind(this),
      setBuffer: this.setBuffer.bind(this),
      uiUpdateCallback: this.uiUpdateCallback
    };
  }

  booted = false
  boot() {
    console.log("Terminal boot", this.booted);
    if (this.booted) {
      // 
    } else {
      this.booted = true
      this.addToHistory(bootScreenTermLine);
      
    }
    
  }

  commandNotFound(props: IDockviewPanelProps<IState>, unknownCommand: string) {
    this.returnCommand(props, commandNotFoundTermLine(unknownCommand));
  }

  processCommand(props: IDockviewPanelProps<IState>): void {
    // const state = props.uiState;
    const command =  props.uiState.buffer;
    const loggedIn =  props.uiState.loggedIn;

    if (command === "login") {
      if (!loggedIn) {
        this.login(props);
        return;
      } else {
        this.alreadyLoggedIn(props);
        return;
      }
    }

    // if (command === "bots") {
    //   if (!loggedIn) {
    //     this.error(props);
    //     return;
    //   } else {
    //     this.bots(props);
    //     return;
    //   }
    // }

    if (command === "help") {
      if (!this.loggedIn) {
        this.helpLoggedOut(props);
        return;
      } else {
        this.helpLoggedIn(props);
        return;
      }
    }

    if (command === "whoami") {
      this.whoAmI(props);
      return;
    }

    if (command === "ship") {
      this.ship(props);
      return;
    }

    if (command === "mission") {
      this.mission(props);
      return;
    }

    if (command === "date") {
      this.date(sprops);
      return;
    }

    if (command === "settings") {
      this.settings(props);
      return;
    }

    // if (command === "map") {
    //   this.map(state, stateSetter);
    //   return;
    // }

    // if (command === "video") {
    //   this.video(state, stateSetter);
    //   return;
    // }

    // const matchForBot = (/b ([1-9])*/gm).exec(command);

    // if (matchForBot && matchForBot?.length > 0) {

    //   // if (!matchForBot || !matchForBot[0]) {
    //   //   return {
    //   //     out: `couldn't parse bot id`,
    //   //     status: 'fail'
    //   //   }
    //   // }
    //   debugger

    //   SpaceTrashPlayer.videoFeed = Number.parseInt(matchForBot[0]);

    //   return {
    //     out: `now commanding Bot #${SpaceTrashPlayer.videoFeed}`,
    //     status: 'pass'
    //   }
    // }
    return this.commandNotFound(props, command);
  }
}
