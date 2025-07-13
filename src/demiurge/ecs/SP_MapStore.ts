import { Component } from "./Component";
import { SP_Store } from "./Store";

/**
 * Map-based Store Implementation
 * 
 * Provides default implementations for SP_Store methods using:
 * - Map<number, IC> as underlying store
 * - Entity IDs as keys
 * - Efficient O(1) lookups
 */
export class SP_MapStore<IC extends Component<unknown, unknown>> extends SP_Store<IC> {
  store: Map<number, IC> = new Map();

  each(cb: (ic: IC, k: number) => void) {
    for (const [eid, ic] of this.store) {
      cb(ic, eid);
    }
  }

  find(cb: (x: IC) => boolean): IC {
    for (const [, ic] of this.store) {
      if (cb(ic)) return ic;
    }

    throw "not found";
  }

  has(eid: number): boolean {
    const x = this.store.get(eid);
    if (!x) return false;
    return true;
  }

  get(eid: number): IC | false {
    return this.store.get(eid) || false;
  }

  take(eid: number, message?: string): IC {
    const component = this.store.get(eid);
    if (!component) {
      throw new Error(`${this.constructor.name} #${eid} not found. ${message || ""}`);
    }
    return component;
  }

  update(pic: IC, eid: number): IC {
    if (!(pic instanceof Component)) {
      throw new Error(`Can only update with Component instances`);
    }
    this.store.set(eid, pic);
    return pic;
  }

  make(ic: IC | null, eid: number) {
    if (ic === null) {
      this.store.delete(eid);
      return;
    }
    if (!(ic instanceof Component)) {
      throw new Error(`Can only store Component instances`);
    }
    this.store.set(eid, ic);
  }

  withIf(cb: (x: IC) => void, eid: number) {
    const x = this.store.get(eid);
    if (x) cb(x);
  }
}
