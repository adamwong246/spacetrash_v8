
import Component from "../../engine/Component";
import { ECS } from "../../engine/ECS";
import { System } from "../../engine/System";

import { SpaceTrashEntityComponent } from "./EntityComponent";

export class SpaceTrashECS<SystemKeys extends string> extends ECS<any> {
  entities: Set<string>;
  components: Record<string, Component<any, any>>;

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    super(systems);
    this.entities = new Set();
    this.components = {};
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

    // if (system) {

    //   const es: Record<string, SpaceTrashEntityComponent> = {}

    //   Object.keys(this.components).forEach((cKey) => {
    //     const c = this.components[cKey];
    //     if (c.systems.find((s) => s === system)) {
    //       if (es[c.entity.uuid]) {
    //         es[c.entity.uuid].components.push(c);
    //       } else {
    //         es[c.entity.uuid] = new SpaceTrashEntityComponent(c.entity, [c]);
    //         es[c.entity.uuid].applyComponent(c);
    //       }
    //     }

    //   })
    //   return Object.values(es);

    // } else {

    //   const es: Record<string, SpaceTrashEntityComponent> = {}

    //   Object.keys(this.components).forEach((cKey) => {
    //     const c = this.components[cKey];
    //     if (es[c.entity.uuid]) {
    //       es[c.entity.uuid].components.push(c);
    //     } else {
    //       es[c.entity.uuid] = new SpaceTrashEntityComponent(c.entity, [c]);
    //       es[c.entity.uuid].applyComponent(c);
    //     }
    //   })
    //   return Object.values(es);

    const toReturn: Record<string, SpaceTrashEntityComponent> = {}

    // console.log(this.components);
    // console.log(this.entities);

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



