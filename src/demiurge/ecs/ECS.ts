var protochain = require("protochain");

import { EntityComponent } from "./EntityComponent";
import { IEntitiesStore } from "./types";
import { Component } from "./Component";
import { SP_Store } from "./SP_Store";

const EntityMax = 65535;

export type IPerformanceConfig = {
  performanceLogging: boolean;
  fps: number;
  headless: boolean;
};

export abstract class ECS {
  entities: IEntitiesStore;

  abstract components: Record<string, SP_Store<any>>

  fps: number = 60;
  performanceLogging = false;
  nextId = 0;
  headless = false;

  constructor(config: IPerformanceConfig) {
    this.fps = config.fps;
    this.performanceLogging = config.performanceLogging;

    this.entities = new Map();
  }

  addComponent(i: number, c: Component<any, any>) {

    let storeKey;
    const cnstrctr = (c.constructor as any);

    if (cnstrctr.getStoreKey) {
      storeKey = (c.constructor as any).getStoreKey();  
    } else {
      storeKey = cnstrctr.name;
    }
    
    const store: SP_Store<any> = this.components[storeKey];

    if (!store) {
      throw `Did you forget to register the store "${storeKey}" for component ${c.constructor.name}?`;
    }
    store.make(c, i);
  }

  getComponents(i: number): Component<any, any>[] {
    return Object.values(this.components)
      .map((cs) => {
        return cs.take(i);
      })
      .filter((x) => {
        return x !== undefined;
      });
  }

  addEntity(e: EntityComponent, classs: string): number {
    const toReturn = this.nextId;

    this.entities.set(this.nextId, classs);
    this.nextId++;
    return toReturn;
  }

  // returns the ids of entities added
  setEntitiesComponent(entityComponents: EntityComponent[]): number[] {
    const toReturn: number[] = [];
    entityComponents.forEach((e) => {
      if (!e) {
        throw "e should not be null!";

      }

      const i = this.addEntity(
        e,
        protochain(e)
          .map((c) => c.constructor.name)
          .slice(0, -1)
      );
      toReturn.push(i);

      e.components.forEach((c: Component<any, any>) => {
        if (!c.constructor.name) {
          console.error("constructor-name not found.", c);
        } else {
          this.addComponent(i, c);
        }
      });
    });
    console.log(`You have ${this.nextId} entities`);
    if (this.nextId > EntityMax) {
      console.error(
        `You have too many entities! You can have no more than ${EntityMax}`
      );
    }
    return toReturn;
  }
}
