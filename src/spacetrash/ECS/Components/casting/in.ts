import { SpaceTrashComponent } from "..";
import { EntityComponentStore, Store } from "../../../../engine/VECS.ts/types";
import { FloatPositionComponent } from "../v2/physical";

export type IRays =
  | "light"
  | `sound`
  | "attack"
  | `movement`
  | `thermal`
  | "visible";

export abstract class InCastingComponent extends SpaceTrashComponent {
  constructor() {
    super();
  }

  payload() {
    return {};
  }
}

export class AttackableComponent extends InCastingComponent {}

export class AttackableStore extends EntityComponentStore<AttackableComponent> {
  make(...a: any[]): AttackableComponent {
    return new AttackableComponent();
  }
}

export class MicrophoneComponent extends InCastingComponent {}

export class CameraComponent extends InCastingComponent {}

export class CameraStore extends EntityComponentStore<CameraComponent> {
  make(...a: any[]): CameraComponent {
    return new CameraComponent();
  }
}

export class ThermalComponent extends InCastingComponent {}

export class MovementComponent extends InCastingComponent {}

export class LitableComponent extends InCastingComponent {
  luminance: number;

  constructor(luminance = -1) {
    super();
    this.luminance = luminance;
  }
}

// export class LittableStore extends EntityComponentStore<LitableComponent> {
//   make(...a: any[]): LitableComponent {
//     return new LitableComponent();
//   }
// }

export class LittableStore extends Store<any> {
  store: Record<number, LitableComponent>;

  constructor() {
    super();
    this.store = {};
  }

  each(arg0: ([eid, le]: [number, LitableComponent]) => void) {
    Object.keys(this.store).forEach((k) => {
      arg0([Number(k), this.store[k]])
    });
  }
  add(lc: LitableComponent, n: number) {
    return (this.store[n] = lc);
  }

  get(n: number): LitableComponent {
    return this.store[n];
  }

  make(...a: any[]): LitableComponent {
    return new LitableComponent();
  }
}
