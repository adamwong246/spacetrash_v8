import { FOV } from "rot-js";
import {
  MapSize,
  SPEED_CONSTANT,
  TANK_VELOCITY_ANGULAR,
  TANK_VELOCITY as TANK_VELOCITY_LINEAR,
  TileSize,
} from "../../Constants";
import { FloatPositionComponent } from "../Components/v2/physical";
import { SpaceTrash } from "../..";
import { FRICTION_CONSTANT } from "../../Constants";
import { LightIncastingStore } from "../Components/casting/in";
import {
  LightOutcastingStore,
  LightOutcastingComponent,
} from "../Components/casting/out";
import { SetPieceStore } from "../Components/phase0";
import { ActorStore } from "../Components/phase1";
import { DrawableStoreV2 } from "../Components/v2/drawable";
import { Eid2PMStore } from "../Components/v2/eid2PMC";
import {
  FloatMovingComponent,
  FloatMovingStore,
  FloatPositionStore,
  IntegerPositionStore,
  TankMovingStore,
  TankMovingComponent,
  DegreesDirectionStore,
  DegreesDirectionComponent,
} from "../Components/v2/physical";
import { LightPositionStore } from "../Components/v3/LightPosition";
import {
  ArcadePhysicsComponent,
  ArcadePhysicsStore,
} from "../Components/v2/arcadePhysics";

let actors: ActorStore;
let arcadeObjects: ArcadePhysicsStore;
let dds: DegreesDirectionStore;
let drawables: DrawableStoreV2;
let eid2PMSs: Eid2PMStore;
let fmc: FloatMovingStore;
let fps: FloatPositionStore;
let incasters: LightIncastingStore;
let ips: IntegerPositionStore;
let light2IntegerPosition: LightPositionStore;
let outcasters: LightOutcastingStore;
let setPieces: SetPieceStore;
let tms: TankMovingStore;

let GAME: SpaceTrash;
let DELTA: number;

export default (game: SpaceTrash, delta: number, fovMap) => {
  GAME = game;
  DELTA = delta;

  // Level 0 - "Component Stores"
  arcadeObjects = game.componentStores[
    "ArcadePhysicsComponent"
  ] as ArcadePhysicsStore;

  dds = game.componentStores[
    "DegreesDirectionComponent"
  ] as DegreesDirectionStore;
  tms = game.componentStores["TankMovingComponent"] as TankMovingStore;
  drawables = game.componentStores["DrawableComponent"] as DrawableStoreV2;
  fmc = game.componentStores["FloatMovingComponent"] as FloatMovingStore;
  outcasters = game.componentStores[
    LightOutcastingComponent.name
  ] as LightOutcastingStore;
  fps = game.componentStores["FloatPositionComponent"] as FloatPositionStore;
  ips = game.componentStores[
    "IntegerPositionComponent"
  ] as IntegerPositionStore;

  incasters = game.componentStores[
    "LightIncastingComponent"
  ] as LightIncastingStore;

  // Level 1 - "Stores"
  actors = game.stores["ActorComponent"] as ActorStore;
  eid2PMSs = game.stores["Eid2PMComponent"] as Eid2PMStore;
  setPieces = game.stores["SetPieceComponent"] as SetPieceStore;
  light2IntegerPosition = game.stores[
    "LightPositionComponent"
  ] as LightPositionStore;

  resetIllumination();
  // runFloatingPhysics();

  runTankPhysics();
  runArcadePhysics();

  // scanFrustum();
  rotLighting();
};

export function runArcadePhysics() {
  // let repaintLights = false;
  arcadeObjects.each((eid, f) => {
    // f.arcadeObject.velocity.x = 100
    // f.arcadeObject.velocity.x = 100

    const { position, classification } = eid2PMSs.get(eid);
    if (classification === "PuckBot") {
      // const p = fps.get(eid);
      // if (!p) throw "floating position component not found";
      // boundaryCheckBot(position);
      // collisionsAndVideoControls();
      // const gridChanges = upsdateFloatPosition(position, f);
      // if (gridChanges) {
      //   repaintLights = true;
      // }
      // drawables.updatePostion(eid, position, true);
      drawables.updateFromArcadePhysics(eid, f);
    } else if (classification === "Tile") {
      // throw "not implemented";
    } else {
      drawables.updateFromArcadePhysics(eid, f);
    }
  });
  // if (repaintLights) {
  //   resetIllumination();
  //   // runIlluminationV7(fovMap);
  //   for (let y = 0; y < MapSize; y++) {
  //     for (let x = 0; x < MapSize; x++) {
  //       setPieces.store[y][x].drawing.mesh.visible =
  //         setPieces.store[y][x].luminance > 0;
  //       setPieces.store[y][x].drawing.sprite.visible =
  //         setPieces.store[y][x].luminance > 0;
  //     }
  //   }
  // }
}

export function runFloatingPhysics() {
  // let repaintLights = false;
  fmc.store.forEach(([eid, f]) => {
    const { position, classification } = eid2PMSs.get(eid);
    if (classification === "PuckBot") {
      // const p = fps.get(eid);
      // if (!p) throw "floating position component not found";
      boundaryCheckBot(position);
      // collisionsAndVideoControls();
      const gridChanges = updateFloatPosition(position, f);
      // if (gridChanges) {
      //   repaintLights = true;
      // }
      drawables.updatePostion(eid, position, gridChanges);
    } else if (classification === "Tile") {
      throw "not implemented";
    } else {
      debugger;
      throw "idk";
    }
  });
  // if (repaintLights) {
  //   resetIllumination();
  //   // runIlluminationV7(fovMap);
  //   for (let y = 0; y < MapSize; y++) {
  //     for (let x = 0; x < MapSize; x++) {
  //       setPieces.store[y][x].drawing.mesh.visible =
  //         setPieces.store[y][x].luminance > 0;
  //       setPieces.store[y][x].drawing.sprite.visible =
  //         setPieces.store[y][x].luminance > 0;
  //     }
  //   }
  // }
}

function runTankPhysics() {
  tms.store.forEach(([eid, t]) => {
    const { position, classification } = eid2PMSs.get(eid) as unknown as {
      position: ArcadePhysicsComponent;
      classification: string;
    };

    if (classification === "SpaceTrashBot") {
      // const direction = dds.get(eid);
      const direction = arcadeObjects.get(eid)?.arcadeObject.rotation;
      const oldDir = direction;
      const oldX = arcadeObjects.get(eid)?.arcadeObject.x;
      const oldY = arcadeObjects.get(eid)?.arcadeObject.y;

      // boundaryCheckBot(position);
      // collisionsAndVideoControls();
      updateTankPosition(position, t, eid);

      drawables.updateFromArcadePhysics(eid, position);

      // if (
      //   oldDir !== direction.r ||
      //   oldX !== position.arcadeObject.position.x ||
      //   oldY !== position.arcadeObject.position.y
      // ) {
      //   drawables.updateFromArcadePhysics(eid, position);
      // }
    } else if (classification === "Tile") {
      throw "not implemented";
    } else {
      debugger;
      throw "idk";
    }
  });
}

function boundaryCheckBot(fpc: FloatPositionComponent) {
  if (fpc.x < 0) {
    fpc.x = MapSize;
  }
  if (fpc.x > MapSize) {
    fpc.x = 0;
  }
  if (fpc.y < 0) {
    fpc.y = MapSize;
  }
  if (fpc.y > MapSize) {
    fpc.y = 0;
  }
}

function updateVelocity(f: number): number {
  return f * FRICTION_CONSTANT; //f * DELTA * FRICTION_CONSTANT;
}

function updateTankMovement(f: TankMovingComponent, eid: number) {
  const videoBot = Object.entries(GAME.bots).find((v, n, o) => {
    return v[1][0] === eid && Number(v[0]) === GAME.videoFeed;
  });

  if (!videoBot) return;

  if (videoBot) {
    if (GAME.movingForward()) {
      f.j = "forth";
    } else if (GAME.movingBack()) {
      f.j = "back";
    } else if (GAME.movingLeft()) {
      f.i = "left";
    } else if (GAME.movingRight()) {
      f.i = "right";
    } else {
      f.i = "none";
      f.j = "none";
    }
  }
}

function updateFloatingMovement(f: FloatMovingComponent) {
  f.dx = updateVelocity(f.dx);
  f.dy = updateVelocity(f.dy);
}

function updateFloatPosition(
  p: FloatPositionComponent,
  f: FloatMovingComponent
): boolean {
  updateFloatingMovement(f);
  const prevX = Math.round(p.x);
  const prevY = Math.round(p.y);
  p.x = p.x + f.dx; // * DELTA * VELOCITY_CONSTANT;
  p.y = p.y + f.dy; // * DELTA * VELOCITY_CONSTANT;
  const nextX = Math.round(p.x);
  const nextY = Math.round(p.y);

  const hasChangedPosition = prevY !== nextY || prevX !== nextX;
  return hasChangedPosition;
}

function updateTankPosition(
  p: ArcadePhysicsComponent,
  f: TankMovingComponent,
  eid: number
): boolean {
  let isMoving: boolean;
  if (f.i === "none" && f.j === "none") {
    isMoving = false;
  } else {
    isMoving = true;
  }

  updateTankMovement(f, eid);

  if (f.i === "left") {
    p.arcadeObject.rotation = p.arcadeObject.rotation - TANK_VELOCITY_ANGULAR;
  }
  if (f.i === "right") {
    p.arcadeObject.rotation = p.arcadeObject.rotation + TANK_VELOCITY_ANGULAR;
  }
  if (f.i === "none") {
  }

  if (f.j === "forth") {
    p.arcadeObject.setAccelerationX(
      Math.cos(p.arcadeObject.rotation - 1.5708) * TANK_VELOCITY_LINEAR * DELTA
    );
    p.arcadeObject.setAccelerationY(
      Math.sin(p.arcadeObject.rotation - 1.5708) * TANK_VELOCITY_LINEAR * DELTA
    );
  }
  if (f.j === "back") {
    p.arcadeObject.setAccelerationX(
      Math.cos(p.arcadeObject.rotation - 1.5708) * TANK_VELOCITY_LINEAR * DELTA
    ) * -1;
    p.arcadeObject.setAccelerationY(
      Math.sin(p.arcadeObject.rotation - 1.5708) * TANK_VELOCITY_LINEAR * DELTA
    ) * -1;
  }
  if (f.j === "none") {
    p.arcadeObject.setAccelerationX(0);
    p.arcadeObject.setAccelerationY(0);
  }

  return isMoving;
}

function resetIllumination() {
  drawables.each(([eid, d, eid2]) => {
    d.sprite.visible = false;
    d.mesh.visible = true;
  });
  incasters.each(([li, z]) => {
    z.luminance = 0;
  });
  for (let y = 0; y < MapSize; y++) {
    for (let x = 0; x < MapSize; x++) {
      setPieces.store[y][x].luminance = -1;
      // setPieces.store[y][x].s
    }
  }
}

function rotLighting() {
  function lightPasses(x, y) {
    if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
      const z = setPieces.at(x, y);

      if (z && z.tileType === "WallTile") {
        return false;
      } else {
        return true;
      }
    }
    return false;

    // var key = x + "," + y;
    // if (key in data) {
    //   return data[key] == 0;
    // }
    // return false;
  }

  // var fov = new FOV.PreciseShadowcasting(lightPasses);
  var fov = new FOV.RecursiveShadowcasting(lightPasses);

  const lightMap = new Map();

  /* output callback */
  fov.compute(
    Math.round(GAME.camera.position.x / TileSize),
    Math.round(GAME.camera.position.y / TileSize),
    MapSize * TileSize,
    function (x, y, r, visibility) {
      if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
        lightMap[`${x}-${y}`] = visibility;

        // if (visibility === 1 && z && z.drawing) {
        //   z.drawing.sprite.visible = true;
        //   z.drawing.mesh.visible = true;
        // }
        // if (visibility === 0 && z && z.drawing) {
        //   z.drawing.sprite.visible = false;
        //   z.drawing.mesh.visible = false;
        // }
      }
    }
  );

  for (let l of lightMap) {
    const k = l[0];
    const splitt = k.split("-");

    const x = splitt[0];
    const y = splitt[1];

    const z = setPieces.at(x, y);
    const lit = l[1];

    if (lit) {
      z.drawing.sprite.visible = true;
      z.drawing.mesh.visible = true;
    } else {
      if (z.tileType === "FloorTile") {
        const north = lightMap.get(`${x}-${y - 1}`);
        const east = lightMap.get(`${x + 1}-${y}`);
        const west = lightMap.get(`${x - 1}-${y}`);
        const south = lightMap.get(`${x}-${y + 1}`);

        if (!north) {
          z.drawing.sprite.visible = false;
          z.drawing.mesh.visible = true;
        }
        if (!east) {
          z.drawing.sprite.visible = false;
          z.drawing.mesh.visible = true;
        }
        if (!south) {
          z.drawing.sprite.visible = false;
          z.drawing.mesh.visible = true;
        }
        if (!west) {
          z.drawing.sprite.visible = false;
          z.drawing.mesh.visible = true;
        }
      } else {
        z.drawing.sprite.visible = false;
        z.drawing.mesh.visible = false;
      }
    }
  }
}

// function radiansToDegrees(radians) {
//   return radians * (180 / Math.PI);
// }

// const collisionsAndVideoControls = () => {
//   actors.each((i, a) => {
//     if (a.motion) {
//       // x and y are the "look ahead" pointer
//       let x = Math.round(a.position.x + a.motion.dx);
//       if (x >= MapSize - 1) x = 0;
//       if (x < 0) x = MapSize - 1;
//       let y = Math.round(a.position.y + a.motion.dy);
//       if (y >= MapSize - 1) y = 0;
//       if (y < 0) y = MapSize - 1;

//       // // if the look-ahead tile is floor
//       // if (setPieces.tileIsAt(x, y, "FloorTile")) {
//       //   magX = Math.abs(a.motion.dx);
//       //   magY = Math.abs(a.motion.dy);
//       //   roundX = Math.round(a.position.x);
//       //   roundY = Math.round(a.position.y);

//       //   if (x < roundX) {
//       //     if (y < roundY) {
//       //       // NorthWest
//       //       if (magX < magY) {
//       //         a.motion.dy = a.motion.dy * -1;
//       //       } else {
//       //         a.motion.dx = a.motion.dx * -1;
//       //       }
//       //     } else if (y > roundY) {
//       //       // SouthWest
//       //       if (magX > magY) {
//       //         a.motion.dx = a.motion.dx * -1;
//       //       } else {
//       //         a.motion.dy = a.motion.dy * -1;
//       //       }
//       //     } else {
//       //       // West
//       //       a.motion.dx = a.motion.dx * -1;
//       //     }
//       //   } else if (x > roundX) {
//       //     if (y < roundY) {
//       //       // NorthEast
//       //       if (magX > magY) {
//       //         a.motion.dx = a.motion.dx * -1;
//       //       } else {
//       //         a.motion.dy = a.motion.dy * -1;
//       //       }
//       //     } else if (roundY) {
//       //       // SouthEast

//       //       if (magX > magY) {
//       //         a.motion.dy = a.motion.dy * -1;
//       //       } else {
//       //         a.motion.dx = a.motion.dx * -1;
//       //       }
//       //     } else {
//       //       // East
//       //       a.motion.dx = a.motion.dx * -1;
//       //     }
//       //   } else {
//       //     if (y < roundY) {
//       //       // North
//       //       a.motion.dy = a.motion.dy * -1;
//       //     } else {
//       //       // South
//       //       a.motion.dy = a.motion.dy * -1;
//       //     }
//       //   }
//       // } else {
//       //   // no-opt
//       // }

//       // actors.each((ii, aa) => {
//       //   // don't collide against self
//       //   if (i !== ii) {
//       //     if (actorsCollide(a.position, aa.position)) {
//       //       a.position.x = a.position.x - a.motion.dx;
//       //       a.position.y = a.position.y - a.motion.dy;
//       //       aa.position.x = aa.position.x - aa.motion.dx;
//       //       aa.position.y = aa.position.y - aa.motion.dy;
//       //       temps[0] = a.motion.dx;
//       //       temps[1] = a.motion.dy;
//       //       a.motion.dx = aa.motion.dx;
//       //       a.motion.dy = aa.motion.dy;
//       //       aa.motion.dx = temps[0];
//       //       aa.motion.dy = temps[1];
//       //     }
//       //   }
//       // });
//     }
//   });
// };

// if (Number(i) === GAME.videoFeed) {
//   if (GAME.forward === true) {
//     a.motion.dy = a.motion.dy - SPEED_CONSTANT * DELTA;
//   }

//   if (GAME.back === true) {
//     a.motion.dy = a.motion.dy + SPEED_CONSTANT * DELTA;
//   }

//   if (GAME.left === true) {
//     a.motion.dx = a.motion.dx - SPEED_CONSTANT * DELTA;
//   }

//   if (GAME.right === true) {
//     a.motion.dx = a.motion.dx + SPEED_CONSTANT * DELTA;
//   }
// }

// const actorsCollide = (
//   a: FloatPositionComponent,
//   b: FloatPositionComponent
// ) => {
//   return distanceBetweenActorsV1(a.x, a.y, b.x, b.y);
//   // return distanceBetweenActorsV0(a, b);
// };

// const illuminate = (xFloat: number, yFloat: number): any => {
//   const x = Math.round(xFloat);
//   const y = Math.round(yFloat);
//   const mSize = MapSize;
//   // console.log("illuminate", x, y, mSize);
//   // if (!spaces[Math.round(y)]) {
//   //   return null;
//   // }
//   if (x < 0) {
//     return null;
//   }
//   if (x > mSize - 1) {
//     return null;
//   }
//   if (y < 0) {
//     return null;
//   }
//   if (y > mSize - 1) {
//     return null;
//   }
//   // const litableComponent = incasters[eid];

//   const space = setPieces.at(x, y);
//   const lightableIdOfSpace = space.incasterId;
//   const incaster = incasters.store[lightableIdOfSpace]; //(incasters.find((a) => a[0] === lightableIdOfSpace) as [string, LightOutcastingComponent]);

//   if (!incaster) {
//     // console.error("litable not found");

//     return;
//   }

//   // const [eid3, litableComponent] = litable;
//   incaster.luminance = 2;

//   const s = setPieces.at(x, y);

//   if (s.luminance !== incaster.luminance) {
//     s.luminance = incaster.luminance;
//   }
// };

// const distanceBetweenActorsV0 = (
//   a: PhysicsActorComponent,
//   b: PhysicsActorComponent
// ) => {
//   return Math.hypot(b.x - a.x, b.y - a.y);
// };

// this implementation is faster and uses less memory, causing fewer GCs

// function distanceBetweenFloats(
//   p: FloatPositionComponent,
//   pp: FloatPositionComponent
// ): number {
//   return distanceV2(p.x, p.y, pp.x, pp.y);
// }

// function distanceBetweenIntegers(
//   p: IntegerPositionComponent,
//   pp: IntegerPositionComponent
// ): number {
//   return distanceV2(
//     p.x * TileSize,
//     p.y * TileSize,
//     pp.x * TileSize,
//     pp.y * TileSize
//   );
// }

// function distanceBetweenFloatAndIntegerPostion(
//   i: IntegerPositionComponent,
//   ff: FloatPositionComponent
// ): number {
//   // debug
//   return distanceV2(i.x, i.y, ff.x, ff.y);
// }

// function boundaryCheckTile(ipc: IntegerPositionComponent) {
//   if (ipc.x < 0) {
//     ipc.x = MapSize;
//   }
//   if (ipc.x > MapSize) {
//     ipc.x = 0;
//   }
//   if (ipc.y < 0) {
//     ipc.y = MapSize;
//   }
//   if (ipc.y > MapSize) {
//     ipc.y = 0;
//   }
// }

// function updateTilePosition(
//   p: IntegerPositionComponent,
//   f: OridinalMovingComponent
// ) {
//   throw "method not implemented";
// }

// function runIlluminationRandom() {
//   drawables.each(([did, [didd, drawable], k]) => {
//     drawable.sprite.visible = Math.random() > 0.5;
//   });
// }

// function runIlluminationV2() {
//   // for each thing which can receive light
//   incasters.each(([rid, reciver]) => {
//     // for each thing which can emit light
//     outcasters.each(([emid, emitter, endx]) => {

//       // for each thing with an integer position aka tiles
//       ips.each(([ipid, integerPosition]) => {
//         // if the integer position matches the receiver
//         if (ipid === rid) {
//           // for each thing with a floating position
//           fps.store.forEach(([fpeid, floatPosition]) => {

//             // if the floating position matches the receiver
//             if (fpeid === fps.store[emid][0]) {
//               const d = withinRangeV2(floatPosition, integerPosition[1]);

//               if (d) {
//                 reciver.luminance = reciver.luminance + emitter[1].radiance;
//               }
//             }
//           });
//         }
//       });
//     });

//     const d = light2Draw[rid];
//     d.mesh.visible = reciver.luminance > 0;
//     d.sprite.visible = reciver.luminance > 0;
//   });
// }

// function runIlluminationV3() {
//   // for each thing which can receive light
//   incasters.each(([rid, reciver]) => {
//     const integerPositionV2 = light2IntegerPosition[rid];

//     if (integerPositionV2) {
//       fps.store.forEach(([fpeid, floatPosition]) => {
//         const d = withinRangeV2(floatPosition, integerPositionV2);

//         if (d) {
//           const emitterV2 = fp2Emitter[fpeid];
//           reciver.luminance = reciver.luminance + emitterV2.radiance;

//           // for each thing which can emit light
//           // outcasters.each(([emid, emitter, endx]) => {
//           //   // if the floating position matches the receiver
//           //   if (fpeid === fps.store[emid][0]) {
//           //     if (d) {
//           //       reciver.luminance = reciver.luminance + emitter[1].radiance;
//           //     }
//           //   }
//           // });
//         }
//       });
//     }

//     // for each thing with an integer position aka tiles
//     // ips.each(([ipid, integerPosition]) => {
//     //   // if the integer position matches the receiver
//     //   if (ipid === rid) {
//     //     // for each thing with a floating position

//     //   }
//     // });

//     const d = light2Draw[rid];
//     d.mesh.visible = reciver.luminance > 0;
//     d.sprite.visible = reciver.luminance > 0;
//   });
// }

// function runIlluminationV4() {
//   // // for each thing which can receive light
//   // incasters.each(([rid, reciver]) => {
//   //   const d = light2Draw[rid];
//   //   d.mesh.visible = reciver.luminance > 0;
//   //   d.sprite.visible = reciver.luminance > 0;
//   // });
//   // for (let y = 0; y < MapSize; y++) {
//   //   // setPieces.store[y] = [];
//   //   for (let x = 0; x < MapSize; x++) {
//   //     setPieces.store[y][x].drawing.mesh.visible = map.tiles[y][x].visible;
//   //     setPieces.store[y][x].drawing.sprite.visible = map.tiles[y][x].visible;
//   //     // if (setPieces.store[y][x])
//   //     // setPieces.store[y][x] = new SetPieceComponent();

//   //     // for (let yy = 0; yy < MapSize; yy++) {
//   //     //   setPieces.store[y][x].FOV[yy] = [];
//   //     //   for (let xx = 0; xx < MapSize; xx++) {
//   //     //     setPieces.store[y][x].FOV[yy][xx] = distanceV2(x, y, xx, yy);
//   //     //   }
//   //     // }
//   //   }
//   // }
// }

// function runIlluminationV5() {
//   // for each thing which can receive light
//   incasters.each(([rid, reciver]) => {
//     // for each thing which can emit light
//     outcasters.each(([emid, emitter, endx]) => {
//       // for each thing with an integer position aka tiles
//       // for each thing with a floating position
//       fps.store.forEach(([fpeid, floatPosition]) => {
//         // if the floating position matches the receiver

//         if (fpeid === fps.store[emid][0]) {
//           compute(
//             map,
//             [Math.round(floatPosition.x), Math.round(floatPosition.y)],
//             VisRange
//           );

//           for (let y = 0; y < MapSize; y++) {
//             for (let x = 0; x < MapSize; x++) {
//               if (!setPieces.store[y][x].drawing.mesh.visible) {
//                 setPieces.store[y][x].drawing.mesh.visible =
//                   map.tiles[x][y].visible;
//               }

//               if (!setPieces.store[y][x].drawing.sprite.visible) {
//                 setPieces.store[y][x].drawing.sprite.visible =
//                   map.tiles[y][x].visible;
//               }

//               // if (setPieces.store[y][x])
//               // setPieces.store[y][x] = new SetPieceComponent();

//               // for (let yy = 0; yy < MapSize; yy++) {
//               //   setPieces.store[y][x].FOV[yy] = [];
//               //   for (let xx = 0; xx < MapSize; xx++) {
//               //     setPieces.store[y][x].FOV[yy][xx] = distanceV2(x, y, xx, yy);
//               //   }
//               // }
//             }
//           }
//         }
//       });
//     });

//     const drawing = light2Draw[rid];
//     drawing.mesh.visible = reciver.luminance > 0;
//     drawing.sprite.visible = reciver.luminance > 0;
//   });
// }

// function runIlluminationV6() {
//   outcasters.each(([emid, emitter, endx]) => {
//     const d = light2Draw[emid];
//     if (d) {
//       // for each thing with an integer position aka tiles
//       // for each thing with a floating position
//       fps.store.forEach(([fpeid, floatPosition]) => {
//         // if the floating position matches the receiver

//         if (fpeid === fps.store[emid][0]) {
//           compute(
//             map,
//             [Math.round(floatPosition.x), Math.round(floatPosition.y)],
//             VisRange
//           );

//           for (let y = 0; y < MapSize; y++) {
//             for (let x = 0; x < MapSize; x++) {
//               if (!setPieces.store[y][x].drawing.mesh.visible) {
//                 setPieces.store[y][x].drawing.mesh.visible =
//                   map.tiles[x][y].visible;
//               }

//               if (!setPieces.store[y][x].drawing.sprite.visible) {
//                 setPieces.store[y][x].drawing.sprite.visible =
//                   map.tiles[y][x].visible;
//               }

//               // if (setPieces.store[y][x])
//               // setPieces.store[y][x] = new SetPieceComponent();

//               // for (let yy = 0; yy < MapSize; yy++) {
//               //   setPieces.store[y][x].FOV[yy] = [];
//               //   for (let xx = 0; xx < MapSize; xx++) {
//               //     setPieces.store[y][x].FOV[yy][xx] = distanceV2(x, y, xx, yy);
//               //   }
//               // }
//             }
//           }
//         }
//       });
//       const drawing = light2Draw[rid];
//     drawing.mesh.visible = reciver.luminance > 0;
//     drawing.sprite.visible = reciver.luminance > 0;
//     }
//   });
// }

// for each thing with an integer position aka tiles
// ips.each(([ipid, integerPosition]) => {
//   // if the integer position matches the receiver
//   if (ipid === rid) {
//     // for each thing with a floating position

//   }
// });

//     const d = light2Draw[rid];
//     d.mesh.visible = reciver.luminance > 0;
//     d.sprite.visible = reciver.luminance > 0;
//   });
// }

// run boundary check for things that move

// const withinRange = (
//   f: FloatPositionComponent,
//   i: IntegerPositionComponent
// ): boolean => {
//   const d = distanceBetweenFloatAndIntegerPostion(f, i);
//   return d < VisRange;
// };

// const withinRangeV2 = (
//   f: FloatPositionComponent,
//   i: IntegerPositionComponent
// ): boolean => {
//   // const d = distanceBetweenFloatAndIntegerPostion(f, i);

//   const x = Math.round(f.x);
//   const y = Math.round(f.y);
//   const xx = i.x;
//   const yy = i.y;

//   /////////////////////////////
//   if (x >= MapSize) {
//     return false;
//   }
//   if (x < 0) {
//     return false;
//   }
//   if (y >= MapSize) {
//     return false;
//   }
//   if (y < 0) {
//     return false;
//   }
//   /////////////////////////////
//   if (xx >= MapSize) {
//     return false;
//   }
//   if (xx < 0) {
//     return false;
//   }
//   if (yy >= MapSize) {
//     return false;
//   }
//   if (yy < 0) {
//     return false;
//   }

//   /////////////////////////////

//   const fov = setPieces.store[y][x].FOV[yy][xx];
//   return fov < VisRange;
// };

// actorsStore.store.forEach(([i, a], n) => {
//   // x and y are the "look ahead" pointer
//   let x = Math.round(a.x + a.dx);
//   if (x >= MapSize - 1) x = 0;
//   if (x < 0) x = MapSize - 1;
//   let y = Math.round(a.y + a.dy);
//   if (y >= MapSize - 1) y = 0;
//   if (y < 0) y = MapSize - 1;

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /**
//  *  This is a javascript port of https://github.com/initrl/MRPAS-Python
//  *  I suspect this code could be a lot shorter & cleaner
//  */

// var Tile = function () {
//   this.wall = false;
//   this.visible = false;
// };

// var Map = function (size) {
//   //size: [x, y]
//   this.size = size;
//   this.tiles = [];
//   for (var x = 0; x < this.size[0]; x++) {
//     var row = [];
//     for (var y = 0; y < this.size[1]; y++) {
//       row.push(new Tile());
//     }
//     this.tiles.push(row);
//   }
// };

// Map.prototype.get_tile = function (pos) {
//   if (this.tiles[pos[0]] && this.tiles[pos[0]][pos[1]]) {
//     return this.tiles[pos[0]][pos[1]];
//   }
//   return null;
// };

// Map.prototype.iter = function (callback, context) {
//   //iterate over all tiles, callbing callback with position & tile
//   for (var x = 0; x < this.size[0]; x++) {
//     for (var y = 0; y < this.size[1]; y++) {
//       callback.apply(context, [[x, y], this.tiles[x][y]]);
//     }
//   }
// };

// Map.prototype.reset_visibility = function () {
//   //sets all tiles as not visible
//   this.iter(function (pos, tile) {
//     tile.visible = false;
//   });
// };

// Map.prototype.set_visible = function (pos) {
//   this.tiles[pos[0]][pos[1]].visible = true;
// };

// Map.prototype.is_visible = function (pos) {
//   return this.tiles[pos[0]][pos[1]].visible;
// };

// Map.prototype.is_transparent = function (pos) {
//   return !this.tiles[pos[0]][pos[1]].wall;
// };

// function compute_quadrant(map, position, maxRadius, dx, dy) {
//   var startAngle = new Array();
//   startAngle[99] = undefined;
//   var endAngle = startAngle.slice(0);
//   //octant: vertical edge:
//   var iteration = 1;
//   var done = false;
//   var totalObstacles = 0;
//   var obstaclesInLastLine = 0;
//   var minAngle = 0.0;
//   var x = 0.0;
//   var y = position[1] + dy;
//   var c;
//   var wsize = map.size;

//   var slopesPerCell,
//     halfSlopes,
//     processedCell,
//     minx,
//     maxx,
//     pos,
//     visible,
//     startSlope,
//     centerSlope,
//     endSlope,
//     idx;
//   //do while there are unblocked slopes left and the algo is within
//   // the map's boundaries
//   //scan progressive lines/columns from the PC outwards
//   if (y < 0 || y >= wsize[1]) done = true;
//   while (!done) {
//     //process cells in the line
//     slopesPerCell = 1.0 / (iteration + 1);
//     halfSlopes = slopesPerCell * 0.5;
//     processedCell = parseInt(minAngle / slopesPerCell);
//     minx = Math.max(0, position[0] - iteration);
//     maxx = Math.min(wsize[0] - 1, position[0] + iteration);
//     done = true;
//     x = position[0] + processedCell * dx;
//     while (x >= minx && x <= maxx) {
//       pos = [x, y];
//       visible = true;
//       startSlope = processedCell * slopesPerCell;
//       centerSlope = startSlope + halfSlopes;
//       endSlope = startSlope + slopesPerCell;
//       if (obstaclesInLastLine > 0 && !map.is_visible(pos)) {
//         idx = 0;
//         while (visible && idx < obstaclesInLastLine) {
//           if (map.is_transparent(pos)) {
//             if (centerSlope > startAngle[idx] && centerSlope < endAngle[idx])
//               visible = false;
//           } else if (startSlope >= startAngle[idx] && endSlope <= endAngle[idx])
//             visible = false;
//           if (
//             visible &&
//             (!map.is_visible([x, y - dy]) ||
//               !map.is_transparent([x, y - dy])) &&
//             x - dx >= 0 &&
//             x - dx < wsize[0] &&
//             (!map.is_visible([x - dx, y - dy]) ||
//               !map.is_transparent([x - dx, y - dy]))
//           )
//             visible = false;
//           idx += 1;
//         }
//       }
//       if (visible) {
//         map.set_visible(pos);
//         done = false;
//         //if the cell is opaque, block the adjacent slopes
//         if (!map.is_transparent(pos)) {
//           if (minAngle >= startSlope) minAngle = endSlope;
//           else {
//             startAngle[totalObstacles] = startSlope;
//             endAngle[totalObstacles] = endSlope;
//             totalObstacles += 1;
//           }
//         }
//       }
//       processedCell += 1;
//       x += dx;
//     }
//     if (iteration == maxRadius) done = true;
//     iteration += 1;
//     obstaclesInLastLine = totalObstacles;
//     y += dy;
//     if (y < 0 || y >= wsize[1]) done = true;
//     if (minAngle == 1.0) done = true;
//   }

//   //octant: horizontal edge
//   iteration = 1; //iteration of the algo for this octant
//   done = false;
//   totalObstacles = 0;
//   obstaclesInLastLine = 0;
//   minAngle = 0.0;
//   x = position[0] + dx; //the outer slope's coordinates (first processed line)
//   y = 0;
//   //do while there are unblocked slopes left and the algo is within the map's boundaries
//   //scan progressive lines/columns from the PC outwards
//   if (x < 0 || x >= wsize[0]) done = true;
//   while (!done) {
//     //process cells in the line
//     slopesPerCell = 1.0 / (iteration + 1);
//     halfSlopes = slopesPerCell * 0.5;
//     processedCell = parseInt(minAngle / slopesPerCell);
//     const miny = Math.max(0, position[1] - iteration);
//     const maxy = Math.min(wsize[1] - 1, position[1] + iteration);
//     done = true;
//     y = position[1] + processedCell * dy;
//     while (y >= miny && y <= maxy) {
//       //calculate slopes per cell
//       pos = [x, y];
//       visible = true;
//       startSlope = processedCell * slopesPerCell;
//       centerSlope = startSlope + halfSlopes;
//       endSlope = startSlope + slopesPerCell;
//       if (obstaclesInLastLine > 0 && !map.is_visible(pos)) {
//         idx = 0;
//         while (visible && idx < obstaclesInLastLine) {
//           if (map.is_transparent(pos)) {
//             if (centerSlope > startAngle[idx] && centerSlope < endAngle[idx])
//               visible = false;
//           } else if (startSlope >= startAngle[idx] && endSlope <= endAngle[idx])
//             visible = false;

//           if (
//             visible &&
//             (!map.is_visible([x - dx, y]) ||
//               !map.is_transparent([x - dx, y])) &&
//             y - dy >= 0 &&
//             y - dy < wsize[1] &&
//             (!map.is_visible([x - dx, y - dy]) ||
//               !map.is_transparent([x - dx, y - dy]))
//           )
//             visible = false;
//           idx += 1;
//         }
//       }
//       if (visible) {
//         map.set_visible(pos);
//         done = false;
//         //if the cell is opaque, block the adjacent slopes
//         if (!map.is_transparent(pos)) {
//           if (minAngle >= startSlope) minAngle = endSlope;
//           else {
//             startAngle[totalObstacles] = startSlope;
//             endAngle[totalObstacles] = endSlope;
//             totalObstacles += 1;
//           }
//         }
//       }
//       processedCell += 1;
//       y += dy;
//     }
//     if (iteration == maxRadius) done = true;
//     iteration += 1;
//     obstaclesInLastLine = totalObstacles;
//     x += dx;
//     if (x < 0 || x >= wsize[0]) done = true;
//     if (minAngle == 1.0) done = true;
//   }
// }

// function compute(map, position, vision_range) {
//   map.reset_visibility();
//   map.set_visible(position); //player can see himself
//   //compute the 4 quadrants of the map
//   compute_quadrant(map, position, vision_range, 1, 1);
//   compute_quadrant(map, position, vision_range, 1, -1);
//   compute_quadrant(map, position, vision_range, -1, 1);
//   compute_quadrant(map, position, vision_range, -1, -1);
// }

// //
// // const MapBoundHigh = MapSize - 1;

// // let eidOfActorsLightToPostion: Record<number, FloatPositionComponent> = {};

// // function runIllumination() {
// //   // loop over light emitters
// //   outcasters.store.forEach(([eidOfLight, lightingComponent]) => {
// //     const { classification, floatPosition } = lights.get(eidOfLight);

// //     if (classification === "SpaceTrashBot") {
// //       // const p = fps.get(eidOfClassification);
// //       // const p = eidOfActorsLightToPostion[eidOfClassification];
// //       // const p: FloatPositionComponent = lights.get(eidOfLight)

// //       // if (!p) throw "floating position component not found";

// //       runIlluminationBot(eidOfLight, floatPosition, lightingComponent);
// //     } else if (classification === "Tile") {
// //       throw "lighting tiles is not implemented";
// //       // const p = ips.get(eidOfClassification);
// //       // if (!p) throw "integer position component not found";

// //       // runIlluminationTile(eidOfLight, p, lightingComponent);
// //     }

// //     // classs.store.forEach(([eidOfClassification, classification]) => {
// //     //   if (eidOfClassification === eidOfLight) {
// //     //     let p: FloatPositionComponent | IntegerPositionComponent;

// //     //   }
// //     // });

// //     // if (!positionOfLightingEntity)
// //     //   throw "a lighting entity should have a position";
// //     // const positionOfLight: FloatPositionComponent =
// //     //   positionOfLightingEntity[1];

// //     // loop over light receivers
// //     // incasters.store.forEach(([eid, littableComponent]) => {
// //     //   const positionOfLittableEntity = fps.store.find(
// //     //     (a) => a[0] === eid
// //     //   );

// //     //   if (!positionOfLittableEntity)
// //     //     throw "a littable entity should have a position";
// //     //   const positionOfLight: FloatPositionComponent =
// //     //     positionOfLightingEntity[1];
// //     // });
// //   });
// // }

// // illuminate from a bot at p with l
// // function runIlluminationBot(
// //   eidOfLight: number,
// //   fpc: FloatPositionComponent,
// //   lc: LightOutcastingComponent
// // ) {
// //   // loop over light recivers
// //   incasters.each(([eidOfLightable, l]) => {
// //     // incasters.store.forEach(([eidOfLightable, l]) => {
// //     const { classification, floatPosition } = lights.get(eidOfLight);

// //     let p: FloatPositionComponent | IntegerPositionComponent;
// //     if (classification === "SpaceTrashBot") {
// //       // runIlluminationBotToBot(fpc, eidOfLight, floatPosition);
// //     } else if (classification === "Tile") {
// //       runIlluminationBotToTile(fpc, eidOfLightable, floatPosition);
// //     }

// //     // if (!positionOfLightingEntity)
// //     //   throw "a lighting entity should have a position";
// //     // const positionOfLight: FloatPositionComponent =
// //     //   positionOfLightingEntity[1];

// //     // loop over light receivers
// //     // incasters.store.forEach(([eid, littableComponent]) => {
// //     //   const positionOfLittableEntity = fps.store.find(
// //     //     (a) => a[0] === eid
// //     //   );

// //     //   if (!positionOfLittableEntity)
// //     //     throw "a littable entity should have a position";
// //     //   const positionOfLight: FloatPositionComponent =
// //     //     positionOfLightingEntity[1];
// //     // });
// //   });
// // }

// // function runIlluminationTile(
// //   eidOfLight: number,
// //   p: IntegerPositionComponent,
// //   l: LightOutcastingComponent
// // ) {
// //   throw "method not implemented";
// //   // incasters.store.forEach(([eid, littableComponent]) => { })
// // }

// // function runIlluminationBotToBot(
// //   p: FloatPositionComponent,
// //   eidOfLitable: number,
// //   p2: FloatPositionComponent
// // ) {
// //   if (distanceBetweenFloats(p, p2) < VisRange) {
// //     // actors.get(eidOfLitable).luminance = 1;
// //   }
// // }

// // function runIlluminationTileToBot(
// //   p: IntegerPositionComponent,
// //   eidOfLitable: number,
// //   p2: FloatPositionComponent
// // ) {
// //   if (distanceBetweenFloatAndIntegerPostion(p, p2) < VisRange) {
// //     // actors.get(eidOfLitable).luminance = 1;
// //   }
// // }

// // function runIlluminationTileToTile(
// //   p: IntegerPositionComponent,
// //   eidOfLitable: number,
// //   p2: IntegerPositionComponent
// // ) {
// //   if (distanceBetweenIntegers(p, p2) < VisRange) {
// //     setPieces[eidOfLitable].luminance = 1;
// //   }
// // }

// // function runIlluminationBotToTile(
// //   p: FloatPositionComponent,
// //   eidOfLitable: number,
// //   p2: IntegerPositionComponent
// // ) {
// //   if (distanceBetweenFloatAndIntegerPostion(p2, p) < VisRange) {
// //     setPieces[eidOfLitable].luminance = 1;
// //   }
// // }

// function scanFrustum() {
//   GAME.camera.updateMatrix();
//   GAME.camera.updateMatrixWorld();
//   matrix.multiplyMatrices(
//     GAME.camera.projectionMatrix,
//     GAME.camera.matrixWorldInverse
//   );
//   frustum.setFromProjectionMatrix(matrix);

//   let itemsInFrustum: THREE.Object3D<Object3DEventMap>[] = [];

//   GAME.scene.traverse(function (object) {
//     if (object.isMesh) {
//       if (
//         frustum.containsPoint(object.position) ||
//         frustum.intersectsObject(object)
//       ) {
//         itemsInFrustum.push(object);
//       }
//     }
//   });

//   const origin = GAME.camera.position.clone();

//   itemsInFrustum.forEach((object3d) => {
//     ////////////////////////////////////////////

//     const vis = drawables.findByMeshId(object3d.uuid);
//     vis.sprite.visible = true;

//     ////////////////////////////////////////////
//     // const direction = object3d.position.clone().sub(origin).normalize(); // Calculate direction from object1 to object2 and normalize it
//     // raycaster.set(origin, direction);
//     // // raycaster.params.Mesh = 10;
//     // // raycaster.params.LOD = 0.1;
//     // const intersects = raycaster.intersectObjects(itemsInFrustum, true); // Check for intersection with object2

//     // intersects.forEach((i, n) => {
//     //   if (n < 2) {
//     //     const vis = drawables.findByMeshId(i.object.uuid);
//     //     vis.sprite.visible = true;
//     //   }
//     // })

//     // if (intersects.length > 0) {
//     //   if (intersects[0].object.uuid === object3d.uuid) {
//     //     vis.sprite.visible = true;
//     //   }
//     // }

//     ////////////////////////////////////////////
//   });
// }

// function distanceBetweenActorsV1(x, y, x0, y0) {
//   const squaredDist = (x - x0) * (x - x0) + (y - y0) * (y - y0);
//   return squaredDist <= Math.sqrt(ActorSize / 2);
// }

// function runIlluminationV7(fovMap) {
//   outcasters.each(([ns, [emid, outCaster], n]) => {
//     let emitterPostion = fps.get(emid);

//     if (emitterPostion) {
//       let x = Math.round(emitterPostion.x);
//       if (x >= MapSize - 1) x = 0;
//       if (x < 0) x = MapSize - 1;

//       let y = Math.round(emitterPostion.y);
//       if (y >= MapSize - 1) y = 0;
//       if (y < 0) y = MapSize - 1;

//       if (setPieces.store[y][x]) {
//         // illuminate the space upon which we stand
//         illuminate(emitterPostion.x, emitterPostion.y);

//         // const fov = WarpField.computeFieldOfView(fovMap, x, y, 20);

//         // (di, dj) is a vector - direction in which we move right now
//         let di = 1;
//         let dj = 0;
//         // length of current segment
//         let segment_length = 1;
//         // current position (i, j) and how much of current segment we passed
//         let i = 0;
//         let j = 0;
//         let segment_passed = 0;
//         // for (int k = 0; k < NUMBER_OF_POINTS; ++k) {
//         for (let k = 0; k < Math.pow(25, 2) - 1; k++) {
//           // make a step, add 'direction' vector (di, dj) to current position (i, j)
//           i += di;
//           j += dj;
//           ++segment_passed;
//           // if (x > MapSize) break;
//           // if (x < 0) break;
//           // if (y > MapSize) break;
//           // if (y < 0) break;
//           // console.log("ensetpiecetity", setpiece(i + e.x, j + e.y))
//           // const eId = littableActorsUpon(x, y)?.entity;
//           // const entity = entities[eId];
//           // if (entity) {
//           //   // console.log("entity", entity)
//           //   if (entity.tileType !== "FloorTile") {
//           //     onTarget = true;
//           //     // console.log("collide!", x, y, entity)
//           //   } else {
//           //     onTarget = false;
//           //   }
//           // } else {
//           //   // console.log("idk", eId, x, y)
//           // }

//           const x2 = Math.round(j + x);
//           const y2 = Math.round(i + y);
//           // const isVisible = fov.getVisible(x2, y2);
//           // console.log("x, y", x, y);
//           // console.log("i, j", i, j);
//           // console.log("x2, y2", x2, y2);
//           // console.log(isVisible);
//           // if (x < 0) debugger
//           // illuminate(MapSize / 2, MapSize / 2);

//           // TODO
//           if (true) {
//             illuminate(x2, y2);
//           }

//           if (segment_passed == segment_length) {
//             // done with current segment
//             segment_passed = 0;
//             // 'rotate' directions
//             let buffer = di;
//             di = -dj;
//             dj = buffer;
//             // increase segment length if necessary
//             if (dj == 0) {
//               ++segment_length;
//             }
//           }
//         }
//       }
//     }
//     // debugger;

//     // if (!phaseZero[Math.round(actor.y)]) {
//     //   phaseZero[Math.round(actor.y)] = [];
//     // }
//     // find the floor underneath and any entities on top
//     // let x = Math.round(actor.x);
//     // let y = Math.round(actor.y);
//     // if (x >= MapSize) x = 0;
//     // if (y >= MapSize) y = 0;
//   });
// }
