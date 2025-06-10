import Component from "./Component";
import { Entity } from "./Entity";

export type IMoves = { entity: Entity, move: any }[];

export abstract class System<SystemKeys extends string> {
  
  abstract tick(
    delta: number, 
    components: Record<string, Component<any, any>>
  ): Record<string, Component<any, any>>
}
