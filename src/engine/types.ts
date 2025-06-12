import { Component } from "./Component";

export type IEntitiesStore = Int32Array<SharedArrayBuffer>
// export const defaultEntitiesStore:IEntitiesStore = [];

export type IComponentsStores = [number, Component<any, any>][];
export const defaultComponentsStore: IComponentsStores = [];

export type I1DStores = Component<any, any>[];
export const default1dStore: I1DStores = []

export type I2DStores = Component<any, any>[][];
export const default2dStore: I2DStores = [];

export type IStores = Record<string, IComponentsStores | I1DStores | I2DStores>;
export const defaultStore: IStores = {};