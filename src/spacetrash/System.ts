// 
// import Component from "../../engine/Component";
// import { System } from "../../engine/System";
// import { make } from "../../engine/lib";
// import { PhysicsSetComponent, PhysicsActorComponent } from "../Components/physics";

// import { Component } from "react";
import Component from "../engine/Component";
import { System } from "../engine/System";
import { make } from "../engine/lib";
import { LitableComponent } from "./Components/casting/in";
import { LitComponent } from "./Components/casting/out";
import { PhysicsSetComponent, PhysicsActorComponent } from "./Components/physics";

// import { FOV } from "./fov";
// import { GUIable } from "./guiable";
// import { Physical } from "./physical";

export type ISpaceTrashSystems = `physical` | 'casting';  //| `physical` | `casting`; // | `upgradeable` | `power` | `atmosphere` | `fluids` | `doors` | `hack`;
export const MapSize = 32;
export const TileSize = 10;

type IDirections =
  `north` | `west` | `east` | `south` |
  `northeast` | `northwest` | `southeast` | `southwest` |
  `northbynorthwest` | `westbynorthwest` |
  `eastbynortheast` | `northbynortheast` |
  `southbysouthwest` | `westbysouthwest` |
  `eastbysoutheast` | `soutbysoutheast`;

const getDirection = (x: number, y: number): IDirections => {
  if(x === 0){
    if (y > 0) {
      return `north`
    }
    if (y < 0) {
      return `south`
    }
    else {
      throw ('invalid coords')
    }
  }

  if(y === 0){
    if (x > 0) {
      return `east`
    }
    if (x < 0) {
      return `west`
    }
    else {
      throw ('invalid coords')
    }
  }

  if (x > 0) {
    if (y > 0) {
      if (x === y) {
        return "northeast"
      }
    }
  }

  if (x < 0) {
    if (y > 0) {
      if (x === y) {
        return "northwest"
      }
    }
  }

  if (x > 0) {
    if (y < 0) {
      if (x === y) {
        return "southeast"
      }
    }
  }

  if (x < 0) {
    if (y < 0) {
      if (x === y) {
        return "southwest"
      }
    }
  }

  // return`north`
  throw 'idk'
}

const entities: Record<string, {
  type: 'set' | 'actor'
  x: number,
  y: number,
  r: any;
  radiance: number;
  luminance: number;
}> = {};

// 2x2 of [setPiece, actors[]]
const spaces: [string, string[]][][] = [[]];

const littables: Record<string, string> = {};

class MainSystem extends System<ISpaceTrashSystems> {
  mapSize: number;
  constructor(mapSize: number) {
    super()
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

    const setpiece = (x: number, y: number): LitableComponent | null => {
      if (!spaces[Math.round(y)]) {
        return null;
      }
      if (x < 0) {
        return null
      }
      if (x > 31) {
        return null;
      }
      if (y < 0) {
        return null
      }
      if (y > 31) {
        return null;
      }
      const [setpiece, actors2] = spaces[Math.round(y)][Math.round(x)];

      // (components[littables[((components[setpiece] as any).entity)]] as LitableComponent).luminance = 2;
      return components[littables[((components[setpiece] as any).entity)]] as LitableComponent;
    }

    const illuminate = (x: number, y: number) => {
      if (!spaces[Math.round(y)]) {
        return null;
      }
      if (x < 0) {
        return null
      }
      if (x > 31) {
        return null;
      }
      if (y < 0) {
        return null
      }
      if (y > 31) {
        return null;
      }
      const [setpiece, actors2] = spaces[Math.round(y)][Math.round(x)];

      (components[littables[((components[setpiece] as any).entity)]] as LitableComponent).luminance = 2;
    }

    Object.keys(components).forEach((cKey) => {
      const c = components[cKey];


      const lit = make<LitComponent>(c, "LitComponent") as any;
      if (lit) {
        entities[lit.entity] = {
          ...entities[lit.entity],
          ...lit,
        }
        return;
      }

      const littable = make<LitableComponent>(c, "LitableComponent") as any;
      if (littable) {

        littable.luminance = -1;

        littables[littable.entity] = cKey;

        entities[littable.entity] = {

          ...entities[littable.entity],
          ...littable,
        }
        return
      }

      const s = make<PhysicsSetComponent>(c, "PhysicsSetComponent") as any;

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
        return;
      }

      const a = make<PhysicsActorComponent>(c, "PhysicsActorComponent") as any;
      if (a) {
        entities[a.entity] = {
          ...entities[a.entity],
          ...a,
        }

        a.x = a.x + a.dx;
        a.y = a.y + a.dy;

        if (a.x < 0) {
          a.x = this.mapSize + a.dx * 2;
        }
        if (a.x > this.mapSize) {
          a.x = a.dx * 2;
        }
        if (a.y < 0) {
          a.y = this.mapSize + a.dy * 2;
        }
        if (a.y > this.mapSize) {
          a.y = a.dy * 2;
        }
        return
      }

    })

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

          // const [setpiece, actors] = spaces[Math.round(e.y)][Math.round(e.x)];
          // (components[littables[((components[setpiece] as any).entity)]] as LitableComponent).luminance = 2;

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
          for (let k = 0; k < 300; k++) {
            // make a step, add 'direction' vector (di, dj) to current position (i, j)
            i += di;
            j += dj;
            ++segment_passed;
            // console.log(i + " " + j);

            if (setpiece(i + e.x, j + e.y)) {
              onTarget = true

              // const expr = 'Papayas';
              // switch (getDirection(i, j)) {
              //   case 'Oranges':
              //     console.log('Oranges are $0.59 a pound.');
              //     break;
              //   case 'Mangoes':
              //   case 'Papayas':
              //     console.log('Mangoes and papayas are $2.79 a pound.');
              //     // Expected output: "Mangoes and papayas are $2.79 a pound."
              //     break;
              //   default:
              //     console.log(`Sorry, we are out of ${expr}.`);
              // }

            } else {
              onTarget = false;
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

    })
    // debugger
    return components;
  }

}

export const SpaceTrashMainSystem = new MainSystem(MapSize);