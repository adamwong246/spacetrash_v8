// The base class upon which all Games inheirt
// It handles the View-Entity-Component-System and main loop

import { System } from "./System";
import { EntityComponent } from "./EntityComponent";
import { IComponentsStores, IEntitiesStore, IStores } from "./types";
import { Component } from "./Component";

const EntityMax = 65535;

export abstract class ECS {
  system: System;
  entities: IEntitiesStore;
  componentStores: IComponentsStores<any>;
  stores: IStores<any>;
  fps: number = 30;
  performanceLogging = false;
  paused = true;
  nextId = 0;

  constructor(
    system: System,
    componentStores: IComponentsStores<any>,
    stores: IStores<any>,
    config: {
      fps: number;
      performanceLogging: boolean;
    }
  ) {
    this.system = system;
    this.componentStores = componentStores;
    this.stores = stores;
    this.fps = config.fps;
    this.performanceLogging = config.performanceLogging;

    const sharedBuffer = new SharedArrayBuffer(
      Int32Array.BYTES_PER_ELEMENT * EntityMax
    );
    const sharedArray = new Int32Array(sharedBuffer);
    this.entities = sharedArray;
  }

  addComponent(i: number, c: Component<any, any>) {
    this.componentStores[c.constructor.name].add(c, i);
  }

  getComponents(i: number): Component<any, any>[] {
    return Object.values(this.componentStores)
      .map((cs) => {
        return cs.get(i);
      })
      .filter((x) => {
        return x !== undefined;
      });
  }

  addEntity(): number {
    const toReturn = this.nextId;
    this.entities[this.nextId] = this.nextId;
    this.nextId++;
    return toReturn;
  }

  // returns the ids of entities added
  setEntitiesComponent(entityComponents: EntityComponent[]): number[] {
    const toReturn: number[] = [];
    entityComponents.forEach((e) => {
      if (!e) {
        console.error("e should not be null!");
      }

      const i = this.addEntity();
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

  unpause() {
    console.log("ecs unpaused");
    this.paused = false;
  }

  pause() {
    console.log("ecs paused");
    this.paused = true;
  }

  ///////////////////////////////////////////////////////////////////

  async tick(delta: number): Promise<any> {
    if (!this.paused) {
      await this.system.tick(delta, this);
    }
  }

  abstract draw(): Promise<any>;

  async start() {
    console.log("start");
    // this.updateUI(this.uiState);

    let then = performance.now();
    const interval = 1000 / this.fps;
    let delta = 0;

    // run the logic loop as fast as possible
    let d;
    let p = performance.now();
    const repeatedFunction = async () => {
      d = performance.now();
      const timeDelta = d - p;
      await this.tick(timeDelta);
      if (this.performanceLogging) {
        console.debug("ECS tick time delta", timeDelta);
      }
      p = d;
    };

    setInterval(repeatedFunction, 1);

    // run the render loop at FPS
    while (true) {
      let now = await new Promise(requestAnimationFrame);
      if (now - then < interval - delta) {
        continue;
      }
      delta = Math.min(interval, delta + now - then - interval);
      then = now;

      if (this.performanceLogging) {
        console.debug("Draw time delta, total", delta);
      }

      await this.draw();
    }
  }
}
