import Component from "../../engine/Component";
import { ECS } from "../../engine/ECS";
import { System } from "../../engine/System";
import { uuidv4 } from "../../engine/lib";

import { SpaceTrashEntityComponent } from "./EntityComponent";

export class SpaceTrashECS<SystemKeys extends string> extends ECS<any> {
  components: Record<string, Component<any, any>>;

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    super(systems);
    this.components = {};
  }
  
  getComponents(system?: any) {
    return this.components;
  }

  setEntitiesComponent(ecss: SpaceTrashEntityComponent[]): void {
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

}
