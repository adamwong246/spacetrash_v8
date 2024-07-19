import Component from "../../engine/Component";
import { SpaceTrashSystems } from "../../spacetrash/Systems";
import { SpaceTrashEntity } from "../../spacetrash/Entities";

import { ConveyanceComponent } from "./conveyance";

import { ISpaceTrashComponents } from ".";

export class PhysicsComponent extends Component<unknown, ISpaceTrashComponents> {
  x: number;
  y: number;
  
  
  constructor(spe: SpaceTrashEntity, x: number = 0, y: number = 0) {
    super(spe , [SpaceTrashSystems.physical]);
    this.x = x;
    this.y = y;
    // debugger
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
  dx: number;
  dy: number;
  r: number;
  
  constructor(
    spe: SpaceTrashEntity,
    x: number = 0,
    y: number = 0,
    r: number = 0,
    conveyance: ConveyanceComponent,
    dx: number,
    dy: number,
  ) {
    super(spe, x, y);
    this.dx = dx;
    this.dy = dy;
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
  r: IDirs;
  solid: boolean;
  
  constructor(
    spe: SpaceTrashEntity,
    x: number = 0,
    y: number = 0,
    r: IDirs,
    solid: boolean,
  ) {
    super(spe, x, y);
    this.r = r;
    this.solid = solid;
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
