import { Component } from "../ecs/Component";
import { SP_MapStore } from "../ecs/SP_MapStore";

// Gives an entity a position on the map
export abstract class PositionComponent extends Component {
  x: number;
  y: number;

  abstract X();
  abstract Y();
  abstract setX(x: number);
  abstract setY(y: number);

  constructor(x: number = 0, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}

// Gives an entity a position within the grid
export class IntegerPositionComponent extends PositionComponent {
  setX(x: number) {
    throw new Error("Method not implemented.");
  }
  setY(y: number) {
    throw new Error("Method not implemented.");
  }
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

export class IntegerPositionStore extends SP_MapStore<IntegerPositionComponent> {}

// Gives an entity a position above the grid
export class FloatPositionComponent extends PositionComponent {
  setX(x: number) {
    throw new Error("Method not implemented.");
  }
  setY(y: number) {
    throw new Error("Method not implemented.");
  }
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

export class FloatPositionStore extends SP_MapStore<FloatPositionComponent> {}

/////////////////////////////////////////////////////////////

// Gives an entity a rotation
export abstract class DirectionComponent extends Component {
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

export class DegreesDirectionStore extends SP_MapStore<DegreesDirectionComponent> {
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

export class OrdinalDirectionStore extends SP_MapStore<OrdinalDirectionComponent> {
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
export abstract class MovingComponent extends Component {
  abstract DX();
  abstract DY();
  abstract direction();
}

//////////////////////////////////////////////////////
// Gives the entity movement above the grid
// moves by dx and dy every tick
export class FloatMovingComponent extends MovingComponent {
  direction() {
    throw new Error("Method not implemented.");
  }
  dx: number;
  dy: number;

  constructor(dx: number = 0, dy: number = 0) {
    super();
    this.dx = dx;
    this.dy = dy;
  }

  DX() {
    return this.dx;
  }
  DY() {
    return this.dy;
  }

  setMotion(tx: any, ty: any) {
    this.dx = tx;
    this.dy = ty;
  }

  
}

export class FloatMovingStore extends SP_MapStore<FloatMovingComponent> {}

// Gives the entity movement within the grid
// moves in the d direction every v ticks
export class OridinalMovingComponent extends MovingComponent {
  DX() {
    throw new Error("Method not implemented.");
  }
  DY() {
    throw new Error("Method not implemented.");
  }
  direction() {
    throw new Error("Method not implemented.");
  }
  d: IDirs;
  v: number;

  constructor(d: IDirs, v: number) {
    super();
    this.d = this.d;
    this.v = this.v;
  }
}

export class OridinalMovingStore extends SP_MapStore<OridinalMovingComponent> {}

/////////////////////////////////////////////////////////////

export type IDirs = `north` | `south` | `east` | `west`;
