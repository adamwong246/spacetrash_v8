import { SP_MapStore } from "../../../../demiurge/ecs/Store";
import { MovingComponent } from "../../../../demiurge/game/physical";

export type ITankDirections = {
  i: `left` | `right` | "none";
  j: `back` | `forth` | "none";
};

// Gives the entity movement above the grid
// moves by dx and dy every tick
export class TankMovingComponent extends MovingComponent {
  DX() {
    throw new Error("Method not implemented.");
  }
  DY() {
    throw new Error("Method not implemented.");
  }
  direction() {
    throw new Error("Method not implemented.");
  }
  i: `left` | `right` | "none";
  j: `back` | `forth` | "none";

  constructor(i, j) {
    super();
    this.i = i;
    this.j = j;
  }
}

export class TankMovingStore extends SP_MapStore<TankMovingComponent> {
  
}
