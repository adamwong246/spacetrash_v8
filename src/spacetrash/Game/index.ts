import * as THREE from "three";
import { FOV } from "rot-js";
import {
  FloatPositionComponent,
  FloatMovingComponent,
  PositionComponent,
  MovingComponent,
} from "../../engine/game/physical";
import {
  MapSize,
  FRICTION_CONSTANT,
  TANK_VELOCITY_ANGULAR,
  TANK_VELOCITY_LINEAR,
  TileSize,
} from "../Constants";
import { Eid2PMComponent } from "../ECS/Components/v2/eid2PMC";
import { ArcadePhysicsComponent } from "../ECS/Components/v4/PhaserArcade";
import { TankMovingComponent } from "../ECS/Components/v4/TankMovingComponent";
import { distanceV2, averageNeighborsInPlace } from "../lib";
import { GameWithLoad } from "./7-WithLoad";
import { StoreV2 } from "../../engine/VECS.ts/Store";
import { SP_PhysicalComponent } from "../../engine/physics/SP_Physical";

let rot = 0;

export class SpaceTrash extends GameWithLoad {
  tick(delta: number): Promise<boolean> {
    return new Promise(async (res) => {
      // this.updateSetPieces(delta);
      this.updateActors(delta);
      this.runTankPhysics(delta);
      this.runFloatingMotion();
      this.runPhysics(delta);
      // this.resetIllumination();
      // this.resetRadiation();
      // this.runAI(delta);
      // this.runArcadePhysics();
      // this.runRadiationScan();
      // this.runHeatSpread();
      // this.runUpdateUI();
      // this.rotLighting();

      // rot += 0.00001;
      // this.components.ThreeJsRenderableComponent.each((x, i) => {
      //   // if (Math.random() > 0.01) {
      //   //     x.mesh.visible = false;
      //   // } else {
      //   //     x.mesh.visible = true;
      //   // }

      //   const c = this.entities.get(i)[0];
      //   if (c === "WallTile") {
      //     for (let mesh of x.meshes) {
      //       // mesh.rotateZ(rot);
      //       // mesh.rotateX(rot);
      //       // mesh.rotateY(rot);
      //     }

      //     // x.mesh.rotateZ(rot);
      //     // x.mesh.rotateZ(rot);
      //     // debugger
      //   }
      // });
    });
  }

  updateActors(delta: number) {
    this.components.Actors.each((actor) => {
      actor.meshes.forEach((mesh) => {
        mesh.position.x = actor.physical.pos.x;
        mesh.position.y = actor.physical.pos.y;
      });
    });
    // for (let y = 0; y < MapSize; y++) {
    //   for (let x = 0; x < MapSize; x++) {
    //     if (!this.components.SetPieces.store[y][x]) throw "wtf";

    //     this.components.SetPieces.store[y][x].actorIds =
    //       this.components.Actors.byXandY(x, y);
    //   }
    // }
  }

  updateTankMovement(f: TankMovingComponent, eid: number) {
    const videoBot = Object.entries(this.bots).find((v) => {
      return v[1][0] === eid && Number(v[0]) === this.videoFeed;
    });

    if (!videoBot) return;

    if (videoBot) {
      if (this.movingForward()) {
        f.j = "forth";
      } else if (this.movingBack()) {
        f.j = "back";
      } else if (this.movingLeft()) {
        f.i = "left";
      } else if (this.movingRight()) {
        f.i = "right";
      } else {
        f.i = "none";
        f.j = "none";
      }
    }
  }

  runTankPhysics(delta) {
    this.components.TankMovingComponent.each((t, eid) => {
      const { position, classification } = this.components.Eid2PM.take(
        eid
      ) as unknown as {
        position: SP_PhysicalComponent;
        classification: string;
      };

      if (classification === "SpaceTrashBot") {
        const direction =
          this.components.SP_PhysicalComponent.take(eid)?.body.angle;

        this.boundaryCheckBot(position);
        this.updateControls(t, eid);
        this.updateTankPosition(
          this.components.SP_PhysicalComponent.take(eid),
          t,
          eid,
          delta
        );

        // this.components.ArcadePhysicsComponent.updateFromArcadePhysics(
        //   eid,
        //   position
        // );

        // if (
        //   oldDir !== direction.r ||
        //   oldX !== position.arcadeObject.position.x ||
        //   oldY !== position.arcadeObject.position.y
        // ) {
        //   drawables.updateFromArcadePhysics(eid, position);
        // }
      } else if (classification === "Tile") {
        // throw "not implemented";
      } else {
        debugger;
        throw "idk";
      }
    });
  }

  updateTankPosition(
    p: SP_PhysicalComponent,
    f: TankMovingComponent,
    eid: number,
    delta: number
  ): boolean {
    let isMoving: boolean;
    if (f.i === "none" && f.j === "none") {
      isMoving = false;
    } else {
      isMoving = true;
    }

    this.updateTankMovement(f, eid);

    if (f.i === "left") {
      p.body.angle = p.body.angle - TANK_VELOCITY_ANGULAR;
    }
    if (f.i === "right") {
      p.body.angle = p.body.angle + TANK_VELOCITY_ANGULAR;
    }
    if (f.i === "none") {
    }

    if (f.j === "forth") {
      p.plusX(
        Math.cos(p.body.angle - 1.5708) * TANK_VELOCITY_LINEAR
        // delta
      );
      p.plusY(
        Math.sin(p.body.angle - 1.5708) * TANK_VELOCITY_LINEAR
        // delta
      );
    }
    if (f.j === "back") {
      p.plusX(
        Math.cos(p.body.angle - 1.5708) * TANK_VELOCITY_LINEAR * -1
        // delta
      );
      p.plusY(
        Math.sin(p.body.angle - 1.5708) * TANK_VELOCITY_LINEAR * -1
        // delta
      );
    }
    if (f.j === "none") {
    }

    return isMoving;
  }

  runPhysics(delta: number) {
    this.samuraiEngine.system.update();
    // this.updateFloatingMovement(f);
    // const prevX = Math.round(p.x);
    // const prevY = Math.round(p.y);
    // p.x = p.x + f.dx; // * DELTA * VELOCITY_CONSTANT;
    // p.y = p.y + f.dy; // * DELTA * VELOCITY_CONSTANT;
    // const nextX = Math.round(p.x);
    // const nextY = Math.round(p.y);

    // const hasChangedPosition = prevY !== nextY || prevX !== nextX;
    // return hasChangedPosition;

    this.components.SP_PhysicalComponent.each((sppc, eid) => {
      this.boundarySP_Physics(sppc);

      if (!sppc.body.isStatic) {
        sppc.move(delta);

        // if (this.components.TankMovingComponent.get(eid)) {
        //   // no-op
        // } else if (this.components.FloatMovingComponent.get(eid)) {
        //   // sppc.body.move(delta * 0.01);
        // }

        // sppc.friction(delta);
      }
    });

    this.samuraiEngine.update(this.samuraiCanvasContext, (result) => {
      // ball to wall
      if (!result.a.isStatic && result.b.isStatic) {
        // const motionA = this.components.FloatMovingComponent.take(result.a.SP_EID);
        // const samuraiTile = this.components.SamuraiTileComponent.take(result.b.SP_EID);

        const body = result.a;
        // const spc = this.components.SP_PhysicalComponent.take(body.SP_EID);

        // const z = this.samuraiEngine.system.getCollisionPoints(result.a, result.b);
        // debugger

        let mover = this.components.SP_PhysicalComponent.get(body.SP_EID);

        if (mover) {
          const position = this.components.SP_PhysicalComponent.take(
            result.a.SP_EID
          );

          if (!position.body.setPosition) throw "idk";

          // this.samuraiEngine.system.separate();
          // bounce the object base on normal vector
          mover.bounce(result.overlapN);
          // update the physics body
          position.body.updateBody();
        }

        // mover = this.components.TankMovingComponent.get(body.SP_EID);
        // if (mover) {
        //   // this.tankColide();
        // }
      }

      // // ball to ball
      if (!result.a.isStatic && !result.b.isStatic) {
        // debugger

        let motionA: SP_PhysicalComponent;
        let motionB: SP_PhysicalComponent;

        const [classificationA] = this.entities.get(result.a.SP_EID);
        const [classificationB] = this.entities.get(result.b.SP_EID);

        if (
          classificationA === "SpaceTrashBot" &&
          classificationB === "PuckBot"
        ) {
          // motionA = this.components.TankMovingComponent.take(result.a.SP_EID)
          // motionB = this.components.FloatMovingComponent.take(result.b.SP_EID)
          // motionB.glance(this.components.TankMovingComponent.take(result.a.SP_EID))
        } else if (
          classificationA === "PuckBot" &&
          classificationB === "PuckBot"
        ) {
          motionA = this.components.SP_PhysicalComponent.take(result.a.SP_EID);
          motionB = this.components.SP_PhysicalComponent.take(result.b.SP_EID);

          motionA.bounce(result.overlapN);
          motionB.bounce(result.overlapN);

          motionA.body.updateBody();
          motionB.body.updateBody();

          // SP_PhysicalComponent.swapMotion(
          //   this.components.SP_PhysicalComponent.take(result.a.SP_EID),
          //   this.components.SP_PhysicalComponent.take(result.b.SP_EID)
          // )

          // let tx = motionA.DX();
          // let ty = motionA.DY();
          // motionA.setMotion(motionB.DX()* Math.random() - 0.5, motionB.DY()* Math.random() - 0.5);
          // motionB.setMotion(tx* Math.random() - 0.5, ty * Math.random() - 0.5);
        }

        // if (classificationB === "SpaceTrashBot") {
        //   motionB = this.components.TankMovingComponent.take(result.b.SP_EID)
        // } else if (classificationA === "PuckBot") {
        //   motionB = this.components.FloatMovingComponent.take(result.b.SP_EID)
        // }

        // if (!motionA) throw "idk"

        // debugger
        return;
      }
    });

    // this.samuraiEngine.system.separate();
  }

  boundarySP_Physics(fpc: SP_PhysicalComponent) {
    if (fpc.X() < 0) {
      fpc.setX(MapSize * TileSize);
    }
    if (fpc.X() > MapSize * TileSize) {
      fpc.setX(0);
    }
    if (fpc.Y() < 0) {
      fpc.setY(MapSize * TileSize);
    }
    if (fpc.Y() > MapSize * TileSize) {
      fpc.setY(0);
    }
  }

  floatCollide(a: FloatMovingComponent, pos: PositionComponent) {
    // spc.dx = spc.dx * -1;
    // spc.dy = spc.dy * -1;

    const magX = Math.abs(a.dx);
    const magY = Math.abs(a.dy);
    let x = Math.round(pos.X() + a.dx);
    let y = Math.round(pos.Y() + a.dy);
    const roundX = Math.round(pos.X());
    const roundY = Math.round(pos.Y());

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
  }

  updateFloatPosition(
    p: SP_PhysicalComponent,
    f: FloatMovingComponent
  ): boolean {
    this.updateFloatingMovement(f);
    const prevX = Math.round(p.x);
    const prevY = Math.round(p.y);
    p.body.setPosition(p.body.pos.x + f.dx, p.body.pos.y + f.dy);

    // x = p.x + f.dx; // * DELTA * VELOCITY_CONSTANT;
    // p.y = p.y + f.dy; // * DELTA * VELOCITY_CONSTANT;
    // console.log(f.dy)
    const nextX = Math.round(p.x);
    const nextY = Math.round(p.y);

    const hasChangedPosition = prevY !== nextY || prevX !== nextX;
    return hasChangedPosition;
  }

  updateVelocity(f: number): number {
    return f; // * FRICTION_CONSTANT; //f * DELTA * FRICTION_CONSTANT;
  }

  updateControls(f: TankMovingComponent, eid: number) {
    const videoBot = Object.entries(this.bots).find((v) => {
      return v[1][0] === eid && Number(v[0]) === this.videoFeed;
    });

    if (!videoBot) return;

    if (videoBot) {
      const p = this.videoFeedPosition();
      const r = this.videoFeedRotation();

      if (this.movingForward()) {
        f.j = "forth";
        this.botWindowState.x = p.x;
        this.botWindowState.y = p.y;
        this.botHook({ ...this.botWindowState });
      } else if (this.movingBack()) {
        f.j = "back";
        this.botWindowState.x = p.x;
        this.botWindowState.y = p.y;
        this.botHook({ ...this.botWindowState });
      } else if (this.movingLeft()) {
        this.botWindowState.r = r.r;
        this.botHook({ ...this.botWindowState });
        f.i = "left";
      } else if (this.movingRight()) {
        this.botWindowState.r = r.r;
        this.botHook({ ...this.botWindowState });
        f.i = "right";
      } else {
        f.i = "none";
        f.j = "none";
      }
    }
  }

  /////////////////////////////////////////////////////////////

  runFloatingMotion() {
    // let repaintLights = false;
    this.components.FloatMovingComponent.each((f, eid) => {
      const { position, classification } = this.components.Eid2PM.get(eid);
      if (classification === "PuckBot" || classification === "SpaceTrashBot") {
        // const p = fps.get(eid);
        // if (!p) throw "floating position component not found";
        this.boundaryCheckBot(position);
        // collisionsAndVideoControls();
        const gridChanges = this.updateFloatPosition(position, f);
        // if (gridChanges) {
        //   repaintLights = true;
        // }
        // this.components.DrawableComponent.updatePostion(
        //   eid,
        //   position,
        //   gridChanges
        // );

        this.components.ThreeJsRenderableComponent.take(
          eid
        ).meshes[0].position.x = position.X();
        this.components.ThreeJsRenderableComponent.take(
          eid
        ).meshes[0].position.y = position.Y();
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

  updateFloatingMovement(f: FloatMovingComponent) {
    f.dx = this.updateVelocity(f.dx);
    f.dy = this.updateVelocity(f.dy);
  }

  // collisionsAndVideoControls() {
  //   this.components.Actors.each((i, a) => {
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
  // }

  //////////////////////////////////////////////////
  updateSetPieces(delta: number) {
    for (let y = 0; y < MapSize; y++) {
      for (let x = 0; x < MapSize; x++) {
        if (!this.components.SetPieces.store[y][x]) throw "wtf";

        this.components.SetPieces.store[y][x].actorIds =
          this.components.Actors.byXandY(x, y);
      }
    }
  }

  boundaryCheckBot(fpc: PositionComponent) {
    if (fpc.X() < 0) {
      fpc.setX(MapSize * TileSize);
    }
    if (fpc.X() > MapSize * TileSize) {
      fpc.setX(0);
    }
    if (fpc.Y() < 0) {
      fpc.setY(MapSize * TileSize);
    }
    if (fpc.Y() > MapSize * TileSize) {
      fpc.setY(0);
    }
  }

  // updateFloatingMovement(f: FloatMovingComponent) {
  //   f.dx = this.updateVelocity(f.dx);
  //   f.dy = this.updateVelocity(f.dy);
  // }

  // updateFloatPosition(
  //   p: FloatPositionComponent,
  //   f: FloatMovingComponent
  // ): boolean {
  //   this.updateFloatingMovement(f);
  //   const prevX = Math.round(p.x);
  //   const prevY = Math.round(p.y);
  //   p.x = p.x + f.dx; // * DELTA * VELOCITY_CONSTANT;
  //   p.y = p.y + f.dy; // * DELTA * VELOCITY_CONSTANT;
  //   const nextX = Math.round(p.x);
  //   const nextY = Math.round(p.y);

  //   const hasChangedPosition = prevY !== nextY || prevX !== nextX;
  //   return hasChangedPosition;
  // }

  // resetIllumination() {
  //   // this.components.DrawableComponent.each((d, deid) => {
  //   //   // d.sprite.visible = false;
  //   //   // d.mesh.visible = false;
  //   //   d.sprite.visible = false;
  //   //   d.mesh.visible = false;
  //   // });
  //   // LightIncastingComponent.each((z, zeid) => {
  //   //   z.luminance = 0;
  //   // });
  //   // for (let y = 0; y < MapSize; y++) {
  //   //   for (let x = 0; x < MapSize; x++) {
  //   //     SetPieces.store[y][x].luminance = -1;
  //   //   }
  //   // }
  // }

  // rotLighting() {
  //   function lightPasses(x, y) {
  //     if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
  //       // const z = this.components.SetPieces.at(x, y);
  //       // if (z && z.tileType === "WallTile") {
  //       //   return false;
  //       // } else {
  //       //   return true;
  //       // }
  //     }
  //     return false;

  //     // var key = x + "," + y;
  //     // if (key in data) {
  //     //   return data[key] == 0;
  //     // }
  //     // return false;
  //   }

  //   // var fov = new FOV.PreciseShadowcasting(lightPasses);
  //   var fov = new FOV.RecursiveShadowcasting(lightPasses);

  //   const lightMap = new Map();

  //   /* output callback */
  //   fov.compute(
  //     Math.round(this.camera.position.x / TileSize),
  //     Math.round(this.camera.position.y / TileSize),
  //     10,
  //     function (x, y, r) {
  //       if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
  //         // console.log(r)
  //         lightMap.set(`${x}-${y}`, r);

  //         // const z = setPieces.at(x, y);

  //         // if (visibility === 1 && z && z.drawing) {
  //         //   z.drawing.sprite.visible = true;
  //         //   z.drawing.mesh.visible = true;
  //         // }
  //         // if (visibility === 0 && z && z.drawing) {
  //         //   z.drawing.sprite.visible = false;
  //         //   z.drawing.mesh.visible = false;
  //         // }

  //         // actors.each((aid, ac) => {
  //         //   ac.position.
  //         //   // const a = actors.positionOf(Number(aid))
  //         //   // // if () {

  //         //   // // }
  //         // })
  //         // console.log(z.actorIds)
  //         // z.actorIds.forEach((aid) => {
  //         //   drawables.get(aid).sprite.visible = true;
  //         //   drawables.get(aid).mesh.visible = true;
  //         //   // const actor = actors.get(aid);
  //         //   // act
  //         // })
  //       }
  //     }
  //   );

  //   let colors = {
  //     1: new THREE.MeshBasicMaterial({ color: 0xffffff }),
  //     2: new THREE.MeshBasicMaterial({ color: 0xe0e0e0 }),
  //     3: new THREE.MeshBasicMaterial({ color: 0xc0c0c0 }),
  //     4: new THREE.MeshBasicMaterial({ color: 0xa0a0a0 }),
  //     5: new THREE.MeshBasicMaterial({ color: 0x808080 }),
  //     6: new THREE.MeshBasicMaterial({ color: 0x606060 }),
  //     7: new THREE.MeshBasicMaterial({ color: 0x404040 }),
  //     8: new THREE.MeshBasicMaterial({ color: 0x202020 }),
  //     9: new THREE.MeshBasicMaterial({ color: 0x101010 }),
  //     10: new THREE.MeshBasicMaterial({ color: 0x000000 }),
  //   };

  //   for (let l of lightMap) {
  //     const k = l[0];
  //     const splitt = k.split("-");

  //     const x = Number(splitt[0]);
  //     const y = Number(splitt[1]);

  //     // const setPiece = this.components.SetPieces.at(x, y);
  //     const lit = l[1];

  //     // if (setPiece && setPiece.drawing && lit) {
  //     //   setPiece.drawing.sprite.visible = true;
  //     //   setPiece.drawing.mesh.visible = true;

  //     //   setPiece.drawing.mesh.material = colors[Math.round(lit / 2 + 5)];

  //     //   this.components.ArcadePhysics.each((apo, eid) => {
  //     //     // apo.arcadeObject.visible = true;
  //     //     // debugger

  //     //     // console.log(Math.round(apo.arcadeObject.position.x/TileSize), x)

  //     //     if (
  //     //       Math.round(apo.arcadeObject.position.x / TileSize) === x &&
  //     //       Math.round(apo.arcadeObject.position.y / TileSize) === y
  //     //     ) {
  //     //       // apo.arcadeObject.visible = true;
  //     //       // actors.get(eid)
  //     //       // const litThing = this.components.DrawableComponent.take(eid);
  //     //       // litThing.mesh.visible = true;
  //     //       // litThing.sprite.visible = true;
  //     //     }
  //     //   });

  //     //   if (true) {
  //     //     const north = lightMap.get(`${x}-${y - 1}`);
  //     //     const east = lightMap.get(`${x + 1}-${y}`);
  //     //     const west = lightMap.get(`${x - 1}-${y}`);
  //     //     const south = lightMap.get(`${x}-${y + 1}`);

  //     //     if (!north) {
  //     //       const northernsetpiece = this.components.SetPieces.at(
  //     //         x,
  //     //         y - 1
  //     //       );
  //     //       if (northernsetpiece && northernsetpiece.drawing) {
  //     //         northernsetpiece.drawing.sprite.visible = true;
  //     //         northernsetpiece.drawing.mesh.visible = true;
  //     //       }
  //     //     }
  //     //     if (!east) {
  //     //       const easternSetPiece = this.components.SetPieces.at(x + 1, y);
  //     //       if (easternSetPiece && easternSetPiece.drawing) {
  //     //         easternSetPiece.drawing.sprite.visible = false;
  //     //         easternSetPiece.drawing.mesh.visible = true;
  //     //       }
  //     //     }
  //     //     if (!south) {
  //     //       const southernSetPiece = this.components.SetPieces.at(
  //     //         x,
  //     //         y + 1
  //     //       );
  //     //       if (southernSetPiece && southernSetPiece.drawing) {
  //     //         southernSetPiece.drawing.sprite.visible = true;
  //     //         southernSetPiece.drawing.mesh.visible = true;
  //     //       }
  //     //     }
  //     //     if (!west) {
  //     //       const westernSetPiece = this.components.SetPieces.at(x - 1, y);
  //     //       if (westernSetPiece && westernSetPiece.drawing) {
  //     //         westernSetPiece.drawing.sprite.visible = true;
  //     //         westernSetPiece.drawing.mesh.visible = true;
  //     //       }
  //     //     }
  //     //   } else {
  //     //     // if (setPiece.drawing) {
  //     //     //   setPiece.drawing.sprite.visible = true;
  //     //     //   setPiece.drawing.mesh.visible = true;
  //     //     // }
  //     //   }
  //     // } else {
  //     // }
  //   }
  // }

  // resetRadiation() {
  //   this.components.RadiationDetectorComponent.each((rd, rdid) => {
  //     rd.rads = 0;
  //   });
  // }

  // runAI(delta: number) {
  //   this.components.AiAgentComponent.each((a, aeid) => {
  //     a.tick(this, delta);
  //   });

  //   // attacks.each((eid, attack) => {

  //   // });
  // }

  // runArcadePhysics() {

  //   this.components.ArcadePhysicsComponent.each((f, feid) => {
  //     const classification = this.components.Eid2PM.take(
  //       feid,
  //       "ArcadePhysicsComponent should should be present in Eid2PM"
  //     ).classification;

  //     // console.log(classification)
  //     if (classification === "PuckBot") {
  //       // const p = fps.get(eid);
  //       // if (!p) throw "floating position component not found";
  //       // boundaryCheckBot(position);
  //       // collisionsAndVideoControls();
  //       // const gridChanges = upsdateFloatPosition(position, f);
  //       // if (gridChanges) {
  //       //   repaintLights = true;
  //       // }
  //       // drawables.updatePostion(eid, position, true);
  //       // this.components.DrawableComponent.updateFromArcadePhysics(feid, f);

  //       this.components.PixiJsRenderableComponent.take(
  //         feid
  //       ).updateFromArcadePhysics(f);
  //       // debugger
  //     } else if (classification === "Tile") {
  //       // throw "not implemented";
  //     } else {

  //       this.components.PixiJsRenderableComponent.withIf((x) => {
  //         x.updateFromArcadePhysics(f);
  //       }, feid);

  //       this.components.ThreeJsRenderableComponent.withIf((x) => {
  //         x.updateFromArcadePhysics(f);
  //       }, feid);

  //       // this.components.PixiJsRenderableComponent.take(
  //       //   feid
  //       // ).updateFromArcadePhysics(f);
  //       // this.components.ThreeJsRenderableComponent.take(
  //       //   feid
  //       // ).updateFromArcadePhysics(f);

  //       // this.components.DrawableComponent.updateFromArcadePhysics(feid, f);
  //     }
  //   });
  //   // if (repaintLights) {
  //   //   resetIllumination();
  //   //   // runIlluminationV7(fovMap);
  //   //   for (let y = 0; y < MapSize; y++) {
  //   //     for (let x = 0; x < MapSize; x++) {
  //   //       setPieces.store[y][x].drawing.mesh.visible =
  //   //         setPieces.store[y][x].luminance > 0;
  //   //       setPieces.store[y][x].drawing.sprite.visible =
  //   //         setPieces.store[y][x].luminance > 0;
  //   //     }
  //   //   }
  //   // }
  // }

  // runRadiationScan() {
  //   this.components.RadiationDetectorComponent.each((rd, rdid) => {
  //     let rads = 0;
  //     this.components.RadiationEmitterComponent.each((re, reid) => {
  //       const pa = this.components.Eid2PM.getAbsoluteXandY(rdid);
  //       const pb = this.components.Eid2PM.getAbsoluteXandY(reid);

  //       const distance = distanceV2(pa.x, pa.y, pb.x, pb.y);

  //       const power = re.rads / distance;

  //       if (isNaN(power)) throw `power cannot be NaN`;

  //       rads += power;
  //     });

  //     rd.rads = rads;
  //   });
  // }

  // runHeatSpread() {
  //   // inject heat into system
  //   this.components.HeatEmitterComponent.each((h, eid) => {
  //     const { x, y } = this.components.Eid2PM.take(eid).position;
  //     const s = this.components.SetPieces.take(x, y);
  //     s.heat += h.power;
  //   });

  //   // then average it out
  //   // averageNeighborsInPlace(this.components.SetPieces, this);

  //   // for (let y = 0; y < MapSize; y++) {
  //   //   for (let x = 0; x < MapSize; x++) {
  //   //     // GAME.components.SetPieces.store[y][x] = new SetPieceComponent();
  //   //     const s: SetPieceComponent = GAME.components.SetPieces.store[y][x];
  //   //     const graphic = s.thermalGraphic;

  //   //     // s.thermalGraphic.beginFill(interpolateColor(-100, 100, s.heat, "#FF00aa", "#aa00FF"));

  //   //     // // set the line style to have a width of 5 and set the color to red
  //   //     // s.thermalGraphic.lineStyle(5, 0xff00aa);

  //   //     // // draw a rectangle
  //   //     // s.thermalGraphic.drawRect(x * TileSize, y * TileSize, TileSize, TileSize);
  //   //     // s.thermalGraphic.endFill();

  //   //     // s.thermalGraphic.fillStyle = interpolateColor(-100, 100, s.heat, "#FF0000", "#0000FF");
  //   //     // s.thermalGraphic.fillStyle = 0xFF0000
  //   //   }
  //   // }
  // }

  runUpdateUI() {
    const b = this.bots[this.videoFeed] as [number, string];
    const eidOfVideoFeed = b[0];

    // if (this.components.RadiationDetectorComponent.get(eidOfVideoFeed)) {
    //   this.updateBotWindowRadiation(
    //     this.components.RadiationDetectorComponent.take(eidOfVideoFeed).rads
    //   );
    // } else {
    //   this.updateBotWindowRadiation("?");
    // }

    // RadiationDetectors.each((rd, rdid) => {
    //   rd.rads = 0;
    // });
  }
}
