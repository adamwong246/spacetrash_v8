import { System } from '../System';
import { EntityComponent } from '../EntityComponent';
import Component from '../Component';

export abstract class ECS<SystemKeys extends string> {
  
  systems: Record<SystemKeys, System<SystemKeys>>;

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    this.systems = systems;    
  }

  abstract setEntitiesComponent(ecss: EntityComponent[] ): void
  abstract getComponents(system?: SystemKeys): Record<string, Component<any, any>>

  tick(delta: number ) {
    (Object.entries(this.systems) as Array<[SystemKeys, System<SystemKeys>]>).forEach(([systemKey, system]) => {
      system.tick(delta, this.getComponents());
    })
  }
}
