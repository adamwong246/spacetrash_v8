import { Store } from "../../../../engine/VECS.ts/types";
import { ClassificationComponent } from "./classifiable";
import { FloatPositionComponent } from "./physical";


export type LightComponent = FloatPositionComponent;

// map light id to position
export class LightComponentStore extends Store<any> {
  store: Record<
    number,
    {
      floatPosition: FloatPositionComponent;
      classification: ClassificationComponent;
    }
  >;

  constructor() {
    super();
    this.store = {};
  }

  add(
    n: number,
    floatPosition: FloatPositionComponent,
    classification: ClassificationComponent
  ) {
    return (this.store[n] = {
      floatPosition,
      classification,
    });
  }

  get(n: number): {
    floatPosition: FloatPositionComponent;
    classification: ClassificationComponent;
  } {
    return this.store[n];
  }

  make() {
    throw "method not implemented";
    // return new LightComponent();
  }

  // positionOf(eidOfLight: number): FloatPositionStore {
  //   throw new Error("Method not implemented.");
  // }
}


export type LightingComponent = FloatPositionComponent;

// map light id to position
export class LightingComponentStore extends Store<any> {
  store: Record<
    number,
    {
      floatPosition: FloatPositionComponent;
      classification: ClassificationComponent;
    }
  >;

  constructor() {
    super();
    this.store = {};
  }

  add(
    n: number,
    floatPosition: FloatPositionComponent,
    classification: ClassificationComponent
  ) {
    return (this.store[n] = {
      floatPosition,
      classification,
    });
  }

  get(n: number): {
    floatPosition: FloatPositionComponent;
    classification: ClassificationComponent;
  } {
    return this.store[n];
  }

  make() {
    throw "method not implemented";
    // return new LightComponent();
  }

  // positionOf(eidOfLight: number): FloatPositionStore {
  //   throw new Error("Method not implemented.");
  // }
}
