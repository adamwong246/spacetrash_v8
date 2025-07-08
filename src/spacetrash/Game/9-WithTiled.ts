//  This class handles the imported data from your tiled files.

import { ITiledMapLayer } from "@workadventure/tiled-map-type-guard";

// @ts-ignore
import * as tiledProject from "../tiled/*";

import { GameWithTicks } from "./8-WithTicks";
import { Tile } from "../ECS/EntityComponents/tiles";

export class SpaceTrash extends GameWithTicks {
  tiledProject = tiledProject;

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
    this.setEntitiesComponent([
      Tile.fromTid(
        tid,
        x,
        y,
        hFlip,
        vFlip,
        dFlip,
        this.three_d_textures,
        this.two_d_images
      ),
    ]);
  }

  objectlayer() {
    console.error("not yet implemented");
  }

  constructor(domNode: HTMLElement) {
    super(domNode);
  }
}
