import Component from "./Component";
import { ECS, EntityComponent } from "./ECS";
import { Entity } from "./Entity";

export type IMoves = { entity: Entity, move: any }[];

export abstract class System<SystemKeys extends string> {
  frame: Uint32Array;
  components: Component<unknown, unknown>[] = [];

  constructor() {
    this.frame = new Uint32Array(1);
    this.frame[0] = 0;
  }

  abstract doPreLogic(entitiesComponent: EntityComponent[]): void
  // abstract doLogic(prelogic: IMoves): IMoves
  abstract doPostLogic(entitiesComponent: EntityComponent[]): void

  loop(ecs: ECS<SystemKeys>, system: SystemKeys) {
    setInterval((d, s) => this.logicLoop(d, s), 3, ecs, system);
  }

  async logicLoop(ecs: ECS<SystemKeys>, system: SystemKeys) {
    // console.log("System.logicLoop", system)
    this.frame[0] = this.frame[0] + 1;
    
    const entitiesComponent = ecs.getEntitiesComponent(this);
    await this.doPreLogic(entitiesComponent);
    // const logic = await this.doLogic(prelogic);
    await this.doPostLogic(entitiesComponent);
  }

}
