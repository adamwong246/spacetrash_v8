import { ECS } from ".";
import { EntityComponent } from "../EntityComponent";
import { System } from "../System";

export class ECS_Basic<SystemKeys extends string> extends ECS<any> {
  entityComponents: EntityComponent[];

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    super(systems);
    this.entityComponents = [];
  }

  getEntitiesComponent(system: System<SystemKeys>): EntityComponent[] {
    if (system) {
      return this.entityComponents.filter((ec) => {
        return ec.components.find((c) => {
          return c.systems.filter((s) => {
            return s === system;
          })
        })
      })  
    } else {
      return this.entityComponents
    }  
  }

  setEntitiesComponent(ecss: EntityComponent[]): void {
    this.entityComponents = ecss;
  }

}