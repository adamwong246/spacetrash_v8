import { System } from "./System";
import { EntityComponent } from "./EntityComponent";

import { ComponentStore, IEntitiesStore, IStores } from "./types";
import { Component } from "./Component";

const EntityMax = 65535;

export class ECS {
  system: System;
  componentStores: ComponentStore[];
  entities: IEntitiesStore;
  paused = true;
  nextId = 0;

  constructor(system: System, components: Record<string, ComponentStore>) {
    this.system = system;
    this.componentStores = [];

    // the list of all entities
    const sharedBuffer = new SharedArrayBuffer(
      Int32Array.BYTES_PER_ELEMENT * EntityMax
    );
    const sharedArray = new Int32Array(sharedBuffer);
    this.entities = sharedArray;

    Object.entries(components).forEach(([k, c]: [string, ComponentStore]) => {
      this.componentStores[k] = c;
    });
  }

  addComponent(i: number, c: Component<any, any>) {
    this.componentStores[c.constructor.name].add(c, i);
  }

  addEntity(): number {
    const toReturn = this.nextId;
    this.entities[this.nextId] = this.nextId;
    this.nextId++;
    return toReturn;
  }

  setEntitiesComponent(entityComponents: EntityComponent[]): void {
    entityComponents.forEach((e) => {
      if (!e) {
        console.error("e should not be null!");
        debugger;
      }

      const i = this.addEntity();

      e.components.forEach((c: Component<any, any>) => {
        if (!c.constructor.name) {
          console.error("constructor-name not found.", c);
        } else {
          this.addComponent(i, c);
          // this.componentStores[c.constructor.name].add(c, i);
          // if (!this.componentStores[c.constructor.name]) {
          //   console.error(
          //     `${c.constructor.name} is not registered with the ECS. Did you forget to add it to your Game's construction?`
          //   );
          // } else {
          //   // this.componentStores[c.constructor.name].add([i, c]);
          // }
        }
      });
    });
    console.log(`You have ${this.nextId} entities`);
    if (this.nextId > EntityMax) {
      console.error(
        `You have too many entities! You can have no more than ${EntityMax}`
      );
      debugger;
    }
  }

  unpause() {
    this.paused = false;
  }

  async tick(delta: number) {
    if (!this.paused) {
      await this.system.tick(delta, this.componentStores, this.entities);
    }
  }
}
