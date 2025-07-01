// import * as THREE from "three";

// import {
//   MapBoundHigh,
//   MapBoundLow,
//   MapSize,
//   TileSize,
// } from "../../Constants.ts";

// import { System } from "../../../engine/VECS.ts/System.ts";

// import { SpaceTrash } from "../../Game/6-WithStateSpace.tsx";

// import { IntegerPositionComponent } from "../../../engine/game/physical.ts";
// import { Eid2PMComponent } from "../Components/v2/eid2PMC.ts";
// import { SetPieceComponent } from "../Components/v3/setPieces.ts";
// import { HeatConductorComponent } from "../Components/v3/heat.ts";

// export type ISpaceTrashSystems = `physical` | "casting";

// const arcadeBodiesToAgentOnCollisionCallbacks: { body; callback }[] = [];

// export abstract class SpaceTrashSystem0 extends System {
//   mapSize: number;

//   constructor(game: SpaceTrash, mapSize: number) {
//     super(game);
//     this.mapSize = mapSize;

//     this.inflateArcadePhysics();
//     this.mapEntitiesToPositions();
//     this.initializeSetPieces();
//     this.populateSetPiecesWithIntegerPositions();
//     this.initializeActors();
//     this.attachArcadePhysicsToActors();
//     this.attachAiAgentsToActors();
//     this.runInitialMapBoundaryCheck();
//     this.runPlaceImmoveableSetPieces();
//     this.setup2dAnd3dGames();
//     this.setupArcadePhysics();
//     this.setupAiAgents();
//     this.setupHeat();
//   }

//   inflateArcadePhysics() {
//     this.game.components.ArcadePhysicsComponent.each((apc, eid) => {
//       this.game.components.ArcadePhysicsComponent.take(eid).arcadeObject =
//         apc.creator(this.game.arcadePhysics);
//     });
//   }

//   mapEntitiesToPositions() {
//     for (let [eid, [classification]] of this.game.entities) {
//       if (classification === "SpaceTrashBot") {
//         this.game.components.Eid2PM.make(
//           new Eid2PMComponent(
//             this.game.components.ArcadePhysicsComponent.take(eid),
//             classification
//           ),
//           eid
//         );
//       } else if (classification === "Tile") {
//         this.game.components.Eid2PM.make(
//           new Eid2PMComponent(
//             this.game.components.IntegerPositionComponent.take(eid),
//             classification
//           ),
//           eid
//         );
//       } else if (classification === "PuckBot") {
//         this.game.components.Eid2PM.make(
//           new Eid2PMComponent(
//             this.game.components.ArcadePhysicsComponent.take(eid),
//             classification
//           ),
//           eid
//         );
//       } else if (classification === "WarpCore") {
//         this.game.components.Eid2PM.make(
//           new Eid2PMComponent(
//             this.game.components.ArcadePhysicsComponent.take(eid),
//             classification
//           ),
//           eid
//         );
//       }
//     }
//   }

//   initializeSetPieces() {
//     for (let y = 0; y < MapSize; y++) {
//       this.game.components.SetPieces.store[y] = [];
//       for (let x = 0; x < MapSize; x++) {
//         this.game.components.SetPieces.store[y][x] = new SetPieceComponent();
//       }
//     }
//   }

//   populateSetPiecesWithIntegerPositions() {
//     IntegerPositionComponent.each((s, eid) => {
//       this.game.components.Eid2PMStore.make(new Eid2PMComponent(s, "_"), eid);

//       // SetPieces.take(s.x, s.y).setId = eid;
//       this.game.components.SetPieces.update(
//         {
//           eid,
//         },
//         s.x,
//         s.y
//       );

//       const t = this.game.components.TileComponent.get(eid);
//       if (t) {
//         this.game.components.SetPieces.update(
//           {
//             tileType: t.tileType,
//             incasterId: eid,
//           },
//           s.x,
//           s.y
//         );
//       }

//       this.game.components.HeatConductorComponent.withIf((dc) => {
//         // SetPieces.at(s.x, s.y).drawing = dc[1];
//         this.game.components.SetPieces.update(
//           {
//             heatConductor: dc[1],
//           },
//           s.x,
//           s.y
//         );
//       }, eid);

//       this.game.components.HeatEmitterComponent.withIf((dc) => {
//         // SetPieces.at(s.x, s.y).drawing = dc[1];
//         this.game.components.SetPieces.update(
//           {
//             heatEmitter: dc[1],
//           },
//           s.x,
//           s.y
//         );
//       }, eid);

//       // DrawableComponent.withIf((dc) => {
//       //   // SetPieces.at(s.x, s.y).drawing = dc[1];
//       //   SetPieces.update(
//       //     {
//       //       drawing: dc[1],
//       //     },
//       //     s.x,
//       //     s.y
//       //   );
//       // }, eid);
//     });
//   }

//   initializeActors() {
//     this.game.components.FloatPositions.each((ndx, y, aeid) => {
//       const mf = this.game.components.FloatMovements.find((x) => x[0] === aeid);
//       const mt = this.game.components.TankMovingComponent.find(
//         (x) => x[0] === aeid
//       );

//       let motion;
//       if (mf) {
//         motion = mf[1];
//       } else if (mt) {
//         motion = mt[1];
//       } else if (!mf && !mt) {
//         motion = null;
//       } else if (mf && mt)
//         throw "an entity cannot have both tank motion and floating motion";
//       else {
//         throw "IDK";
//       }

//       this.game.components.Actors.take(aeid).actorId = ndx;
//       this.game.components.Actors.take(aeid).friendly =
//         this.game.isFriendly(ndx);
//       this.game.components.Actors.take(aeid).position = y;
//       this.game.components.Actors.take(aeid).motion = motion;
//     });
//   }

//   attachArcadePhysicsToActors() {
//     this.game.components.ArcadePhysicsComponent.each((apc, eid) => {
//       if (!apc.arcadeObject.immovable) {
//         if (this.game.components.Actors.get(eid)) {
//           this.game.components.Actors.take(eid).arcadeBody = apc.arcadeObject;
//         } else {
//           this.game.components.Actors.make(
//             { arcadeBody: apc.arcadeObject },
//             eid
//           );
//         }
//       }
//     });
  
//   }

//   attachAiAgentsToActors() {
//     this.game.components.AiAgentComponent.each((agent, eid) => {
//       this.game.components.Actors.take(eid).agent = agent;
//       this.game.components.Actors.take(eid).friendly = false;
//     });
//   }

//   runInitialMapBoundaryCheck() {
//     // actors out of bounds check
//     this.game.components.FloatPositions.each((c) => {
//       if (c.x < MapBoundLow) {
//         c.x = MapBoundHigh;
//       }
//       if (c.x > MapBoundHigh) {
//         c.x = MapBoundLow;
//       }
//       if (c.y < MapBoundLow) {
//         c.y = MapBoundHigh;
//       }
//       if (c.y > MapBoundHigh) {
//         c.y = MapBoundLow;
//       }
//     });

//     //   // set piece out of bounds check
//     //   // necessary?
//     //   this.game.components.IntegerPositions.each((c) => {
//     //     if (c.x < 0) {
//     //       c.x = MapSize;
//     //     }
//     //     if (c.x > MapSize) {
//     //       c.x = 0;
//     //     }
//     //     if (c.y < 0) {
//     //       c.y = MapSize;
//     //     }
//     //     if (c.y > MapSize) {
//     //       c.y = 0;
//     //     }
//     //   });
//   }

//   runPlaceImmoveableSetPieces = () => {
//     // DrawableComponent.each((d, eid) => {
//     //   FloatPositions.withIf((p) => {
//     //     if (d.sprite) {
//     //       d.sprite.position.x = p.x * TileSize;
//     //       d.sprite.position.y = p.y * TileSize;
//     //     } else {
//     //       throw "the sprite should be loaded by now";
//     //     }
//     //     if (d.mesh) {
//     //       d.mesh.position.x = p.x * TileSize;
//     //       d.mesh.position.y = p.y * TileSize;
//     //     } else {
//     //       throw "the mesh should be loaded by now";
//     //     }
//     //     d.char.position.x = p.x * TileSize;
//     //     d.char.position.y = p.y * TileSize;
//     //   }, eid);
//     //   IntegerPositions.withIf((p) => {
//     //     if (d.sprite) {
//     //       d.sprite.position.x = p.x * TileSize;
//     //       d.sprite.position.y = p.y * TileSize;
//     //     } else {
//     //       throw "the sprite should be loaded by now";
//     //     }
//     //     if (d.mesh) {
//     //       d.mesh.position.x = p.x * TileSize;
//     //       d.mesh.position.y = p.y * TileSize;
//     //     } else {
//     //       throw "the mesh should be loaded by now";
//     //     }
//     //     d.char.position.x = p.x * TileSize;
//     //     d.char.position.y = p.y * TileSize;
//     //   }, eid);
//     // });
//   };

//   setup2dAnd3dGames() {
//     this.game.components.DrawableComponent.each((d, deid) => {
//       this.game.pixi2dApp.stage.addChild(d.sprite);
//       this.game.pixi2dApp.stage.addChild(d.char);
//       this.game.scene.add(d.mesh);
//     });

//     // this.scene.add(spotlight);
//     const pointlight = new THREE.PointLight(0x00ff00, 1000, 0, 2);
//     // pointlight.position.set(
//     //   (GAME as SpaceTrash).camera.position.x,
//     //   (GAME as SpaceTrash).camera.position.y,
//     //   (GAME as SpaceTrash).camera.position.z
//     // );
//     // pointlight.position.z = -10;

//     // (GAME as SpaceTrash).scene.add(pointlight);

//     const ambientLight = new THREE.AmbientLight(0x0000ff, 1000);
//     // ambientLight.position.set(
//     //   (GAME as SpaceTrash).camera.position.x,
//     //   (GAME as SpaceTrash).camera.position.y,
//     //   (GAME as SpaceTrash).camera.position.z
//     // );

//     ambientLight.position.z = -10;

//     this.game.scene.add(ambientLight);

//     // (GAME as SpaceTrash).spotlight = new THREE.SpotLight(0xff0000, 1000);
//   }

//   setupArcadePhysics = () => {
//     const staticGroup: any[] = [];
//     const dynamicGroup: any[] = [];

//     this.game.components.ArcadePhysicsComponent.each((v, k) => {
//       if (v.arcadeObject.immovable) staticGroup.push(v.arcadeObject);
//       else dynamicGroup.push(v.arcadeObject);
//     });

//     dynamicGroup.forEach((s) => {
//       s.position.x = Math.random() * MapSize * TileSize;
//       s.position.y = Math.random() * MapSize * TileSize;
//     });

//     dynamicGroup.forEach((d) => {
//       staticGroup.forEach((s) => {
//         this.game.arcadePhysics.world.addCollider(
//           s,
//           d,
//           (...a) => {
//             const x = a[1];
//             for (let z of arcadeBodiesToAgentOnCollisionCallbacks) {
//               if (z.body === x) {
//                 // z.callback();
//               }
//             }
//             // const cb = x.getData('onCollide');
//             // cb(s, d)
//             // debugger
//             // Actors.update({
//             //   onCollision
//             // })

//             // debugger
//           },
//           () => {
//             // debugger
//           },
//           () => {
//             // debugger
//           }
//         );
//       });
//     });

//     dynamicGroup.forEach((s) => {
//       dynamicGroup.forEach((s2) => {
//         if (s !== s2) {
//           // game.arcadePhysics.world.addCollider(s, s2);// add.collider(s, s2);
//         }
//       });
//     });

//     // game.arcadePhysics.world.ad

//     this.game.arcadePhysics.world.on(
//       "collide",
//       (object1, object2, body1, body2) => {
//         console.log("collide", object1, object2, body1, body2);
//       }
//     );
//   };

//   setupAiAgents() {
//     this.game.components.Actors.each((ac, eid) => {
//       if (!ac.friendly) {
//         this.game.components.AiAgentComponent.each((ai, eid2) => {
//           if (eid === eid2) {
//             // const onCollide = () => { };

//             // ac.onCollision = onCollide;
//             // ai.

//             ac.agent = ai;
//             arcadeBodiesToAgentOnCollisionCallbacks.push({
//               body: ac.arcadeBody,
//               callback: ai.collideCallback,
//             });
//             // ac.arcadeBody.setData('onCollide', ai.onCollide)
//             ai.boot(ac.arcadeBody, eid);
//           }
//         });
//       }
//     });
//   }

//   setupHeat() {
//     this.game.components.HeatConductorComponent.each(
//       (heatConductor: HeatConductorComponent, hceid) => {
//         this.game.components.IntegerPositionComponent.each((ip, ipceid) => {
//           if (hceid === ipceid) {
//             heatConductor.pixiThermalGraphic =
//               HeatConductorComponent.thermalGraphic(ip.x, ip.y);
//             this.game.pixi2dThermalApp.stage.addChild(
//               heatConductor.pixiThermalGraphic
//             );
//           }

//           const { x, y } = ip;
//           const sp = this.game.components.SetPieces.store[y][x];

//           if (!sp) {
//             this.game.components.SetPieces.make(
//               {
//                 heatConductor,
//               },
//               hceid
//             );
//           } else {
//             sp.heatConductor = heatConductor;
//           }
//         });
//         // const sp: SetPieceComponent = GAME.components.SetPieces.take(hceid);
//         // const position = sp.
//       }
//     );

//     // (GAME.components.HeatDetectorComponent as HeatConductorStore).each((s, k, z) => {
//     // // s.thermalGraphic = GAME.pixi2dThermalApp..add.rectangle(50, 50, 100, 100, 0xFF0000);

//     // const { x, y } = GAME.components.Eid2PM.take(k).position.getTileXAndY();

//     // const graphics = new PIXI.Graphics();
//     // graphics.beginFill(new PIXI.Color("blue").toHex());
//     // graphics.drawRect(0, 0, 100, 100);
//     // graphics.endFill();

//     // graphics.tint = new PIXI.Color("blue").toHex();
//     // GAME.pixi2dThermalApp.stage.addChild(graphics);
//     // GAME.pixi2dThermalApp.render();

//     // });
//   }
// }
