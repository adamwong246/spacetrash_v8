//  This class handles the imported data from your tiled files.

import { ITiledMapLayer } from "@workadventure/tiled-map-type-guard";

// @ts-ignore
import * as tiledProject from "../tiled/*";

import { GameWithTicks } from "./8-WithTicks";

export class SpaceTrash extends GameWithTicks {
  
  tiledProject;

  uiHooks: any;
  
  tilelayer(
    layer: Partial<ITiledMapLayer>,
    x: number,
    y: number,
    tid: number,
    hFlip: boolean,
    vFlip: boolean,
    dFlip: boolean
  ) {
    throw new Error("Method not implemented.");
  }

  objectlayer() {
    throw new Error("Method not implemented.");
  }

  constructor(domNode: HTMLElement) {
    super(domNode);
    debugger;
  }

  // async start(c) {
  //   super.start(c)

  // }
}
