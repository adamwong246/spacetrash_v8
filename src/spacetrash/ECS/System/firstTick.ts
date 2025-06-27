import * as THREE from "three";

import { SpaceTrash } from "../..";
import { MapBoundHigh, MapBoundLow, MapSize, TileSize } from "../../Constants";

import { DrawableStoreV2 } from "../Components/v2/drawable";
import { Eid2PMComponent, Eid2PMStore } from "../Components/v2/eid2PMC";
import { SetPieceComponent, SetPieceStore } from "../Components/v3/setPieces";
import { ActorComponent, ActorStore } from "../Components/v3/actors";
import { ClassificationStore } from "../Components/v2/classifiable";
import { ArcadePhysicsStore } from "../Components/v2/arcadePhysics";
import {
  FloatMovingStore,
  FloatPositionStore,
  IntegerPositionStore,
  TankMovingStore,
} from "../Components/v2/physical";
import { AiAgentStore } from "../Components/v3/ai";
import { TileComponentStore } from "../Components/v2/tileable";

export default async (game: SpaceTrash, delta: number) => {
  const {
    Actors,
    AiAgentComponent,
    ArcadePhysicsComponent,
    ClassificationComponent,
    DrawableComponent,
    Eid2PM,
    FloatMovements,
    FloatPositions,
    IntegerPositionComponent,
    SetPieces,
    TankMovingComponent,
    TileComponent,
  }: {
    Actors: ActorStore;
    AiAgentComponent: AiAgentStore;
    ArcadePhysicsComponent: ArcadePhysicsStore;
    ClassificationComponent: ClassificationStore;
    DrawableComponent: DrawableStoreV2;
    Eid2PM: Eid2PMStore;
    FloatMovements: FloatMovingStore;
    FloatPosition: FloatPositionStore;
    IntegerPositionComponent: IntegerPositionStore;
    SetPieces: SetPieceStore;
    TankMovingComponent: TankMovingStore;
    TileComponent: TileComponentStore;
  } = game.components;

  // ArcadeBodies must be re-constituted with the running game
  ArcadePhysicsComponent.each((apc, eid) => {
    const arcadeObject = apc.creator(game.arcadePhysics);

    ArcadePhysicsComponent.upsert(
      {
        arcadeObject,
      },
      eid
    );
  });

  // todo reimpliment classification
  ClassificationComponent.each((cc, eid) => {
    const kk = ClassificationComponent.take(eid);
    const classification = kk.entityConstructorName;

    if (classification === "SpaceTrashBot") {
      Eid2PM.make(
        new Eid2PMComponent(ArcadePhysicsComponent.take(eid), classification),
        eid
      );
    } else if (classification === "Tile") {
      Eid2PM.make(
        new Eid2PMComponent(IntegerPositionComponent.take(eid), classification),
        eid
      );
    } else if (classification === "PuckBot") {
      Eid2PM.make(
        new Eid2PMComponent(ArcadePhysicsComponent.take(eid), classification),
        eid
      );
    }
  });

  // outcasters.each(([ndx, [eid, lc]]) => {
  //   // const classification = eid2PMSs.get(eid).classification;
  //   // lights.add(eid, fps.store[ndx], classification);
  // });

  // 2 deep
  // according to profile, this is very slow
  // outcasters.each(([n, [eid, _lx]]) => {
  //   const classification = eid2PMSs.store[eid].classification;

  //   if (classification === "Tile") {
  //     setPieceLit.add(eid, ips.get(eid), classification);
  //   } else {
  //     // actorsLit.add(eid, fps.get(eid), classification);
  //   }

  //   drawables.withIf(eid, ([n, dc, s]) => {
  //     light2Draw[n] = dc[1];
  //   });

  //   // ips.withIf(eid, ([n, dc, s]) => {
  //   //   light2IntegerPosition.add(dc, s);
  //   // });
  // });

  // setup the empty setPieces
  for (let y = 0; y < MapSize; y++) {
    SetPieces.store[y] = [];
    for (let x = 0; x < MapSize; x++) {
      SetPieces.store[y][x] = new SetPieceComponent();
    }
  }

  // 3 deep
  // build set pieces grid
  IntegerPositionComponent.each((s, eid) => {
    // SetPieces.take(s.x, s.y).setId = eid;
    SetPieces.update(
      {
        eid,
      },
      s.x,
      s.y
    );

    const t = TileComponent.take(eid);
    if (!t) {
      throw "why no t?";
    }

    SetPieces.update(
      {
        tileType: t.tileType,
        incasterId: eid,
      },
      s.x,
      s.y
    );

    DrawableComponent.withIf((dc) => {
      // SetPieces.at(s.x, s.y).drawing = dc[1];
      SetPieces.update(
        {
          drawing: dc[1],
        },
        s.x,
        s.y
      );
    }, eid);
  });

  // 2 deep
  // setup the actors list
  FloatPositions.each((ndx, y, aeid) => {
    const mf = FloatMovements.find((x) => x[0] === aeid);
    const mt = TankMovingComponent.find((x) => x[0] === aeid);

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

    // add the actors
    Actors.upsert(
      {
        actorId: ndx,
        friendly: game.isFriendly(ndx),
        position: y,
        motion,
      },
      aeid
    );

    // outcasters.each(([leid, le]) => {
    //   if (aeid === leid) {
    //     fp2Emitter[aeid] = le;
    //   }
    // });
  });

  ArcadePhysicsComponent.each((apc, eid) => {
    Actors.upsert(
      {
        arcadeBody: apc.arcadeObject,
      },
      eid
    );
  });

  AiAgentComponent.each((agent, eid) => {
    Actors.upsert(
      {
        agent,
        friendly: false
      },
      eid
    );
  });

  runInitialMapBoundaryCheck(FloatPositions, IntegerPositionComponent);
  runPlaceImmoveableSetPieces(
    DrawableComponent,
    FloatPositions,
    IntegerPositionComponent
  );
  setup2dAnd3dGames(game, DrawableComponent);
  setupArcadePhysics(game, ArcadePhysicsComponent, Actors);
  setupAiAgents(game, Actors, AiAgentComponent);

  return;
};

function setup2dAnd3dGames(
  game: SpaceTrash,
  DrawableComponent: DrawableStoreV2
) {
  DrawableComponent.each((d, deid) => {
    game.pixi2dApp.stage.addChild(d.sprite);
    game.pixi2dApp.stage.addChild(d.char);
    game.scene.add(d.mesh);
  });

  // this.scene.add(spotlight);
  const pointlight = new THREE.PointLight(0xffffff, 1000, 0, 2);
  pointlight.position.set(
    game.camera.position.x,
    game.camera.position.y,
    game.camera.position.z
  );
  game.scene.add(pointlight);
}

const arcadeBodiesToAgentOnCollisionCallbacks: { body, callback }[] = [];

function setupAiAgents(game: SpaceTrash, Actors: ActorStore, Agents: AiAgentStore) {
  Actors.each((ac, eid) => {
    if (!ac.friendly) {
      
      Agents.each((ai, eid2) => {
        if (eid === eid2) {

          // const onCollide = () => { };
          
          // ac.onCollision = onCollide;
          // ai.
            
          ac.agent = ai;
          arcadeBodiesToAgentOnCollisionCallbacks.push({
            body: ac.arcadeBody,
            callback: ai.collideCallback
          })
          // ac.arcadeBody.setData('onCollide', ai.onCollide)
          ai.boot(ac.arcadeBody);
        }
      });
    }
  });
}

const setupArcadePhysics = (game: SpaceTrash, ArcadePhysics, Actors: ActorStore) => {
  const staticGroup: any[] = [];
  const dynamicGroup: any[] = [];

  ArcadePhysics.each((v, k) => {
    if (v.arcadeObject.immovable) staticGroup.push(v.arcadeObject);
    else dynamicGroup.push(v.arcadeObject);
  });

  dynamicGroup.forEach((s) => {
    s.position.x = Math.random() * MapSize * TileSize;
    s.position.y = Math.random() * MapSize * TileSize;
  });

  dynamicGroup.forEach((d) => {
    staticGroup.forEach((s) => {
      game.arcadePhysics.world.addCollider(s, d, (...a) => {
        const x = a[1];
        for (let z of arcadeBodiesToAgentOnCollisionCallbacks) {
          if (z.body === x) {
            z.callback()
          }
        }
        // const cb = x.getData('onCollide');
        // cb(s, d)
        // debugger
        // Actors.update({
        //   onCollision
        // })


        // debugger
      }, () => {
        // debugger
      }, () => {
        // debugger
      });// add.collider(s, d);
    });
  });

  dynamicGroup.forEach((s) => {
    dynamicGroup.forEach((s2) => {
      if (s !== s2) {
        // game.arcadePhysics.world.addCollider(s, s2);// add.collider(s, s2);
      }
    });
  });

  // game.arcadePhysics.world.ad

  game.arcadePhysics.world.on('collide', (object1, object2, body1, body2) => {
    console.log("collide", object1, object2, body1, body2)
  })
};

const runPlaceImmoveableSetPieces = (
  DrawableComponent: DrawableStoreV2,
  FloatPositions: FloatPositionStore,
  IntegerPositions: IntegerPositionStore
) => {
  DrawableComponent.each((d, eid) => {
    FloatPositions.withIf((p) => {
      if (d.sprite) {
        d.sprite.position.x = p.x * TileSize;
        d.sprite.position.y = p.y * TileSize;
      } else {
        throw "the sprite should be loaded by now";
      }

      if (d.mesh) {
        d.mesh.position.x = p.x * TileSize;
        d.mesh.position.y = p.y * TileSize;
      } else {
        throw "the mesh should be loaded by now";
      }

      d.char.position.x = p.x * TileSize;
      d.char.position.y = p.y * TileSize;
    }, eid);

    IntegerPositions.withIf((p) => {
      if (d.sprite) {
        d.sprite.position.x = p.x * TileSize;
        d.sprite.position.y = p.y * TileSize;
      } else {
        throw "the sprite should be loaded by now";
      }

      if (d.mesh) {
        d.mesh.position.x = p.x * TileSize;
        d.mesh.position.y = p.y * TileSize;
      } else {
        throw "the mesh should be loaded by now";
      }

      d.char.position.x = p.x * TileSize;
      d.char.position.y = p.y * TileSize;
    }, eid);
  });
};

// boundary check against level map for objects with position
function runInitialMapBoundaryCheck(
  FloatPositions: FloatPositionStore,
  IntegerPositions: IntegerPositionStore
) {
  // actors out of bounds check
  FloatPositions.each((c) => {
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

  // set piece out of bounds check
  // necessary?
  IntegerPositions.each((c) => {
    if (c.x < 0) {
      c.x = MapSize;
    }
    if (c.x > MapSize) {
      c.x = 0;
    }
    if (c.y < 0) {
      c.y = MapSize;
    }
    if (c.y > MapSize) {
      c.y = 0;
    }
  });
}
