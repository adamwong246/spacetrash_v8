import { Entity } from "./Entity";
import { ComponentStore, IStores } from "./types";

export type IMoves = { entity: Entity, move: any }[];

export abstract class System{
  
  abstract tick(
    delta: number, 
    components: ComponentStore[],
    buffer? :Int32Array<SharedArrayBuffer>
  )
}
