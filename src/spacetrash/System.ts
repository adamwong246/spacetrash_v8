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
// export const SpaceTrashSystems = {
//   // gui: new GUIable(),
//   physical: new Physical(MapSize),
//   casting: new FOV(),
// };

// const entities: Record<string, {
//   type: 'set' | 'actor'
//   x: number,
//   y: number,
//   luminance: number;
//   r: any;
// }> = {};

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
          
          const [setpiece, actors] = spaces[Math.round(e.y)][Math.round(e.x)];

          const e2 = (components[setpiece] as any).entity;
          const e3 = littables[e2];

          (components[e3] as LitableComponent).luminance = 2;
          
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