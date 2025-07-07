import { MovingComponent } from "../../../engine/game/physical";
import { MapStoreV2 } from "../../../engine/VECS/Store";

export type ITankDirections = {
  i: `left` | `right` | "none";
  j: `back` | `forth` | "none";
};

// Gives the entity movement above the grid
// moves by dx and dy every tick
export class TankMovingComponent extends MovingComponent {
  i: `left` | `right` | "none";
  j: `back` | `forth` | "none";

  constructor(i, j) {
    super();
    this.i = i;
    this.j = j;
  }
}

export class TankMovingStore extends MapStoreV2<TankMovingComponent> {
  // each() {
  //   throw new Error("Method not implemented.");
  // }
  // constructor() {
  //   super();
  // }
  // make(i, j) {
  //   return new TankMovingComponent(i, j);
  // }
}
