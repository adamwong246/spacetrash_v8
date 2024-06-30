export type IWithName = {
  name: string;
};

export type IWithHealth = {
  health: number;
};

export type IChasis = IWithName & IWithHealth;
export type IPower = IWithName & IWithHealth & {
  capacity: number;
  voltage: number;
};
export type IUpgrade = IWithName & IWithHealth;

export type IDroneBase = IWithName & {
  chasis: IChasis;
  power: IPower;
};

export type IDrone1 = IDroneBase & {
  upgrades: {
    0: IUpgrade
  }
};

export type IDrone2 = IDroneBase & {
  upgrades: {
    0: IUpgrade,
    1: IUpgrade
  }
};

export type IDrone3 = IDroneBase & {
  upgrades: {
    0: IUpgrade,
    1: IUpgrade,
    2: IUpgrade
  }
};


export type IDrones = IDrone1 | IDrone2 | IDrone3;

export type IComStatus = 'pass' | 'fail' | 'niether';

export type IUiState = {
  mode: 'terminal' | 'notifications' | `map` | `manual` | `self` | `d1`
  lastCommandStatus: string | null,
  terminalBuffer: string,
  terminalhistory: {
    in: string,
    out: string,
    status: IComStatus
  }[],
  time: number,
  delta: number,
  frame: number,
  turn: number,
  drones: {
    0: IDrones,
    1: IDrones
  }
}

export type SetUiState = (uiState: IUiState) => IUiState;

export const initialUiState = {
  lastCommandStatus: null,
  mode: 'terminal',
  terminalBuffer: ``,
  terminalhistory: [],
  time: 0,
  delta: 0,
  frame: 0,
  turn: 1,
  drones: {
    0: {
      name: "Larry",
      power: {
        name: "mutkei power bank 0",
        voltage: 1,
        capacity: 1,
        health: 0.5,
      },
      chasis: {
        name: "Mutkei 1",
        health: 1,
      },
      upgrades: {
        0: {
          name: "IR vision",
          health: 0.9
        }
      }
    },
    1: {
      name: "Bob",
      power: {
        name: "mutkei power bank 0",
        voltage: 1,
        capacity: 1,
        health: 0.5,
      },
      chasis: {
        name: "Mutkei 2",
        health: 1,
      },
      upgrades: {
        0: {
          name: "scanner",
          health: 0.4
        },
        1: {
          name: "interface",
          health: 0.49
        }
      }
    }
  }
}  as IUiState;
