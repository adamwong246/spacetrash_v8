import { Component } from "../VECS.ts/Component";
import { MapStoreV2 } from "../VECS.ts/Store";

// Gives an entity a position on the map
export abstract class PositionComponent extends Component<unknown, any> {

  x: number;
  y: number;

  abstract X();
  abstract Y();

  constructor(x: number = 0, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}

// Gives an entity a position within the grid
export class IntegerPositionComponent extends PositionComponent {
  X() {
    return this.x;
  }
  Y() {
    return this.y;
  }

  constructor(x: number, y: number) {
    if (!Number.isInteger(x)) throw `x cannot be a float`;
    if (!Number.isInteger(y)) throw `y cannot be a float`;

    super(x, y);
  }

}

export class IntegerPositionStore extends MapStoreV2<IntegerPositionComponent> {}

// Gives an entity a position above the grid
export class FloatPositionComponent extends PositionComponent {

    X() {
    return this.x;
  }
  Y() {
    return this.y;
  }


  getTileXAndY(): { x: number; y: number } {
    throw new Error("Method not implemented.");
  }
  getAbsoluteXandY() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}

export class FloatPositionStore extends MapStoreV2<FloatPositionComponent> {}

/////////////////////////////////////////////////////////////

// Gives an entity a rotation
export abstract class DirectionComponent extends Component<unknown, any> {
  r: any;

  constructor(r: any) {
    super();
    this.r = r;
  }
}

// Gives an entity a rotation in degrees
export class DegreesDirectionComponent extends DirectionComponent {
  constructor(r: number) {
    super(r);
  }
}

export class DegreesDirectionStore extends MapStoreV2<DegreesDirectionComponent> {
  // each() {
  //   throw new Error("Method not implemented.");
  // }
  // constructor() {
  //   super();
  // }
  // make(r: number) {
  //   return new DegreesDirectionComponent(r);
  // }
}

// Gives an entity a rotation in ordinal direction
export class OrdinalDirectionComponent extends DirectionComponent {
  declare r: IDirs;

  constructor(r: IDirs) {
    super(r);
  }
}

export class OrdinalDirectionStore extends MapStoreV2<OrdinalDirectionComponent> {
  // each() {
  //   throw new Error("Method not implemented.");
  // }
  // constructor() {
  //   super();
  // }
  // make(r: IDirs) {
  //   return new OrdinalDirectionComponent(r);
  // }
}

/////////////////////////////////////////////////////////////

// Gives the entity movement
export abstract class MovingComponent extends Component<unknown, any> {}

//////////////////////////////////////////////////////
// Gives the entity movement above the grid
// moves by dx and dy every tick
export class FloatMovingComponent extends MovingComponent {
  dx: number;
  dy: number;

  constructor(dx: number = 0, dy: number = 0) {
    super();
    this.dx = dx;
    this.dy = dx;
  }
}

export class FloatMovingStore extends MapStoreV2<FloatMovingComponent> {
  // each() {
  //   throw new Error("Method not implemented.");
  // }
  // constructor() {
  //   super();
  // }
  // make(r: number) {
  //   return new FloatMovingComponent(r);
  // }
}

// Gives the entity movement within the grid
// moves in the d direction every v ticks
export class OridinalMovingComponent extends MovingComponent {
  d: IDirs;
  v: number;

  constructor(d: IDirs, v: number) {
    super();
    this.d = this.d;
    this.v = this.v;
  }
}

export class OridinalMovingStore extends MapStoreV2<OridinalMovingComponent> {
  // each() {
  //   throw new Error("Method not implemented.");
  // }
  // constructor() {
  //   super();
  // }
  // make(d: IDirs, v: number) {
  //   return new OridinalMovingComponent(d, v);
  // }
}

/////////////////////////////////////////////////////////////

export type IDirs = `north` | `south` | `east` | `west`;
