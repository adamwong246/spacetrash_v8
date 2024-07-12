import { System } from './System';
import Component from './Component';
import { Entity } from './Entity';
import { View } from './View';

export abstract class EntityComponent {
  entity: Entity
  components: Component<any, any>[];

  constructor(entity: Entity, components: Component<any, any>[]) {
    this.entity = entity;
    this.components = components;
  }
}

export class ECS<SystemKeys extends string> {

  systems: Record<SystemKeys, System<SystemKeys>>;

  // entities: [string, number[]][]
  // components: [any][]
  entityComponents: EntityComponent[];

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    this.systems = systems;
    // this.entities = [];
    // this.components = [];
    this.entityComponents = [];
  }

  flash(scene: View) {
    this.entityComponents = scene.entityComponents;
    // this.entities = [];
    // this.components = [];

    // scene.entityComponents.forEach((ec) => {
    //   ec.components.forEach((c) => {
    //     this.entities[this.entities.push([ec.constructor.name, []]) - 1][1]
    //       .push(
    //         this.components
    //           .push([
    //             c
    //           ])
    //       );
    //   })
    // })

  }

  getEntitiesComponent(system: System<SystemKeys>): EntityComponent[] {
    return this.entityComponents.filter((ec) => {
      return ec.components.find((c) => {
        return c.systems.filter((s) => {
          return s === system;
        })
      })
    })
  }

  logicLoop() {
    (Object.entries(this.systems) as Array<[SystemKeys, System<SystemKeys>]>).forEach(([systemKey, system]) => {
      system.loop(this, systemKey)
    })
  }
}

// export class Database<SystemKey> {
//   // entities: Record<string, Entity> = {};
//   components: Record<string, {
//     component: Component<unknown>,
//     entity_uid: string
//   }> = {};

//   constructor() {
//   }

//   addEntityComponent(entityComponent: EntityComponent) {
//     const { entity, components } = entityComponent;
//     const eid = this.addEntity(entity);
//     this.addComponents(components, eid);
//   }

//   addEntity(entity: Entity) {
//     const uuid = uuidv4();
//     // this.entities[uuid] = entity;
//     return uuid;
//   }

//   addComponents(components: Component<unknown>[], entity_uid: string) {
//     components.forEach((component) => {
//       this.components[uuidv4()] = {
//         component,
//         entity_uid
//       };
//     })
//   }

//   getEntitiesComponent(system: SystemKey): IEntitiesComponent {
//     // return Object.values(this.components).filter((c) => {
//     //   return c.component.systems.find((s) => s === system);
//     // }).map(({entity_uid, component}) => {
//     //   return [this.entities[entity_uid], component]
//     // })
//   }

// }

// export type IEntitiesComponent = [e: Entity, c: Component<unknown>][];



// let SEntity = new r.Struct({
//   components: new r.Array(r.uint8, 200)
// });


// function uuidv4() {
//   return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
//     (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
//   );
// }
// import * as r from 'restructure';