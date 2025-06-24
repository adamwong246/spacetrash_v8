import { ISpaceTrashComponents } from "..";
import { Component } from "../../../../engine/VECS.ts/Component";
import { EntityComponentStore, Store } from "../../../../engine/VECS.ts/types";

// Gives an entity a position on the map
export abstract class PositionComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}

// Gives an entity a position within the grid
export class IntegerPositionComponent extends PositionComponent {
  // tileType: string;
  // constructor(x: number, y: number, t: any) {
  //   debugger
  //   super();
  //   // this.tileType = t;
  // }
}

export class IntegerPositionStore extends Store<IntegerPositionComponent> {
  store: Map<number, IntegerPositionComponent>;

  constructor() {
    super();
    this.store = new Map();
  }

  get(n: number) {
    return this.store.get(n);
  }

  add(lc: IntegerPositionComponent, n: number) {
    this.store.set(n, lc);
    return;
  }

  withIf(i: number, cb: (i: [number, IntegerPositionComponent]) => void) {
    const x = this.store.get(i);
    if (x) cb([Number(i), x, i]);
  }

  make(x: number, y: number) {
    return new IntegerPositionComponent(x, y);
  }

  each(
    cb: (
      eid,
      le: [number, IntegerPositionComponent, string],
      eidAsString
    ) => void
  ) {
    this.store.forEach((value, key) => {
      cb([Number(key), [key, value]]);
    });
  }
}

// Gives an entity a position above the grid
export class FloatPositionComponent extends PositionComponent {}

export class FloatPositionStore extends EntityComponentStore<FloatPositionComponent> {
  constructor() {
    super();
  }

  make(x: number = 0, y: number = 0) {
    return new FloatPositionComponent(x, y);
  }

  at(y: number): FloatPositionComponent {
    return this.store[y][1];
  }

  each(arg0: (aeid: number, y: FloatPositionComponent) => void) {
    Object.keys(this.store).forEach((k) => {
      // arg0([Number(k), this.store[k], k]);
      arg0(Number(k), this.store[k][1]);
    });
  }
}

/////////////////////////////////////////////////////////////

// Gives an entity a rotation
export abstract class DirectionComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
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

export class DegreesDirectionStore extends EntityComponentStore<DegreesDirectionComponent> {
  constructor() {
    super();
  }

  make(r: number) {
    return new DegreesDirectionComponent(r);
  }
}

// Gives an entity a rotation in ordinal direction
export class OrdinalDirectionComponent extends DirectionComponent {
  constructor(r: IDirs) {
    super(r);
  }
}

export class OrdinalDirectionStore extends EntityComponentStore<OrdinalDirectionComponent> {
  constructor() {
    super();
  }

  make(r: IDirs) {
    return new OrdinalDirectionComponent(r);
  }
}

/////////////////////////////////////////////////////////////

// Gives the entity movement
export abstract class MovingComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {}

export type ITankDirections = {
  i: `left` | `right` | 'none';
  j: `back` | `forth`| 'none';
};

// Gives the entity movement above the grid
// moves by dx and dy every tick
export class TankMovingComponent extends MovingComponent {
  i: `left` | `right`| 'none';
  j: `back` | `forth`| 'none';

  constructor(i, j) {
    super();
    this.i = i;
    this.j = j;
  }
}

export class TankMovingStore extends EntityComponentStore<TankMovingComponent> {
  constructor() {
    super();
  }

  make(i, j) {
    return new TankMovingComponent(i, j);
  }
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
    this.dy = dx;
  }
}

export class FloatMovingStore extends EntityComponentStore<FloatMovingComponent> {
  constructor() {
    super();
  }

  make(r: number) {
    return new FloatMovingComponent(r);
  }
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

export class OridinalMovingStore extends EntityComponentStore<OridinalMovingComponent> {
  constructor() {
    super();
  }

  make(d: IDirs, v: number) {
    return new OridinalMovingComponent(d, v);
  }
}

/////////////////////////////////////////////////////////////

export type IDirs = `north` | `south` | `east` | `west`;
