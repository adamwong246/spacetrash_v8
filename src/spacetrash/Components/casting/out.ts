import Component from "../../../engine/Component";

import { SpaceTrashEntity } from "../../Entities";
import { SpaceTrashSystems } from "../../Systems";
import { ERays } from "../../lib";

import { ISpaceTrashComponents } from "..";

export abstract class OutCastingComponent extends Component<unknown, ISpaceTrashComponents> {
  // fov: number;
  // ray: ERays;
  // intensity: number;
  dropoff: (x: number) => number;

  constructor(spe: SpaceTrashEntity) {
    super(spe);
  }

  payload() {
    return {
      // fov: this.fov,
      // threshold: this.intensity,
      // ray: this.ray,
    }
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
  ray: ERays.attack;

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}

export class MeleeComponent extends AttackingComponent {
  // fov = 1;
  // dropoff = (x) => x < 2 ? 10 : 0;
  
  constructor(
    spe: SpaceTrashEntity,
    intensity: number
  ) {
    super(spe);
    // this.intensity = intensity;
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
  // dropoff = (x) => 1 / (x ^ 2);
  // ray: ERays.light
  radiance: number;

  constructor(spe: SpaceTrashEntity) {
    super(spe);
    this.radiance = -1;
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
