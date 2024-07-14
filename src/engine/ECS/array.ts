
import Component from "../../engine/Component";
import { ECS } from "../../engine/ECS";
import { Entity } from "../../engine/Entity";
import { EntityComponent } from "../../engine/EntityComponent";
import { System } from "../../engine/System";

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

export class SpaceTrashECS<SystemKeys extends string> extends ECS<any> {
  entities: Set<string>;
  components: Record<string, Component<any, any>>;

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    super(systems);
    this.entities = new Set();
    this.components = {};
  }

  setEntitiesComponent(ecss: EntityComponent[]): void {
    ecss.forEach((ec) => {
      const entityUuid = uuidv4();
      this.entities.add(entityUuid);

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

  getEntitiesComponent(system: System<SystemKeys>): EntityComponent[] {

    const es: Record<string, EntityComponent> = {}

    Object.keys(this.components).forEach((cKey) => {
      const c = this.components[cKey];
      if (es[c.entity.uuid]) {
        es[c.entity.uuid].components.push(c);
      } else {
        es[c.entity.uuid] = new EntityComponent(new Entity(), [c]);
      }
    })
    return Object.values(es);

    // if (system) {

    //   const es: Record<string, EntityComponent> = {};

    //   Object.keys(this.components).forEach((cKey) => {
    //     const c = this.components[cKey];
    //     if (es[c.entity]) {
    //       es[c.entity].components.push(c);
    //     }
    //   })
    //   return Object.values(es);

    // } else {

    //   const es: Record<string, EntityComponent> = {};

    //   Object.keys(this.components).forEach((cKey) => {
    //     const c = this.components[cKey];
    //     if (es[c.entity]) {
    //       es[c.entity].components.push(c);
    //     } else {
    //       es[c.entity] = new EntityComponent(new Entity(), [c]);
    //     }
    //   })
    //   return Object.values(es);

    // }  
  }



}