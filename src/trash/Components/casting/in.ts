import { EntityComponentStore } from "../../../engine/VECS.ts/types";

import { SpaceTrashComponent } from "..";

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

export class LittableStore extends EntityComponentStore<LitableComponent> {
  make(...a: any[]): LitableComponent {
    return new LitableComponent();
  }
}
