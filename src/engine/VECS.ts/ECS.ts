// The base class upon which all Games inheirt
// It handles the View-Entity-Component-System and main loop
var protochain = require('protochain')


import { System } from "./System";
import { EntityComponent } from "./EntityComponent";
import { IComponentsStores, IEntitiesStore, } from "./types";
import { Component } from "./Component";
import { StoreV2 } from "./Store";

const uint32Max = 4294967295
const EntityMax = 65535;
const maxArchetypes = 255;

export type IPerformanceConfig = {
  performanceLogging: boolean;
  fps: number;
  headless: boolean;
};

export abstract class ECS<IComponents extends StoreV2<any>> {
  system: System;
  entities: IEntitiesStore;
  components: IComponentsStores<any, IComponents>
  fps: number = 60;
  performanceLogging = false;
  paused = true;
  nextId = 0;
  headless = false;
  archetypeCodes: string[]

  constructor(
    system: System,
    components: IComponentsStores<any, IComponents>,
    config: IPerformanceConfig,
  ) {
    this.system = system;
    this.components = components;
    this.fps = config.fps;
    this.performanceLogging = config.performanceLogging;
    this.headless = config.headless;
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

  archetypeId(e: EntityComponent): number {
    const m = this.archetypeCodes.findIndex((a) => a === e.constructor.name);
    if (m !== -1) return m
    else {   
      this.archetypeCodes.push(e.constructor.name)
      return this.archetypeCodes.findIndex((a) => a === e.constructor.name)
    }

    
  }

  // returns the ids of entities added
  setEntitiesComponent(entityComponents: EntityComponent[]): number[] {
    const toReturn: number[] = [];
    entityComponents.forEach((e) => {
      if (!e) {
        console.error("e should not be null!");
        debugger
      }

      const i = this.addEntity(
        e, protochain(e).map((c) => c.constructor.name).slice(0, -1));
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

  unpause() {
    console.log("ecs unpaused");
    this.paused = false;
  }

  pause() {
    console.log("ecs paused");
    this.paused = true;
  }

  ///////////////////////////////////////////////////////////////////

  ticked: false | true = false;
  async tick(delta: number): Promise<any> {
    if (!this.paused) {
      await this.system.tick(delta, this);
      this.ticked = true;
    }
  }

  abstract draw(): Promise<any>;

  async start() {
    console.log("start");
    
    // await this.draw();
    
    let then = performance.now();
    const interval = 1000 / this.fps;
    let delta = 0;

    // run the logic loop as fast as possible
    // let d;
    // let p = performance.now();
    // const repeatedFunction = () => {
    //   d = performance.now();
    //   const timeDelta = d - p;
    //   this.tick(timeDelta);
    //   if (this.performanceLogging) {
    //     console.debug("ECS tick time delta", timeDelta);
    //   }
    //   p = d;
    // };

    // setInterval(repeatedFunction, 1);

    let drawing = false
    let thenn;

    if (!this.headless) {
      // run the render loop at FPS
      while (true) {
        let now = await new Promise(requestAnimationFrame);
        // if ( !drawing && (now - then < interval - delta)) {
        //   continue;
        // }
        // delta = delta + now - then;
        // then = now;

        this.tick(now - then);
        await this.draw();
        then = now;
      }
    } else {
      console.log("running in headless mode")
    }
  }

  // // ready = false;
  // // drawing = false;
  // // async tick(delta: number): Promise<any> {
  // //   if (!this.paused) {
  // //     await this.system.tick(delta, this);
  // //     this.ready = true;
  // //   }
  // // }

  // abstract draw(): Promise<any>;

  // async start() {
  //   console.log("start");

  //   // await this.system.tick(0, this);
    

  //   // let then = performance.now();
  //   // const interval = 1000 / this.fps;
  //   // let delta = 0;

  //   // // run the logic loop as fast as possible
    
  //   // let ds;
  //   // let ps = performance.now();

  //   // const systemLoop = () => {
  //   //   ds = performance.now();
  //   //   const timeDelta = ds - ps;
  //   //   this.tick(timeDelta);
  //   //   if (this.performanceLogging) {
  //   //     console.debug("ECS tick time delta", timeDelta);
  //   //   }
  //   //   ps = ds;
  //   // };

  //   // setInterval(systemLoop, 1);

  //   // let dd;
  //   // let pd = performance.now();
  //   // const drawLoop = async () => {
  //   //   dd = performance.now();
  //   //   const timeDelta = dd - pd;

  //   //   if (true) {
        
  //   //     await this.draw();
  //   //   }

  //   //   if (this.performanceLogging) {
  //   //     console.debug("draw tick time delta", timeDelta);
  //   //   }
  //   //   pd = dd;
  //   // };

  //   // setInterval(drawLoop, 333);

  //   let then = performance.now();
  //   const interval = 1000 / this.fps;
  //   let delta = 0;

  //   if (!this.headless) {
  //     // run the render loop at FPS
  //     while (true) {
  //       let now = await new Promise(requestAnimationFrame);
  //       if (now - then < interval - delta) {
  //         continue;
  //       }
  //       delta = Math.min(interval, delta + now - then - interval);
  //       then = now;

  //       await this.draw();
  //       await this.system.tick(delta, this)
  //     }
  //   } else {
  //     console.log("running in headless mode")
  //   }
  // }
}
