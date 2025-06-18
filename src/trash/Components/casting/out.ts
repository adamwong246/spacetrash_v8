import { Component } from "../../../engine/Component";

// import { ERays } from "../../lib";

import { ISpaceTrashComponents } from "..";
import { EntityComponentStore } from "../../../engine/VECS.ts/types";

export enum ERays {
  'light',
  'sound',
  'attack',
  'movement',
  'thermal',
  'visible',
}

export abstract class OutCastingComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  // fov: number;
  // ray: ERays;
  // intensity: number;
  dropoff: (x: number) => number;

  constructor() {
    super();
  }

  payload() {
    return {
      // fov: this.fov,
      // threshold: this.intensity,
      // ray: this.ray,
    };
  }
}

export abstract class AttackingComponent extends OutCastingComponent {
  ray: ERays.attack;
}

export class MeleeComponent extends AttackingComponent {
  // fov = 1;
  // dropoff = (x) => x < 2 ? 10 : 0;

  constructor(intensity: number) {
    super();
    // this.intensity = intensity;
  }
}

export class GunComponent extends OutCastingComponent {
  dropoff = (x) => x;
  fov = 0.25;
}

export class LitComponent extends OutCastingComponent {
  radiance: number;

  constructor() {
    super();
    this.radiance = -1;
  }
}

export class LitStore extends EntityComponentStore<LitComponent> {
  make(...a: any[]): LitComponent {
    return new LitComponent();
    // throw new Error("Method not implemented.");
  }
}
