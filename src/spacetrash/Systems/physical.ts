import { System } from "../../engine/System";
import Component from "../../engine/Component";

import { IDirs, PhysicsActorComponent, PhysicsSetComponent } from "../Components/physics";
import { SpaceTrashComponent } from "../Components";

import { ISpaceTrashSystems, TileSize } from ".";
import { LitableComponent } from "../Components/casting/in";
import { LitComponent } from "../Components/casting/out";
import { make } from "../../engine/lib";

// const set: object[][] = [[]];

const entities: Record<string, {
  type: 'set' | 'actor'
  x: number,
  y: number,
  outcast: number,
  incast: number,
  solid: boolean;
  r: any;
}> = {};

// 2x2 of [setPiece, actors[]]
const spaces: [string, string[]][][] = [[]];

export class Physical extends System<ISpaceTrashSystems> {
  mapSize: number;
  constructor(mapSize: number) {
    super()
    this.mapSize = mapSize;
  }

  getFov(literId: string): string[] {
    
    const e = entities[literId];

    if (!spaces[e.y]) {
      spaces[e.y] = [];
    }
    // if (!spaces[e.y][e.x]) {
    //   spaces[e.y][e.x] = [];
    // }

    // debugger
    return [
      spaces[e.y][e.x] && spaces[e.y][e.x][0],
      // ...Object.keys(entities).filter((s) => {
      //   const z = entities[s];
      //   return Math.round(z.x) === Math.round(e.x) && Math.round(z.y) === Math.round(e.y);
      // })
    ];
  }

  tick(delta, components: Record<string, Component<any, any>>) {
    Object.keys(components).forEach((cKey) => {
      const c = components[cKey];

      const s = make<PhysicsSetComponent>(c, "PhysicsSetComponent") as any;
      // debugger
      if (s) { 
        entities[s.entity] = {
          ...entities[s.entity],
          ...s,
        }
        if (!spaces[s.y]) {
          spaces[s.y] = [];
        }
        if (!spaces[s.y][s.x]) {
          spaces[s.y][s.x] = ["", []];
        }
        spaces[s.y][s.x][0] = cKey;
        return false
      }

      const a = make<PhysicsActorComponent>(c, "PhysicsActorComponent") as any;
      if (a) {
        entities[a.entity] = {
          ...entities[a.entity],
          ...a,
        }

        // let actorFound = false;
        // spaces[Math.round(a.y)][Math.round(a.x)][1].forEach((actorOnTile) => {
        //   if (actorOnTile === a.entityUid) {
        //     actorFound = true;
        //   }
        // });
        // if (!actorFound) {
        //   spaces[Math.round(a.y)][Math.round(a.x)][1].push(a.entityUid)
        // }
        
        a.x = a.x + a.dx;
        a.y = a.y + a.dy;

        if (a.x < 0) {
          a.x = this.mapSize + a.dx * 2;
        }
        if (a.x > this.mapSize) {
          a.x = a.dx*2;
        }
        if (a.y < 0) {
          a.y = this.mapSize + a.dy*2;
        }
        if (a.y > this.mapSize) {
          a.y = a.dy*2;
        }
        return false
      }

      return true

    })

    // debugger
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