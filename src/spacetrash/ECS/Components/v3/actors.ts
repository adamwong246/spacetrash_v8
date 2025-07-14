import { Box, Circle, Polygon } from "detect-collisions";
import * as THREE from "three";

import { Component } from "../../../../demiurge/ecs/Component";

import { TileSize } from "../../../Constants";

import { AiAgentComponent } from "./ai";

import {
  FloatMovingComponent,
  FloatPositionComponent,
} from "../../../../demiurge/game/physical";
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";

export class ActorComponent extends Component {
  actorId: number;
  agent: AiAgentComponent;
  friendly: boolean;
  motion: FloatMovingComponent;
  position: FloatPositionComponent;
  FOV: any;
  meshes: THREE.Mesh[];
  physical: Box | Polygon | Circle;

  constructor({
    physical,
    meshes,
  }: {
    physical: Box | Polygon | Circle;
    meshes: THREE.Mesh[];
  }) {
    super();

    this.physical = physical;
    this.meshes = meshes;
  }
}

export class ActorStore extends SP_MapStore<ActorComponent> {
  byXandY(x: number, y: number): number[] {
    let toReturn: number[] = [];

    this.each((ac, eid) => {
      if (
        Math.round(ac.physical.pos.x / TileSize) === x &&
        Math.round(ac.physical.pos.y / TileSize) === y
      ) {
        toReturn.push(eid);
      }
    });

    return toReturn;
  }
}
