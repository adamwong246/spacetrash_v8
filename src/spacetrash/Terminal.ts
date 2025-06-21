import { IState } from ".";
import { StateSpace } from "../engine/StateSpace";
import { System } from "../engine/VECS.ts/System";
import { ITermWindowState } from "./UI/terminal";
import { DesktopGame } from "../DesktopGame";
import { IPerformanceConfig } from "../engine/VECS.ts/ECS";
import { IArchtypesMapping } from "../engine/VECS.ts/types";

const initialTerminalHistory: ITerminalLine = {
  out: "hardware check passed",
  status: "pass",
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

type IComStatus = "pass" | "fail" | "niether";

export type ITerminalLine = {
  in?: string;
  out: string;
  status: IComStatus;
};

export abstract class TerminalGame<IRenderings, II, III> extends DesktopGame<
  IRenderings,
  II,
  III
> {
  booted = false;
  uiHooks: any;
  history: ITerminalLine[] = [initialTerminalHistory];
  gameReady: () => void;
  public buffer: string = "";
  loggedIn = false;
  uiUpdateCallback: any;

  constructor(
    stateSpace: StateSpace,
    system: System,
    componentStores,
    stores,
    config: IPerformanceConfig,
    renderings: Set<IRenderings>,
    domNode: HTMLElement,
    archetypeMappings: IArchtypesMapping
  ) {
    super(
      stateSpace,
      system,
      componentStores,
      stores,
      config,
      renderings,
      domNode,
      archetypeMappings
    );
  }

  // get the state to send to react ui
  state(): {
    history: ITerminalLine[];
    buffer: string;
    submitBuffer: any;
    setBuffer: any;
    // uiUpdateCallback: any;
  } {
    return {
      history: this.history,
      buffer: this.buffer,
      submitBuffer: this.submitBuffer.bind(this),
      setBuffer: this.setBuffer.bind(this),
      // uiUpdateCallback: this.uiUpdateCallback,
    };
  }

  commandNotFound(unknownCommand: string) {
    this.returnCommand(commandNotFoundTermLine(unknownCommand));
    this.updateTerminalWindow();
  }

  initalTerminalState(): ITermWindowState {
    return {
      history: this.history,
      buffer: this.buffer,
      submitBuffer: this.submitBuffer,
      setBuffer: this.setBuffer,
    };
  }

  addToHistory(t: ITerminalLine) {
    this.history = [...this.history, t];

    if (!this.terminalUiHook) {
      console.log("no terminalUiHook");
      return;
    }

    this.terminalUiHook({
      history: this.history,
      buffer: this.buffer,
      submitBuffer: this.submitBuffer,
      setBuffer: this.setBuffer,
    });
  }

  terminalUiHook: (s: ITermWindowState) => void;

  returnCommand(t: ITerminalLine) {
    this.buffer = "";
    this.history.push(t);
    this.updateTerminalWindow();
  }

  registerTerminal(
    updateState: React.Dispatch<React.SetStateAction<ITermWindowState>>
  ) {
    this.terminalUiHook = updateState;
    this.updateTerminalWindow();
  }

  setBuffer(b: string) {
    if ([`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`].includes(b)) {
      this.focusWindowById("vid", b);
    } else {
      if (b === "`") {
        return;
      }

      this.buffer = b;
      this.updateTerminalWindow();
    }
  }

  addToBuffer(b: string) {
    this.buffer = `${this.buffer}${b}`;
    this.updateTerminalWindow();
  }

  updateTerminalWindow() {
    this.terminalUiHook({
      buffer: this.buffer,
      history: this.history,
      setBuffer: this.setBuffer,
      submitBuffer: this.submitBuffer,
    });
  }

  submitBuffer() {
    this.processCommand();
  }

  processCommand(): void {
    const command = this.buffer;
    const loggedIn = this.loggedIn;

    if (command === "login") {
      if (!loggedIn) {
        this.login();
        return;
      } else {
        this.alreadyLoggedIn();
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
        this.helpLoggedOut();
        return;
      } else {
        this.helpLoggedIn();
        return;
      }
    }

    if (command === "whoami") {
      this.whoAmI();
      return;
    }

    if (command === "ship") {
      this.ship();
      return;
    }

    if (command === "mission") {
      this.mission();
      return;
    }

    if (command === "date") {
      this.date();
      return;
    }

    if (command === "settings") {
      this.settings();
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

    //   SpaceTrashPlayer.videoFeed = Number.parseInt(matchForBot[0]);

    //   return {
    //     out: `now commanding Bot #${SpaceTrashPlayer.videoFeed}`,
    //     status: 'pass'
    //   }
    // }
    return this.commandNotFound(command);
  }

  login(): void {
    if (!this.loggedIn) {
      this.loggedIn = true;
      this.loginHook();
      this.returnCommand(loggedInTermLine);
    } else {
      this.returnCommand(alreadyLoggedInTermLine);
    }
  }

  abstract loginHook();

  // focusWindowById(s: string, p?) {
  //   super.focusWindowById(s)
  // }

  alreadyLoggedIn(): void {
    this.returnCommand(alreadyLoggedInTermLine);
  }

  helpLoggedIn(): void {
    this.returnCommand(helpLoggedInTermLine);
  }

  helpLoggedOut(): void {
    this.returnCommand(helpLoggedOutTermLine);
  }

  whoAmI(): void {
    this.returnCommand(whoAmITermLine);
  }

  ship(): void {
    this.returnCommand(shipTermLine);
  }

  mission(): void {
    this.returnCommand(missionTermLine);
  }

  date(): void {
    this.returnCommand(dateTermLine);
  }

  settings() {
    this.returnCommand(settingsTermLine);
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
}

// terminalAddHistory() {
//   // throw new Error("Method not implemented.");
//   // const x: ITermWindowState = {

//   // }
//   this.terminalUiHook({

//   } );
// }
// terminalUiHook() {
//   throw new Error("Method not implemented.");
// }
// terminalUiHook() {
//   throw new Error("Method not implemented.");
// }

// boot() {
//   console.log("Terminal boot", this.booted);
//   if (this.booted) {
//     //
//   } else {
//     this.booted = true;
//     this.addToHistory(bootScreenTermLine);
//   }
// }
