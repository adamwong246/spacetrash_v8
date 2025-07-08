// This class contains all the details for loading a game. 
// This phase is after the initialization of the game, but before the run phase

import * as THREE from "three";

import { MapSize, MapBoundLow, MapBoundHigh } from "../Constants";
import { Eid2PMComponent } from "../ECS/Components/v2/eid2PMC";
import { HeatConductorComponent } from "../ECS/Components/v3/heat";
import { SetPieceComponent } from "../ECS/Components/v3/setPieces";
import { GameWithControls } from "./4-WithControls";
import { IRenderings } from "./3-WithStores";
import { ActorComponent } from "../ECS/Components/v3/actors";

const arcadeBodiesToAgentOnCollisionCallbacks: { body; callback }[] = [];

export abstract class GameWithLoad extends GameWithControls {
  constructor(domNode: HTMLElement) {
    super(
      domNode,
      {
        performanceLogging: false,
        fps: 60,
        headless: false,
      },
      new Set<IRenderings>([
        "2d",
        "webgl2",
        "pixi2d",
        "threejs",
        "arcadePhysics",
        "matter",
        "samurai",
      ]),
    );
  }


  load() {
    // this.populateMatterJs();
    // this.inflateArcadePhysics();
    this.mapEntitiesToPositions();
    this.initializeSetPieces();
    this.populateSetPiecesWithIntegerPositions();
    this.initializeActors();
    // this.attachArcadePhysicsToActors();
    this.attachAiAgentsToActors();
    this.runInitialMapBoundaryCheck();
    // this.runPlaceImmoveableSetPieces();

    this.setupRenderers();
    // this.cullInteriorFaces();

    this.loadPhysics();
    this.setupAiAgents();
    this.setupHeat();
    this.measureThreejs();
  }

  cullInteriorFaces() {
    ////////////////////////////////////////////////////////////////////////

    const meshes = this.scene.children.filter(
      (obj) => obj instanceof THREE.Mesh
    );
    const uniqueMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < meshes.length; i++) {
      let isDuplicate = false;

      for (let j = 0; j < uniqueMeshes.length; j++) {
        if (
          meshes[i].geometry === uniqueMeshes[j].geometry && // Compare geometries
          meshes[i].material === uniqueMeshes[j].material && // Compare materials
          meshes[i].matrixWorld.equals(uniqueMeshes[j].matrixWorld)  // Compare world matrices
          // meshes[i].position === uniqueMeshes[j].position
        ) {
          isDuplicate = true;
          break;
        }
      }

      if (isDuplicate) {
        // Remove and dispose of the duplicate mesh
        const duplicateMesh = meshes[i];
        this.scene.remove(duplicateMesh);
        duplicateMesh.geometry.dispose();
        duplicateMesh.material.dispose();
        // Dispose of textures if any
        // if (duplicateMesh.material.map) duplicateMesh.material.map.dispose();
        // ... (dispose of other texture types)
        // duplicateMesh = undefined;
      } else {
        uniqueMeshes.push(meshes[i]);
      }
    }

    // // re-use vectors for performance
    // let worldPositionA = new THREE.Vector3();
    // let worldPositionB = new THREE.Vector3();

    // const deletions = []

    // for (let y = 0; y < MapSize; y++) {
    //   for (let x = 0; x < MapSize; x++) {
    //     const s = this.components.SetPieces.store[y][x];

    //     if (s.samuraiTile && s.samuraiTile.samuraiTileKey === "tile100") {

    //       // check north
    //       ///////////////////////////////////////////////////////
    //         if (y - 1 >= 0) {
    //           const s2 = this.components.SetPieces.store[y - 1][x];
    //           if (s2.samuraiTile && s2.samuraiTile.samuraiTileKey === "tile100") {
    //             for (let a = 0; a < s.meshes.length; a++) {
    //               for (let b = 0; b < s2.meshes.length; b++) {
    //                 const meshA = s.meshes[a];
    //                 const meshB = s2.meshes[b];

    //                 // if (meshA) {
    //                 //   meshA.getWorldPosition(worldPositionA);

    //                 //   if (meshB) {
    //                 //     meshB.getWorldPosition(worldPositionB);

    //                 //     if (worldPositionA.x === worldPositionB.x) {
    //                 //       if (worldPositionA.y === worldPositionB.y) {
    //                 //         if (worldPositionA.z === worldPositionB.z) {
    //                 //           s.meshes.splice(a, 1);
    //                 //           s2.meshes.splice(b, 1);
    //                 //         }
    //                 //       }
    //                 //     }
    //                 //   }
    //                 // }
    //               }
    //             }
    //           }
    //         }

    //       // // check south
    //       // ///////////////////////////////////////////////////////
    //       // if (y + 1 < MapSize - 1) {
    //       //   const s2 = this.components.SetPieces.store[y + 1][x];
    //       //   if (s2.samuraiTile && s2.samuraiTile.samuraiTileKey === "tile100") {
    //       //     for (let a = 0; a < s.meshes.length; a++) {
    //       //       for (let b = 0; b < s2.meshes.length; b++) {
    //       //         const meshA = s.meshes[a];
    //       //         const meshB = s2.meshes[b];
    //       //         if (meshA) {
    //       //           meshA.getWorldPosition(worldPositionA);

    //       //           if (meshB) {
    //       //             meshB.getWorldPosition(worldPositionB);

    //       //             if (worldPositionA.x === worldPositionB.x) {
    //       //               if (worldPositionA.y === worldPositionB.y) {
    //       //                 if (worldPositionA.z === worldPositionB.z) {
    //       //                   s.meshes.splice(a, 1);
    //       //                   s2.meshes.splice(b, 1);
    //       //                 }
    //       //               }
    //       //             }
    //       //           }
    //       //         }
    //       //       }
    //       //     }
    //       //   }
    //       // }

    //       // // check east
    //       // ///////////////////////////////////////////////////////
    //       // if (x + 1 <= MapSize - 1) {
    //       //   const s2 = this.components.SetPieces.store[y][x + 1];
    //       //   if (s2.samuraiTile && s2.samuraiTile.samuraiTileKey === "tile100") {
    //       //     for (let a = 0; a < s.meshes.length; a++) {
    //       //       for (let b = 0; b < s2.meshes.length; b++) {
    //       //         const meshA = s.meshes[a];
    //       //         const meshB = s2.meshes[b];
    //       //         if (meshA) {
    //       //           meshA.getWorldPosition(worldPositionA);

    //       //           if (meshB) {
    //       //             meshB.getWorldPosition(worldPositionB);

    //       //             if (worldPositionA.x === worldPositionB.x) {
    //       //               if (worldPositionA.y === worldPositionB.y) {
    //       //                 if (worldPositionA.z === worldPositionB.z) {
    //       //                   s.meshes.splice(a, 1);
    //       //                   s2.meshes.splice(b, 1);
    //       //                 }
    //       //               }
    //       //             }
    //       //           }
    //       //         }
    //       //       }
    //       //     }
    //       //   }
    //       // }

    //       // // check west
    //       // ///////////////////////////////////////////////////////
    //       // if (x - 1 >= 0) {
    //       //   const s2 = this.components.SetPieces.store[y][x - 1];
    //       //   if (s2.samuraiTile && s2.samuraiTile.samuraiTileKey === "tile100") {
    //       //     for (let a = 0; a < s.meshes.length; a++) {
    //       //       for (let b = 0; b < s2.meshes.length; b++) {
    //       //         const meshA = s.meshes[a];
    //       //         const meshB = s2.meshes[b];
    //       //         if (meshA) {
    //       //           meshA.getWorldPosition(worldPositionA);

    //       //           if (meshB) {
    //       //             meshB.getWorldPosition(worldPositionB);

    //       //             if (worldPositionA.x === worldPositionB.x) {
    //       //               if (worldPositionA.y === worldPositionB.y) {
    //       //                 if (worldPositionA.z === worldPositionB.z) {
    //       //                   s.meshes.splice(a, 1);
    //       //                   s2.meshes.splice(b, 1);
    //       //                 }
    //       //               }
    //       //             }
    //       //           }
    //       //         }
    //       //       }
    //       //     }
    //       //   }
    //       // }
    //     }
    //   }
    // }

    //////////////////////////////////////////////////////////////////
  }

  measureThreejs() {
    let totalFaces = 0;

    this.scene.traverseVisible(function (object) {
      if (object.isMesh) {
        const geometry = object.geometry;

        if (geometry.isBufferGeometry) {
          // For BufferGeometry, faces are represented by triangles
          // If indexed geometry, faces = index.count / 3
          if (geometry.index !== null) {
            totalFaces += geometry.index.count / 3;
          } else {
            // If non-indexed geometry, faces = position.count / 3
            totalFaces += geometry.attributes.position.count / 3;
          }
        }
      }
    });

    console.log("Total faces in the scene:", totalFaces);
  }

  // populateMatterJs() {
  //   const bodies: Matter.Body[] = [];
  //   for (let b of this.components.MatterComponent.store) {
  //     bodies.push(b[1].matterBody);
  //   }
  //   console.log(bodies);
  //   Composite.add(this.matterEngine.world, [...bodies]);
  // }

  // inflateArcadePhysics() {
  //   this.components.ArcadePhysicsComponent.each((apc, eid) => {
  //     this.components.ArcadePhysicsComponent.take(eid).arcadeObject =
  //       apc.creator(this.arcadePhysics);
  //   });
  // }

  mapEntitiesToPositions() {
    for (let [eid, [subtype, classification]] of this.entities) {
      if (classification === "Actor") {
        this.components.Eid2PM.make(
          new Eid2PMComponent(
            this.components.SP_PhysicalComponent.take(eid),
            subtype
          ),
          eid
        );
      } else if (classification === "Tile") {
        this.components.Eid2PM.make(
          new Eid2PMComponent(
            this.components.SamuraiTileComponent.take(eid),
            subtype
          ),
          eid
        );
      } else if (classification === "WarpCore") {
        this.components.Eid2PM.make(
          new Eid2PMComponent(
            this.components.SP_PhysicalComponent.take(
              eid,
              "WarpCores ought to have an arcade physics component"
            ),
            subtype
          ),
          eid
        );
      }
    }
  }

  initializeSetPieces() {
    for (let y = 0; y < MapSize; y++) {
      this.components.SetPieces.store[y] = [];
      for (let x = 0; x < MapSize; x++) {
        this.components.SetPieces.store[y][x] = new SetPieceComponent();
      }
    }
  }

  populateSetPiecesWithIntegerPositions() {
    this.components.IntegerPositionComponent.each((s, eid) => {
      this.components.Eid2PM.make(new Eid2PMComponent(s, "_"), eid);
      this.components.SetPieces.update(
        {
          eid,
        },
        s.x,
        s.y
      );

      const t = this.components.TileComponent.get(eid);
      if (t) {
        this.components.SetPieces.update(
          {
            tileType: t.tileType,
            incasterId: eid,
          },
          s.x,
          s.y
        );
      }

      this.components.HeatConductorComponent.withIf((dc) => {
        this.components.SetPieces.update(
          {
            heatConductor: dc[1],
          },
          s.x,
          s.y
        );
      }, eid);

      this.components.HeatEmitterComponent.withIf((dc) => {
        this.components.SetPieces.update(
          {
            heatEmitter: dc[1],
          },
          s.x,
          s.y
        );
      }, eid);

      this.components.PixiJsRenderableComponent.withIf((p) => {
        this.components.SetPieces.update(
          {
            pixiElement: p[1],
          },
          s.x,
          s.y
        );
      }, eid);

      this.components.ThreeJsRenderableComponent.withIf((p) => {
        this.components.SetPieces.update(
          {
            threejselement: p[1],
          },
          s.x,
          s.y
        );
      }, eid);
    });

    this.components.SamuraiTileComponent.each((s, eid) => {
      this.components.Eid2PM.make(new Eid2PMComponent(s, "_"), eid);
      this.components.SetPieces.update(
        {
          eid,
          samuraiTile: s,
        },
        s.x,
        s.y
      );

      this.components.ThreeJsRenderableComponent.withIf((threejselement) => {
        this.components.SetPieces.update(
          {
            meshes: threejselement.meshes,
          },
          s.x,
          s.y
        );
      }, eid);

      // const t = this.components.TileComponent.get(eid);
      // if (t) {
      //   this.components.SetPieces.update(
      //     {
      //       tileType: t.tileType,
      //       incasterId: eid,
      //     },
      //     s.x,
      //     s.y
      //   );
      // }

      // this.components.HeatConductorComponent.withIf((dc) => {
      //   this.components.SetPieces.update(
      //     {
      //       heatConductor: dc[1],
      //     },
      //     s.x,
      //     s.y
      //   );
      // }, eid);

      // this.components.HeatEmitterComponent.withIf((dc) => {
      //   this.components.SetPieces.update(
      //     {
      //       heatEmitter: dc[1],
      //     },
      //     s.x,
      //     s.y
      //   );
      // }, eid);

      // this.components.PixiJsRenderableComponent.withIf((p) => {
      //   this.components.SetPieces.update(
      //     {
      //       pixiElement: p[1],
      //     },
      //     s.x,
      //     s.y
      //   );
      // }, eid);

      // this.components.ThreeJsRenderableComponent.withIf((p) => {
      //   this.components.SetPieces.update(
      //     {
      //       threejselement: p[1],
      //     },
      //     s.x,
      //     s.y
      //   );
      // }, eid);
    });
  }

  initializeActors() {
    this.components.SP_PhysicalComponent.each((sp, aeid) => {
      // const mf = this.components.FloatMovingComponent.find(
      //   (x) => x[0] === aeid
      // );
      // const mt = this.components.TankMovingComponent.find((x) => x[0] === aeid);

      // let motion;
      // if (mf) {
      //   motion = mf[1];
      // } else if (mt) {
      //   motion = mt[1];
      // } else if (!mf && !mt) {
      //   motion = null;
      // } else if (mf && mt)
      //   throw "an entity cannot have both tank motion and floating motion";
      // else {
      //   throw "IDK";
      // }

      this.components.Actors.make(
        new ActorComponent({
          physical: sp.body,
          meshes: this.components.ThreeJsRenderableComponent.take(aeid).meshes,
        }),
        aeid
      );
      // const actor = this.components.Actors.take(aeid);
      // actor.actorId = aeid;
      // actor.physical = sp.body;
      // actor.meshes = this.components.ThreeJsRenderableComponent.take(aeid).meshes

      // actor.friendly = this.isFriendly(k);
      // actor.position = y;
      // actor.motion = mt;
    });
  }

  // attachArcadePhysicsToActors() {
  //   this.components.ArcadePhysicsComponent.each((apc, eid) => {
  //     if (!apc.arcadeObject.immovable) {
  //       if (this.components.Actors.get(eid)) {
  //         this.components.Actors.take(eid).arcadeBody = apc.arcadeObject;
  //       } else {
  //         this.components.Actors.make({ arcadeBody: apc.arcadeObject }, eid);
  //       }
  //     }
  //   });
  // }

  attachAiAgentsToActors() {
    this.components.AiAgentComponent.each((agent, eid) => {
      this.components.Actors.take(eid).agent = agent;
      this.components.Actors.take(eid).friendly = false;
    });
  }

  runInitialMapBoundaryCheck() {
    // actors out of bounds check
    this.components.FloatPositions.each((c) => {
      if (c.x < MapBoundLow) {
        c.x = MapBoundHigh;
      }
      if (c.x > MapBoundHigh) {
        c.x = MapBoundLow;
      }
      if (c.y < MapBoundLow) {
        c.y = MapBoundHigh;
      }
      if (c.y > MapBoundHigh) {
        c.y = MapBoundLow;
      }
    });

    //   // set piece out of bounds check
    //   // necessary?
    //   this.components.IntegerPositions.each((c) => {
    //     if (c.x < 0) {
    //       c.x = MapSize;
    //     }
    //     if (c.x > MapSize) {
    //       c.x = 0;
    //     }
    //     if (c.y < 0) {
    //       c.y = MapSize;
    //     }
    //     if (c.y > MapSize) {
    //       c.y = 0;
    //     }
    //   });
  }

  // runPlaceImmoveableSetPieces = () => {
  //   this.components.PixiJsRenderableComponent.each((d, eid) => {
  //     this.components.FloatPositions.withIf((p) => {
  //       if (d.sprite) {
  //         d.sprite.position.x = p.x * TileSize;
  //         d.sprite.position.y = p.y * TileSize;
  //       } else {
  //         throw "the sprite should be loaded by now";
  //       }
  //     }, eid);
  //     this.components.SP_IntegerPositionComponent.withIf((p) => {
  //       if (d.sprite) {
  //         d.sprite.position.x = p.X();
  //         d.sprite.position.y = p.Y();
  //       } else {
  //         throw "the sprite should be loaded by now";
  //       }
  //     }, eid);

  //     this.components.ArcadePhysicsComponent.withIf((p) => {
  //       if (d.sprite) {
  //         d.sprite.position.x = p.arcadeObject.position.x * TileSize;
  //         d.sprite.position.y = p.arcadeObject.position.y * TileSize;
  //       } else {
  //         throw "the sprite should be loaded by now";
  //       }
  //     }, eid);
  //   });

  //   this.components.ThreeJsRenderableComponent.each((d, eid) => {
  //     this.components.FloatPositions.withIf((p) => {
  //       if (d.mesh) {
  //         d.mesh.position.x = p.x * TileSize;
  //         d.mesh.position.y = p.y * TileSize;
  //       } else {
  //         throw "the mesh should be loaded by now";
  //       }
  //     }, eid);

  //     this.components.IntegerPositionComponent.withIf((p) => {
  //       if (d.mesh) {
  //         d.mesh.position.x = p.x * TileSize;
  //         d.mesh.position.y = p.y * TileSize;
  //       } else {
  //         throw "the mesh should be loaded by now";
  //       }
  //     }, eid);

  //     this.components.ArcadePhysicsComponent.withIf((p) => {
  //       if (d.mesh) {
  //         d.mesh.position.x = p.arcadeObject.position.x * TileSize;
  //         d.mesh.position.y = p.arcadeObject.position.y * TileSize;
  //       } else {
  //         throw "the sprite should be loaded by now";
  //       }
  //     }, eid);
  //   });
  // };

  setupRenderers() {
    this.components.PixiJsRenderableComponent.each((p, i) => {
      const position = this.components.Eid2PM.take(i).position;

      p.sprite.position.x = position.X();
      p.sprite.position.y = position.Y();

      this.pixi2dApp.stage.addChild(p.sprite);
    });

    this.components.ThreeJsRenderableComponent.each((p, eid) => {
      // if (this.components.SamuraiTileComponent.get(eid)) {

      // } else {

      // }
      const position = this.components.Eid2PM.take(eid).position;

      for (let mesh of p.meshes) {
        // mesh.translateX(position.X())
        // mesh.translateY(position.Y())
        // mesh.position.x = position.X();
        // mesh.position.y = position.Y();
        this.scene.add(mesh);
      }
    });

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z
    );
    spotLight.rotateX(this.camera.rotation.x);
    this.scene.add(spotLight);

    // const pointlight = new THREE.PointLight(0x00ff00, 1000, 0, 2);
    // pointlight.position.set(
    //   this.camera.position.x,
    //   this.camera.position.y,
    //   this.camera.position.z
    // );
    // pointlight.position.z = -10;

    // this.scene.add(pointlight);

    const ambientLight = new THREE.AmbientLight(0xffdddd, 10000);
    // // ambientLight.position.set(
    // //   (GAME as SpaceTrash).camera.position.x,
    // //   (GAME as SpaceTrash).camera.position.y,
    // //   (GAME as SpaceTrash).camera.position.z
    // // );

    // // ambientLight.position.z = -10;

    this.scene.add(ambientLight);

    // (GAME as SpaceTrash).spotlight = new THREE.SpotLight(0xff0000, 1000);
  }

  loadPhysics = () => {
    // const staticGroup: { eid: number; samComp: SP_PhysicalComponent }[] = [];
    // const dynamicGroup: { eid: number; samComp: SP_PhysicalComponent }[] = [];

    this.components.SP_PhysicalComponent.each((v, k) => {
      this.samuraiEngine.addBody(v);

      v.body.SP_EID = k;

      // if (v.body.isStatic) staticGroup.push({ eid: k, samComp: v });
      // else dynamicGroup.push({ eid: k, samComp: v });
    });

    // dynamicGroup.forEach(({ samComp }) => {
    //   // samComp.body.pos.x = Math.random() * MapSize * TileSize;
    //   // samComp.body.pos.y = Math.random() * MapSize * TileSize;
    // });

    // dynamicGroup.forEach((x) => {
    //   const dynamicBody = x.samComp;
    //   staticGroup.forEach((y) => {
    //     const staticBody = y.samComp;

    //     // console.log(this.entities.get(y.eid));

    //     // this.arcadePhysics.world.addOverlap(
    //     //   staticBody.samComp,
    //     //   dynamicBody.arcadeObject,
    //     //   (...a) => {
    //     //     // const x = a[1];
    //     //     // for (let z of arcadeBodiesToAgentOnCollisionCallbacks) {

    //     //     //   console.log("collision between", y.eid, x.eid)
    //     //     //   if (z.body === x) {
    //     //     //     // z.callback();
    //     //     //   }
    //     //     // }
    //     //     // const cb = x.getData('onCollide');
    //     //     // cb(s, d)
    //     //     // Actors.update({
    //     //     //   onCollision
    //     //     // })

    //     //     console.log("overlap1 between", y.eid, x.eid);
    //     //   },
    //     //   (x, y, z) => {
    //     //     console.log("overlap2 between", x, y);
    //     //   },
    //     //   (x, y, z) => {
    //     //     console.log("mark3");
    //     //   }
    //     // );
    //   });
    // });

    // dynamicGroup.forEach((s) => {
    //   dynamicGroup.forEach((s2) => {
    //     if (s !== s2) {
    //       // game.arcadePhysics.world.addCollider(s, s2);// add.collider(s, s2);
    //     }
    //   });
    // });

    // this.arcadePhysics.world.on("collide", (object1, object2, body1, body2) => {
    //   console.log("collide", object1, object2, body1, body2);
    // });
    // this.arcadePhysics.world.on("overlap", (object1, object2, body1, body2) => {
    //   console.log("overlap", object1, object2, body1, body2);
    // });
  };

  setupAiAgents() {
    this.components.Actors.each((ac, eid) => {
      if (!ac.friendly) {
        this.components.AiAgentComponent.each((ai, eid2) => {
          if (eid === eid2) {
            // const onCollide = () => { };

            // ac.onCollision = onCollide;
            // ai.

            ac.agent = ai;
            arcadeBodiesToAgentOnCollisionCallbacks.push({
              body: ac.arcadeBody,
              callback: ai.collideCallback,
            });
            // ac.arcadeBody.setData('onCollide', ai.onCollide)
            ai.boot(ac.arcadeBody, eid);
          }
        });
      }
    });
  }

  setupHeat() {
    this.components.HeatConductorComponent.each(
      (heatConductor: HeatConductorComponent, hceid) => {
        this.components.IntegerPositionComponent.each((ip, ipceid) => {
          if (hceid === ipceid) {
            heatConductor.pixiThermalGraphic =
              HeatConductorComponent.thermalGraphic(ip.x, ip.y);
            this.pixi2dThermalApp.stage.addChild(
              heatConductor.pixiThermalGraphic
            );
          }

          const { x, y } = ip;
          const sp = this.components.SetPieces.store[y][x];

          if (!sp) {
            this.components.SetPieces.make(
              {
                heatConductor,
              },
              hceid
            );
          } else {
            sp.heatConductor = heatConductor;
          }
        });
        // const sp: SetPieceComponent = GAME.components.SetPieces.take(hceid);
        // const position = sp.
      }
    );

    // (GAME.components.HeatDetectorComponent as HeatConductorStore).each((s, k, z) => {
    // // s.thermalGraphic = GAME.pixi2dThermalApp..add.rectangle(50, 50, 100, 100, 0xFF0000);

    // const { x, y } = GAME.components.Eid2PM.take(k).position.getTileXAndY();

    // const graphics = new PIXI.Graphics();
    // graphics.beginFill(new PIXI.Color("blue").toHex());
    // graphics.drawRect(0, 0, 100, 100);
    // graphics.endFill();

    // graphics.tint = new PIXI.Color("blue").toHex();
    // GAME.pixi2dThermalApp.stage.addChild(graphics);
    // GAME.pixi2dThermalApp.render();

    // });
  }
}
