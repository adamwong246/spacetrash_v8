import { ISpaceTrashComponents, SpaceTrashComponents } from "..";
import Component from "../../../../engine/Component";

import { IRays } from "../../../spacetrash";

import { SpaceTrashSystems } from "../../Systems";

export abstract class InCastingComponent extends Component<unknown, ISpaceTrashComponents> {
  fov: number;
  threshold: number;
  ray: IRays

  constructor(
    // type: ISpaceTrashComponents
  ) {
    super([SpaceTrashSystems.casting]);
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

export class AttackableComponent extends InCastingComponent {
  fov: 1;
  threshold = 0;
  ray: 'attack' 

  // constructor() {
  //   super(
  //     // SpaceTrashComponents.attackable
  //   );
  // }

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}


export class MicrophoneComponent extends InCastingComponent {
  fov: 1;
  threshold = 10;
  ray: 'sound' 

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}


export class CameraComponent extends InCastingComponent {
  fov: number;
  threshold = 10;
  ray: 'light' 

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class ThermalComponent extends InCastingComponent {
  fov = 1;
  threshold = 0;
  ray: 'thermal' 

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class MovementComponent extends InCastingComponent {
  fov = 270;
  threshold = 1;
  ray: 'movement' 

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}