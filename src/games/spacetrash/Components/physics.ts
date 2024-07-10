
import Component from "../../../engine/Component";

import { SpaceTrashSystems } from "../Systems";

import { ISpaceTrashComponents } from ".";
import { ConveyanceComponent } from "./conveyance";

export class PhysicsComponent extends Component<unknown, ISpaceTrashComponents> {
  x: number;
  y: number;
  
  constructor(x: number = 0, y: number = 0) {
    super([SpaceTrashSystems.physical]);
    this.x = x;
    this.y = y;
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

export class PhysicsActorComponent extends PhysicsComponent {
  x: number;
  y: number;
  r: number;
  
  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    conveyance: ConveyanceComponent
  ) {
    super(x, y);
    this.r = r;
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

type IDirs = `north` | `south` | `east` | `west`;
export class PhysicsSetComponent extends PhysicsComponent {
  x: number;
  y: number;
  r: IDirs;
  
  constructor(x: number = 0, y: number = 0, r: IDirs) {
    super(x, y);
    this.r = r;
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

export class PhysicsTangibleComponent extends PhysicsComponent{  
  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}
