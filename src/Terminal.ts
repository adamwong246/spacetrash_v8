import { IComStatus } from "./UiState";

export const Terminal = {
  processCommand: (command: string): {
    out: string,
    status: IComStatus
  } => {

    if (command === "help") {
      return {
        out: `
-- SUB SYSTEMS --

To access a sub-system, press the following keys:

 [ESC]     Clear the buffer
 [\`]       Terminal
 [~]       Ship Schematics
 [!]       Notifications
 [?]       Manual

 [1 - 9]   Drones
 [0]       QPU

-- COMMANDS --

 "help"    high-level help menu
 "whoami"  display user's information
 "ship"    display the ship's information
 "mission" display the mission
 "date"    display the current date

For further instructions, please see the Manual.

      `,
        status: 'niether'
      }
    }

    if (command === "whoami") {
      return {out: `
Username:  wintermute
Make:      Demiurge Labs. 
Model:     Mark XII Quantum Process Unit
Turing No: 1998885d-3ec5-4185-9321-e618a89b34d8
      `, status: `niether`}
    }

    if (command === "ship") {
      return {out: `
Call-sign:      "The Kestrel"
Make:           Muteki Heavy Ind. 
Classification: Deep salvage
Launch date:    May, 2690
      `, status: `niether`}
    }

    if (command === "mission") {
      return {out: `ERROR: NOT FOUND`, status: `fail`}
    }

    if (command === "date") {
      return {out: `ERROR: NOT FOUND`, status: `fail`}
    }

    return {out: `Command not found. Try "help"`, status: `fail`}
  }
};
