import { IState } from "../UI";
import { ITerminalLine, ITerminalState } from "../UI/terminal";

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
Call-sign:      "The Kestrel"
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

`,
};

const commandNotFoundTermLine: ITerminalLine = {
  out: `Command not found. Try "help"`,
  status: `fail`,
};

const loggedInTermLine: ITerminalLine = {
  out: `You are now logged in.`,
  status: "pass",
};

const alreadyLoggedInTermLine: ITerminalLine = {
  out: `You are already loggedin`,
  status: "fail",
};

const helpLoggedOutTermLine: ITerminalLine = {
  out: `
"whoami"  display user information
"ship"    display ship information
"mission" display the mission
"date"    display the current date
"login"   log into the SpaceTrash network
`,
  status: "niether",
};

const helpLoggedInTermLine: ITerminalLine = {
  out: `
"whoami"  display user information
"ship"    display ship information
"mission" display the mission
"date"    display the current date
"login"   log into the SpaceTrash network

- ADVANCED COMMANDS -

"b <bot id | bot name>"           take command of Bot by id
"d <door door id>"                toggle open or close door by id
"m <bot id | bot name> <room id>" auto-pilot Bot by id to room by id

- SHORTCUTS -

ESC        bring shipmap for foreground
1 - 9      bring drone to foreground by id
0          bring terminal to foreground
⬆️⬇️⬅️➡️   drive Bot

`,
  status: "niether",
};

export class SpaceTrashTerminal {
  returnCommand(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>,
    t: ITerminalLine,
    p?: Partial<ITerminalState>
  ) {
    stateSetter({
      ...state,
      terminal: {
        ...state.terminal,
        ...p,
        buffer: "",
        history: [...state.terminal.history, t],
      },
    });
  }

  getBuffer(state: IState) {
    return state.terminal.buffer;
  }

  setBuffer(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>,
    b: string
  ) {
    stateSetter({
      ...state,
      terminal: {
        ...state.terminal,
        buffer: b,
      },
    });
  }

  submitBuffer(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    this.processCommand(state, stateSetter);
  }

  history(state: IState) {
    return state.terminal.history;
  }

  ///////////////////////////////////////////////////////

  login(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ): void {
    this.returnCommand(state, stateSetter, loggedInTermLine, {
      loggedIn: true,
    });
  }

  alreadyLoggedIn(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ): void {
    this.returnCommand(state, stateSetter, alreadyLoggedInTermLine);
  }

  helpLoggedIn(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    this.returnCommand(state, stateSetter, helpLoggedInTermLine);
  }

  helpLoggedOut(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    this.returnCommand(state, stateSetter, helpLoggedOutTermLine);
  }

  whoAmI(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    this.returnCommand(state, stateSetter, whoAmITermLine);
  }

  ship(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    this.returnCommand(state, stateSetter, shipTermLine);
  }

  mission(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    this.returnCommand(state, stateSetter, missionTermLine);
  }

  date(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    this.returnCommand(state, stateSetter, dateTermLine);
  }

  //////////////////////////////////////////

  boot(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    stateSetter({
      ...state,
      terminal: {
        ...state.terminal,
        history: [...state.terminal.history, bootScreenTermLine],
      },
    });
  }

  commandNotFound(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ) {
    this.returnCommand(state, stateSetter, commandNotFoundTermLine);
  }

  processCommand(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>
  ): void {
    const command = state.terminal.buffer;
    const loggedIn = state.terminal.loggedIn;

    if (command === "login") {
      if (!loggedIn) {
        this.login(state, stateSetter);
        return;
      } else {
        this.alreadyLoggedIn(state, stateSetter);
        return;
      }
    }

    if (command === "help") {
      if (!loggedIn) {
        this.helpLoggedOut(state, stateSetter);
        return;
      } else {
        this.helpLoggedIn(state, stateSetter);
        return;
      }
    }

    if (command === "whoami") {
      this.whoAmI(state, stateSetter);
      return;
    }

    if (command === "ship") {
      this.ship(state, stateSetter);
      return;
    }

    if (command === "mission") {
      this.mission(state, stateSetter);
      return;
    }

    if (command === "date") {
      this.date(state, stateSetter);
      return;
    }

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
    this.commandNotFound(state, stateSetter);
  }
}
