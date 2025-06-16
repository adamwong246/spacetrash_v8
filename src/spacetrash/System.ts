import { RGBA_ASTC_10x10_Format } from "three";
import { ECS } from "../engine/ECS";
import { System } from "../engine/System";
import { PhysicsActorComponent, PhysicsActorStore } from "./Components/actor";

import { LitableComponent, LittableStore } from "./Components/casting/in";
import { LitComponent, LitStore } from "./Components/casting/out";
import { Phase0, Phase0Store } from "./Components/phase0";
import { Phase1, Phase1Store } from "./Components/phase1";
import {} from "./Components/physics";
import {
  PhysicsSetPieceComponent,
  PhysicsSetPieceStore,
} from "./Components/setPiece";
import { BotSlots } from "./Constants";

const shipSize = 50;
const numberOfShips = 5;
const numberOfRooms = 50;
export const ShadowLimit = 1000;

export const NumberOfActors =
  BotSlots * numberOfShips + numberOfRooms * numberOfShips;
export const TileSize = 25;
export const ActorSize = TileSize / 1;

export type ISpaceTrashSystems = `physical` | "casting";
export const MapSize = Math.floor(
  Math.sqrt(shipSize * shipSize * numberOfShips)
);

console.log("MapSize", MapSize);
console.log("NumberOfActors", NumberOfActors);
console.log("ShadowLimit", ShadowLimit);

const illuminate = (xFloat: number, yFloat: number): any => {
  const x = Math.round(xFloat);
  const y = Math.round(yFloat);
  const mSize = MapSize;
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

  if (phaseZero[y][x].luminance !== litableComponent.luminance) {
    phaseZero[y][x].luminance = litableComponent.luminance;
    phaseZero[y][x].culledWebgl = false;

    if (phaseZero[y][x].rendered2d !== "fresh") {
      phaseZero[y][x].rendered2d = "changed";
      phaseZero[y][x].renderedWebgl = "changed";
    }
  }
};

const di3 = Math.sqrt(ActorSize / 2);

const distanceBetweenActorsV0 = (
  a: PhysicsActorComponent,
  b: PhysicsActorComponent
) => {
  return Math.hypot(b.x - a.x, b.y - a.y);
};

// this implementation is faster and uses less memory, causing fewer GCs
function distanceBetweenActorsV1(x, y, x0, y0) {
  const squaredDist = (x - x0) * (x - x0) + (y - y0) * (y - y0);
  return squaredDist <= di3;
}

function distanceBetweenActorsV2(x, y, x0, y0) {
  return false;
}

const actorsCollide = (a: PhysicsActorComponent, b: PhysicsActorComponent) => {
  return distanceBetweenActorsV1(a.x, a.y, b.x, b.y);
  // return distanceBetweenActorsV0(a, b);
};

let firstTick = true;
let phaseZero: Phase0[][];
let phaseOne: Phase1[];
let lightableEntitiesStore: LittableStore;
let lightingEntitiesStore: LitStore;
let magX: number;
let magY: number;
let tempVx: number = -1;
let tempVy: number = -1;
let temps: [number, number] = [-1, -1];
let roundX: number;
let roundY: number;
let next: Phase1;

const low = 0;
const high = MapSize - 1;

class MainSystem extends System {
  mapSize: number;
  working: boolean;

  constructor(mapSize: number) {
    super();
    this.mapSize = mapSize;
  }

  tick(delta, ecs: ECS): Promise<boolean> {
    return new Promise((res, rej) => {
      phaseZero = (ecs.stores["Phase0"] as Phase0Store).store;
      phaseOne = (ecs.stores["Phase1"] as Phase1Store).store;

      const actorsStore = ecs.componentStores[
        "PhysicsActorComponent"
      ] as PhysicsActorStore;
      const setPieces = ecs.componentStores[
        "PhysicsSetPieceComponent"
      ] as PhysicsSetPieceStore;
      lightableEntitiesStore = ecs.componentStores[
        "LitableComponent"
      ] as LittableStore;

      lightingEntitiesStore = ecs.componentStores[
        LitComponent.name
      ] as LitStore;

      if (firstTick) {
        firstTick = false;

        for (let y = 0; y < MapSize; y++) {
          phaseZero[y] = [];
          for (let x = 0; x < MapSize; x++) {
            phaseZero[y][x] = new Phase0();
            phaseZero[y][x].rendered2d = "fresh";
            phaseZero[y][x].renderedWebgl = "fresh";
            phaseZero[y][x].culledWebgl = true;
          }
        }

        setPieces.store.forEach(([i, s], ndx) => {
          phaseZero[s.y][s.x].setId = ndx;
          phaseZero[s.y][s.x].tileType = s.tileType;
          phaseZero[s.y][s.x].littableId =
            lightableEntitiesStore.store.findIndex(
              ([eid, b]: [string, LitableComponent]) => eid == i
            );
        });

        for (let y = 0; y < actorsStore.store.length; y++) {
          phaseOne[y] = {
            actorId: y,
            actorX: actorsStore.store[y][1].x,
            actorY: actorsStore.store[y][1].y,
            rendered2d: "fresh",
            renderedWebgl: "fresh",
            culled2d: false,
            culledWebgl: false,
          };
        }

        res(true);
      } else {
        // clear the light sources
        lightableEntitiesStore.store.forEach(([lid, l]) => {
          l.luminance = 0;
        });

        for (let y = 0; y < MapSize; y++) {
          for (let x = 0; x < MapSize; x++) {
            phaseZero[y][x].luminance = 0;
            // phaseZero[y][x].rendered2d = "changed";
            // phaseZero[y][x].renderedWebgl = "changed";
          }
        }

        lightingEntitiesStore.store.forEach(([eid, lightingComponent], ndx) => {
          const [eid2, actor] = actorsStore.store.find(
            (a) => a[0] === eid
          ) as PhysicsActorComponent;

          if (lightingComponent.radiance) {
            // if (!phaseZero[Math.round(actor.y)]) {
            //   phaseZero[Math.round(actor.y)] = [];
            // }
            // find the floor underneath and any entities on top
            // let x = Math.round(actor.x);
            // let y = Math.round(actor.y);
            // if (x >= MapSize) x = 0;
            // if (y >= MapSize) y = 0;

            let x = Math.round(actor.x + actor.dx);
            if (x >= this.mapSize - 1) x = 0;
            if (x < 0) x = this.mapSize - 1;

            let y = Math.round(actor.y + actor.dy);
            if (y >= this.mapSize - 1) y = 0;
            if (y < 0) y = this.mapSize - 1;

            if (phaseZero[y][x]) {
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
              for (let k = 0; k < ShadowLimit; k++) {
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



          // collision check with set-pieces
          if (!phaseZero[y][x]) debugger;

          if (phaseZero[y][x].setId === -1) {
            console.error(
              "Spaces should not be empty! X and Y",
              x,
              y,
              " were NOT found"
            );
            console.error(phaseZero);
          }

          if (
            setPieces.store[phaseZero[y][x].setId][1].tileType !== "FloorTile"
          ) {
            magX = Math.abs(a.dx);
            magY = Math.abs(a.dy);
            roundX = Math.round(a.x);
            roundY = Math.round(a.y);

            if (x < roundX) {
              if (y < roundY) {
                // NorthWest
                if (magX < magY) {
                  a.dy = a.dy * -1;
                } else {
                  a.dx = a.dx * -1;
                }
              } else if (y > roundY) {
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
            } else if (x > roundX) {
              if (y < roundY) {
                // NorthEast
                if (magX > magY) {
                  a.dx = a.dx * -1;
                } else {
                  a.dy = a.dy * -1;
                }
              } else if (roundY) {
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
              if (y < roundY) {
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
          // this causes GC but there's nothing I can do about it
          actorsStore.store.forEach(([i2, a2], n2) => {
            // don't check against self
            if (n !== n2) {
              if (actorsCollide(a, a2)) {
                // a.x = a.x - a.dx;
                // a.y = a.y - a.dy;
                // a2.x = a2.x - a2.dx;
                // a2.y = a2.y - a2.dy;
                // tempVx = a.dx;
                // tempVy = a.dy;
                // a.dx = a2.dx;
                // a.dy = a2.dy;
                // a2.dx = tempVx;
                // a2.dy = tempVy;

                // a = {
                //   ...a,
                //   x: a.x - a.dx,
                //   y: a.y - a.dy,
                //   dx: a2.dx,
                //   dy: a2.dy,
                // };
                // a2 = {
                //   ...a2,
                //   x: a2.x - a2.dx,
                //   y: a2.y - a2.dy,
                //   dx: a.dx,
                //   dy: a.dy,
                // }

                a.x = a.x - a.dx;
                a.y = a.y - a.dy;
                a2.x = a2.x - a2.dx;
                a2.y = a2.y - a2.dy;
                temps[0] = a.dx;
                temps[1] = a.dy;
                a.dx = a2.dx;
                a.dy = a2.dy;
                a2.dx = temps[0];
                a2.dy = temps[1];
              }
            }
          });

          // boundary check against level map
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

          // this causes GC but there's nothing I can do about it

          if (
            phaseOne[n].actorX === actorsStore.store[n][1].x &&
            phaseOne[n].actorY === actorsStore.store[n][1].y
          ) {
            // next.rendered2d = "unchanged";
            // next.renderedWebgl = "unchanged";
            phaseOne[n] = {
              ...phaseOne[n],
              actorId: n,
              actorX: actorsStore.store[n][1].x,
              actorY: actorsStore.store[n][1].y,
              rendered2d: "unchanged",
              renderedWebgl: "unchanged",
            };
          } else {
            if (phaseOne[n].renderedWebgl !== "fresh") {
              // next.renderedWebgl = "changed";
              phaseOne[n] = {
                ...phaseOne[n],
                actorId: n,
                actorX: actorsStore.store[n][1].x,
                actorY: actorsStore.store[n][1].y,
                renderedWebgl: "changed",
              };
            }

            if (phaseOne[n].rendered2d !== "fresh") {
              // next.rendered2d = "changed";
              phaseOne[n] = {
                ...phaseOne[n],
                actorId: n,
                actorX: actorsStore.store[n][1].x,
                actorY: actorsStore.store[n][1].y,
                rendered2d: "changed",
              };
            }
          }
        });
      }

      res(true);
    });
  }
}

export const SpaceTrashMainSystem = new MainSystem(MapSize);
