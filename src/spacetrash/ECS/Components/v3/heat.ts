import * as PIXI from "pixi.js";
import { Component } from "../../../../demiurge/ecs/Component";

import { TileSize } from "../../../Constants";
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";

export class HeatEmitterComponent extends Component {
  power: number;

  constructor(r: number) {
    super();
    this.power = r;
  }
}

export class HeatEmitterStore extends SP_MapStore<HeatEmitterComponent> {}

////////////////////////////////////////////////////////////////////////////////////////
export class HeatDetectorComponent extends Component{
  constructor() {
    super();
  }
}

export class HeatDetectorStore extends SP_MapStore<HeatDetectorComponent> {}

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

export class HeatConductorComponent extends Component{
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

export class HeatConductorStore extends SP_MapStore<HeatConductorComponent> {}
