import { MapStoreV2 } from "../../../engine/VECS.ts/Store";
import { SpaceTrashComponent } from "../../../spacetrash/ECS/Components/v1";

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

export class AttackableStore extends MapStoreV2<AttackableComponent> {
  // make(...a: any[]): AttackableComponent {
  //   return new AttackableComponent();
  // }
}

export class MicrophoneComponent extends InCastingComponent {}

export class CameraComponent extends InCastingComponent {}

export class CameraStore extends MapStoreV2<CameraComponent> {
  // make(...a: any[]): CameraComponent {
  //   return new CameraComponent();
  // }
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

export class LittableStore extends MapStoreV2<LitableComponent> {
  // make(...a: any[]): LitableComponent {
  //   return new LitableComponent();
  // }
}
