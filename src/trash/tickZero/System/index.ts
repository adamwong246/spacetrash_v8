// import * as THREE from "three";
// import { SpaceTrash } from "../../Game/6-WithStateSpace.tsx";

// import { Eid2PMComponent } from "../Components/v2/eid2PMC.ts";
// import { ArcadePhysicsComponent } from "../Components/v4/PhaserArcade.ts";
// import { FOV } from "rot-js";
// import { TankMovingComponent } from "../Components/v4/TankMovingComponent.ts";
// import { SpaceTrashSystem0 } from "./System0.ts";
// import {
//   MapSize,
//   FRICTION_CONSTANT,
//   TANK_VELOCITY_ANGULAR,
//   TileSize,
//   TANK_VELOCITY_LINEAR,
// } from "../../Constants.ts";
// import {
//   FloatMovingComponent,
//   FloatPositionComponent,
// } from "../../../engine/game/physical.ts";
// import { distanceV2, averageNeighborsInPlace } from "./lib.ts";

// export type ISpaceTrashSystems = `physical` | "casting";

// export class SpaceTrashSystem extends SpaceTrashSystem0 {
//   constructor(game: SpaceTrash, mapSize: number) {
//     super(game, mapSize);
//   }

//   tick(delta: number): Promise<boolean> {
//     return new Promise(async (res) => {
//       this.updateSetPieces();
//       this.resetIllumination();
//       this.resetRadiation();
//       this.runAI(delta);
//       this.runTankPhysics();
//       this.runArcadePhysics();
//       this.runRadiationScan();
//       this.runHeatSpread();
//       this.runUpdateUI();
//       this.runFloatingPhysics();
//       this.rotLighting();
//     });
//   }

//   updateSetPieces() {
//     for (let y = 0; y < MapSize; y++) {
//       for (let x = 0; x < MapSize; x++) {
//         // SetPieces.store[y][x].actorIds = Actors.byXandY(x, y);
//       }
//     }
//   }

//   runTankPhysics() {
//     this.game.components.TankMovingComponent.each((t, eid) => {
//       const { position, classification } = this.game.components.Eid2PM.take(
//         eid
//       ) as unknown as {
//         position: ArcadePhysicsComponent;
//         classification: string;
//       };

//       if (classification === "SpaceTrashBot") {
//         // const direction = dds.get(eid);
//         const direction =
//           this.game.components.ArcadePhysicsComponent.take(eid)?.arcadeObject
//             .rotation;

//         // boundaryCheckBot(position);
//         // collisionsAndVideoControls();
//         this.updateTankPosition(position, t, eid);

//         this.game.components.DrawableComponent.updateFromArcadePhysics(
//           eid,
//           position
//         );

//         // if (
//         //   oldDir !== direction.r ||
//         //   oldX !== position.arcadeObject.position.x ||
//         //   oldY !== position.arcadeObject.position.y
//         // ) {
//         //   drawables.updateFromArcadePhysics(eid, position);
//         // }
//       } else if (classification === "Tile") {
//         throw "not implemented";
//       } else {
//         debugger;
//         throw "idk";
//       }
//     });
//   }

//   boundaryCheckBot(fpc: FloatPositionComponent) {
//     if (fpc.x < 0) {
//       fpc.x = MapSize;
//     }
//     if (fpc.x > MapSize) {
//       fpc.x = 0;
//     }
//     if (fpc.y < 0) {
//       fpc.y = MapSize;
//     }
//     if (fpc.y > MapSize) {
//       fpc.y = 0;
//     }
//   }

//   updateVelocity(f: number): number {
//     return f * FRICTION_CONSTANT; //f * DELTA * FRICTION_CONSTANT;
//   }

//   updateTankMovement(f: TankMovingComponent, eid: number) {
//     const videoBot = Object.entries(this.game.bots).find((v) => {
//       return v[1][0] === eid && Number(v[0]) === this.game.videoFeed;
//     });

//     if (!videoBot) return;

//     if (videoBot) {
//       if (this.game.movingForward()) {
//         f.j = "forth";
//       } else if (this.game.movingBack()) {
//         f.j = "back";
//       } else if (this.game.movingLeft()) {
//         f.i = "left";
//       } else if (this.game.movingRight()) {
//         f.i = "right";
//       } else {
//         f.i = "none";
//         f.j = "none";
//       }
//     }
//   }

//   updateFloatingMovement(f: FloatMovingComponent) {
//     f.dx = this.updateVelocity(f.dx);
//     f.dy = this.updateVelocity(f.dy);
//   }

//   updateFloatPosition(
//     p: FloatPositionComponent,
//     f: FloatMovingComponent
//   ): boolean {
//     this.updateFloatingMovement(f);
//     const prevX = Math.round(p.x);
//     const prevY = Math.round(p.y);
//     p.x = p.x + f.dx; // * DELTA * VELOCITY_CONSTANT;
//     p.y = p.y + f.dy; // * DELTA * VELOCITY_CONSTANT;
//     const nextX = Math.round(p.x);
//     const nextY = Math.round(p.y);

//     const hasChangedPosition = prevY !== nextY || prevX !== nextX;
//     return hasChangedPosition;
//   }

//   updateTankPosition(
//     p: ArcadePhysicsComponent,
//     f: TankMovingComponent,
//     eid: number,
//     delta: number
//   ): boolean {
//     let isMoving: boolean;
//     if (f.i === "none" && f.j === "none") {
//       isMoving = false;
//     } else {
//       isMoving = true;
//     }

//     this.updateTankMovement(f, eid);

//     if (f.i === "left") {
//       p.arcadeObject.rotation = p.arcadeObject.rotation - TANK_VELOCITY_ANGULAR;
//     }
//     if (f.i === "right") {
//       p.arcadeObject.rotation = p.arcadeObject.rotation + TANK_VELOCITY_ANGULAR;
//     }
//     if (f.i === "none") {
//     }

//     if (f.j === "forth") {
//       p.arcadeObject.setAccelerationX(
//         Math.cos(p.arcadeObject.rotation - 1.5708) *
//           TANK_VELOCITY_LINEAR *
//           delta
//       );
//       p.arcadeObject.setAccelerationY(
//         Math.sin(p.arcadeObject.rotation - 1.5708) *
//           TANK_VELOCITY_LINEAR *
//           delta
//       );
//     }
//     if (f.j === "back") {
//       p.arcadeObject.setAccelerationX(
//         Math.cos(p.arcadeObject.rotation - 1.5708) *
//           TANK_VELOCITY_LINEAR *
//           delta *
//           -1
//       );
//       p.arcadeObject.setAccelerationY(
//         Math.sin(p.arcadeObject.rotation - 1.5708) *
//           TANK_VELOCITY_LINEAR *
//           delta *
//           -1
//       );
//     }
//     if (f.j === "none") {
//       p.arcadeObject.setAccelerationX(0);
//       p.arcadeObject.setAccelerationY(0);
//     }

//     return isMoving;
//   }

//   resetIllumination() {
//     this.game.components.DrawableComponent.each((d, deid) => {
//       // d.sprite.visible = false;
//       // d.mesh.visible = false;
//       d.sprite.visible = false;
//       d.mesh.visible = false;
//     });
//     // LightIncastingComponent.each((z, zeid) => {
//     //   z.luminance = 0;
//     // });
//     // for (let y = 0; y < MapSize; y++) {
//     //   for (let x = 0; x < MapSize; x++) {
//     //     SetPieces.store[y][x].luminance = -1;
//     //   }
//     // }
//   }

//   rotLighting() {
//     function lightPasses(x, y) {
//       if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
//         const z = this.game.components.SetPieces.at(x, y);

//         if (z && z.tileType === "WallTile") {
//           return false;
//         } else {
//           return true;
//         }
//       }
//       return false;

//       // var key = x + "," + y;
//       // if (key in data) {
//       //   return data[key] == 0;
//       // }
//       // return false;
//     }

//     // var fov = new FOV.PreciseShadowcasting(lightPasses);
//     var fov = new FOV.RecursiveShadowcasting(lightPasses);

//     const lightMap = new Map();

//     /* output callback */
//     fov.compute(
//       Math.round(this.game.camera.position.x / TileSize),
//       Math.round(this.game.camera.position.y / TileSize),
//       10,
//       function (x, y, r) {
//         if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
//           // console.log(r)
//           lightMap.set(`${x}-${y}`, r);

//           // const z = setPieces.at(x, y);

//           // if (visibility === 1 && z && z.drawing) {
//           //   z.drawing.sprite.visible = true;
//           //   z.drawing.mesh.visible = true;
//           // }
//           // if (visibility === 0 && z && z.drawing) {
//           //   z.drawing.sprite.visible = false;
//           //   z.drawing.mesh.visible = false;
//           // }

//           // actors.each((aid, ac) => {
//           //   ac.position.
//           //   // const a = actors.positionOf(Number(aid))
//           //   // // if () {

//           //   // // }
//           // })
//           // console.log(z.actorIds)
//           // z.actorIds.forEach((aid) => {
//           //   drawables.get(aid).sprite.visible = true;
//           //   drawables.get(aid).mesh.visible = true;
//           //   // const actor = actors.get(aid);
//           //   // act
//           // })
//         }
//       }
//     );

//     let colors = {
//       1: new THREE.MeshBasicMaterial({ color: 0xffffff }),
//       2: new THREE.MeshBasicMaterial({ color: 0xe0e0e0 }),
//       3: new THREE.MeshBasicMaterial({ color: 0xc0c0c0 }),
//       4: new THREE.MeshBasicMaterial({ color: 0xa0a0a0 }),
//       5: new THREE.MeshBasicMaterial({ color: 0x808080 }),
//       6: new THREE.MeshBasicMaterial({ color: 0x606060 }),
//       7: new THREE.MeshBasicMaterial({ color: 0x404040 }),
//       8: new THREE.MeshBasicMaterial({ color: 0x202020 }),
//       9: new THREE.MeshBasicMaterial({ color: 0x101010 }),
//       10: new THREE.MeshBasicMaterial({ color: 0x000000 }),
//     };

//     for (let l of lightMap) {
//       const k = l[0];
//       const splitt = k.split("-");

//       const x = Number(splitt[0]);
//       const y = Number(splitt[1]);

//       const setPiece = this.game.components.SetPieces.at(x, y);
//       const lit = l[1];

//       if (setPiece && setPiece.drawing && lit) {
//         setPiece.drawing.sprite.visible = true;
//         setPiece.drawing.mesh.visible = true;

//         setPiece.drawing.mesh.material = colors[Math.round(lit / 2 + 5)];

//         this.game.components.ArcadePhysicsComponent.each((apo, eid) => {
//           // apo.arcadeObject.visible = true;
//           // debugger

//           // console.log(Math.round(apo.arcadeObject.position.x/TileSize), x)

//           if (
//             Math.round(apo.arcadeObject.position.x / TileSize) === x &&
//             Math.round(apo.arcadeObject.position.y / TileSize) === y
//           ) {
//             // apo.arcadeObject.visible = true;
//             // actors.get(eid)
//             const litThing = this.game.components.DrawableComponent.take(eid);
//             litThing.mesh.visible = true;
//             litThing.sprite.visible = true;
//           }
//         });

//         if (true) {
//           const north = lightMap.get(`${x}-${y - 1}`);
//           const east = lightMap.get(`${x + 1}-${y}`);
//           const west = lightMap.get(`${x - 1}-${y}`);
//           const south = lightMap.get(`${x}-${y + 1}`);

//           if (!north) {
//             const northernsetpiece = this.game.components.SetPieces.at(
//               x,
//               y - 1
//             );
//             if (northernsetpiece && northernsetpiece.drawing) {
//               northernsetpiece.drawing.sprite.visible = true;
//               northernsetpiece.drawing.mesh.visible = true;
//             }
//           }
//           if (!east) {
//             const easternSetPiece = this.game.components.SetPieces.at(x + 1, y);
//             if (easternSetPiece && easternSetPiece.drawing) {
//               easternSetPiece.drawing.sprite.visible = false;
//               easternSetPiece.drawing.mesh.visible = true;
//             }
//           }
//           if (!south) {
//             const southernSetPiece = this.game.components.SetPieces.at(
//               x,
//               y + 1
//             );
//             if (southernSetPiece && southernSetPiece.drawing) {
//               southernSetPiece.drawing.sprite.visible = true;
//               southernSetPiece.drawing.mesh.visible = true;
//             }
//           }
//           if (!west) {
//             const westernSetPiece = this.game.components.SetPieces.at(x - 1, y);
//             if (westernSetPiece && westernSetPiece.drawing) {
//               westernSetPiece.drawing.sprite.visible = true;
//               westernSetPiece.drawing.mesh.visible = true;
//             }
//           }
//         } else {
//           // if (setPiece.drawing) {
//           //   setPiece.drawing.sprite.visible = true;
//           //   setPiece.drawing.mesh.visible = true;
//           // }
//         }
//       } else {
//       }
//     }
//   }

//   resetRadiation() {
//     this.game.components.RadiationDetectors.each((rd, rdid) => {
//       rd.rads = 0;
//     });
//   }

//   runAI(delta: number) {
//     this.game.components.AiAgents.each((a, aeid) => {
//       a.tick(this.game, delta);
//     });

//     // attacks.each((eid, attack) => {

//     // });
//   }

//   runArcadePhysics() {
//     this.game.components.ArcadePhysicsComponent.each((f, feid) => {
//       const classification =
//         this.game.components.Eid2PM.take(feid).classification;

//       if (classification === "PuckBot") {
//         // const p = fps.get(eid);
//         // if (!p) throw "floating position component not found";
//         // boundaryCheckBot(position);
//         // collisionsAndVideoControls();
//         // const gridChanges = upsdateFloatPosition(position, f);
//         // if (gridChanges) {
//         //   repaintLights = true;
//         // }
//         // drawables.updatePostion(eid, position, true);
//         this.game.components.DrawableComponent.updateFromArcadePhysics(feid, f);
//       } else if (classification === "Tile") {
//         // throw "not implemented";
//       } else {
//         this.game.components.DrawableComponent.updateFromArcadePhysics(feid, f);
//       }
//     });
//     // if (repaintLights) {
//     //   resetIllumination();
//     //   // runIlluminationV7(fovMap);
//     //   for (let y = 0; y < MapSize; y++) {
//     //     for (let x = 0; x < MapSize; x++) {
//     //       setPieces.store[y][x].drawing.mesh.visible =
//     //         setPieces.store[y][x].luminance > 0;
//     //       setPieces.store[y][x].drawing.sprite.visible =
//     //         setPieces.store[y][x].luminance > 0;
//     //     }
//     //   }
//     // }
//   }

//   runRadiationScan() {
//     this.game.components.RadiationDetectors.each((rd, rdid) => {
//       let rads = 0;
//       this.game.components.RadiationEmitters.each((re, reid) => {
//         const pa = this.game.components.Eid2PMs.getAbsoluteXandY(rdid);
//         const pb = this.game.components.Eid2PMs.getAbsoluteXandY(reid);

//         const distance = distanceV2(pa.x, pa.y, pb.x, pb.y);

//         const power = re.rads / distance;

//         if (isNaN(power)) throw `power cannot be NaN`;

//         rads += power;
//       });

//       rd.rads = rads;
//     });
//   }

//   runHeatSpread() {
//     // inject heat into system
//     this.game.components.HeatEmitterComponent.each((h, eid) => {
//       const { x, y } = (
//         this.game.components.Eid2PM.take(eid) as Eid2PMComponent
//       ).position;
//       const s = this.game.components.SetPieces.take(x, y);
//       s.heat += h.power;
//     });

//     // then average it out
//     averageNeighborsInPlace(this.game.components.SetPieces, this.game);

//     // for (let y = 0; y < MapSize; y++) {
//     //   for (let x = 0; x < MapSize; x++) {
//     //     // GAME.components.SetPieces.store[y][x] = new SetPieceComponent();
//     //     const s: SetPieceComponent = GAME.components.SetPieces.store[y][x];
//     //     const graphic = s.thermalGraphic;

//     //     // s.thermalGraphic.beginFill(interpolateColor(-100, 100, s.heat, "#FF00aa", "#aa00FF"));

//     //     // // set the line style to have a width of 5 and set the color to red
//     //     // s.thermalGraphic.lineStyle(5, 0xff00aa);

//     //     // // draw a rectangle
//     //     // s.thermalGraphic.drawRect(x * TileSize, y * TileSize, TileSize, TileSize);
//     //     // s.thermalGraphic.endFill();

//     //     // s.thermalGraphic.fillStyle = interpolateColor(-100, 100, s.heat, "#FF0000", "#0000FF");
//     //     // s.thermalGraphic.fillStyle = 0xFF0000
//     //   }
//     // }
//   }

//   runUpdateUI() {
//     const b = this.game.bots[this.game.videoFeed] as [number, string];
//     const eidOfVideoFeed = b[0];

//     if (this.game.components.RadiationDetectors.get(eidOfVideoFeed)) {
//       this.game.updateBotWindowRadiation(
//         this.game.components.RadiationDetectors.take(eidOfVideoFeed).rads
//       );
//     } else {
//       this.game.updateBotWindowRadiation("?");
//     }

//     // RadiationDetectors.each((rd, rdid) => {
//     //   rd.rads = 0;
//     // });
//   }

//   runFloatingPhysics() {
//     // let repaintLights = false;
//     this.game.components.FloatMovements.forEach(([eid, f]) => {
//       const { position, classification } = this.game.components.Eid2PM.get(eid);
//       if (classification === "PuckBot") {
//         // const p = fps.get(eid);
//         // if (!p) throw "floating position component not found";
//         this.boundaryCheckBot(position);
//         // collisionsAndVideoControls();
//         const gridChanges = this.updateFloatPosition(position, f);
//         // if (gridChanges) {
//         //   repaintLights = true;
//         // }
//         this.game.components.DrawableComponent.updatePostion(
//           eid,
//           position,
//           gridChanges
//         );
//       } else if (classification === "Tile") {
//         throw "not implemented";
//       } else {
//         debugger;
//         throw "idk";
//       }
//     });
//     // if (repaintLights) {
//     //   resetIllumination();
//     //   // runIlluminationV7(fovMap);
//     //   for (let y = 0; y < MapSize; y++) {
//     //     for (let x = 0; x < MapSize; x++) {
//     //       setPieces.store[y][x].drawing.mesh.visible =
//     //         setPieces.store[y][x].luminance > 0;
//     //       setPieces.store[y][x].drawing.sprite.visible =
//     //         setPieces.store[y][x].luminance > 0;
//     //     }
//     //   }
//     // }
//   }
// }
