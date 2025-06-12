import { System } from "./System";
import { EntityComponent } from "./EntityComponent";

import { IEntitiesStore, IStores } from "./types";
import { Component } from "./Component";

const EntityMax = 4096;

export class ECS {
  system: System;
  componentStores: IStores;
  entities: IEntitiesStore;
  paused = true;

  constructor(system: System, components: Set<string>) {
    this.system = system;
    this.componentStores = {};

    const sharedBuffer = new SharedArrayBuffer(
      Int32Array.BYTES_PER_ELEMENT * EntityMax
    );
    const sharedArray = new Int32Array(sharedBuffer);

    this.entities = sharedArray;

    components.forEach((c) => {
      this.componentStores[c] = [];
    });
  }

  setEntitiesComponent(entityComponents: EntityComponent[]): void {
    let i = 0;

    entityComponents.forEach((e) => {
      if (!e) {
        console.error("e should not be null!");
        debugger;
      }

      this.entities[i] = i;
      i++;
      e.components.forEach((c: Component<any, any>) => {
        if (!c.constructor.name) {
          console.error("constructor-name not found.", c);
        } else {
          if (!this.componentStores[c.constructor.name]) {
            console.error(
              `${c.constructor.name} is not registered with the ECS. Did you forget to add it to your Game's construction?`
            );
          } else {
            this.componentStores[c.constructor.name].push([i, c]);
          }
        }
      });
    });
    console.log(`You have ${i} entities`);
    if (i > EntityMax) {
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
      await this.system.tick(delta, this.componentStores, this.entitiesV2);
    }
  }
}
