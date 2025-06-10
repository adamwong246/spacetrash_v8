import Component from "../engine/Component";
import { System } from "../engine/System";
import { make } from "../engine/lib";

import { LitableComponent } from "./Components/casting/in";
import { LitComponent } from "./Components/casting/out";
import {
  PhysicsSetComponent,
  PhysicsActorComponent,
} from "./Components/physics";

export type ISpaceTrashSystems = `physical` | "casting"; //| `physical` | `casting`; // | `upgradeable` | `power` | `atmosphere` | `fluids` | `doors` | `hack`;
export const MapSize = 32;
export const TileSize = 10;

type IDirections =
  | `north`
  | `west`
  | `east`
  | `south`
  | `northeast`
  | `northwest`
  | `southeast`
  | `southwest`
  | `northbynorthwest`
  | `westbynorthwest`
  | `eastbynortheast`
  | `northbynortheast`
  | `southbysouthwest`
  | `westbysouthwest`
  | `eastbysoutheast`
  | `soutbysoutheast`;

const getDirection = (x: number, y: number): IDirections => {
  if (x === 0) {
    if (y > 0) {
      return `north`;
    }
    if (y < 0) {
      return `south`;
    } else {
      throw "invalid coords";
    }
  }

  if (y === 0) {
    if (x > 0) {
      return `east`;
    }
    if (x < 0) {
      return `west`;
    } else {
      throw "invalid coords";
    }
  }

  if (x > 0) {
    if (y > 0) {
      if (x === y) {
        return "northeast";
      }
    }
  }

  if (x < 0) {
    if (y > 0) {
      if (x === y) {
        return "northwest";
      }
    }
  }

  if (x > 0) {
    if (y < 0) {
      if (x === y) {
        return "southeast";
      }
    }
  }

  if (x < 0) {
    if (y < 0) {
      if (x === y) {
        return "southwest";
      }
    }
  }

  // return`north`
  throw "idk";
};

const entities: Record<
  string,
  {
    type: "set" | "actor";
    x: number;
    y: number;
    r: any;
    radiance: number;
    luminance: number;
  }
> = {};

// 2x2 of [setPiece, actors[]]
const spaces: [string, string[]][][] = [[]];

const littables: Record<string, string> = {};

class MainSystem extends System<ISpaceTrashSystems> {
  mapSize: number;
  constructor(mapSize: number) {
    super();
    this.mapSize = mapSize;
  }

  // getFov(literId: string): string[] {

  //   const e = entities[literId];

  //   if (!spaces[e.y]) {
  //     spaces[e.y] = [];
  //   }
  //   // if (!spaces[e.y][e.x]) {
  //   //   spaces[e.y][e.x] = [];
  //   // }

  //   // debugger
  //   return [
  //     spaces[e.y][e.x] && spaces[e.y][e.x][0],
  //     // ...Object.keys(entities).filter((s) => {
  //     //   const z = entities[s];
  //     //   return Math.round(z.x) === Math.round(e.x) && Math.round(z.y) === Math.round(e.y);
  //     // })
  //   ];
  // }

  tick(delta, components: Record<string, Component<any, any>>) {
    const setpiece = (
      xFloat: number,
      yFloat: number
    ): LitableComponent | null => {
      const x = Math.round(xFloat);
      const y = Math.round(yFloat);
      const mSize = this.mapSize * 10;

      const lowX = 0;
      const highX = this.mapSize - 1;
      const lowY = 0;
      const highY = this.mapSize - 1;

      if (x < lowX) {
        return null;
      }
      if (x > highX) {
        return null;
      }
      if (y < lowY) {
        return null;
      }
      if (y > highY) {
        return null;
      }
      // console.log("setpiece!", x, y)

      let setpiece, actors2;

      try {
        [setpiece, actors2] = spaces[y][x];
      } catch (e) {
        debugger;
      }

      // (components[littables[((components[setpiece] as any).entity)]] as LitableComponent).luminance = 2;
      return components[
        littables[(components[setpiece] as any).entity]
      ] as LitableComponent;
    };

    const illuminate = (xFloat: number, yFloat: number): any => {
      const x = Math.round(xFloat);
      const y = Math.round(yFloat);
      const mSize = this.mapSize;

      // console.log("illuminate", x, y, mSize);

      // if (!spaces[Math.round(y)]) {
      //   return null;
      // }
      if (x < 0) {
        return null;
      }
      if (x > mSize - 1) {
        return null;
      }
      if (y < 0) {
        return null;
      }
      if (y > mSize - 1) {
        return null;
      }
      const [setpiece, actors2] = spaces[y][x];

      (
        components[
          littables[(components[setpiece] as any).entity]
        ] as LitableComponent
      ).luminance = 2;
    };

    Object.keys(components).forEach((cKey) => {
      const c = components[cKey];

      const lit = make<LitComponent>(c, "LitComponent") as any;
      if (lit) {
        entities[lit.entity] = {
          ...entities[lit.entity],
          ...lit,
        };
        return;
      }

      const littable = make<LitableComponent>(c, "LitableComponent") as any;
      if (littable) {
        littable.luminance = -1;

        littables[littable.entity] = cKey;

        entities[littable.entity] = {
          ...entities[littable.entity],
          ...littable,
        };
        return;
      }

      const s = make<PhysicsSetComponent>(c, "PhysicsSetComponent") as any;

      if (s) {
        entities[s.entity] = {
          ...entities[s.entity],
          ...s,
        };
        if (!spaces[s.y]) {
          spaces[s.y] = [];
        }
        if (!spaces[s.y][s.x]) {
          spaces[s.y][s.x] = ["", []];
        }
        spaces[s.y][s.x][0] = cKey;
        return;
      }

      const a = make<PhysicsActorComponent>(c, "PhysicsActorComponent") as any;

    });

    /////////////////////////////////////////////////////////////////////////////////

    Object.keys(components).forEach((cKey) => {
      const c = components[cKey];

      const a = make<PhysicsActorComponent>(c, "PhysicsActorComponent") as any;

      if (a) {
        // console.log(a.entity, a)
        entities[a.entity] = {
          ...entities[a.entity],
          ...a,
        };

        // const lowX = 0;
        // const highX = this.mapSize - 1;
        // const lowY = 0;
        // const highY = this.mapSize - 1;

        // // boundary check against level map
        // if (a.x < lowX) {
        //   a.x = highX;
        // }
        // if (a.x > highX) {
        //   a.x = lowX;
        // }
        // if (a.y < lowY) {
        //   a.y = highY;
        // }
        // if (a.y > highY) {
        //   a.y = lowY;
        // }

        let x = Math.round(a.x + a.dx);
        let y = Math.round(a.y + a.dy);
        const magX = Math.abs(a.dx);
        const magY = Math.abs(a.dy);

        if (x > this.mapSize-1) {
          x = 0;
        }
        if (y > this.mapSize-1) {
          y = 0;
        }
        if (x < 0) {
          x = this.mapSize-1;
        }
        if (y < 0) {
          y = this.mapSize-1;
        }
        const spaceToCheck = spaces[y][x][0];


        
        // console.log(Math.round(a.x), Math.round(a.y),a.x, a.y, a.dx, a.dy);
        // console.log(x, y);

        if (components[spaceToCheck].tileType !== "FloorTile") {
          // console.log("collide y, x", y, x, magX, magY, a.x, a.y);
          // debugger
          

          // if (magX > magY) {
          //   a.x = a.x - 1.1 * a.dx;
          //   a.dx = a.dx * -1;

          // } else if (magX < magY) {
          //   a.y = a.y - 1.1 * a.dy;
          //   a.dy = a.dy * -1;

          // } else {
          //   a.y = a.y - 10 * a.dy;
          //   a.x = a.x - 10 * a.dx;
          //   a.dx = a.dx * -1;
          //   a.dx = a.dx * -1;
          // }

          // let directionToCheck: "N" | "S" | "E" | "W" | "NW" | "NE" | "SE" | "SW"
          if (x < Math.round(a.x)) {
            if (y < Math.round(a.y)) {
              console.log("Nw")
              // NorthWest

              if (magX < magY) {
                a.dy = a.dy * -1;
              } else {
                a.dx = a.dx * -1;
              }
            } else if (y > Math.round(a.y)) {
              // a.dy = a.dy * -1;
              // SouthWest
              console.log("Sw")
              // debugger
              if (magX > magY) {
                a.dx = a.dx * -1;
              } else {
                a.dy = a.dy * -1;
                
              }

              // debugger
              // if (magX > magY) {
              //   a.x = a.x - a.dx;
              //   a.dx = a.dx * -1;
              // } else {
              //   a.y = a.y - a.dy;
              //   a.dy = a.dy * -1;
              // }
            } else {
              //West
              console.log("w")
              // debugger
              a.dx = a.dx * -1;
            }
          } else if (x > Math.round(a.x)) {
            if (y < Math.round(a.y)) {
              console.log("Ne")
              // debugger
              // NorthEast
              
              if (magX > magY) {
                a.dx = a.dx * -1;
              } else {
                a.dy = a.dy * -1;        
              }

              // if (magX > magY) {
              //   a.x = a.x - a.dx;
              //   a.dx = a.dx * -1;
              // } else {
              //   a.y = a.y - a.dy;
              //   a.dy = a.dy * -1;
              // }
            } else if (y > Math.round(a.y)) {
              // SouthEast
              console.log("Se")
              // debugger
              if (magX > magY) {
                a.dy = a.dy * -1;

              } else {
                a.dx = a.dx * -1;
              }

              // if (magX > magY) {
              //   a.x = a.x - a.dx;
              //   a.dx = a.dx * -1;
              // } else {
              //   a.y = a.y - a.dy;
              //   a.dy = a.dy * -1;
              // }
            } else {
              
              // East
              console.log("e")
              // debugger
              a.dx = a.dx * -1;
            }
          } else {
            if (y < Math.round(a.y)) {
              // North
              console.log("N")
              a.dy = a.dy * -1;
              // if (magX > magY) {
              //   a.dx = a.dx * -1;
              // } else {
              //   a.dy = a.dy * -1;
              // }
            } else {
              // South
              console.log("S")
              a.dy = a.dy * -1;
              // if (magX > magY) {
              //   a.dx = a.dx * -1;
              // } else {
              //   a.dy = a.dy * -1;
              // }
            }
          }

          // if (Math.abs(a.dx) > Math.abs(a.dy)) {
          //   console.log("X");
          //   // debugger;
          //   // a.x = a.x - 2 * a.dx;
          //   // a.y = a.y - 2 * a.dy;

          //   a.dx = a.dx * -1;
          //   // update the position
          //   a.x = a.x + a.dx;
          //   a.y = a.y + a.dy;
          // } else if (Math.abs(a.dx) < Math.abs(a.dy)) {
          //   console.log("Y");
          //   // debugger;
          //   // a.x = a.x - 2 * a.dx;
          //   // a.y = a.y - 2 * a.dy;
          //   a.dy = a.dy * -1;
          //   // update the position
          //   a.x = a.x + a.dx;
          //   a.y = a.y + a.dy;
          // } else {
          //   debugger;
          //   a.x = a.x - 1 * a.dx;
          //   a.y = a.y - 1 * a.dy;
          //   a.dx = a.dx * -1;
          //   a.dy = a.dy * -1;
          // }
        } else {
          // // update the position
          // a.x = a.x + a.dx;
          // a.y = a.y + a.dy;
        }
        // update the position
        a.x = a.x + a.dx;
        a.y = a.y + a.dy;

        return;
      }
    });
    //////////////////////////////////////////////////

    // Object.keys(littables).forEach((eId) => {
    //   (components[l] as LitableComponent).luminance = 0;
    // })

    Object.keys(entities).forEach((eKey) => {
      const e = entities[eKey];

      // if the entity is shining
      if (e.radiance) {
        if (!spaces[Math.round(e.y)]) {
          spaces[Math.round(e.y)] = [];
        }

        // find the floor underneath and any entities on top
        if (spaces[Math.round(e.y)][Math.round(e.x)]) {

          // illuminate the space upon which we stand
          illuminate(e.x, e.y);

          // (di, dj) is a vector - direction in which we move right now
          let di = 1;
          let dj = 0;
          // length of current segment
          let segment_length = 1;
          // current position (i, j) and how much of current segment we passed
          let i = 0;
          let j = 0;
          let segment_passed = 0;

          let onTarget = false;

          // for (int k = 0; k < NUMBER_OF_POINTS; ++k) {
          for (let k = 0; k < 50; k++) {
            // make a step, add 'direction' vector (di, dj) to current position (i, j)
            i += di;
            j += dj;
            ++segment_passed;

            const x = Math.round(i + e.x)-1;
            const y = Math.round(j + e.y )-1;

            // if (x > this.mapSize) break;
            // if (x < 0) break;
            // if (y > this.mapSize) break;
            // if (y < 0) break;

            // console.log("ensetpiecetity", setpiece(i + e.x, j + e.y))
            const eId = setpiece(x, y)?.entity;
            const entity = entities[eId];

            if (entity) {
              // console.log("entity", entity)
              if (entity.tileType !== "FloorTile") {
                onTarget = true
                // console.log("collide!", x, y, entity)

              } else {

                onTarget = false;
              }
            } else {
              // console.log("idk", eId, x, y)
            }

            illuminate(i + e.x, j + e.y);

            if (segment_passed == segment_length) {
              // done with current segment
              segment_passed = 0;

              // 'rotate' directions
              let buffer = di;
              di = -dj;
              dj = buffer;

              // increase segment length if necessary
              if (dj == 0) {
                ++segment_length;
              }
            }
          }

          // let stop = false;
          // while (!stop) {

          // }

          // illuminate(e.x, e.y + 1);
          // illuminate(e.x, e.y - 1);
          // illuminate(e.x + 1, e.y);
          // illuminate(e.x - 1, e.y);
          // illuminate(e.x + 1, e.y + 1);
          // illuminate(e.x + 1, e.y - 1);
          // illuminate(e.x - 1, e.y + 1);
          // illuminate(e.x - 1, e.y - 1);

          // const [setpiece2, actors2] = spaces[Math.round(e.y)-1][Math.round(e.x)-1];
          // (components[littables[((components[setpiece2] as any).entity)]] as LitableComponent).luminance = 2;

          // const setPieceEntity = setpiece.entity;
          // console.log([setpiece, ...actors])
          // for (const found of [setpiece, ...actors]) {
          //   debugger
          //   (components[found] as any).luminance = 2;
          // }
        }
      }
    });
    // debugger
    return components;
  }
}

export const SpaceTrashMainSystem = new MainSystem(MapSize);
