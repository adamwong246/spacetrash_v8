import Component from "../../engine/Component";

import { SpaceTrashEntity } from "../../spacetrash/Entities";

import { ConveyanceComponent } from "./conveyance";

import { ISpaceTrashComponents } from ".";
import { ITiles } from "../lib/EntityComponent";

export class PhysicsComponent extends Component<unknown, ISpaceTrashComponents> {
  x: number;
  y: number;
  
  
  constructor(spe: SpaceTrashEntity, x: number = 0, y: number = 0) {
    super(spe);
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

export type IDirs = `north` | `south` | `east` | `west`;

export class PhysicsSetComponent extends PhysicsComponent {
  solid: boolean;
  tileType: ITiles;
  
  constructor(
    spe: SpaceTrashEntity,
    x: number = 0,
    y: number = 0,
    solid: boolean,
    tileType: ITiles
  ) {
    super(spe, x, y);
    this.tileType = tileType;
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
