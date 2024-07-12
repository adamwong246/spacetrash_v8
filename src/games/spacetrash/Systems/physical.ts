import { IMoves, System } from "../../../engine/System";

import { ISpaceTrashSystems } from ".";
import { EntityComponent } from "../../../engine/ECS";
import { PhysicsActorComponent } from "../Components/physics";

export class Physical extends System<ISpaceTrashSystems> {
  constructor() {
    super()
  }
  doPreLogic(entitiesComponents: EntityComponent[]): void {
    entitiesComponents.forEach((ec) => {
      const d = ec.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
      d.x = d.x + d.dx;
      d.y = d.y + d.dy;
    })
  }

  doPostLogic(entitiesComponents: EntityComponent[]) {
    entitiesComponents.forEach((ec) => {
      const d = ec.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;

      for (let y = 0; y < entitiesComponents.length-1; y++) {
        // console.log("y", y);
        for (let x = 1; x < y + 2; x++) {
          // console.log("y", "x", y, x);

          // const andx = ((y / entitiesComponents.length) + x) - 1;
          // const bndx = ((x / entitiesComponents.length) + y) - 1;
          // console.log("andx", "bndx", andx, bndx);

          const a = entitiesComponents[y];
          const b = entitiesComponents[x];
          const ad = a.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
          const bd = b.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
          const d = (Math.pow(ad.x - bd.x, 2) + Math.pow(ad.y - bd.y, 2));

          // console.log("a", a);

          if (d < 1 && d !== 0) {
            // console.log("collide", d)
            
            
            ad.x = ad.x - ad.dx*3;
            ad.y = ad.y - ad.dy*3;

            bd.x = bd.x - bd.dx*3;
            bd.y = bd.y - bd.dy*3;

            const ddx = (ad.dx + bd.dx)/2;
            const ddy = (ad.dy + bd.dy)/2;
                        
            ad.dx = ddx;
            ad.dy = ddy;

            bd.dx = ddx;
            bd.dy = ddy;
            // debugger
          }
        }
      }
      

      if (d.x < 0) {
        d.x = 40 + d.dx * 2;
        // debugger
        // d.dx = d.dx * -1
      }
      if (d.x > 40) {
        d.x = d.dx*2;
        // d.dx = d.dx * -1
      }
      if (d.y < 0) {
        d.y = 30 + d.dy*2;
        // d.dy = d.dy * -1
      }
      if (d.y > 30) {
        d.y = d.dy*2;
        // d.dy = d.dy * -1
      }
    })
  }
}