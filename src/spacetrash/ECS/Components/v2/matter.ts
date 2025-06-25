import { Component } from "../../../../engine/VECS.ts/Component";
import { Store } from "../../../../engine/VECS.ts/types";

export class MatterComponent extends Component<any, any> {
  matterBody: Matter.Body;

  constructor(matterBody: Matter.Body) {
    super();
    this.matterBody = matterBody;
  }

}

export class MatterStore extends Store<MatterComponent> {
  
  store: Map<number, MatterComponent>;

  constructor() {
    super();
    this.store = new Map();
  }

  get(n: number) {
    return this.store.get(n);
  }

  add(lc: MatterComponent, n: number) {
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

  // each(
  //   cb: (
  //     eid,
  //     le: [number, IntegerPositionComponent, string],
  //     eidAsString
  //   ) => void
  // ) {
  //   this.store.forEach((value, key) => {
  //     cb([Number(key), [key, value]]);
  //   });
  // }
}