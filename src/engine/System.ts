import Component from "./Component";
import { ECS, EntityComponent } from "./ECS";

export abstract class System<SystemKeys extends string> {
  frame: Uint32Array;
  components: Component<unknown, unknown>[] = [];

  constructor() {
    this.frame = new Uint32Array(1);
    this.frame[0] = 0;
  }

  abstract doPreLogic(entitiesComponent: EntityComponent[]): any
  abstract doLogic(prelogic)
  abstract doPostLogic(logic)

  loop(ecs: ECS<SystemKeys>, system: SystemKeys) {
    setInterval((d, s) => this.logicLoop(d, s), 1000, ecs, system);
  }

  async logicLoop(ecs: ECS<SystemKeys>, system: SystemKeys) {
    this.frame[0] = this.frame[0] + 1;
    
    const entitiesComponent = ecs.getEntitiesComponent(this);
    const prelogic = await this.doPreLogic(entitiesComponent);
    const logic = await this.doLogic(prelogic);
    await this.doPostLogic(logic);
  }

}
