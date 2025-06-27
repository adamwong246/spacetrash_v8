import { ISpaceTrashComponents } from "..";
import { Component } from "../../../../../engine/VECS.ts/Component";
import { EntityComponentStore } from "../../../../../engine/VECS.ts/types";


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

export class LightOutcastingComponent extends OutCastingComponent {
  radiance: number;

  constructor(r: number = -1) {
    super();
    this.radiance = r;
  }
}

export class LightOutcastingStore extends EntityComponentStore<LightOutcastingComponent> {

  each(arg0: ([eid, le, ndx]: [number, LightOutcastingComponent, number]) => void) {
    Object.keys(this.store).forEach((k, ndx) => {
        arg0([Number(k), this.store[k], ndx])
      });
  }
  
  make(...a: any[]): LightOutcastingComponent {
    return new LightOutcastingComponent([...a]);
    // throw new Error("Method not implemented.");
  }
}
