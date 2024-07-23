import { System } from './System';
import { EntityComponent } from './EntityComponent';
import Component from './Component';
import { uuidv4 } from './lib';

export class ECS<SystemKeys extends string> {
  
  system: System<SystemKeys>
  components: Record<string, Component<any, any>>;

  constructor(system: System<SystemKeys>) {
    this.system = system;    
    this.components = {};
  }

  setComponents(arg0: Record<string, Component<any, any>>) {
    this.components = arg0;
  }

  getComponents(system?: any) {
    return this.components;
  }

  setEntitiesComponent(ecss: EntityComponent[]): void {
    ecss.forEach((ec) => {
      const entityUuid = uuidv4();

      ec.components.forEach((c) => {
        const componentUid = uuidv4();
        this.components[componentUid] = {
          ...c,
          entity: entityUuid,
          constructor: {
            name: c.constructor.name,
          }

        } as any;
      })
    })
  }

  tick(delta: number) {
    this.components = this.system.tick(delta, this.components);
  }
  
}
