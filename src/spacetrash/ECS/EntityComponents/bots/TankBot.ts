import * as THREE from "three";
import { Box, Circle } from "detect-collisions";

import { SpaceTrashEntity } from "../../Entity";

import { NameableComponent } from "../../Components/v2/nameable";

import RandomMaleNames from "../../../NameGenerator";

import { TileSize } from "../../../Constants";

import { Actor, bunnySprite, cylinderGeometry } from ".";

import { LightOutcastingComponent } from "../../Components/v1/casting/out";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { Component } from "../../../../demiurge/ecs/Component";
import { SP_PhysicalComponent } from "../../../../demiurge/physics/SP_Physical";
import { ConsoleRenderableComponent } from "../../../../demiurge/rendering/console";
import { PixiJsRenderableComponent } from "../../../../demiurge/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../../demiurge/rendering/threejs";
import { TankMovingComponent } from "../../Components/v4/TankMovingComponent";
import { degToRad } from "three/src/math/MathUtils.js";

export class SpaceTrashBot extends Actor {
  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
    name?: string,
    upgrades?: Component[] = [],
    images,
    textures,
  ) {
    const spe = new SpaceTrashEntity();

    const physical = new Circle({ x, y }, TileSize / 8);

    physical.setPosition(x, y, true);
    physical.setAngle(0, true);
    physical.isStatic = true;

    const threejs = new THREE.Mesh(cylinderGeometry, textures.greenMaterial);
    threejs.rotateZ(degToRad(90));
    threejs.rotateX(degToRad(90));

    super(spe, [
      ...upgrades,

      new LightOutcastingComponent(1),
      new LightIncastingComponent(1),
      new NameableComponent(name || RandomMaleNames.generate("male", spe)),

      new ThreeJsRenderableComponent([threejs]),
      new PixiJsRenderableComponent(bunnySprite()),
      new ConsoleRenderableComponent("?"),

      new TankMovingComponent(0, 0),
      new SP_PhysicalComponent(physical),
    ]);
  }
}
