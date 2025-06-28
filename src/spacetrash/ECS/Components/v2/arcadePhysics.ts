import { ArcadePhysics } from "arcade-physics";
import { Component } from "../../../../engine/VECS.ts/Component";
import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";
import { PositionComponent } from "./physical";

export class ArcadePhysicsComponent extends PositionComponent {
  creator: (a: ArcadePhysics) => any;
  arcadeObject: any;

  constructor(creator: any) {
    super();
    this.creator = creator;
  }
  
  getAbsoluteXandY() {
    return {
      x: 99,
      y: this.arcadeObject.position.y,
    };
  }
}

export class ArcadePhysicsStore extends MapStoreV2<ArcadePhysicsComponent> {
  // setArcadeObject(arcadeObject: any, eid: number) {
  //   this.take(eid)
  // }
  getAbsoluteXandY(eid: number) {
    return this.take(eid).getAbsoluteXandY();
  }

  // store: Map<number, ArcadePhysicsComponent>;
  // constructor() {
  //   super();
  //   this.store = new Map();
  // }
  // get(n: number) {
  //   return this.store.get(n);
  // }
  // add(lc: ArcadePhysicsComponent, n: number) {
//   this.store.set(n, lc);war
  // }
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
  // each(
  //   cb: (
  //     eid,
  //     apo: ArcadePhysicsComponent
  //   ) => void
  // ) {
  //   this.store.forEach((value, key) => {
  //     cb(Number(key), value);
  //   });
  // }
}
