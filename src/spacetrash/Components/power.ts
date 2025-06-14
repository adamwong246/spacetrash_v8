import { Component } from "../../engine/Component";

import { ISpaceTrashComponents } from ".";

export abstract class PoweredComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  constructor() {
    super();
    // [SpaceTrashSystems.power]
  }

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class PowerProducingComponent extends PoweredComponent {
  amps: () => number;
  damage: (volts, amps) => any;

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class PowerConsumingComponent extends PoweredComponent {
  amps: () => number;
  damage: (amps) => any;

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class PowerStoringComponent extends PoweredComponent {
  voltsCurrent: number;
  voltsMax: number;
  amps: () => number;
  damage: (volts, amps) => any;

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class PowerTransmitingComponent extends PoweredComponent {
  damage: (amps) => any;

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}
