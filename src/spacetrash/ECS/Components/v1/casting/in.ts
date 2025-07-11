import { SpaceTrashComponent } from "..";
import { SP_MapStore } from "../../../../../demiurge/ecs/Store";


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

export class AttackableStore extends SP_MapStore<AttackableComponent> {
  // make(...a: any[]): AttackableComponent {
  //   return new AttackableComponent();
  // }
}

export class MicrophoneComponent extends InCastingComponent {}

export class CameraComponent extends InCastingComponent {}

export class CameraStore extends SP_MapStore<CameraComponent> {
  
}

export class ThermalComponent extends InCastingComponent {}

export class MovementComponent extends InCastingComponent {}

export class LightIncastingComponent extends InCastingComponent {
  luminance: number;

  constructor(luminance = -1) {
    super();
    this.luminance = luminance;
  }
}

export class LightIncastingStore extends SP_MapStore<any> {
  // store: Record<number, LightIncastingComponent>;

  // constructor() {
  //   super();
  //   this.store = {};
  // }

  // each(arg0: ([eid, le]: [number, LightIncastingComponent]) => void) {

  //   Object.keys(this.store).forEach((k) => {
  //     arg0([Number(k), this.store[k]])
  //   });
  // }
  
  // add(lc: LightIncastingComponent, n: number) {
  //   return (this.store[n] = lc);
  // }

  // get(n: number): LightIncastingComponent {
  //   return this.store[n];
  // }

  // make(...a: any[]): LightIncastingComponent {
  //   return new LightIncastingComponent();
  // }

  // keyForEid(i: number) {
  //   Object.keys(this.store).findIndex(() => (eid) => eid == String(i))
  // }
}
