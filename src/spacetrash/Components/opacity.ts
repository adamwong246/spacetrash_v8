import { ISpaceTrashComponents, SpaceTrashComponent } from ".";

import { SpaceTrashSystems } from "../Systems";

export class OpacityComponent extends SpaceTrashComponent {  
  opacity: number;

  constructor(e, opacity: number) {
    super(
      e,
      [SpaceTrashSystems.physical]
      // [SpaceTrashSystems.power]
    );
    this.opacity = opacity
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