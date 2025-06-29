import { Component } from "./Component";
import { StoreV2 } from "./Store";


// v1
////////////////////////////////////////////////////////////////////////////////

// export abstract class MapStore<I extends Component<any, any>> extends Map<
//   number,
//   I
// > {}

// export abstract class ComponentStore<
//   I extends Component<any, any>
// > extends MapStore<I> {
//   abstract store: any;
//   abstract add(c: I, i: number);
//   // abstract make(...a): I;
//   // abstract get(i: number): I | undefined;
// }

// export abstract class Store<I> {
//   each(arg0: ([eid, [ndx, s]]: [any, [any, any]]) => void) {
//     throw new Error("Method not implemented.");
//   }
//   // get(n: number) {
//   //   throw new Error("Method not implemented.");
//   // }
//   abstract add(...a: any);
//   // abstract make(...a): I;
//   abstract get(...a): any;
//   abstract upsert(): any;
// }

// export abstract class EntityComponentStore<
//   T extends Component<any, any>
// > extends MapStore<T> {
//   // store: [number, T][] = [];

//   // exists(i: number):boolean {
//   //   const toReturn = this.store.find((v) => {
//   //     return v[0] === i;
//   //   });

//   //   if (!toReturn) throw "not found!";
//   //   if (!toReturn[1]) throw "not found!";

//   //   return true;
//   // }

//   add(c: T, i: number) {
//     // this.push([i, c]);
//     this.set(i, c);
//   }

//   get(i: number) {
//     for (let x of this.keys()) {
//       if (x === i) return this.get(x);
//     }

//     throw "not found!";
//   }

//   exists(i: number) {
//     for (let x of this.keys()) {
//       if (x === i) return true;
//     }

//     return false;
//   }
// }

export type IEntitiesStore = Map<number, string[]>

export type IComponentsStore = [number, Component<any, any>][];
export const defaultComponentsStore: IComponentsStore = [];

export type I1DStores = Component<any, any>[];
export const default1dStore: I1DStores = [];

export type I2DStores = Component<any, any>[][];
export const default2dStore: I2DStores = [];

export type I1DSharedStores = Uint16Array<SharedArrayBuffer>;

export type IStores<I> = Record<keyof I, StoreV2<number>>;

export type IComponentsStores<
  I extends Component<any, any>,
  II extends StoreV2<any>
> = Record<keyof II, StoreV2<I>>;

export const defaultStore: IStores<any> = {};
