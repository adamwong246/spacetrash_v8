

import { SpaceTrashComponent } from "./Components";
import { SpaceTrashEntityComponent } from "./EntityComponent";
import Component from "./engine/Component";
import { ECS } from "./engine/ECS";
import { System } from "./engine/System";

export class SpaceTrashECS<SystemKeys extends string> extends ECS<any> {
  
  entities: Set<string>;
  components: Record<string, Component<any, any>>;

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    super(systems);
    this.entities = new Set();
    this.components = {};
  }

  getComponents(system?: any): SpaceTrashComponent[] {
    return Object.values(this.components)
  }

  setEntitiesComponent(ecss: SpaceTrashEntityComponent[]): void {
    ecss.forEach((ec) => {
      // const entityUuid = uuidv4();
      this.entities.add(ec.entity.uuid);

      ec.components.forEach((c) => {
        const componentUid = c.uuid;
        this.components[componentUid] = {
          ...c,
          entity: ec.entity.uuid,
          constructor: {
            name: c.constructor.name,
          }

        } as any;
      })
    })
  }

  getEntitiesComponent(system: System<SystemKeys>): SpaceTrashEntityComponent[] {

    if (system) {

      const toReturn: Record<string, SpaceTrashEntityComponent> = {}

      Object.keys(this.components).forEach((cKey) => {
        const c = this.components[cKey];
        const e = c.entity as unknown as string;
        if (c.systems.find((s) => {
          return system === s;
        })) {
          if (toReturn[e]) {
            toReturn[e].applyComponent(c);
          } else {
            toReturn[e] = new SpaceTrashEntityComponent(c.entity, [c]);
          }
        }

      })
      return Object.values(toReturn);

    } else {
      const toReturn: Record<string, SpaceTrashEntityComponent> = {}

      Object.keys(this.components).forEach((cKey) => {
        const c = this.components[cKey];
        const e = c.entity as unknown as string;

        if (toReturn[e]) {
          toReturn[e].applyComponent(c);
        } else {
          toReturn[e] = new SpaceTrashEntityComponent(c.entity, [c]);

        }
      })
      return Object.values(toReturn);
    }



  }
}



