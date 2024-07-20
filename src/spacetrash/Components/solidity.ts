import { SpaceTrashComponent } from ".";


export class SolidityComponent extends SpaceTrashComponent {  
  solidity: number;

  constructor(e, solidity: number) {
    super(
      e,
      // [SpaceTrashSystems.physical]
      // [SpaceTrashSystems.power]
    );
    this.solidity = solidity
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