import { Text } from "pixi.js";

import { ArcadePhysics } from "../../../vendor/arcade-physics-main/src";

import { SpaceTrashEntity } from "../../Entity";

import { NameableComponent } from "../../Components/v2/nameable";

import RandomMaleNames from "../../../NameGenerator";

import { TileSize } from "../../../Constants";

import { Actor, bunnySprite, cylinder } from ".";

import { LightOutcastingComponent } from "../../Components/v1/casting/out";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { Component } from "../../../../engine/VECS.ts/Component";
import { ArcadePhysicsComponent } from "../../Components/v4/PhaserArcade";
import { ThreeJsRenderableComponent } from "../../../../engine/rendering/threejs";
import { PixiJsRenderableComponent } from "../../../../engine/rendering/pixijs";
import { ConsoleRenderableComponent } from "../../../../engine/rendering/console";
import { TankMovingComponent } from "../../Components/v4/TankMovingComponent";
import { Box, Circle } from "detect-collisions";
import { SP_PhysicalComponent } from "../../../../engine/physics/SP_Physical";
import { FloatMovingComponent } from "../../../../engine/game/physical";

export class SpaceTrashBot extends Actor {
  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
    name?: string,
    upgrades?: Component<any, any>[] = []
  ) {
    const spe = new SpaceTrashEntity();

    const physical = new Circle({ x, y }, TileSize/8);

    physical.setPosition(x, y, true);
    physical.setAngle(0, true);
    physical.isStatic = true;

    super(spe, [
      ...upgrades,
      
      new LightOutcastingComponent(1),
      new LightIncastingComponent(1),
      new NameableComponent(name || RandomMaleNames.generate("male", spe)),

      new ThreeJsRenderableComponent(cylinder()),
      new PixiJsRenderableComponent(bunnySprite()),
      new ConsoleRenderableComponent("?"),

      new TankMovingComponent(0, 0),
      new SP_PhysicalComponent(physical),


    ]);
  }
}
