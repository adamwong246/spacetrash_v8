var protochain = require("protochain");

import { EntityComponent } from "./EntityComponent";
import { IEntitiesStore } from "./types";
import { Component } from "./Component";
import { StoreV2 } from "./Store";

const EntityMax = 65535;

export type IPerformanceConfig = {
  performanceLogging: boolean;
  fps: number;
  headless: boolean;
};

export abstract class ECS {
  entities: IEntitiesStore;

  abstract components: Record<string, StoreV2<any>>

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
    const name = c.constructor.name;
    const store: StoreV2<any> = this.components[name];

    if (!store)
      throw `Did you forget to register the store "${name}? Check the top level constructor for the implementation of Game."`;
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
        // if (c.constructor.name === "DrawableComponent") debugger
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
