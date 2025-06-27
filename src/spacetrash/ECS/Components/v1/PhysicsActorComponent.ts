import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";

import { PhysicsComponent } from "./physics";

export class PhysicsActorComponent extends PhysicsComponent {
  dx: number;
  dy: number;
  r: number;

  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number,
    dy: number
  ) {
    super(x, y);
    this.dx = dx;
    this.dy = dy;
    this.r = r;
  }
}

export class PhysicsActorStore extends MapStoreV2<PhysicsActorComponent> {
  constructor() {
    super();
  }

}
