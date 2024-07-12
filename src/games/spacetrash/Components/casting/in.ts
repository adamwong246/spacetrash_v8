import { SpaceTrashComponent } from "..";

import { ERays } from "../../../spacetrash";

import { SpaceTrashSystems } from "../../Systems";

export abstract class InCastingComponent extends SpaceTrashComponent {
  fov: number;
  threshold: number;
  ray: ERays

  constructor() {
    super([SpaceTrashSystems.casting]);
  }

  payload() {
    return {
      fov: this.fov,
      threshold: this.threshold,
      ray: this.ray,
    }
  }

}

export class AttackableComponent extends InCastingComponent {
  fov = 1;
  threshold = 0;
  ray = ERays.attack;

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
  fov = 1;
  threshold = 10;
  ray = ERays.sound;
  
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
  ray: ERays.visible

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
  ray: ERays.thermal

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
  ray: ERays.movement;

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}