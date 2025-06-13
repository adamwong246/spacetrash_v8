// import { SpaceTrashSystems } from "../../Systems";
// import { ERays } from "../../lib";

// import { ISpaceTrashComponents } from "..";

import { SpaceTrashComponent } from "..";
import { ComponentStore, Store } from "../../../engine/types";

export abstract class InCastingComponent extends SpaceTrashComponent {
  constructor() {
    super();
  }

  payload() {
    return {};
  }
}

export class AttackableComponent extends InCastingComponent {}

export class AttackableStore extends Store<AttackableComponent> {
  make(...a: any[]): AttackableComponent {
    return new AttackableComponent();
  }
}


export class MicrophoneComponent extends InCastingComponent {}

export class CameraComponent extends InCastingComponent {}

export class CameraStore extends Store<CameraComponent> {
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

export class LittableStore extends Store<LitableComponent> {
  make(...a: any[]): LitableComponent {
    return new LitableComponent();
  }
}
