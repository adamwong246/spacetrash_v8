import * as THREE from "three";

import { SpaceTrash } from "../..";
import { MapBoundHigh, MapBoundLow, MapSize, TileSize } from "../../Constants";

import { ActorStore } from "../Components/v3/actors";
import { ClassificationStore } from "../Components/v2/classifiable";
import { DrawableStoreV2, DrawableComponent } from "../Components/v2/drawable";
import { Eid2PMStore, Eid2PMComponent } from "../Components/v2/eid2PMC";
import {
  LightingComponentStore,
  LightComponentStore,
} from "../Components/v2/lights";
import {
  IntegerPositionStore,
  FloatMovingStore,
  FloatPositionStore,
  TankMovingStore,
  OrdinalDirectionStore,
} from "../Components/v2/physical";
import { TileComponentStore } from "../Components/v2/tileable";
import { LightPositionStore } from "../Components/v3/LightPosition";
import { ArcadePhysicsStore } from "../Components/v2/arcadePhysics";
import { AiAgentStore } from "../Components/v3/ai";
import {
  LightOutcastingComponent,
  LightOutcastingStore,
} from "../Components/v1/casting/out";
import {
  LightIncastingStore,
  LightIncastingComponent,
} from "../Components/v1/casting/in";
import { SetPieceStore, SetPieceComponent } from "../Components/v3/setPieces";

let actors: ActorStore;
// let actorsLit: LightingComponentStore;
let arcadeObjects: ArcadePhysicsStore;
let classs: ClassificationStore;
let drawables: DrawableStoreV2;
let eid2PMSs: Eid2PMStore;
let fmc: FloatMovingStore;
let fp2Emitter: Record<number, LightOutcastingComponent> = {};
let fps: FloatPositionStore;
// let incasters: LightIncastingStore;
let ips: IntegerPositionStore;
let light2Draw: Record<number, DrawableComponent> = {};
// let light2IntegerPosition: LightPositionStore;
// let lights: LightComponentStore;
let ods: OrdinalDirectionStore;
let outcasters: LightOutcastingStore;
let setPieceLit: LightingComponentStore;
let setPieces: SetPieceStore;
let tiles: TileComponentStore;
let tms: TankMovingStore;

let aiAgents: AiAgentStore;

let GAME: SpaceTrash;

export default async (game: SpaceTrash, delta: number) => {
  // Level 0 - "Component Stores"
  aiAgents = game.componentStores["AiAgentComponent"] as AiAgentStore;

  arcadeObjects = game.componentStores[
    "ArcadePhysicsComponent"
  ] as ArcadePhysicsStore;

  arcadeObjects = game.componentStores[
    "ArcadePhysicsComponent"
  ] as ArcadePhysicsStore;

  ods = game.componentStores[
    "OrdinalDirectionComponent"
  ] as OrdinalDirectionStore;
  tms = game.componentStores["TankMovingComponent"] as TankMovingStore;
  drawables = game.componentStores["DrawableComponent"] as DrawableStoreV2;
  fmc = game.componentStores["FloatMovingComponent"] as FloatMovingStore;
  fps = game.componentStores["FloatPositionComponent"] as FloatPositionStore;
  outcasters = game.componentStores[
    LightOutcastingComponent.name
  ] as LightOutcastingStore;
  // incasters = game.componentStores[
  //   LightIncastingComponent.name
  // ] as LightIncastingStore;
  tiles = game.componentStores["TileComponent"] as TileComponentStore;
  ips = game.componentStores[
    "IntegerPositionComponent"
  ] as IntegerPositionStore;
  classs = game.componentStores[
    "ClassificationComponent"
  ] as ClassificationStore;

  // Level 1 - "Stores"
  actors = game.stores["ActorComponent"] as ActorStore;
  setPieces = game.stores["SetPieceComponent"] as SetPieceStore;

  // actorsLit = game.stores["ActorsLit"] as LightingComponentStore;
  eid2PMSs = game.stores["Eid2PMComponent"] as Eid2PMStore;

  // lights = game.stores["LightComponent"] as LightComponentStore;
  // lights = game.stores["LightComponent"] as LightComponentStore;
  // setPieceLit = game.stores["SetPiecesLit"] as LightingComponentStore;
  
  // light2IntegerPosition = game.stores[
  //   "LightPositionComponent"
  // ] as LightPositionStore;



  // todo reimpliment classification
  Object.keys(classs.store).forEach((k) => {
    const n = Number.parseInt(k);
    const kk = classs.get(n);
    const classification = kk;
    const eid = k;

    if (classification === "SpaceTrashBot") {
      eid2PMSs.add(new Eid2PMComponent(arcadeObjects.get(n), kk), n);
    } else if (classification === "Tile") {
      eid2PMSs.add(new Eid2PMComponent(ips.get(n), kk), n);
    } else if (classification === "PuckBot") {
      eid2PMSs.add(new Eid2PMComponent(arcadeObjects.get(n), kk), n);
    }
  });

  // outcasters.each(([ndx, [eid, lc]]) => {
  //   // const classification = eid2PMSs.get(eid).classification;
  //   // lights.add(eid, fps.store[ndx], classification);
  // });

  // 2 deep
  // according to profile, this is very slow
  outcasters.each(([n, [eid, _lx]]) => {
    const classification = eid2PMSs.store[eid].classification;

    if (classification === "Tile") {
      setPieceLit.add(eid, ips.get(eid), classification);
    } else {
      // actorsLit.add(eid, fps.get(eid), classification);
    }

    drawables.withIf(eid, ([n, dc, s]) => {
      light2Draw[n] = dc[1];
    });

    // ips.withIf(eid, ([n, dc, s]) => {
    //   light2IntegerPosition.add(dc, s);
    // });
  });

  // setup the empty setPieces
  for (let y = 0; y < MapSize; y++) {
    setPieces.store[y] = [];
    for (let x = 0; x < MapSize; x++) {
      setPieces.store[y][x] = new SetPieceComponent();

      // for (let yy = 0; yy < MapSize; yy++) {
      //   setPieces.store[y][x].FOV[yy] = [];
      //   for (let xx = 0; xx < MapSize; xx++) {
      //     setPieces.store[y][x].FOV[yy][xx] = [];
      //   }
      // }
    }
  }

  // 3 deep
  // build set pieces grid
  ips.each(([eid, [ndx, s]]) => {
    setPieces.at(s.x, s.y).setId = ndx;

    const t = tiles.get(ndx);
    if (!t) {
      throw "why no t?";
    }

    setPieces.at(s.x, s.y);
    setPieces.at(s.x, s.y).tileType = t.tileType;
    setPieces.at(s.x, s.y).incasterId = eid;

    drawables.withIf(eid, (dc) => {
      setPieces.at(s.x, s.y).drawing = dc[1];
    });
  });

  // 2 deep
  // setup the actors list
  fps.each((ndx, y, aeid) => {
    const mf = fmc.store.find((x) => x[0] === aeid);
    const mt = tms.store.find((x) => x[0] === aeid);

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
    actors.add({
      actorId: ndx,
      friendly: game.isFriendly(ndx),
      position: y,
      motion,
    });

    outcasters.each(([leid, le]) => {
      if (aeid === leid) {
        fp2Emitter[aeid] = le;
      }
    });
  });

  arcadeObjects.each((eid, apc) => {
    if (actors.get(eid)) {
      actors.get(eid).arcadeBody = apc;
    }
  });

  aiAgents.each((eid2, agent) => {
    if (actors.get(eid2)) {
      actors.get(eid2).agent = agent;
    } else {
      actors.add({
        agent,
      });
    }
  });

  runInitialMapBoundaryCheck();
  runPlaceImmoveableSetPieces();
  setup2dAnd3dGames(game);
  setupArcadePhysics(game);
  setupAiAgents(game);

  return map1;
};

function setup2dAnd3dGames(game: SpaceTrash) {
  drawables.each(([a, d, c]: [any, DrawableComponent, any]) => {
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

function setupAiAgents(game: SpaceTrash) {
  debugger;
  actors.each((eid, ac) => {
    if (!ac.friendly) {
      aiAgents.each((eid2, ai) => {
        if (eid === eid2) {
          ac.agent = ai;
        }
      });
    }
  });
}

const setupArcadePhysics = (game: SpaceTrash) => {
  const staticGroup: any[] = [];
  const dynamicGroup: any[] = [];

  arcadeObjects.store.forEach((v, k) => {
    v.arcadeObject = v.creator(game.arcadePhysics);
    if (v.arcadeObject.immovable) staticGroup.push(v.arcadeObject);
    else dynamicGroup.push(v.arcadeObject);
  });

  dynamicGroup.forEach((s) => {
    s.position.x = Math.random() * MapSize * TileSize;
    s.position.y = Math.random() * MapSize * TileSize;
    // s.setVelocityX((Math.random() - 0.5) * SPEED_CONSTANT)
    // s.setVelocityY((Math.random() - 0.5) * SPEED_CONSTANT)
    // s.setAccelerationX((Math.random() - 0.5) * SPEED_CONSTANT)
    // s.setAccelerationY((Math.random() - 0.5) * SPEED_CONSTANT)
  });

  dynamicGroup.forEach((d) => {
    staticGroup.forEach((s) => {
      game.arcadePhysics.add.collider(s, d);
    });
  });

  dynamicGroup.forEach((s) => {
    dynamicGroup.forEach((s2) => {
      if (s !== s2) {
        game.arcadePhysics.add.collider(s, s2);
      }
    });
  });
};

const runPlaceImmoveableSetPieces = () => {
  drawables.each(([eid, d, ks]) => {
    fps.withIf(eid, (pndx, peid, p) => {
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
    });

    ips.withIf(eid, ([pic, p]) => {
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
    });
  });
};

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
  ips.each((c) => {
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
