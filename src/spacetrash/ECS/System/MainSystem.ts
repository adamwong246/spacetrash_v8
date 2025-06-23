import runFirstTick from "./firstTick.ts";
import runEveryOtherTick from "./otherTicks.ts";

import { System } from "../../../engine/VECS.ts/System.ts";

import { SpaceTrash } from "../../index.tsx";

import { MapSize } from "../../Constants.ts";

export type ISpaceTrashSystems = `physical` | "casting";

let firstTick = true;
let fovMap;

class MainSystem extends System {
  mapSize: number;
  working: boolean;

  constructor(mapSize: number) {
    super();
    this.mapSize = mapSize;
  }

  tick(delta: number, game: SpaceTrash): Promise<boolean> {
    return new Promise(async (res) => {
      if (firstTick) {
        firstTick = false;

        fovMap = await runFirstTick(game, delta);
        res(true);
      } else {
        runEveryOtherTick(game, delta, fovMap);
      }
    });
  }
}

export function distanceV2(x: number, y: number, x2: number, y2: number) {
  return (x - x2) * (x - x2) + (y - y2) * (y - y2);
}

export const SpaceTrashMainSystem = new MainSystem(MapSize);

// export const MapSize = Math.floor(
//   Math.sqrt(shipSize * shipSize * numberOfShips)
// );

// var map;

// const VisRange = 10;

// let DELTA: number = 1;

// let GAME: SpaceTrash;

// let fps: FloatPositionStore;
// let ips: IntegerPositionStore;
// let lightableEntitiesStore: LittableStore;
// let lightingEntitiesStore: LitStore;
// let fmc: FloatMovingStore;
// let classs: ClassificationStore;
// let lights: LightComponentStore;
// let tiles: TileComponentStore;

// let setPieces: SetPieceStore;
// let actors: ActorStore;

// let actorsLit: LightingComponentStore;
// let setPieceLit: LightingComponentStore;
// let drawables: DrawableStoreV2;
// let eid2PMSs: Eid2PMStore;

// const light2Draw: Record<number, DrawableComponent> = {};
// const light2IntegerPosition: Record<number, IntegerPositionComponent> = {};
// const fp2Emitter: Record<number, LitComponent> = {};
// const lighting2FloatingPosition: Record<number, FloatPositionComponent> = {};

// const runFirstTick = async (game: SpaceTrash) => {
//   Object.keys(classs.store).forEach((k) => {
//     const n = Number.parseInt(k);
//     const kk = classs.get(n);
//     const classification = kk;
//     const eid = k;

//     if (classification === "SpaceTrashBot") {
//       eid2PMSs.add(new Eid2PMComponent(fps.get(n), kk), n);
//     } else if (classification === "Tile") {
//       eid2PMSs.add(new Eid2PMComponent(ips.get(n), kk), n);
//     }
//   });

//   lightingEntitiesStore.store.forEach(([eid, le]) => {
//     const classification = eid2PMSs.get(eid).classification;
//     lights.add(eid, fps.get(eid), classification);
//   });

//   lightableEntitiesStore.each(([eid, le]) => {
//     const classification = eid2PMSs.get(eid).classification;

//     if (classification === "Tile") {
//       setPieceLit.add(eid, ips.get(eid), classification);
//     } else {
//       actorsLit.add(eid, fps.get(eid), classification);
//     }

//     drawables.each(([n, dc, s]) => {
//       if (n === eid) {
//         light2Draw[n] = dc[1];
//       }
//     });

//     ips.each(([n, dc, s]) => {
//       if (n === eid) {
//         light2IntegerPosition[n] = dc[1];
//       }
//     });
//   });

//   // setup the setPieces
//   for (let y = 0; y < MapSize; y++) {
//     setPieces.store[y] = [];
//     for (let x = 0; x < MapSize; x++) {
//       setPieces.store[y][x] = new SetPieceComponent();

//       for (let yy = 0; yy < MapSize; yy++) {
//         setPieces.store[y][x].FOV[yy] = [];
//         for (let xx = 0; xx < MapSize; xx++) {
//           setPieces.store[y][x].FOV[yy][xx] = distanceV2(x, y, xx, yy);
//         }
//       }
//     }
//   }

//   // build set pieces grid
//   ips.store.forEach(([eid, s], ndx) => {
//     setPieces.store[s.y][s.x].setId = ndx;
//     const t = tiles.get(eid);
//     if (!t) {
//       throw "why no t?";
//     }
//     setPieces.store[s.y][s.x].tileType = t.tileType;

//     drawables.each(([n, dc, ss]) => {
//       if (n === eid) {
//         setPieces.store[s.y][s.x].drawing = dc[1];
//       }
//     });
//   });

//   // setup the actors list
//   for (let y = 0; y < fps.store.length; y++) {
//     const aeid = fps.store[y][0];

//     // add the actors
//     actors.add({
//       actorId: aeid,
//       // actorX: fps.store[y][1].x,
//       // actorY: fps.store[y][1].y,
//       // rendered2d: "fresh",
//       // renderedWebgl: "fresh",
//       // culled2d: false,
//       // culledWebgl: false,
//       friendly: game.isFriendly(aeid),
//       position: fps.store[y][1],
//       motion: fmc.store[y][1],
//       // sprite: new Sprite,
//       // renderedWebgl: "new",
//       // rendered2d: "new"
//     });

//     lightingEntitiesStore.store.forEach(([leid, le]) => {
//       if (aeid === leid) {
//         fp2Emitter[aeid] = le;
//       }
//     });
//   }

//   runInitialMapBoundaryCheck();
//   runPlaceImmoveableSetPieces();
//   runFOV();
// };

// function runEveryOtherTick() {
//   // resetIllumination();
//   runPhysics();
//   // runIllumination();
// }
