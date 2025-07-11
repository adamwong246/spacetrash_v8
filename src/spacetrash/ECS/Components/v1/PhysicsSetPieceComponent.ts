import { SP_MapStore } from "../../../../demiurge/ecs/Store";
import { ITiles } from "../../EntityComponents/tiles";


import { PhysicsComponent } from "./physics";

export class PhysicsSetPieceComponent extends PhysicsComponent {
  solid: boolean;
  tileType: ITiles;

  constructor(x: number = 0, y: number = 0, solid: boolean, tileType: ITiles) {
    super(x, y);
    this.tileType = tileType;
    this.solid = solid;
  }
}

export class PhysicsSetPieceStore extends SP_MapStore<PhysicsSetPieceComponent> {
  
}
