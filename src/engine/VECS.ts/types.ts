import { Component } from "react";

export abstract class ComponentStore<I extends Component<any, any>> {
  abstract store: any;
  abstract add(c: I, i: number);
  abstract make(...a): I;
  abstract get(i: number): I | undefined;
}

export abstract class Store<I> {
  abstract store: I;
  abstract add(...a: any);
  abstract make(...a): I;
  // abstract get(...a): any;
}

export abstract class EntityComponentStore<
  T extends Component<any, any>
> extends ComponentStore<T> {
  store: [number, T][] = [];

  add(c: T, i: number) {
    this.store.push([i, c]);
  }

  get(i: number) {
    const toReturn = this.store.find((v) => {
      return v[0] === i;
    });

    if (!toReturn) throw "not found!";
    if (!toReturn[1]) throw "not found!";

    return toReturn[1];
  }
}

export abstract class OneDStore<I extends []> extends Store<I> {
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

export abstract class TwoDStore<I> extends Store<I> {
  store: I[][] = [[]];

  get(y: number, x: number) {
    return this.store[y][x];
  }

  add(e) {
    this.store.push(e);
  }
}

export type IEntitiesStore = Int32Array<SharedArrayBuffer>;

export type IComponentsStore = [number, Component<any, any>][];
export const defaultComponentsStore: IComponentsStore = [];

export type I1DStores = Component<any, any>[];
export const default1dStore: I1DStores = [];

export type I2DStores = Component<any, any>[][];
export const default2dStore: I2DStores = [];

export type I1DSharedStores = Uint16Array<SharedArrayBuffer>;

export type IStores<I> = Record<
  keyof I,
  Store<number>
>;

export type IComponentsStores<I extends Component<any, any>> = Record<
  string,
  ComponentStore<I>
>;
export const defaultStore: IStores<any> = {};
