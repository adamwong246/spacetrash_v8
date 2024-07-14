import Component from "../../../engine/Component";

import { SpaceTrashSystems } from "../Systems";

import { ISpaceTrashComponents } from ".";

export abstract class ConveyanceComponent extends Component<unknown, ISpaceTrashComponents> {
  constructor(e) {
    super(e, [SpaceTrashSystems.physical]);
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

export class WheeledComponent extends ConveyanceComponent {
  forwardback: 0 | 1 | -1;
  leftright: 0 | 1 | -1;

  
  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class PanningComponent extends ConveyanceComponent {
  leftright: 0 | 1 | -1;

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class SpawningComponent extends ConveyanceComponent {
  direction: number;

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class UnmovingComponent extends ConveyanceComponent {
  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}