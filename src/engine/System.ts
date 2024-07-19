import Component from "./Component";
import { ECS } from "./ECS";
import { Entity } from "./Entity";
import { EntityComponent } from "./EntityComponent";

export type IMoves = { entity: Entity, move: any }[];

export abstract class System<SystemKeys extends string> {
  
  abstract tick(
    delta: number, 
    components: Record<string, Component<any, any>>
  ): Record<string, Component<any, any>>
}
