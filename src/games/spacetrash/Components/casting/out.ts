import Component from "../../../../engine/Component";

import { IRays } from "../../../spacetrash";

import { SpaceTrashSystems } from "../../Systems";

import { ISpaceTrashComponents, SpaceTrashComponents } from "..";


export abstract class OutCastingComponent extends Component<unknown, ISpaceTrashComponents> {
  fov: number;
  dropoff: (x: number) => number;
  ray: IRays;
  intensity: number;

  constructor() {
    super([SpaceTrashSystems.casting],
      // type
    );
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

export abstract class AttackingComponent extends OutCastingComponent {
  dropoff: (x: number) => number;
  
  ray = 'attack' as IRays

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class MeleeComponent extends OutCastingComponent {
  dropoff = (x) => x < 2 ? 10 : 0;
  fov = 1

  constructor(intensity: number) {
    super();
    this.intensity = intensity;  
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

export class GunComponent extends OutCastingComponent {
  dropoff = (x) => x;
  fov = .25

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class LitComponent extends OutCastingComponent {
  dropoff = (x) => 1 / (x ^ 2);
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
