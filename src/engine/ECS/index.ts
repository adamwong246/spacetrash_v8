import { System } from '../System';
import { EntityComponent } from '../EntityComponent';

export abstract class ECS<SystemKeys extends string> {
  systems: Record<SystemKeys, System<SystemKeys>>;

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    this.systems = systems;    
  }

  abstract getEntitiesComponent(system?: System<SystemKeys>): EntityComponent[] 
  abstract setEntitiesComponent(ecss: EntityComponent[] ): void

  logicLoop() {
    console.log("logic loop is running");
    (Object.entries(this.systems) as Array<[SystemKeys, System<SystemKeys>]>).forEach(([systemKey, system]) => {
      system.loop(this, systemKey)
    })
  }
}
