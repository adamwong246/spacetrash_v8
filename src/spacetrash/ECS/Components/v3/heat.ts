import * as PIXI from "pixi.js";
import { Component } from "../../../../engine/VECS.ts/Component";

import { ISpaceTrashComponents } from "../v1";
import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";
import { TileSize } from "../../../Constants";

export class HeatEmitterComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  power: number;

  constructor(r: number) {
    super();
    this.power = r;
  }
}

export class HeatEmitterStore extends MapStoreV2<HeatEmitterComponent> {}

////////////////////////////////////////////////////////////////////////////////////////
export class HeatDetectorComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  constructor() {
    super();
  }
}

export class HeatDetectorStore extends MapStoreV2<HeatDetectorComponent> {}

////////////////////////////////////////////////////////////////////////////////////////

export function generateRandomHexColor(): string {
  // Generate a random number between 0 and 0xFFFFFF (16777215)
  const randomColor = Math.floor(Math.random() * 0xffffff);

  // Convert the number to a hexadecimal string and prepend '#'
  let hexColor = `#${randomColor.toString(16)}`;

  // Pad the string with leading zeros if necessary
  // This ensures the hex color is always 6 digits long (e.g., "#00ff00")
  while (hexColor.length < 7) {
    hexColor = `#0${hexColor.slice(1)}`;
  }

  return hexColor;
}

export class HeatConductorComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  capacity: number;
  pixiThermalGraphic: PIXI.Graphics;

  static thermalGraphic(x: number, y: number, c = '0xffffff') {
    const graphics = new PIXI.Graphics();
    // graphics.beginFill(generateRandomHexColor());
    graphics.beginFill(c);
    // graphics.stroke(0xffffff);
    graphics.drawRect(x * TileSize, y * TileSize, TileSize, TileSize);
    // graphics.drawRect(x * TileSize, y * TileSize, TileSize, TileSize);

    // graphics.stroke({
    //   width: 1,
    //   color: generateRandomHexColor(),
    //   alignment: 0.5, 
    // });

    graphics.endFill();

    return graphics;
  }

  constructor(r: number) {
    super();
    this.capacity = r;
  }
}

export class HeatConductorStore extends MapStoreV2<HeatConductorComponent> {}
