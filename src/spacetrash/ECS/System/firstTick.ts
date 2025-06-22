import { SpaceTrash } from "../..";
import { MapBoundHigh, MapBoundLow, MapSize, TileSize } from "../../Constants";
import { LittableStore } from "../Components/casting/in";
import { LitComponent, LitStore } from "../Components/casting/out";
import { SetPieceComponent, SetPieceStore } from "../Components/phase0";
import { ActorStore } from "../Components/phase1";
import { ClassificationStore } from "../Components/v2/classifiable";
import { DrawableStore, DrawableComponent } from "../Components/v2/drawable";
import { Eid2PMStore, Eid2PMComponent } from "../Components/v2/eid2PMC";
import {
  LightingComponentStore,
  LightComponentStore,
} from "../Components/v2/lights";
import {
  IntegerPositionStore,
  IntegerPositionComponent,
  FloatMovingStore,
  FloatPositionStore,
} from "../Components/v2/physical";
import { TileComponentStore } from "../Components/v2/tileable";
import { distanceV2 } from "./MainSystem";

let actors: ActorStore;
let actorsLit: LightingComponentStore;
let classs: ClassificationStore;
let drawables: DrawableStore;
let eid2PMSs: Eid2PMStore;
let fmc: FloatMovingStore;
let fp2Emitter: Record<number, LitComponent> = {};
let fps: FloatPositionStore;
let ips: IntegerPositionStore;
let light2Draw: Record<number, DrawableComponent> = {};
let light2IntegerPosition: Record<number, IntegerPositionComponent> = {};
let lightableEntitiesStore: LittableStore;
let lightingEntitiesStore: LitStore;
let lights: LightComponentStore;
let setPieceLit: LightingComponentStore;
let setPieces: SetPieceStore;
let tiles: TileComponentStore;

export default async (game: SpaceTrash, delta: number) => {
  // Level 0 - "Component Stores"
  drawables = game.componentStores["DrawableComponent"] as DrawableStore;
  fmc = game.componentStores["FloatMovingComponent"] as FloatMovingStore;
  fps = game.componentStores["FloatPositionComponent"] as FloatPositionStore;
  lightingEntitiesStore = game.componentStores[LitComponent.name] as LitStore;
  tiles = game.componentStores["TileComponent"] as TileComponentStore;
  lightableEntitiesStore = game.componentStores[
    "LitableComponent"
  ] as LittableStore;
  ips = game.componentStores[
    "IntegerPositionComponent"
  ] as IntegerPositionStore;
  classs = game.componentStores[
    "ClassificationComponent"
  ] as ClassificationStore;

  // Level 1 - "Stores"
  actors = game.stores["ActorComponent"] as ActorStore;
  actorsLit = game.stores["ActorsLit"] as LightingComponentStore;
  eid2PMSs = game.stores["Eid2PMComponent"] as Eid2PMStore;
  lights = game.stores["LightComponent"] as LightComponentStore;
  lights = game.stores["LightComponent"] as LightComponentStore;
  setPieceLit = game.stores["SetPiecesLit"] as LightingComponentStore;
  setPieces = game.stores["SetPieceComponent"] as SetPieceStore;

  // todo reimpliment classification
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

  lightingEntitiesStore.each(([ndx, [eid, lc]]) => {
    const classification = eid2PMSs.get(eid).classification;
    lights.add(eid, fps.get(eid), classification);
  });

  // 2 deep
  lightableEntitiesStore.each(([eid, le]) => {
    const classification = eid2PMSs.get(eid).classification;

    if (classification === "Tile") {
      setPieceLit.add(eid, ips.get(eid), classification);
    } else {
      actorsLit.add(eid, fps.get(eid), classification);
    }

    drawables.each(([n, dc, s]) => {
      if (n === eid) {
        light2Draw[n] = dc[1];
      }
    });

    ips.each(([n, dc, s]) => {
      if (n === eid) {
        light2IntegerPosition[n] = dc[1];
      }
    });
  });

  // setup the setPieces
  // runtime - trivial
  for (let y = 0; y < MapSize; y++) {
    setPieces.store[y] = [];
    for (let x = 0; x < MapSize; x++) {
      setPieces.store[y][x] = new SetPieceComponent();

      // very expensive!
      // for (let yy = 0; yy < MapSize; yy++) {
      //   setPieces.store[y][x].FOV[yy] = [];
      //   for (let xx = 0; xx < MapSize; xx++) {
      //     setPieces.store[y][x].FOV[yy][xx] = distanceV2(x, y, xx, yy);
      //   }
      // }
    }
  }

  // 3 deep
  // build set pieces grid
  ips.each(([eid, [ndx, s]]) => {
    // setPieces.store[s.y][s.x].setId = ndx;
    setPieces.at(s.x, s.y).setId = ndx;

    const t = tiles.get(ndx);
    if (!t) {
      throw "why no t?";
    }
    // setPieces.store[s.y][s.x].tileType = t.tileType;
    setPieces.at(s.x, s.y).tileType = t.tileType;

    drawables.each(([n, dc, ss]) => {
      if (n === eid) {
        // setPieces.store[s.y][s.x].drawing = dc[1];
        setPieces.at(s.x, s.y).drawing = dc[1];
      }
    });
  });

  // 2 deep
  // setup the actors list
  fps.each((aeid, y) => {
    // add the actors
    actors.add({
      actorId: aeid,
      friendly: game.isFriendly(aeid),
      position: fps.at(aeid),
      motion: fmc.store[aeid][1],
    });

    lightingEntitiesStore.each(([leid, le]) => {
      if (aeid === leid) {
        fp2Emitter[aeid] = le;
      }
    });

  })

  // for (let y = 0; y < fps.store.length; y++) {
  //   // const aeid = fps.store[y][0];
  //   const aeid = fps.at(y);

  //   // add the actors
  //   actors.add({
  //     actorId: aeid,
  //     // actorX: fps.store[y][1].x,
  //     // actorY: fps.store[y][1].y,
  //     // rendered2d: "fresh",
  //     // renderedWebgl: "fresh",
  //     // culled2d: false,
  //     // culledWebgl: false,
  //     friendly: game.isFriendly(aeid),
  //     position: fps.store[y][1],
  //     motion: fmc.store[y][1],
  //     // sprite: new Sprite,
  //     // renderedWebgl: "new",
  //     // rendered2d: "new"
  //   });

  //   lightingEntitiesStore.each(([leid, le]) => {
  //     if (aeid === leid) {
  //       fp2Emitter[aeid] = le;
  //     }
  //   });
  // }

  runInitialMapBoundaryCheck();
  runPlaceImmoveableSetPieces();
  // runFOV();
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

// const runFOV = () => {
//   // var VISION_RANGE = 10;
//   // var WORLD_SIZ  E = [MapSize, MapSize];
//   map = new Map([MapSize, MapSize]);

//   map.iter(function (pos, tile) {
//     const y = pos[1];
//     const x = pos[0];
//     (tile.wall = setPieces.store[y][x].tileType === "WallTile"),
//       (tile.visible = true);
//   });

//   // setPieces.store.forEach((row) => {
//   //   row.forEach((setpiece) => {
//   //     if (setpiece.tileType === "WallTil") {

//   //     }
//   //   })
//   // })

//   //player is in the middle
//   // var player_pos = [MapSize / 2, MapSize / 2];
//   // map.tiles[player_pos[0]][player_pos[1]].wall = false;

//   // compute(map, player_pos, Infinity);
// };

const runPlaceImmoveableSetPieces = () => {
  drawables.each(([eid, [did, dic], k]) => {
    ips.withIf(did, ([pic, p]) => {
      if (dic.sprite) {
        dic.sprite.position.x = p.x * TileSize;
        dic.sprite.position.y = p.y * TileSize;
      } else {
        throw "the sprite should be loaded by now";
      }

      if (dic.mesh) {
        dic.mesh.position.x = p.x * TileSize;
        dic.mesh.position.y = p.y * TileSize;
      } else {
        throw "the mesh should be loaded by now";
      }
    });
  });
};
