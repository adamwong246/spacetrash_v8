// import { System } from "./System";
// import { EntityComponent } from "./EntityComponent";

// import {
//   ComponentStore,
//   IComponentsStores,
//   IEntitiesStore,
//   IStores,
// } from "./types";
// import { Component } from "./Component";

// const EntityMax = 65535;

// export class ECS<I> {
//   system: System;
//   entities: IEntitiesStore;
//   componentStores: IComponentsStores<any>;
//   stores: IStores<I>;

//   paused = true;
//   nextId = 0;

//   constructor(
//     system: System,
//     componentStores: IComponentsStores<any>,
//     stores: IStores<any>,
//   ) {
//     this.system = system;
//     this.componentStores = componentStores;
//     this.stores = stores;

//     // the list of all entities
//     const sharedBuffer = new SharedArrayBuffer(
//       Int32Array.BYTES_PER_ELEMENT * EntityMax
//     );
//     const sharedArray = new Int32Array(sharedBuffer);
//     this.entities = sharedArray;

//     // Object.entries(components).forEach(([k, c]: [string, ComponentStore<any>]) => {
//     //   this.componentStores[k] = c;
//     // });
//   }

//   addComponent(i: number, c: Component<any, any>) {
//     this.componentStores[c.constructor.name].add(c, i);
//   }

//   getComponents(i: number): Component<any, any>[] {
//     return Object.values(this.componentStores)
//       .map((cs) => {
//         return cs.get(i);
//       })
//       .filter((x) => {
//         return x !== undefined;
//       });
//   }

//   addEntity(): number {
//     const toReturn = this.nextId;
//     this.entities[this.nextId] = this.nextId;
//     this.nextId++;
//     return toReturn;
//   }

//   // returns the ids of entities added
//   setEntitiesComponent(entityComponents: EntityComponent[]): number[] {
//     const toReturn: number[] = [];
//     entityComponents.forEach((e) => {
//       if (!e) {
//         console.error("e should not be null!");
//       }

//       const i = this.addEntity();
//       toReturn.push(i);

//       e.components.forEach((c: Component<any, any>) => {
//         if (!c.constructor.name) {
//           console.error("constructor-name not found.", c);
//         } else {
//           this.addComponent(i, c);
//         }
//       });
//     });
//     console.log(`You have ${this.nextId} entities`);
//     if (this.nextId > EntityMax) {
//       console.error(
//         `You have too many entities! You can have no more than ${EntityMax}`
//       );
//     }
//     return toReturn;
//   }

//   unpause() {
//     console.log("ecs unpaused");
//     this.paused = false;
//   }

//   async tick(delta: number) {
//     if (!this.paused) {
//       await this.system.tick(delta, this);
//     }
//   }
// }
