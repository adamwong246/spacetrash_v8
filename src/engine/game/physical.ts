import { Component } from "../VECS.ts/Component";
import { MapStoreV2 } from "../VECS.ts/Store";

// Gives an entity a position on the map
export abstract class PositionComponent extends Component<unknown, any> {
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

export class IntegerPositionStore extends MapStoreV2<IntegerPositionComponent> {}

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
export abstract class MovingComponent extends Component<unknown, any> {
  abstract DX();
  abstract DY();
  abstract direction();
}

//////////////////////////////////////////////////////
// Gives the entity movement above the grid
// moves by dx and dy every tick
export class FloatMovingComponent extends MovingComponent {
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

    // the direction, given the vector <dx, dy>
  direction() {
    // Math.atan2(y, x) is the standard way to calculate the angle in all quadrants
    const radians = Math.atan2(this.dy, this.dx); 
    // If you need the angle in degrees (0 to 360)
    let degrees = radians * 180 / Math.PI; 
    if (degrees < 0) {
        degrees += 360; 
    }
    return degrees;
  }

    // the magnitude of the vector
  magnitude() {
    // You can use multiplication for squaring for a minor optimization
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy); 
  }

   // the unit vector
  unit() {
    const m = this.magnitude();

    // Handle the case where the magnitude is zero (zero vector)
    if (m === 0) {
        // You can return a zero vector or a specific value indicating a zero vector
        return { x: 0, y: 0 }; 
    }

    return {
      x: this.dx / m,
      y: this.dy / m,
    };
  }

  // rebound the object off a surface with normal vector <x, y>
  bounce(v: { x: number; y: number }) {
    // Normalize the normal vector v
    const vMag = Math.sqrt(v.x * v.x + v.y * v.y);
    if (vMag === 0) {
      // Handle the case where the normal vector has zero magnitude
      // Perhaps return without reflecting or throw an error
      return; 
    }
    const n = { x: v.x / vMag, y: v.y / vMag }; // Unit normal vector

    // The incident vector is the current velocity
    const d = { x: this.dx, y: this.dy }; 

    // Calculate the dot product of the incident vector and the unit normal vector
    const dotProduct = d.x * n.x + d.y * n.y; 

    // Calculate the reflected vector using the reflection formula
    this.dx = d.x - 2 * dotProduct * n.x; 
    this.dy = d.y - 2 * dotProduct * n.y;
  }
}

export class FloatMovingStore extends MapStoreV2<FloatMovingComponent> {}

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

export class OridinalMovingStore extends MapStoreV2<OridinalMovingComponent> {}

/////////////////////////////////////////////////////////////

export type IDirs = `north` | `south` | `east` | `west`;
