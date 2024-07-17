

import { SpaceTrashComponent } from "./Components";
import { SpaceTrashEntityComponent } from "./EntityComponent";
import Component from "./engine/Component";
import { ECS } from "./engine/ECS";
import { System } from "./engine/System";
import { uuidv4 } from "./engine/lib";

export class SpaceTrashECS<SystemKeys extends string> extends ECS<any> {
  
  entities: Set<string>;
  components: Record<string, Component<any, any>>;

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    super(systems);
    this.entities = new Set();
    this.components = {};
  }
  
  

  
  getComponents(system?: any) {
    // return Object.values(this.components)
    return this.components;
  }

  setEntitiesComponent(ecss: SpaceTrashEntityComponent[]): void {
    ecss.forEach((ec) => {
      const entityUuid = uuidv4();
      this.entities.add(entityUuid);

      ec.components.forEach((c) => {
        // const componentUid = c.uuid;
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

  // getEntitiesComponent(system: System<SystemKeys>): SpaceTrashEntityComponent[] {

  //   if (system) {

  //     const toReturn: Record<string, SpaceTrashEntityComponent> = {}

  //     Object.keys(this.components).forEach((cKey) => {
  //       const c = this.components[cKey];
  //       const e = c.entity as unknown as string;
  //       if (c.systems.find((s) => {
  //         return system === s;
  //       })) {
  //         if (toReturn[e]) {
  //           toReturn[e].applyComponent(c);
  //         } else {
  //           toReturn[e] = new SpaceTrashEntityComponent(c.entity, [c]);
  //         }
  //       }

  //     })
  //     return Object.values(toReturn);

  //   } else {
  //     const toReturn: Record<string, SpaceTrashEntityComponent> = {}

  //     Object.keys(this.components).forEach((cKey) => {
  //       const c = this.components[cKey];
  //       const e = c.entity as unknown as string;

  //       if (toReturn[e]) {
  //         toReturn[e].applyComponent(c);
  //       } else {
  //         toReturn[e] = new SpaceTrashEntityComponent(c.entity, [c]);

  //       }
  //     })
  //     return Object.values(toReturn);
  //   }



  // }
}



