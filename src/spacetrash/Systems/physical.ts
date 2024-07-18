import { System } from "../../engine/System";
import Component from "../../engine/Component";

import { PhysicsActorComponent, PhysicsSetComponent } from "../Components/physics";
import { SpaceTrashComponent } from "../Components";

import { ISpaceTrashSystems, TileSize } from ".";

function make<T>(c: SpaceTrashComponent, arg1: string): T | null {
  if (c.constructor.name === arg1) {
    return c as T;
  }
  return null;
}

function makes<T>(cs: SpaceTrashComponent[], arg1: string): T[] {
  return cs.filter((c) => {
    return c.constructor.name === arg1
  }) as T[];
}

export class Physical extends System<ISpaceTrashSystems> {
  mapSize: number;
  constructor(mapSize: number) {
    super()
    this.mapSize = mapSize;
  }

  tick(delta, components: Record<string, Component<any, any>>) {
    Object.keys(components).forEach((cKey) => {
      const c = components[cKey];
      const d = make<PhysicsActorComponent>(c, "PhysicsActorComponent");
      if (d) {
        d.x = d.x + d.dx;
        d.y = d.y + d.dy;

        if (d.x < 0) {
          d.x = this.mapSize + d.dx * 2;
        }
        if (d.x > this.mapSize) {
          d.x = d.dx*2;
        }
        if (d.y < 0) {
          d.y = this.mapSize + d.dy*2;
        }
        if (d.y > this.mapSize) {
          d.y = d.dy*2;
        }

      }
    })

    return components;
  }
  
}

//   entitiesComponents.filter((ec) => {
    //   return ec.components.find((c) => c.constructor.name === "PhysicsSetComponent")
    // });


      // for (let y = 0; y < entitiesComponents.length-1; y++) {
      //   // console.log("y", y);
      //   for (let x = 1; x < y + 2; x++) {
      //     // console.log("y", "x", y, x);

      //     // const andx = ((y / entitiesComponents.length) + x) - 1;
      //     // const bndx = ((x / entitiesComponents.length) + y) - 1;
      //     // console.log("andx", "bndx", andx, bndx);

      //     // const a = entitiesComponents[y];
      //     // const b = entitiesComponents[x];
      //     // const ad = a.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
      //     // const bd = b.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
      //     // const d = (Math.pow(ad.x - bd.x, 2) + Math.pow(ad.y - bd.y, 2));

      //     // console.log("a", a);

      //     // if (d < 1 && d !== 0) {
      //     //   // console.log("collide", d)
            
            
      //     //   ad.x = ad.x - ad.dx*3;
      //     //   ad.y = ad.y - ad.dy*3;

      //     //   bd.x = bd.x - bd.dx*3;
      //     //   bd.y = bd.y - bd.dy*3;

      //     //   const ddx = (ad.dx + bd.dx)/2;
      //     //   const ddy = (ad.dy + bd.dy)/2;
                        
      //     //   ad.dx = ddx;
      //     //   ad.dy = ddy;

      //     //   bd.dx = ddx;
      //     //   bd.dy = ddy;
      //     //   // debugger
      //     // }
      //   }
// }
      
// doPostLogic(components: SpaceTrashComponent[]) {
//   // const setPieces = makes<PhysicsSetComponent>(components, "PhysicsSetComponent");
  

//   const actors = makes<PhysicsActorComponent>(components, "PhysicsActorComponent");

//   actors.forEach((c) => {
    
//   });
  
//   // const actors = entitiesComponents.filter((ec) => {
//   //   return ec.components.find((c) => c.constructor.name === "PhysicsActorComponent")
//   // });

//   // actors.forEach((actorEc) => {
//   //   if (actorEc) {

//   //     const c = actorEc.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;

//   //     setPieces.filter((ec) => {
//   //       return ec.components.find((c) => c.constructor.name === "PhysicsSetComponent" && (c as PhysicsSetComponent).solid)
//   //     }).forEach((solidSetPiece) => {

//   //       const sc = solidSetPiece.components.find((c) => c.constructor.name === "PhysicsSetComponent") as PhysicsSetComponent

//   //       const halftile = TileSize / 2;
//   //       // if (
//   //       //   Math.round(c.x) === sc.x && Math.round(c.y) === sc.y
//   //       // ) {

//   //       //   c.x = c.x - 50*c.dx;
//   //       //   c.y = c.y - 50*c.dy;            
          
//   //       //   if (c.dx >= 0) {
//   //       //     if (c.dy >= 0) {

//   //       //       if (
//   //       //         sc.x === Math.round(c.x) && sc.y === Math.round(c.y)
//   //       //       ) {
//   //       //         c.dx = c.dx * -1; 
//   //       //         c.dy = c.dy * -1; 
//   //       //       } else if (
//   //       //         sc.x === Math.round(c.x) + 1 && sc.y === Math.round(c.y)
//   //       //       ) {
//   //       //         c.dy = c.dy * -1; 
//   //       //       }else if (
//   //       //         sc.x === Math.round(c.x) && sc.y === Math.round(c.y) + 1
//   //       //       ) {
//   //       //         c.dx = c.dx * -1; 
                
//   //       //       }
                             
//   //       //       console.log("mark1");
//   //       //     } else {
//   //       //       // c.dy = c.dy * -1;
//   //       //       // console.log("mark2");
//   //       //     } 
//   //       //   } else {
//   //       //     if (c.dy >= 0) {
//   //       //       // c.dx = c.dx * -1;
//   //       //       // console.log("mark3");
//   //       //     } else {
//   //       //       // c.dy = c.dy * -1;
//   //       //       // console.log("mark4");
//   //       //     }

//   //       //   }
//   //       // }
//   //     });


                
      
//   // }
//   // });

// }