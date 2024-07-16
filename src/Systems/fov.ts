

import { LitComponent, OutCastingComponent } from "../Components/casting/out";
import { PhysicsActorComponent, PhysicsComponent, PhysicsSetComponent } from "../Components/physics";
import { LitableComponent } from "../Components/casting/in";
import { SpaceTrashEntityComponent } from "../EntityComponent";

import { ISpaceTrashSystems } from ".";
import { System } from "../engine/System";
import { SpaceTrashComponent } from "../Components";


// let actors: Record<string, {
//   physicsComponent: PhysicsActorComponent,
//   lits: LitComponent[],
//   littables: LitableComponent[]
// }> = {};

// const castingComponents: Record<string, {
//   physicsComponent: PhysicsComponent,
//   lits: LitComponent[],
//   littables: LitableComponent[]
// }> = {}

export class FOV extends System<ISpaceTrashSystems> {
  constructor() {
    super()
  }


  doPreLogic(components: SpaceTrashComponent[]): void {


  }

  doPostLogic(components: SpaceTrashComponent[]) {

    let entities: Record<string, {
      physicsComponent: PhysicsComponent,
      lits: LitComponent[],
      littables: LitableComponent[]
    }> = {};

    let lights: string[][] = [[]];
    let actors: string[][] = [[]];
    // let liters: string[];
    let litables: LitableComponent[] = [];
    let lits: string[] = [];

    // components.forEach((c) => {
    for (const c of components) {
      if (c.constructor.name === "PhysicsSetComponent") {
        // entities[c.entity as unknown as string].physicsComponent = c as PhysicsSetComponent;
        const y = Math.round((c as PhysicsSetComponent).y);

        if (!lights[y]) {
          lights[y] = []
        }
        lights[y][(c as PhysicsSetComponent).x] = c.entity as unknown as string;
      }
      if (c.constructor.name === "PhysicsActorComponent") {
        // entities[c.entity as unknown as string].physicsComponent = c as PhysicsActorComponent;
        const y = Math.round((c as PhysicsActorComponent).y);

        if (!actors[y]) {
          actors[y] = []
        }
        actors[
          y
        ][
          Math.round((c as PhysicsActorComponent).x)
        ] = c.entity as unknown as string;
      }
      if (c.constructor.name === "LitableComponent") {
        // (c as LitableComponent).albedo = 0;
        // entities[c.entity as unknown as string].littables.push(c as LitableComponent);

        // liters.push(c.entity as unknown as string)
        litables[c.entity as unknown as string] = c;
        // litables[c.entity as unknown as string].albedo = Math.random();
      }
      if (c.constructor.name === "LitComponent") {
        // entities[c.entity as unknown as string].lits.push(c as LitComponent);
        // litables.push(c as LitComponent)
        // lits.push(c.entity as unknown as string)
        // (c as LitComponent).albedo = Math.random();
        
        // lits[c.entity as unknown as string] = c;
      }
    }

    // debugger
    
    for (let [yndx, lightsY] of lights.entries()) {
      debugger
      for (let [xndx, lightsX] of lightsY.entries()) {
        
        if (actors[yndx] && actors[yndx][xndx]) {
          
          console.log("albedo", litables[actors[yndx][xndx]])
          litables[actors[yndx][xndx]].albedo = Math.random()
        }
      }
    }

    // lights.forEach((lightsY, yndx) => {
    //   lightsY.forEach((lightsX, xndx, ) => {
    //     if (actors[yndx] && actors[yndx][xndx]) {
    //       console.log("albedo", litables[actors[yndx][xndx]])
    //       litables[actors[yndx][xndx]].albedo = Math.random()
    //     }
    //   })
    // })

    // Object.keys(entities).forEach(eId => {
    //   const e = entities[eId];
    //   if (e.physicsComponent.constructor.name === "PhysicsSetComponent") {

    //     // entities[c.entity as unknown as string].physicsComponent = c as PhysicsSetComponent;
    //   }
    // })

    // const physicsSetComponents = components.filter((c) => c.constructor.name === "PhysicsSetComponent") as PhysicsSetComponent[];
    // const physicsActorComponents = components.filter((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent[];
    // const litables = components.filter((c) => c.constructor.name === "LitableComponent") as LitableComponent[];
    // const lits = components.filter((c) => c.constructor.name === "LitComponent") as LitComponent[];

    // litables.forEach(litable => { 
    //   litable.albedo = 0;
    // })

    // litables.forEach(litable => {
    //   physicsSetComponents.forEach(setPiece => {
    //     if ((litable.entity as unknown as string) === (setPiece.entity as unknown as string)) {

    //       lits.forEach(lit => {
    //         physicsActorComponents.forEach(actor => { 
    //           if ((lit.entity as unknown as string) === (actor.entity as unknown as string)) { 


    //             if ((Math.round(actor.x) === setPiece.x) && (Math.round(actor.y) === setPiece.y)) { 
    //               litable.albedo = 2;
    //             }

    //           }
    //         });

    //       })
    //     }
    //   })
    // })

    // physicsComponents.forEach(pc => {
    //   castingComponents[pc.entity as unknown as string] = {
    //     physicsComponent: pc,
    //     lits: [],
    //     littables: []
    //   }
    // });

    // litables.forEach(l => {
    //   castingComponents[l.entity as unknown as string] = {
    //     ...castingComponents[l.entity as unknown as string],
    //     lits: (castingComponents[l.entity as unknown as string] || {lits: []}).lits,
    //     littables: [
    //       ...(castingComponents[l.entity as unknown as string] || {littables: []}).littables,
    //       l
    //     ]
    //   }
    // });

    // lits.forEach(l => {
    //   castingComponents[l.entity as unknown as string] = {
    //     ...castingComponents[l.entity as unknown as string],
    //     littables: castingComponents[l.entity as unknown as string].littables,
    //     lits: [
    //       ...castingComponents[l.entity as unknown as string].lits,
    //       l
    //     ]
    //   }
    // });

    // Object.values(castingComponents).forEach((cc) => {
    //   cc.littables.forEach((l) => {
    //     l.albedo = Math.random();
    //   })
    //   // console.log("ic", ic);

    // });

  }
}