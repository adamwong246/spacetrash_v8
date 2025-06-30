
import { SpaceTrash } from "../../../Game";
import {
  MapSize,
  TileSize,
  MapBoundLow,
  MapBoundHigh,
} from "../../../Constants";
import { ArcadePhysicsStore } from "../../Components/v2/arcadePhysics";
import { DrawableStoreV2 } from "../../Components/v2/drawable";
import { Eid2PMStore, Eid2PMComponent } from "../../Components/v2/eid2PMC";
import {
  FloatMovingStore,
  FloatPositionStore,
  IntegerPositionStore,
  TankMovingStore,
} from "../../Components/v2/physical";
import { TileComponentStore } from "../../Components/v2/tileable";
import { ActorStore } from "../../Components/v3/actors";
import { AiAgentStore } from "../../Components/v3/ai";
import {
  HeatConductorStore,
  HeatDetectorStore,
  HeatEmitterStore,
  HeatConductorComponent,
} from "../../Components/v3/heat";
import {
  SetPieceStore,
  SetPieceComponent,
} from "../../Components/v3/setPieces";

import loadAssets from "./loadAssets";
import { setup2dAnd3dGames, setupAiAgents, setupArcadePhysics } from "./setupArcadePhysics";

let GAME: SpaceTrash;

export default async (game: SpaceTrash, delta: number) => {
  const {
    Actors,
    AiAgentComponent,
    ArcadePhysicsComponent,
    DrawableComponent,
    Eid2PM,
    FloatMovements,
    FloatPositions,
    HeatConductorComponent,
    HeatDetectorComponent,
    HeatEmitterComponent,
    IntegerPositionComponent,
    SetPieces,
    TankMovingComponent,
    TileComponent,
  }: {
    Actors: ActorStore;
    AiAgentComponent: AiAgentStore;
    ArcadePhysicsComponent: ArcadePhysicsStore;

    DrawableComponent: DrawableStoreV2;
    Eid2PM: Eid2PMStore;
    FloatMovements: FloatMovingStore;
    FloatPosition: FloatPositionStore;
    HeatConductorComponent: HeatConductorStore;
    HeatDetectorComponent: HeatDetectorStore;
    HeatEmitterComponent: HeatEmitterStore;
    IntegerPositionComponent: IntegerPositionStore;
    SetPieces: SetPieceStore;
    TankMovingComponent: TankMovingStore;
    TileComponent: TileComponentStore;
  } = game.components;

  GAME = game;
  window.GAME = game;

  await loadAssets();

  // ArcadeBodies must be re-constituted with the running game
  ArcadePhysicsComponent.each((apc, eid) => {
    ArcadePhysicsComponent.take(eid).arcadeObject = apc.creator(
      game.arcadePhysics
    );
  });

  for (let [eid, [classification]] of GAME.entities) {
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
    } else if (classification === "WarpCore") {
      Eid2PM.make(
        new Eid2PMComponent(ArcadePhysicsComponent.take(eid), classification),
        eid
      );
    }
  }
  
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
    (GAME.components.Eid2PM as Eid2PMStore).make(
      new Eid2PMComponent(s, "_"),
      eid
    );

    // SetPieces.take(s.x, s.y).setId = eid;
    SetPieces.update(
      {
        eid,
      },
      s.x,
      s.y
    );

    const t = TileComponent.get(eid);
    if (t) {
      SetPieces.update(
        {
          tileType: t.tileType,
          incasterId: eid,
        },
        s.x,
        s.y
      );
    }

    HeatConductorComponent.withIf((dc) => {
      // SetPieces.at(s.x, s.y).drawing = dc[1];
      SetPieces.update(
        {
          heatConductor: dc[1],
        },
        s.x,
        s.y
      );
    }, eid);

    HeatEmitterComponent.withIf((dc) => {
      // SetPieces.at(s.x, s.y).drawing = dc[1];
      SetPieces.update(
        {
          heatEmitter: dc[1],
        },
        s.x,
        s.y
      );
    }, eid);

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

    Actors.take(aeid).actorId = ndx;
    Actors.take(aeid).friendly = game.isFriendly(ndx);
    Actors.take(aeid).position = y;
    Actors.take(aeid).motion = motion;
  });

  ArcadePhysicsComponent.each((apc, eid) => {
    if (!apc.arcadeObject.immovable) {
      if (Actors.get(eid)) {
        Actors.take(eid).arcadeBody = apc.arcadeObject;
      } else {
        Actors.make({ arcadeBody: apc.arcadeObject }, eid);
      }
    }
  });

  AiAgentComponent.each((agent, eid) => {
    Actors.take(eid).agent = agent;
    Actors.take(eid).friendly = false;
  });

  runInitialMapBoundaryCheck(FloatPositions, IntegerPositionComponent);
  runPlaceImmoveableSetPieces(
    DrawableComponent,
    FloatPositions,
    IntegerPositionComponent
  );

  setup2dAnd3dGames();
  setupArcadePhysics();
  setupAiAgents();

  setupHeat();
  
  return;
};

function setupHeat() {
  GAME.components.HeatConductorComponent.each(
    (heatConductor: HeatConductorComponent, hceid) => {
      GAME.components.IntegerPositionComponent.each((ip, ipceid) => {
        if (hceid === ipceid) {
          heatConductor.pixiThermalGraphic =
            HeatConductorComponent.thermalGraphic(ip.x, ip.y);
          GAME.pixi2dThermalApp.stage.addChild(
            heatConductor.pixiThermalGraphic
          );
        }

        const { x, y } = ip;
        const sp = GAME.components.SetPieces.store[y][x];

        if (!sp) {
          GAME.components.SetPieces.make(
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
