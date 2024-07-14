import { System } from "../../../engine/System";

import { PhysicsActorComponent, PhysicsSetComponent } from "../Components/physics";
import { SpaceTrashEntityComponent } from "../EntityComponent";

import { ISpaceTrashSystems, TileSize } from ".";

export class Physical extends System<ISpaceTrashSystems> {
  mapSize: number;
  constructor(mapSize: number) {
    super()
    this.mapSize = mapSize;
  }
  doPreLogic(entitiesComponents: SpaceTrashEntityComponent[]): void {
    entitiesComponents.forEach((ec) => {
      const d = ec.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;
      if (d) {
        d.x = d.x + d.dx;
        d.y = d.y + d.dy;
      }
    })
  }

  doPostLogic(entitiesComponents: SpaceTrashEntityComponent[]) {
    const setPieces = entitiesComponents.filter((ec) => {
      return ec.components.find((c) => c.constructor.name === "PhysicsSetComponent")
    });

    const actors = entitiesComponents.filter((ec) => {
      return ec.components.find((c) => c.constructor.name === "PhysicsActorComponent")
    });

    actors.forEach((actorEc) => {
      if (actorEc) {

        const c = actorEc.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;

        setPieces.filter((ec) => {
          return ec.components.find((c) => c.constructor.name === "PhysicsSetComponent" && (c as PhysicsSetComponent).solid)
        }).forEach((solidSetPiece) => {

          const sc = solidSetPiece.components.find((c) => c.constructor.name === "PhysicsSetComponent") as PhysicsSetComponent

          const halftile = TileSize / 2;
          if (
            Math.round(c.x) === sc.x && Math.round(c.y) === sc.y
          ) {

            c.x = c.x - 50*c.dx;
            c.y = c.y - 50*c.dy;            
            
            if (c.dx >= 0) {
              if (c.dy >= 0) {

                if (
                  sc.x === Math.round(c.x) && sc.y === Math.round(c.y)
                ) {
                  c.dx = c.dx * -1; 
                  c.dy = c.dy * -1; 
                } else if (
                  sc.x === Math.round(c.x) + 1 && sc.y === Math.round(c.y)
                ) {
                  c.dy = c.dy * -1; 
                }else if (
                  sc.x === Math.round(c.x) && sc.y === Math.round(c.y) + 1
                ) {
                  c.dx = c.dx * -1; 
                  
                }
                               
                console.log("mark1");
              } else {
                // c.dy = c.dy * -1;
                // console.log("mark2");
              } 
            } else {
              if (c.dy >= 0) {
                // c.dx = c.dx * -1;
                // console.log("mark3");
              } else {
                // c.dy = c.dy * -1;
                // console.log("mark4");
              }

              
            }
            

            // if (c.dx > 0) {
            //   if (Math.abs(c.dx) >= Math.abs(c.dy)) {
            //     c.dx = c.dx * -1
            //     c.x = c.x + c.dx
            //   } else {
            //     c.dy = c.dy * -1
            //     c.y = c.y + c.dy
            //   }
            // } else {
            //   if (Math.abs(c.dx) >= Math.abs(c.dy)) {
              
            //   } else {
                
            //   }
            // }
            // c.dx = 0;
            // c.dy = 0;
            // debugger
            // if (Math.abs(c.dx) >= Math.abs(c.dy)) {
            //   console.log("mark1")
            //   c.dx = c.dx * -1
            //   c.x = c.x + c.dx
            // } else {
            //   console.log("mark2")
            //   c.dy = c.dy * -1
            //   c.y = c.y + c.dy
            // }
          }
        });

        

      // if (c.x < 0) {
      //   c.x = this.mapSize + c.dx * 2;
      // }
      // if (c.x > this.mapSize) {
      //   c.x = c.dx*2;
      // }
      // if (c.y < 0) {
      //   c.y = this.mapSize + c.dy*2;
      // }
      // if (c.y > this.mapSize) {
      //   c.y = c.dy*2;
      // }        
    }
    });



    // entitiesComponents.forEach((ec) => {
    //   const d = ec.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;      

    //   entitiesComponents.forEach((ec) => {
    //   });

    //   if (d) {
    //     if (d.x < 0) {
    //       d.x = 40 + d.dx * 2;
    //       // debugger
    //       // d.dx = d.dx * -1
    //     }
    //     if (d.x > 40) {
    //       d.x = d.dx*2;
    //       // d.dx = d.dx * -1
    //     }
    //     if (d.y < 0) {
    //       d.y = 30 + d.dy*2;
    //       // d.dy = d.dy * -1
    //     }
    //     if (d.y > 30) {
    //       d.y = d.dy*2;
    //       // d.dy = d.dy * -1
    //     }        
    //   }

    // })
  }
}

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