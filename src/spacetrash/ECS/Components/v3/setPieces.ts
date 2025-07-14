import * as THREE from "three";

import { TwoDOneD_Component } from "../../../../demiurge/ecs/Component";

import { SP_TwoDStore } from "../../../../demiurge/ecs/Store";
import { MapSize } from "../../../Constants";
import { HeatConductorComponent, HeatEmitterComponent } from "./heat";
import { SamuraiTileComponent } from "../../../physics/SamuraiTile";

export class SetPieceComponent extends TwoDOneD_Component {
  eid = -1;
  actorIds = [];
  litIds = [];
  incasterId = -1;
  tileType: string;
  luminance: number;
  mesh?: THREE.Mesh;
  x: number;
  y: number;
  culledWebgl: boolean;
  FOV: number[][];
  samuraiTile: SamuraiTileComponent;
  meshes: THREE.Mesh[];

  // drawing: DrawableComponent;
  pixiElement;
  threejselement;

  heat: number = 0;
  redrawHeat: boolean = true;
  heatConductor?: HeatConductorComponent;
  heatEmitter?: HeatEmitterComponent;
  // thermalGraphic: PIXI.Graphics;

  constructor() {
    super();

    this.x = -1;
    this.y = -1;
    this.FOV = [[]];

    // this.thermalGraphic = new PIXI.Graphics();
    // this.thermalGraphic.beginFill(0xAAAAAA);
    // this.thermalGraphic.lineStyle(0, 0xffffff);
    // this.thermalGraphic.drawRect(0, 0, 300, 200);
  }
}

export class SetPieceStore extends SP_TwoDStore<SetPieceComponent> {
  get(eid: number): false | SetPieceComponent {
    throw new Error("Method not implemented.");
  }
  // // constructor() {
  // //   super();
  // //   this.store = [[]];
  // // }

  at(x: number, y: number) {
    if (x < 0) return false;
    if (y < 0) return false;
    if (x >= MapSize) return false;
    if (y >= MapSize) return false;

    return this.store[x][y];
  }

  // tileIsAt(x: number, y: number, t: string): boolean {
  //   return this.store[x][y].tileType !== t;
  // }

  // add(a: any) {
  //   throw new Error("Method not implemented.");
  // }

  // make() {
  //   return new SetPieceComponent();
  // }
}
