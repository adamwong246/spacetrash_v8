import { Box, Circle, Polygon } from "detect-collisions";
import * as THREE from "three";

import { Component } from "../../../../engine/VECS.ts/Component";

import {
  FloatMovingComponent,
  FloatPositionComponent,
} from "../../../../engine/game/physical";

import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";
import { TileSize } from "../../../Constants";
import { ThreeJsRenderableComponent } from "../../../../engine/rendering/threejs";
import { SP_PhysicalComponent } from "../../../../engine/physics/SP_Physical";

import { AiAgentComponent, IBehaviors } from "./ai";
import { ISpaceTrashComponents } from "../v1";

export class ActorComponent extends Component<unknown, ISpaceTrashComponents> {
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

export class ActorStore extends MapStoreV2<ActorComponent> {
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
