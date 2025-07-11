
import { SP_MapStore } from "../../../../demiurge/ecs/Store";

import { FloatPositionComponent } from "./physical";


export type LightComponent = FloatPositionComponent;

// map light id to position
export class LightComponentStore extends SP_MapStore<any> {
  // sstore: Map<number, LightComponentStore>;

  // constructor() {
  //   super();
  //   this.store = new Map();
  // }

  // get(n: number) {
  //   return this.store.get(n);
  // }

  // add(lc: LightComponentStore, n: number) {
  //   this.store.set(n, lc);
  //   return;
  // }

  // make() {
  //   throw "method not implemented";
  //   // return new LightComponent();
  // }

  // positionOf(eidOfLight: number): FloatPositionStore {
  //   throw new Error("Method not implemented.");
  // }
}


export type LightingComponent = FloatPositionComponent;

// map light id to position
export class LightingComponentStore extends SP_MapStore<any> {
  // store: Record<