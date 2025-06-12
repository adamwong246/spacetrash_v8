import { Entity } from "./Entity";
import { IStores } from "./types";

export type IMoves = { entity: Entity, move: any }[];

export abstract class System{
  componentsStore = new Set<string>();

  constructor(componentsStore: Set<string>) {
    this.componentsStore = componentsStore;
  }

  abstract tick(
    delta: number, 
    components: IStores,
    buffer? :Int32Array<SharedArrayBuffer>
  )
}
