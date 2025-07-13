import Testeranto from "testeranto/src/Node";
import { I, O, M, spec, implementationFactory, interf } from "./Store.test";
import { SP_Store } from "./Store";

// Minimal test component
class DummyStore extends SP_Store<unknown> {
  store: Record<number, unknown> = {};

  make(ic, eid) {
    this.store[eid] = ic;
  }

  take(eid) {
    if (!this.store[eid]) throw "error";
    else return this.store[eid];
  }

  get(eid) {
    if (!this.store[eid]) return false;
    else return this.store[eid];
  }

  update(pic: unknown, eid: number) {
    this.store[eid] = pic;
  }

  each(cb: (ic: unknown, eid: number) => void) {
    for (const [eids, ic] of Object.entries(this.store)) {
      cb(ic, Number(eids));
    }
  }

  find(cb: (ic: unknown) => boolean) {
    for (const [_eid, ic] of Object.entries(this.store)) {
      if (cb(ic)) return ic;
    }

    throw "not found";
  }

  withIf(cb: (ic: unknown) => void, eid: number) {
    const x = this.get(eid);
    if (x) cb(x);
  }
}

export default Testeranto<I, O, M>(
  DummyStore.prototype,
  spec,
  implementationFactory(DummyStore),
  interf
);
