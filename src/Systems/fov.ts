

import { LitComponent, OutCastingComponent } from "../Components/casting/out";
import { PhysicsActorComponent, PhysicsComponent, PhysicsSetComponent } from "../Components/physics";
import { LitableComponent } from "../Components/casting/in";
import { SpaceTrashEntityComponent } from "../EntityComponent";

import { ISpaceTrashSystems } from ".";
import { System } from "../engine/System";
import { SpaceTrashComponent } from "../Components";

export class FOV extends System<ISpaceTrashSystems> {
  constructor() {
    super()
  }

  doPreLogic(components: SpaceTrashComponent[]): void {
    

  }

  doPostLogic(components: SpaceTrashComponent[]) {
    const castingComponents: Record<string, {
      physicsComponent: PhysicsComponent,
      lits: LitComponent[],
      littables: LitableComponent[]
    }> = {}
    const physicsSetComponents = components.filter((c) => c.constructor.name === "PhysicsSetComponent") as PhysicsSetComponent[];
    const physicsActorComponents = components.filter((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent[];
    const litables = components.filter((c) => c.constructor.name === "LitableComponent") as LitableComponent[];
    const lits = components.filter((c) => c.constructor.name === "LitComponent") as LitComponent[];

    litables.forEach(litable => { 
      litable.albedo = 0;
    })

    litables.forEach(litable => {
      physicsSetComponents.forEach(setPiece => {
        if ((litable.entity as unknown as string) === (setPiece.entity as unknown as string)) {
          
          lits.forEach(lit => {
            physicsActorComponents.forEach(actor => { 
              if ((lit.entity as unknown as string) === (actor.entity as unknown as string)) { 


                if ((Math.round(actor.x) === setPiece.x) && (Math.round(actor.y) === setPiece.y)) { 
                  litable.albedo = 2;
                }

              }
            });

          })
        }
      })
    })

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