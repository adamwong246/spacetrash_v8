import { System } from "../../engine/VECS.ts/System.ts";
import { SpaceTrash } from "../index.tsx";
import { LitableComponent, LittableStore } from "./Components/casting/in";
import { LitComponent, LitStore } from "./Components/casting/out";
import { SetPieceComponent, SetPieceStore } from "./Components/phase0";
import { ActorComponent, ActorStore } from "./Components/phase1";
import { ClassificationStore } from "./Components/v2/classifiable.ts";
import {
  LightComponentStore,
  LightingComponentStore,
} from "./Components/v2/lights.ts";
import {
  FloatMovingComponent,
  FloatMovingStore,
  FloatPositionComponent,
  FloatPositionStore,
  IntegerPositionComponent,
  IntegerPositionStore,
  OridinalMovingComponent,
} from "./Components/v2/physical.ts";
import { DrawableStore } from "./Components/v2/drawable.ts";
import { Eid2PMComponent, Eid2PMStore } from "./Components/v2/eid2PMC.ts";
// import { DrawingStore } from "./Components/v2/drawings.ts";

export const ShadowLimit = 1;
export const NumberOfActors = 20;
// BotSlots * numberOfShips + numberOfRooms * numberOfShips;
export const TileSize = 30;
export const ActorSize = TileSize / 1;
export type ISpaceTrashSystems = `physical` | "casting";
// export const MapSize = Math.floor(
//   Math.sqrt(shipSize * shipSize * numberOfShips)
// );
export const MapSize = 30;

const VisRange = 30;

let twoD: SetPieceStore;
// let oneD: ActorStore;
let fps: FloatPositionStore;
let ips: IntegerPositionStore;
let lightableEntitiesStore: LittableStore;
let lightingEntitiesStore: LitStore;
let fmc: FloatMovingStore;
let classs: ClassificationStore;
let lights: LightComponentStore;
let actorsLit: LightingComponentStore;
let setPieceLit: LightingComponentStore;
let drawables: DrawableStore;
let eid2PMSs: Eid2PMStore;

const runFirstTick = async (game: SpaceTrash) => {
  Object.keys(classs.store).forEach((k) => {
    const n = Number.parseInt(k);
    const kk = classs.get(n);
    const classification = kk;
    const eid = k;

    if (classification === "SpaceTrashBot") {
      eid2PMSs.add(new Eid2PMComponent(fps.get(n), kk), n);
    } else if (classification === "Tile") {
      eid2PMSs.add(new Eid2PMComponent(ips.get(n), kk), n);
    }
  });

  lightingEntitiesStore.store.forEach(([eid, le]) => {
    const classification = eid2PMSs.get(eid).classification;
    lights.add(eid, fps.get(eid), classification);
  });

  lightableEntitiesStore.each(([eid, le]) => {
    const classification = eid2PMSs.get(eid).classification;

    if (classification === "Tile") {
      setPieceLit.add(eid, ips.get(eid), classification);
    } else {
      actorsLit.add(eid, fps.get(eid), classification);
    }
  });

  // setup the twoD grid
  for (let y = 0; y < MapSize; y++) {
    twoD.store[y] = [];
    for (let x = 0; x < MapSize; x++) {
      twoD.store[y][x] = new SetPieceComponent();
      twoD.store[y][x].rendered2d = "fresh";
      twoD.store[y][x].renderedWebgl = "fresh";
      twoD.store[y][x].culledWebgl = true;
    }
  }

  // add the tiles
  ips.store.forEach(([i, s], ndx) => {
    twoD.store[s.y][s.x].setId = ndx;
    twoD.store[s.y][s.x].tileType = s.tileType;
    // twoD.store[s.y][s.x].littableId = lightableEntitiesStore.get(i);

    // twoD.store[s.y][s.x].littableId = lightableEntitiesStore.store.findIndex(
    //   ([eid]: [string, LitableComponent]) => eid == i
    // );
  });

  // setup the oneD list
  // for (let y = 0; y < fps.store.length; y++) {
  //   const aeid = fps.store[y][0];

  //   // add the actors
  //   oneD.add({
  //     actorId: aeid,
  //     // actorX: fps.store[y][1].x,
  //     // actorY: fps.store[y][1].y,
  //     rendered2d: "fresh",
  //     renderedWebgl: "fresh",
  //     culled2d: false,
  //     culledWebgl: false,
  //     friendly: game.isFriendly(aeid),
  //     floatPosition: fps.store[y][1],
  //   });
  // }

  runInitialMapBoundaryCheck();
  runPlaceImmoveableSetPieces();
};

function runEveryOtherTick() {
  // resetIllumination();
  runPhysics();
  // runIllumination();
}

let DELTA: number;
class MainSystem extends System {
  mapSize: number;
  working: boolean;

  constructor(mapSize: number) {
    super();
    this.mapSize = mapSize;
  }

  tick(delta: number, game: SpaceTrash): Promise<boolean> {
    DELTA = delta;
    return new Promise((res) => {
      if (firstTick) {
        firstTick = false;

        fps = game.componentStores[
          "FloatPositionComponent"
        ] as FloatPositionStore;
        ips = game.componentStores[
          "IntegerPositionComponent"
        ] as IntegerPositionStore;
        fmc = game.componentStores["FloatMovingComponent"] as FloatMovingStore;
        classs = game.componentStores[
          "ClassificationComponent"
        ] as ClassificationStore;

        lightableEntitiesStore = game.componentStores[
          "LitableComponent"
        ] as LittableStore;

        lightingEntitiesStore = game.componentStores[
          LitComponent.name
        ] as LitStore;

        lightingEntitiesStore = game.componentStores[
          LitComponent.name
        ] as LitStore;

        drawables = game.componentStores["DrawableComponent"] as DrawableStore;

        //////////////////////////////////////////////////////////////////////

        twoD = game.stores["SetPieceComponent"] as SetPieceStore;
        // oneD = game.stores["ActorComponent"] as ActorStore;
        lights = game.stores["LightComponent"] as LightComponentStore;
        actorsLit = game.stores["ActorsLit"] as LightingComponentStore;
        setPieceLit = game.stores["SetPiecesLit"] as LightingComponentStore;
        eid2PMSs = game.stores["Eid2PMComponent"] as Eid2PMStore;

        runFirstTick(game);
        res(true);
      } else {
        runEveryOtherTick();
      }

      res(true);
    });
  }
}

const runPlaceImmoveableSetPieces=()=>{
  drawables.each((([eid, [did, dic], k]) => {

    const p = ips.get(did);
    if (dic.sprite) {
      dic.sprite.position.x = p.x * TileSize;
      dic.sprite.position.y = p.y * TileSize;
    } else {
      throw "the sprite should be loaded by now"
    }
    
  }))
}

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

  const space = twoD[y][x];
  const lightableIdOfSpace = space.littableId;
  const litable = lightableEntitiesStore.store[lightableIdOfSpace]; //(lightableEntitiesStore.find((a) => a[0] === lightableIdOfSpace) as [string, LitableComponent]);

  if (!litable) {
    console.error("litable not found");
    return;
  }
  const [eid3, litableComponent] = litable;
  litableComponent.luminance = 2;

  if (twoD[y][x].luminance !== litableComponent.luminance) {
    twoD[y][x].luminance = litableComponent.luminance;
    twoD[y][x].culledWebgl = false;

    if (twoD[y][x].rendered2d !== "fresh") {
      twoD[y][x].rendered2d = "changed";
      twoD[y][x].renderedWebgl = "changed";
    }
  }
};

const di3 = Math.sqrt(ActorSize / 2);

// const distanceBetweenActorsV0 = (
//   a: PhysicsActorComponent,
//   b: PhysicsActorComponent
// ) => {
//   return Math.hypot(b.x - a.x, b.y - a.y);
// };

// this implementation is faster and uses less memory, causing fewer GCs
function distanceBetweenActorsV1(x, y, x0, y0) {
  const squaredDist = (x - x0) * (x - x0) + (y - y0) * (y - y0);
  return squaredDist <= di3;
}

function distanceV2(x: number, y: number, x2: number, y2: number) {
  return (x - x2) * (x - x2) + (y - y2) * (y - y2);
}

function distanceBetweenFloats(
  p: FloatPositionComponent,
  pp: FloatPositionComponent
): number {
  return distanceV2(p.x, p.y, pp.x, pp.y);
}

function distanceBetweenIntegers(
  p: IntegerPositionComponent,
  pp: IntegerPositionComponent
): number {
  return distanceV2(
    p.x * TileSize,
    p.y * TileSize,
    pp.x * TileSize,
    pp.y * TileSize
  );
}

function distanceBetweenFloatAndIntegerPostion(
  i: IntegerPositionComponent,
  ff: FloatPositionComponent
): number {
  return distanceV2(i.x * TileSize, i.y * TileSize, ff.x, ff.y);
}

const actorsCollide = (
  a: FloatPositionComponent,
  b: FloatPositionComponent
) => {
  return distanceBetweenActorsV1(a.x, a.y, b.x, b.y);
  // return distanceBetweenActorsV0(a, b);
};

let firstTick = true;
let phaseZero: SetPieceComponent[][];
let phaseOne: ActorComponent[];

let magX: number;
let magY: number;
let temps: [number, number] = [-1, -1];
let roundX: number;
let roundY: number;

const MapBoundLow = 0;
const MapBoundHigh = MapSize - 1;

function resetIllumination() {
  for (let y = 0; y < MapSize; y++) {
    for (let x = 0; x < MapSize; x++) {
      twoD.store[y][x].luminance = 0;
      // phaseZero[y][x].rendered2d = "changed";
      // phaseZero[y][x].renderedWebgl = "changed";
    }
  }
}

let eidOfActorsLightToPostion: Record<number, FloatPositionComponent> = {};

function runIllumination() {
  // loop over light emitters
  lightingEntitiesStore.store.forEach(([eidOfLight, lightingComponent]) => {
    const { classification, floatPosition } = lights.get(eidOfLight);

    if (classification === "SpaceTrashBot") {
      // const p = fps.get(eidOfClassification);
      // const p = eidOfActorsLightToPostion[eidOfClassification];
      // const p: FloatPositionComponent = lights.get(eidOfLight)

      // if (!p) throw "floating position component not found";

      runIlluminationBot(eidOfLight, floatPosition, lightingComponent);
    } else if (classification === "Tile") {
      throw "lighting tiles is not implemented";
      // const p = ips.get(eidOfClassification);
      // if (!p) throw "integer position component not found";

      // runIlluminationTile(eidOfLight, p, lightingComponent);
    }

    // classs.store.forEach(([eidOfClassification, classification]) => {
    //   if (eidOfClassification === eidOfLight) {
    //     let p: FloatPositionComponent | IntegerPositionComponent;

    //   }
    // });

    // if (!positionOfLightingEntity)
    //   throw "a lighting entity should have a position";
    // const positionOfLight: FloatPositionComponent =
    //   positionOfLightingEntity[1];

    // loop over light receivers
    // lightableEntitiesStore.store.forEach(([eid, littableComponent]) => {
    //   const positionOfLittableEntity = fps.store.find(
    //     (a) => a[0] === eid
    //   );

    //   if (!positionOfLittableEntity)
    //     throw "a littable entity should have a position";
    //   const positionOfLight: FloatPositionComponent =
    //     positionOfLightingEntity[1];
    // });
  });
}

// illuminate from a bot at p with l
function runIlluminationBot(
  eidOfLight: number,
  fpc: FloatPositionComponent,
  lc: LitComponent
) {
  // loop over light recivers
  lightableEntitiesStore.store.forEach(([eidOfLightable, l]) => {
    const { classification, floatPosition } = lights.get(eidOfLight);

    let p: FloatPositionComponent | IntegerPositionComponent;
    if (classification === "SpaceTrashBot") {
      runIlluminationBotToBot(fpc, eidOfLight, floatPosition);
    } else if (classification === "Tile") {
      // runIlluminationBotToTile(fpc, eidOfLightable, floatPosition);
    }

    // if (!positionOfLightingEntity)
    //   throw "a lighting entity should have a position";
    // const positionOfLight: FloatPositionComponent =
    //   positionOfLightingEntity[1];

    // loop over light receivers
    // lightableEntitiesStore.store.forEach(([eid, littableComponent]) => {
    //   const positionOfLittableEntity = fps.store.find(
    //     (a) => a[0] === eid
    //   );

    //   if (!positionOfLittableEntity)
    //     throw "a littable entity should have a position";
    //   const positionOfLight: FloatPositionComponent =
    //     positionOfLightingEntity[1];
    // });
  });
}

function runIlluminationTile(
  eidOfLight: number,
  p: IntegerPositionComponent,
  l: LitComponent
) {
  throw "method not implemented";
  // lightableEntitiesStore.store.forEach(([eid, littableComponent]) => { })
}

function runIlluminationBotToBot(
  p: FloatPositionComponent,
  eidOfLitable: number,
  p2: FloatPositionComponent
) {
  if (distanceBetweenFloats(p, p2) < VisRange) {
    // oneD.get(eidOfLitable).luminance = 1;
  }
}

function runIlluminationTileToBot(
  p: IntegerPositionComponent,
  eidOfLitable: number,
  p2: FloatPositionComponent
) {
  if (distanceBetweenFloatAndIntegerPostion(p, p2) < VisRange) {
    // oneD.get(eidOfLitable).luminance = 1;
  }
}

function runIlluminationTileToTile(
  p: IntegerPositionComponent,
  eidOfLitable: number,
  p2: IntegerPositionComponent
) {
  if (distanceBetweenIntegers(p, p2) < VisRange) {
    twoD[eidOfLitable].luminance = 1;
  }
}

function runIlluminationBotToTile(
  p: FloatPositionComponent,
  eidOfLitable: number,
  p2: IntegerPositionComponent
) {
  if (distanceBetweenFloatAndIntegerPostion(p2, p) < VisRange) {
    twoD[eidOfLitable].luminance = 1;
  }
}

// boundary check against level map for objects with position
function runInitialMapBoundaryCheck() {
  // actors out of bounds check
  fps.store.forEach((c) => {
    if (c[1].x < MapBoundLow) {
      c[1].x = MapBoundHigh;
    }
    if (c[1].x > MapBoundHigh) {
      c[1].x = MapBoundLow;
    }
    if (c[1].y < MapBoundLow) {
      c[1].y = MapBoundHigh;
    }
    if (c[1].y > MapBoundHigh) {
      c[1].y = MapBoundLow;
    }
  });

  // set piece out of bounds check
  // necessary?
  ips.store.forEach((c) => {
    if (c[1].x < 0) {
      c[1].x = MapSize;
    }
    if (c[1].x > MapSize) {
      c[1].x = 0;
    }
    if (c[1].y < 0) {
      c[1].y = MapSize;
    }
    if (c[1].y > MapSize) {
      c[1].y = 0;
    }
  });
}

function boundaryCheckBot(fpc: FloatPositionComponent) {
  if (fpc.x < 0) {
    fpc.x = MapSize * TileSize;
  }
  if (fpc.x > MapSize * TileSize) {
    fpc.x = 0;
  }
  if (fpc.y < 0) {
    fpc.y = MapSize * TileSize;
  }
  if (fpc.y > MapSize * TileSize) {
    fpc.y = 0;
  }
}

function boundaryCheckTile(ipc: IntegerPositionComponent) {
  if (ipc.x < 0) {
    ipc.x = MapSize;
  }
  if (ipc.x > MapSize) {
    ipc.x = 0;
  }
  if (ipc.y < 0) {
    ipc.y = MapSize;
  }
  if (ipc.y > MapSize) {
    ipc.y = 0;
  }
}

function updateVelocity(f: number): number {
  return Math.min(f, 0.5) * 1;
}

function updateMovement(f: FloatMovingComponent) {
  f.dx = updateVelocity(f.dx);
  f.dy = updateVelocity(f.dx);
}

function updatePosition(p: FloatPositionComponent, f: FloatMovingComponent) {
  p.x = p.x + f.dx;
  p.y = p.y + f.dy;

  if (Number.isNaN(p.y)) {
    debugger;
    throw "position is Nan?FloatMovingComponent";
  }
}

function updateBotPosition(p: FloatPositionComponent, f: FloatMovingComponent) {
  updateMovement(f);
  updatePosition(p, f);
}

function updateTilePosition(
  p: IntegerPositionComponent,
  f: OridinalMovingComponent
) {
  throw "method not implemented";
}

// run boundary check for things that move
function runPhysics() {
  // actors out of bounds check
  fmc.store.forEach(([eid, f]) => {
    // const classification = classs.get(eid);
    const { position, classification } = eid2PMSs.get(eid);

    if (classification === "SpaceTrashBot") {
      // const p = fps.get(eid);
      // if (!p) throw "floating position component not found";

      updateBotPosition(position, f);
      boundaryCheckBot(position);

      drawables.updatePostion(eid, position);
      // oneD.update(eid, p)
    } else if (classification === "Tile") {
      // const p = ips.get(eidOfClassification);
      // if (!p) throw "integer position component not found";
      // updateTilePosition(p, f);
      // boundaryCheckTile(p);
    }
  });
}

export const SpaceTrashMainSystem = new MainSystem(MapSize);

// actorsStore.store.forEach(([i, a], n) => {
//   // x and y are the "look ahead" pointer
//   let x = Math.round(a.x + a.dx);
//   if (x >= this.mapSize - 1) x = 0;
//   if (x < 0) x = this.mapSize - 1;
//   let y = Math.round(a.y + a.dy);
//   if (y >= this.mapSize - 1) y = 0;
//   if (y < 0) y = this.mapSize - 1;

//   // collision check with set-pieces
//   if (!phaseZero[y][x]) debugger;

//   if (phaseZero[y][x].setId === -1) {
//     console.error(
//       "Spaces should not be empty! X and Y",
//       x,
//       y,
//       " were NOT found"
//     );
//     console.error(phaseZero);
//   }

//   if (
//     setPieces.store[phaseZero[y][x].setId][1].tileType !== "FloorTile"
//   ) {
//     magX = Math.abs(a.dx);
//     magY = Math.abs(a.dy);
//     roundX = Math.round(a.x);
//     roundY = Math.round(a.y);

//     if (x < roundX) {
//       if (y < roundY) {
//         // NorthWest
//         if (magX < magY) {
//           a.dy = a.dy * -1;
//         } else {
//           a.dx = a.dx * -1;
//         }
//       } else if (y > roundY) {
//         // SouthWest
//         if (magX > magY) {
//           a.dx = a.dx * -1;
//         } else {
//           a.dy = a.dy * -1;
//         }
//       } else {
//         // West
//         a.dx = a.dx * -1;
//       }
//     } else if (x > roundX) {
//       if (y < roundY) {
//         // NorthEast
//         if (magX > magY) {
//           a.dx = a.dx * -1;
//         } else {
//           a.dy = a.dy * -1;
//         }
//       } else if (roundY) {
//         // SouthEast

//         if (magX > magY) {
//           a.dy = a.dy * -1;
//         } else {
//           a.dx = a.dx * -1;
//         }
//       } else {
//         // East
//         a.dx = a.dx * -1;
//       }
//     } else {
//       if (y < roundY) {
//         // North
//         a.dy = a.dy * -1;
//       } else {
//         // South
//         a.dy = a.dy * -1;
//       }
//     }
//   } else {
//     // no-opt
//   }

//   if (i === game.bots[game.videoFeed][0]) {
//     if (game.forward === true) {
//       a.dy = a.dy - 0.001;
//     }

//     if (game.back === true) {
//       a.dy = a.dy + 0.001;
//     }

//     if (game.left === true) {
//       a.dx = a.dx - 0.001;
//     }

//     if (game.right === true) {
//       a.dx = a.dx + 0.001;
//     }
//   }

//   // collision check with other actors
//   // this causes GC but there's nothing I can do about it
//   actorsStore.store.forEach(([, a2], n2) => {
//     // don't check against self
//     if (n !== n2) {
//       if (actorsCollide(a, a2)) {
//         a.x = a.x - a.dx;
//         a.y = a.y - a.dy;
//         a2.x = a2.x - a2.dx;
//         a2.y = a2.y - a2.dy;
//         temps[0] = a.dx;
//         temps[1] = a.dy;
//         a.dx = a2.dx;
//         a.dy = a2.dy;
//         a2.dx = temps[0];
//         a2.dy = temps[1];
//       }
//     }
//   });

//   // boundary check against level map
//   if (a.x < low) {
//     a.x = high;
//   }
//   if (a.x > high) {
//     a.x = low;
//   }
//   if (a.y < low) {
//     a.y = high;
//   }
//   if (a.y > high) {
//     a.y = low;
//   }

//   // govern the speed
//   a.dx = Math.min(a.dx, 0.5);
//   a.dy = Math.min(a.dy, 0.5);

//   // friction
//   a.dx = a.dx * 0.999;
//   a.dy = a.dy * 0.999;

//   // update the position
//   a.x = a.x + a.dx;
//   a.y = a.y + a.dy;

//   // this causes GC but there's nothing I can do about it

//   if (
//     phaseOne[n].actorX === actorsStore.store[n][1].x &&
//     phaseOne[n].actorY === actorsStore.store[n][1].y
//   ) {
//     // next.rendered2d = "unchanged";
//     // next.renderedWebgl = "unchanged";
//     phaseOne[n] = {
//       ...phaseOne[n],
//       actorId: n,
//       actorX: actorsStore.store[n][1].x,
//       actorY: actorsStore.store[n][1].y,
//       rendered2d: "unchanged",
//       renderedWebgl: "unchanged",
//     };
//   } else {
//     if (phaseOne[n].renderedWebgl !== "fresh") {
//       // next.renderedWebgl = "changed";
//       phaseOne[n] = {
//         ...phaseOne[n],
//         actorId: n,
//         actorX: actorsStore.store[n][1].x,
//         actorY: actorsStore.store[n][1].y,
//         renderedWebgl: "changed",
//       };
//     }

//     if (phaseOne[n].rendered2d !== "fresh") {
//       // next.rendered2d = "changed";
//       phaseOne[n] = {
//         ...phaseOne[n],
//         actorId: n,
//         actorX: actorsStore.store[n][1].x,
//         actorY: actorsStore.store[n][1].y,
//         rendered2d: "changed",
//       };
//     }
//   }
// });

// if (lightingComponent.radiance) {
//   // if (!phaseZero[Math.round(actor.y)]) {
//   //   phaseZero[Math.round(actor.y)] = [];
//   // }
//   // find the floor underneath and any entities on top
//   // let x = Math.round(actor.x);
//   // let y = Math.round(actor.y);
//   // if (x >= MapSize) x = 0;
//   // if (y >= MapSize) y = 0;

//   let x = Math.round(actor.x);
//   if (x >= this.mapSize - 1) x = 0;
//   if (x < 0) x = this.mapSize - 1;

//   let y = Math.round(actor.y);
//   if (y >= this.mapSize - 1) y = 0;
//   if (y < 0) y = this.mapSize - 1;

//   if (twoD.store[y][x]) {
//     // illuminate the space upon which we stand
//     illuminate(actor.x, actor.y);

//     // (di, dj) is a vector - direction in which we move right now
//     let di = 1;
//     let dj = 0;
//     // length of current segment
//     let segment_length = 1;
//     // current position (i, j) and how much of current segment we passed
//     let i = 0;
//     let j = 0;
//     let segment_passed = 0;
//     // for (int k = 0; k < NUMBER_OF_POINTS; ++k) {
//     for (let k = 0; k < ShadowLimit; k++) {
//       // make a step, add 'direction' vector (di, dj) to current position (i, j)
//       i += di;
//       j += dj;
//       ++segment_passed;
//       // if (x > this.mapSize) break;
//       // if (x < 0) break;
//       // if (y > this.mapSize) break;
//       // if (y < 0) break;
//       // console.log("ensetpiecetity", setpiece(i + e.x, j + e.y))
//       // const eId = littableActorsUpon(x, y)?.entity;
//       // const entity = entities[eId];
//       // if (entity) {
//       //   // console.log("entity", entity)
//       //   if (entity.tileType !== "FloorTile") {
//       //     onTarget = true;
//       //     // console.log("collide!", x, y, entity)
//       //   } else {
//       //     onTarget = false;
//       //   }
//       // } else {
//       //   // console.log("idk", eId, x, y)
//       // }
//       illuminate(i + actor.x, j + actor.y);
//       if (segment_passed == segment_length) {
//         // done with current segment
//         segment_passed = 0;
//         // 'rotate' directions
//         let buffer = di;
//         di = -dj;
//         dj = buffer;
//         // increase segment length if necessary
//         if (dj == 0) {
//           ++segment_length;
//         }
//       }
//     }
//   }
// }
