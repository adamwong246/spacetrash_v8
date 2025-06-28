import runFirstTick from "./firstTick.ts";
import runEveryOtherTick from "./otherTicks.ts";

import { System } from "../../../engine/VECS.ts/System.ts";

import { SpaceTrash } from "../../index.tsx";

import { MapSize } from "../../Constants.ts";

export type ISpaceTrashSystems = `physical` | "casting";

let firstTick = true;
let fovMap;

class MainSystem extends System {
  mapSize: number;
  working: boolean;

  constructor(mapSize: number) {
    super();
    this.mapSize = mapSize;
  }

  tick(delta: number, game: SpaceTrash): Promise<boolean> {
    return new Promise(async (res) => {
      if (firstTick) {
        firstTick = false;

        fovMap = await runFirstTick(game, delta);
        res(true);
      } else {
        runEveryOtherTick(game, delta, fovMap);
      }
    });
  }
}

export function distanceV2(x: number, y: number, x2: number, y2: number) {
  const distance = (x - x2) * (x - x2) + (y - y2) * (y - y2)
  if (isNaN(distance)) throw `distance cannot be NaN`

  return distance;
}

export const SpaceTrashMainSystem = new MainSystem(MapSize);
