import { System } from "../engine/System";
import { ComponentStore, IComponentsStores, IEntitiesStore, IStores } from "../engine/types";
import { PhysicsActorComponent, PhysicsActorStore } from "./Components/actor";

import { LitableComponent, LittableStore } from "./Components/casting/in";
import { LitComponent, LitStore } from "./Components/casting/out";
import { Phase0, Phase0Store } from "./Components/phase0";
import { Phase1Store } from "./Components/phase1";
import {
  
} from "./Components/physics";
import { PhysicsSetPieceComponent, PhysicsSetPieceStore } from "./Components/setPiece";
import { Tile } from "./Entities/setpieces";

export type ISpaceTrashSystems = `physical` | "casting"; //| `physical` | `casting`; // | `upgradeable` | `power` | `atmosphere` | `fluids` | `doors` | `hack`;
export const MapSize = 64;
export const NumberOfActors = 24;
export const BotSlots = 9;
export const TileSize = 8;
export const ActorSize = TileSize / 3;

// const entities: Record<
//   string,
//   {
//     type: "set" | "actor";
//     x: number;
//     y: number;
//     r: any;
//     radiance: number;
//     luminance: number;
//   }
// > = {};

// const littables: Record<string, string> = {};

const distanceBetweenActors = (
  a: PhysicsActorComponent,
  b: PhysicsActorComponent
) => {
  const toReturn = Math.hypot(b.x - a.x, b.y - a.y);

  return toReturn;
};

const actorsCollide = (a: PhysicsActorComponent, b: PhysicsActorComponent) =>
  distanceBetweenActors(a, b) < Math.sqrt(ActorSize / 2);

let firstTick = true;
// let working: boolean;
class MainSystem extends System {
  mapSize: number;
  working: boolean;

  constructor(mapSize: number) {
    super();
    this.mapSize = mapSize;
  }

  tick(delta, store: ComponentStore[], entities: IEntitiesStore): Promise<boolean> {
    // console.log("tick", entities[0], entities[1], entities[2])

    return new Promise((res, rej) => {
      const phaseZero = (store['Phase0'] as Phase0Store).store;
      const phaseOne = (store['Phase1'] as Phase1Store).store;

      const actorsStore = store['PhysicsActorComponent'] as PhysicsActorStore;
      const setPieces = store['PhysicsSetPieceComponent'] as PhysicsSetPieceStore;
      const lightableEntitiesStore = store['LitableComponent'] as LittableStore;
  
      if (firstTick) {
        firstTick = false;

        for (let y = 0; y < MapSize; y++) {
          phaseZero[y] = [];
          for (let x = 0; x < MapSize; x++) {
            phaseZero[y][x] = new Phase0();
          }
        }
  
        setPieces.store.forEach(([i, s], ndx) => {
          phaseZero[s.y][s.x].setId = ndx;
          phaseZero[s.y][s.x].tileType = s.tileType;
          phaseZero[s.y][s.x].littableId = lightableEntitiesStore.store.findIndex(
            ([eid, b]: [string, LitableComponent]) => eid == i
          );
        });

        for (let y = 0; y < actorsStore.store.length; y++) {
          phaseOne[y] = [actorsStore.store[y][0], actorsStore.store[y][1].x, actorsStore.store[y][1].y];
        }

        
      } else  {

  
        // clear the light sources
        lightableEntitiesStore.store.forEach(([lid, l]) => {
          l.luminance = 0;
        });
        for (let y = 0; y < MapSize; y++) {
          // phaseZero[y] = [];
          for (let x = 0; x < MapSize; x++) {
            phaseZero[y][x].luminance = 0;
          }
        }
  
        // map the entity id to the [lightId, actorId]
        // const entity2LightAndActor: Record<
        //   string,
        //   { lightingNdx: number; actorNdx: number }
        // > = {};
  
        const lightingEntitiesStore = store[LitComponent.name] as LitStore;
        
  
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
          // const litableComponent = lightableEntitiesStore[eid];
  
          const space = phaseZero[y][x];
          const lightableIdOfSpace = space.littableId;
          const litable = lightableEntitiesStore.store[lightableIdOfSpace]; //(lightableEntitiesStore.find((a) => a[0] === lightableIdOfSpace) as [string, LitableComponent]);
  
          if (!litable) {
            console.error("litable not found");
            return;
          }
          const [eid3, litableComponent] = litable;
          litableComponent.luminance = 2;
          phaseZero[y][x].luminance = 2;
        };
  
        lightingEntitiesStore.store.forEach(([eid, lightingComponent], ndx) => {
          const [eid2, actor] = actorsStore.store.find((a) => a[0] === eid) as PhysicsActorComponent;
  
          if (lightingComponent.radiance) {
            // if (!phaseZero[Math.round(actor.y)]) {
            //   phaseZero[Math.round(actor.y)] = [];
            // }
            // find the floor underneath and any entities on top
            let x = Math.round(actor.x);
            let y = Math.round(actor.y);
            if (x >= MapSize) x = 0;
            if (y >= MapSize) y = 0;

            if ( phaseZero[y][x]) {
              // illuminate the space upon which we stand
              illuminate(actor.x, actor.y);
  
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
              for (let k = 0; k < 150; k++) {
                // make a step, add 'direction' vector (di, dj) to current position (i, j)
                i += di;
                j += dj;
                ++segment_passed;
                const x = Math.round(i + actor.x) - 1;
                const y = Math.round(j + actor.y) - 1;
                // if (x > this.mapSize) break;
                // if (x < 0) break;
                // if (y > this.mapSize) break;
                // if (y < 0) break;
                // console.log("ensetpiecetity", setpiece(i + e.x, j + e.y))
                // const eId = littableActorsUpon(x, y)?.entity;
                // const entity = entities[eId];
                // if (entity) {
                //   // console.log("entity", entity)
                //   if (entity.tileType !== "FloorTile") {
                //     onTarget = true;
                //     // console.log("collide!", x, y, entity)
                //   } else {
                //     onTarget = false;
                //   }
                // } else {
                //   // console.log("idk", eId, x, y)
                // }
                illuminate(i + actor.x, j + actor.y);
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
            }
          }
        });
  
        actorsStore.store.forEach(([i, a], n) => {
          // x and y are the "look ahead" pointer
          let x = Math.round(a.x + a.dx);
          if (x >= this.mapSize - 1) x = 0;
          if (x < 0) x = this.mapSize - 1;
  
          let y = Math.round(a.y + a.dy);
          if (y >= this.mapSize - 1) y = 0;
          if (y < 0) y = this.mapSize - 1;
  
          // <this.mapSize ? Math.round(a.x + a.dx) : 0;
          // const y = Math.round(a.y + a.dy) < this.mapSize ? Math.round(a.y + a.dy) : 0;
  
          const spaceToCheck = phaseZero[y][x];
          // console.log("spaceToCheck", spaceToCheck);
          // const setPiece = setPieces[spaceToCheck.setId]
          // console.log("setPiece", setPiece);
  
          // collision check with set-pieces
  
          if (!spaceToCheck) debugger;
  
          if (spaceToCheck.setId === -1) {
            console.error(
              "Spaces should not be empty! X and Y",
              x,
              y,
              " were NOT found"
            );
            console.error(phaseZero);
            debugger
          }
          const tileType = (setPieces.store[spaceToCheck.setId][1] as PhysicsSetPieceComponent).tileType;
  
          if (tileType !== "FloorTile") {
            const magX = Math.abs(a.dx);
            const magY = Math.abs(a.dy);
  
            if (x < Math.round(a.x)) {
              if (y < Math.round(a.y)) {
                // NorthWest
                if (magX < magY) {
                  a.dy = a.dy * -1;
                } else {
                  a.dx = a.dx * -1;
                }
              } else if (y > Math.round(a.y)) {
                // SouthWest
                if (magX > magY) {
                  a.dx = a.dx * -1;
                } else {
                  a.dy = a.dy * -1;
                }
              } else {
                // West
                a.dx = a.dx * -1;
              }
            } else if (x > Math.round(a.x)) {
              if (y < Math.round(a.y)) {
                // NorthEast
                if (magX > magY) {
                  a.dx = a.dx * -1;
                } else {
                  a.dy = a.dy * -1;
                }
              } else if (y > Math.round(a.y)) {
                // SouthEast
  
                if (magX > magY) {
                  a.dy = a.dy * -1;
                } else {
                  a.dx = a.dx * -1;
                }
              } else {
                // East
                a.dx = a.dx * -1;
              }
            } else {
              if (y < Math.round(a.y)) {
                // North
                a.dy = a.dy * -1;
              } else {
                // South
                a.dy = a.dy * -1;
              }
            }
          } else {
            // no-opt
          }
  
          // collision check with other actors
          actorsStore.store.forEach(([i2, a2], n2) => {
            // don't check against self
            if (n !== n2) {
              if (actorsCollide(a, a2)) {
                a.x = a.x - a.dx;
                a.y = a.y - a.dy;
                a2.x = a2.x - a2.dx;
                a2.y = a2.y - a2.dy;
  
                const tempVx = a.dx;
                const tempVy = a.dy;
                a.dx = a2.dx;
                a.dy = a2.dy;
                a2.dx = tempVx;
                a2.dy = tempVy;
              }
            }
          });
  
          // boundary check against level map
          const low = 0;
          const high = this.mapSize - 1;
          if (a.x < low) {
            a.x = high;
          }
          if (a.x > high) {
            a.x = low;
          }
          if (a.y < low) {
            a.y = high;
          }
          if (a.y > high) {
            a.y = low;
          }
  
          // update the position
          a.x = a.x + a.dx;
          a.y = a.y + a.dy;
  
          // friction
          a.dx = a.dx * 0.999;
          a.dy = a.dy * 0.999;

          phaseOne[n] = [i, actorsStore.store[n][1].x, actorsStore.store[n][1].y];

        });


      } 

      res(true);
    });

    
  }
}

export const SpaceTrashMainSystem = new MainSystem(MapSize);
