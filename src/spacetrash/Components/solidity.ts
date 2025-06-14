import { SpaceTrashComponent } from ".";

export class SolidityComponent extends SpaceTrashComponent {
  solidity: number;

  constructor(solidity: number) {
    super();
    // [SpaceTrashSystems.physical]
    // [SpaceTrashSystems.power]
    this.solidity = solidity;
  }
}
