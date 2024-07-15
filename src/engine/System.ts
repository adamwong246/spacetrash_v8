import Component from "./Component";
import { ECS } from "./ECS";
import { Entity } from "./Entity";
import { EntityComponent } from "./EntityComponent";

export type IMoves = { entity: Entity, move: any }[];

export abstract class System<SystemKeys extends string> {
  frame: Uint32Array;
  components: Component<unknown, unknown>[] = [];

  constructor() {
    this.frame = new Uint32Array(1);
    this.frame[0] = 0;
  }

  abstract doPreLogic(components: Component<unknown, unknown>[]): void
  abstract doPostLogic(components: Component<unknown, unknown>[]): void

  loop(ecs: ECS<SystemKeys>, system: SystemKeys) {
    setInterval((d, s) => this.logicLoop(d, s), 30, ecs, system);
  }

  async logicLoop(ecs: ECS<SystemKeys>, system: SystemKeys) {
    // console.log("System.logicLoop", system)
    
    this.frame[0] = this.frame[0] + 1;
    
    const components = ecs.getComponents(system);
    await this.doPreLogic(components);
    await this.doPostLogic(components);
  }

}
