import { Component } from "./Component";

export abstract class StoreV2<IC> {
  byXandY(x: number, y: number) {
    throw new Error("Method not implemented.");
  }
  at(x: any, y: any) {
    throw new Error("Method not implemented.");
  }
  abstract store;

  // set
  abstract make(ic: IC, ...a: any);
  // get
  abstract take(...a): IC | undefined;
  // update existing
  abstract update(pic: Partial<IC>, ...a): any;
  // update existing or create new
  // abstract upsert(...a): any;

  abstract each(cb: (ic: IC, ...a: any) => void);
  abstract withIf(cb: (ic: IC) => void, x: any);
  abstract find(cb: (ic: IC) => boolean): IC;
}

export abstract class MapStoreV2<
  IC extends Component<any, any>
> extends StoreV2<IC> {
  store: Map<number, IC> = new Map();

  each(cb: (ic: IC, k: number) => void) {
    for (let [eid, ic] of this.store) {
      cb(ic, eid);
    }
  }

  find(cb: (x: IC) => boolean): IC {
    for (let [eid, ic] of this.store) {
      if (cb(ic)) return ic;
    }

    throw "not found";
  }

  get(eid: number) {
    const x = this.store.get(eid);
    if (!x) return false;
    return x;
  }

  take(eid: number) {
    const x = this.store.get(eid);
    if (!x) throw "not found";
    return x;
  }

  update(ic: IC, eid: number) {
    this.store.set(eid, ic);
  }

  make(c: IC, eid: number) {
    this.store.set(eid, c);
  }

  // upsert(p: Partial<IC>, eid: number) {
  //   this.store.set(eid, {
  //     ...this.store.get(eid),
  //     ...p,
  //   });
  // }

  withIf(cb: (x: IC) => void, eid: number) {
    const x = this.store.get(eid);
    if (x) cb(x);
  }
}

export abstract class OneDStore<I extends []> extends StoreV2<I> {
  store: I[] = [];

  constructor() {
    super();
  }

  add(e) {
    this.store.push(e);
  }

  get(i: number): I {
    return this.store[i];
  }
}

export abstract class TwoDStore<I> extends StoreV2<I> {
  store: I[][] = [[]];

  make(ic: I, x: number, y: number) {
    return (this.store[y][x] = ic);
  }
  take(x: number, y: number) {
    if (!this.store[y][x]) throw "idk";

    return this.store[y][x];
  }

  update(pic: Partial<I>, x: number, y: number) {
    return (this.store[y][x] = {
      ...this.store[y][x],
      ...pic,
    });
  }

  upsert(...a: any[]) {
    throw new Error("Method not implemented.");
  }
  each(callback: (ic: I, x: number, y: number) => void) {
    for (let rowIndex = 0; rowIndex < this.store.length; rowIndex++) {
      const row = this.store[rowIndex];

      // Check if the row is a valid array
      if (!Array.isArray(row)) {
        console.warn(`Row ${rowIndex} is not an array. Skipping.`);
        continue; // Skip to the next row
      }

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const element = row[colIndex];

        // Call the callback function for each element
        callback(element, colIndex, rowIndex);
      }
    }
  }
  withIf(cb: (ic: I) => void, x: any) {
    throw new Error("Method not implemented.");
  }
  find(cb: (ic: I) => boolean): I {
    throw new Error("Method not implemented.");
  }
}
