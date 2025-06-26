import { ArcadePhysics } from "arcade-physics";
import { Component } from "../../../../engine/VECS.ts/Component";
import { Store } from "../../../../engine/VECS.ts/types";

export class ArcadePhysicsComponent extends Component<any, any> {
  creator: (a: ArcadePhysics) => any;
  arcadeObject: any;

  constructor(creator: any) {
    super();
    this.creator = creator;
  }

}

export class ArcadePhysicsStore extends Store<ArcadePhysicsComponent> {
  
  store: Map<number, ArcadePhysicsComponent>;

  constructor() {
    super();
    this.store = new Map();
  }

  get(n: number) {
    return this.store.get(n);
  }

  add(lc: ArcadePhysicsComponent, n: number) {
    this.store.set(n, lc);
  }

  // add(lc: IntegerPositionComponent, n: number) {
  //   this.store.set(n, lc);
  //   return;
  // }

  // withIf(i: number, cb: (i: [number, IntegerPositionComponent]) => void) {
  //   const x = this.store.get(i);
  //   if (x) cb([Number(i), x, i]);
  // }

  // make(x: number, y: number) {
  //   return new IntegerPositionComponent(x, y);
  // }

  each(
    cb: (
      eid,
      apo: ArcadePhysicsComponent
    ) => void
  ) {
    this.store.forEach((value, key) => {
      cb(Number(key), value);
    });
  }
}