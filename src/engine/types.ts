import { Component } from "./Component";

export abstract class ComponentStore {
  abstract store: any;
  abstract add(c: Component<any, any>, i: number);
  abstract make(...a): any;
}

export abstract class Store<T extends Component<any, any>> extends ComponentStore {
  store: [number, T][] = [];

  add(c: T, i: number) {
    this.store.push([i, c]);
  }
}

export abstract class OneDStore extends ComponentStore {
  store: [number, Component<any, any>][] = [];

  add(e) {
    this.store.push(e);
  }
}

export type IEntitiesStore = Int32Array<SharedArrayBuffer>;

export type IComponentsStores = [number, Component<any, any>][];
export const defaultComponentsStore: IComponentsStores = [];

export type I1DStores = Component<any, any>[];
export const default1dStore: I1DStores = [];

export type I2DStores = Component<any, any>[][];
export const default2dStore: I2DStores = [];

export type I1DSharedStores = Uint16Array<SharedArrayBuffer>;

export type IStores = Record<string, ComponentStore>;
export const defaultStore: IStores = {};
