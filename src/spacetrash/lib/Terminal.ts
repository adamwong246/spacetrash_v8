import { Dispatch, SetStateAction } from "react";

import { IState } from "../UI";
import { ITerminalLine, ITerminalState } from "../UI/terminal";
import SpacetrashGame from "../Game";
import SpaceTrashPlayer from "../Player";


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
  const lines: string = Object.keys((SpaceTrashPlayer.bots)).reduce((mm, v) => {
    mm.push(`${v} ${ SpaceTrashPlayer.bots[(v)][1] }`)
    return mm;
  }, [] as string[]).join('\n')

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
  out: `boot sequence initiated...
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
  returnCommand(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>,
    t: ITerminalLine
  ) {
    stateSetter({
      ...state,
      terminal: {
        ...state.terminal,
        buffer: "",
        history: [
          ...state.terminal.history,
          {
            ...t,
            in: state.terminal.buffer,
          },
        ],
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
    stateSetter: React.Dispatch<React.SetStateAction<IState>>,

  ) {
    this.processCommand(state, stateSetter);
  }

  history(state: IState) {
    return state.terminal.history;
  }

  ///////////////////////////////////////////////////////

  login(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>,
  ): void {
    this.returnCommand(
      {
        ...state,
        terminal: {
          ...state.terminal,
          loggedIn: true,
        },

        windows: {
          terminal: {
            ...state.windows.terminal,
            visible: true,
          },
          shipmap: {
            ...state.windows.shipmap,
            visible: false,
          },
          manual: {
            ...state.windows.manual,
            visible: false,
          },
          drone: {
            ...state.windows.drone,
            visible: true,
          },
          drones: {
            ...state.windows.drones,
            visible: true,
          },
          shipmapV2: {
            ...state.windows.shipmapV2,
            visible: true,
          },
          droneV2: {
            ...state.windows.droneV2,
            visible: false,
          },
        },
      },
      stateSetter,
      loggedInTermLine
    );
    SpacetrashGame.changeScene("mainloop");
    SpacetrashGame.ecs.unpause();
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

  map(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
    this.returnCommand(
      {
        ...state,
        terminal: {
          ...state.terminal,
          mapOrVideo: "map",
        },
      },
      stateSetter,
      mapTermLine
    );
  }

  video(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
    this.returnCommand(
      {
        ...state,
        terminal: {
          ...state.terminal,
          mapOrVideo: "video",
        },
      },
      stateSetter,
      videoTermLine
    );
  }

  bots(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
    this.returnCommand(
      {
        ...state,
        terminal: {
          ...state.terminal,
          // mapOrVideo: "video",
        },
      },
      stateSetter,
      botsTermLine(state)
    );
  }

  settings(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
    this.returnCommand(
      {
        ...state,
        terminal: {
          ...state.terminal,
        },
      },
      stateSetter,
      settingsTermLine
    );
  }

  error(state: IState, stateSetter: Dispatch<SetStateAction<IState>>) {
    this.returnCommand(
      {
        ...state,
        terminal: {
          ...state.terminal,
        },
      },
      stateSetter,
      errorTermLine
    );
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
    stateSetter: React.Dispatch<React.SetStateAction<IState>>,
    unknownCommand: string
  ) {
    this.returnCommand(
      state,
      stateSetter,
      commandNotFoundTermLine(unknownCommand)
    );
  }

  processCommand(
    state: IState,
    stateSetter: React.Dispatch<React.SetStateAction<IState>>,

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

    if (command === "bots") {
      if (!loggedIn) {
        this.error(state, stateSetter);
        return;
      } else {
        this.bots(state, stateSetter);
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

    if (command === "settings") {
      this.settings(state, stateSetter);
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
    this.commandNotFound(state, stateSetter, command);
  }
}
