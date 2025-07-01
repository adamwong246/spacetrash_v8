import * as PIXI from "pixi.js";

import * as THREE from "three";
import { MapSize, MapBoundLow, MapBoundHigh, TileSize } from "../Constants";
import { Eid2PMComponent } from "../ECS/Components/v2/eid2PMC";
import { HeatConductorComponent } from "../ECS/Components/v3/heat";
import { SetPieceComponent } from "../ECS/Components/v3/setPieces";
import { GameWithControls } from "./4-WithControls";
import { IRenderings } from "./3-WithStores";
import { Composite } from "matter-js";

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
      ])
    );
  }

  load() {
    // this.populateMatterJs();
    this.inflateArcadePhysics();
    this.mapEntitiesToPositions();
    this.initializeSetPieces();
    this.populateSetPiecesWithIntegerPositions();
    this.initializeActors();
    this.attachArcadePhysicsToActors();
    this.attachAiAgentsToActors();
    this.runInitialMapBoundaryCheck();
    // this.runPlaceImmoveableSetPieces();
    this.setup2dAnd3dGames();
    this.setupArcadePhysics();
    this.setupAiAgents();
    this.setupHeat();
  }

  populateMatterJs() {
    const bodies: Matter.Body[] = [];
    for (let b of this.components.MatterComponent.store) {
      bodies.push(b[1].matterBody);
    }
    console.log(bodies);
    Composite.add(this.matterEngine.world, [...bodies]);
  }

  inflateArcadePhysics() {
    this.components.ArcadePhysicsComponent.each((apc, eid) => {
      this.components.ArcadePhysicsComponent.take(eid).arcadeObject =
        apc.creator(this.arcadePhysics);
    });
  }

  mapEntitiesToPositions() {
    for (let [eid, [classification]] of this.entities) {
      if (classification === "SpaceTrashBot") {
        this.components.Eid2PM.make(
          new Eid2PMComponent(
            this.components.ArcadePhysicsComponent.take(eid),
            classification
          ),
          eid
        );
      } else if (classification === "FloorTile") {
        this.components.Eid2PM.make(
          new Eid2PMComponent(
            this.components.SP_IntegerPositionComponent.take(eid),
            classification
          ),
          eid
        );
      } else if (classification === "WallTile") {
        this.components.Eid2PM.make(
          new Eid2PMComponent(
            this.components.SP_IntegerPositionComponent.take(eid),
            classification
          ),
          eid
        );
      } else if (classification === "PuckBot") {
        this.components.Eid2PM.make(
          new Eid2PMComponent(
            this.components.ArcadePhysicsComponent.take(
              eid,
              "PuckBots ought to have an arcade physics component"
            ),
            classification
          ),
          eid
        );
      } else if (classification === "WarpCore") {
        this.components.Eid2PM.make(
          new Eid2PMComponent(
            this.components.ArcadePhysicsComponent.take(
              eid,
              "WarpCores ought to have an arcade physics component"
            ),
            classification
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
  }

  initializeActors() {
    this.components.FloatPositions.each((ndx, y, aeid) => {
      const mf = this.components.FloatMovements.find((x) => x[0] === aeid);
      const mt = this.components.TankMovingComponent.find((x) => x[0] === aeid);

      let motion;
      if (mf) {
        motion = mf[1];
      } else if (mt) {
        motion = mt[1];
      } else if (!mf && !mt) {
        motion = null;
      } else if (mf && mt)
        throw "an entity cannot have both tank motion and floating motion";
      else {
        throw "IDK";
      }

      this.components.Actors.take(aeid).actorId = ndx;
      this.components.Actors.take(aeid).friendly = this.isFriendly(ndx);
      this.components.Actors.take(aeid).position = y;
      this.components.Actors.take(aeid).motion = motion;
    });
  }

  attachArcadePhysicsToActors() {
    this.components.ArcadePhysicsComponent.each((apc, eid) => {
      if (!apc.arcadeObject.immovable) {
        if (this.components.Actors.get(eid)) {
          this.components.Actors.take(eid).arcadeBody = apc.arcadeObject;
        } else {
          this.components.Actors.make({ arcadeBody: apc.arcadeObject }, eid);
        }
      }
    });
  }

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

  setup2dAnd3dGames() {
    this.components.PixiJsRenderableComponent.each((p, i) => {
      const position = this.components.Eid2PM.take(i).position;

      p.sprite.position.x = position.X();
      p.sprite.position.y = position.Y();

      this.pixi2dApp.stage.addChild(p.sprite);
    });

    this.components.ThreeJsRenderableComponent.each((p, i) => {
      this.scene.add(p.mesh);
      const position = this.components.Eid2PM.take(i).position;

      p.mesh.position.x = position.X();
      p.mesh.position.y = position.Y();
    });

    // this.scene.add(spotlight);
    // const pointlight = new THREE.PointLight(0x00ff00, 1000, 0, 2);
    // pointlight.position.set(
    //   (GAME as SpaceTrash).camera.position.x,
    //   (GAME as SpaceTrash).camera.position.y,
    //   (GAME as SpaceTrash).camera.position.z
    // );
    // pointlight.position.z = -10;

    // (GAME as SpaceTrash).scene.add(pointlight);

    const ambientLight = new THREE.AmbientLight(0x0000ff, 1000);
    // ambientLight.position.set(
    //   (GAME as SpaceTrash).camera.position.x,
    //   (GAME as SpaceTrash).camera.position.y,
    //   (GAME as SpaceTrash).camera.position.z
    // );

    ambientLight.position.z = -10;

    this.scene.add(ambientLight);

    // (GAME as SpaceTrash).spotlight = new THREE.SpotLight(0xff0000, 1000);
  }

  setupArcadePhysics = () => {
    const staticGroup: any[] = [];
    const dynamicGroup: any[] = [];

    this.components.ArcadePhysicsComponent.each((v, k) => {
      if (v.arcadeObject.immovable) staticGroup.push(v.arcadeObject);
      else dynamicGroup.push(v.arcadeObject);
    });

    dynamicGroup.forEach((s) => {
      s.position.x = Math.random() * MapSize * TileSize;
      s.position.y = Math.random() * MapSize * TileSize;
    });

    dynamicGroup.forEach((d) => {
      staticGroup.forEach((s) => {
        this.arcadePhysics.world.addCollider(
          s,
          d,
          (...a) => {
            const x = a[1];
            for (let z of arcadeBodiesToAgentOnCollisionCallbacks) {
              if (z.body === x) {
                // z.callback();
              }
            }
            // const cb = x.getData('onCollide');
            // cb(s, d)
            // debugger
            // Actors.update({
            //   onCollision
            // })

            // debugger
          },
          () => {
            // debugger
          },
          () => {
            // debugger
          }
        );
      });
    });

    dynamicGroup.forEach((s) => {
      dynamicGroup.forEach((s2) => {
        if (s !== s2) {
          // game.arcadePhysics.world.addCollider(s, s2);// add.collider(s, s2);
        }
      });
    });

    this.arcadePhysics.world.on("collide", (object1, object2, body1, body2) => {
      // console.log("collide", object1, object2, body1, body2);
    });
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
