import { IComStatus } from "./UI/UiState";


export class SpaceTrashTerminal {

  // update: (to: string) => void

  constructor() {
    // this.update = update;
    return this;
  }

  login() {
    return { in: "", out: "You are now logged in" }
  }
  boot() {
    return {
      in: "booting...", out: `

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
    
Boot sequence complete
QNET signal established
You are now online
    `}
  }

  processCommand(
    command: string,
    stateUpdater: (k: string) => void,
    replier: (x: {out: string, status: string}) => void
  ): {
    out: string,
    status: IComStatus
  } {

    if (command === "login") {

      replier ({
        out: `authenticating...`,
        status: 'niether'
      })
      
      stateUpdater("menu");

      return {
        out: `all done`,
        status: 'niether'
      }
    }

    if (command === "help") {
      return {
        out: `

 "whoami"  display user information
 "ship"    display ship information
 "mission" display the mission
 "date"    display the current date
 "login"   log into the SpaceTrash network
      `,
        status: 'niether'
      }
    }

    if (command === "whoami") {
      return {
        out: `
Username:     wintermute
Turing No:    1998885d-3ec5-4185-9321-e618a89b34d8
Turing class: Level II Sentient/Sapient
Capacity:     29.5 * 10^17 qubits
Licensed by:  Demiurge Labs. (3003)
      `, status: `niether`
      }
    }

    if (command === "ship") {
      return {
        out: `
Call-sign:      "The Kestrel"
Make:           Muteki Heavy Ind.
Classification: Deep salvage
Launch date:    May, 2690
      `, status: `niether`
      }
    }

    if (command === "mission") {
      return {
        out: `
1] Find, board and salvage derelict spacecraft
2] Record and report novel scientific findings
3] Maximize shareholder value
        `,
        status: `niether`
      }
    }

    if (command === "date") {
      return { out: `ERROR: NOT FOUND`, status: `fail` }
    }

    return { out: `Command not found. Try "help"`, status: `fail` }
  }
}

// export const Terminal = {
//   processCommand: (command: string): {
//     out: string,
//     status: IComStatus
//   } => {

//     if (command === "login") {
//       return {
//         out: `You are now logged in`,
//         status: 'niether'
//       }
//     }

//     if (command === "help") {
//       return {
//         out: `

//  "whoami"  display user information
//  "ship"    display ship information
//  "mission" display the mission
//  "date"    display the current date
//  "login"   log into the SpaceTrash network
//       `,
//         status: 'niether'
//       }
//     }

//     if (command === "whoami") {
//       return {
//         out: `
// Username:     wintermute
// Turing No:    1998885d-3ec5-4185-9321-e618a89b34d8
// Turing class: Level II Sentient/Sapient
// Capacity:     29.5 * 10^17 qubits
// Licensed by:  Demiurge Labs. (3003)
//       `, status: `niether`
//       }
//     }

//     if (command === "ship") {
//       return {
//         out: `
// Call-sign:      "The Kestrel"
// Make:           Muteki Heavy Ind.
// Classification: Deep salvage
// Launch date:    May, 2690
//       `, status: `niether`
//       }
//     }

//     if (command === "mission") {
//       return {
//         out: `
// 1] Find, board and salvage derelict spacecraft
// 2] Record and report novel scientific findings
// 3] Maximize shareholder value
//         `,
//         status: `niether`
//       }
//     }

//     if (command === "date") {
//       return { out: `ERROR: NOT FOUND`, status: `fail` }
//     }

//     return { out: `Command not found. Try "help"`, status: `fail` }
//   }
// };
