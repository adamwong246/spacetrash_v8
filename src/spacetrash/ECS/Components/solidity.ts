import { SpaceTrashComponent } from ".";

export class SolidityComponent extends SpaceTrashComponent {
  solidity: number;

  constructor(solidity: number) {
    super();
    this.solidity = solidity;
  }
}
