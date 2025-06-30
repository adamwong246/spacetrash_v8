import { Text } from "pixi.js";

import { ArcadePhysics } from "../../../vendor/arcade-physics-main/src";

import { SpaceTrashEntity } from "../../Entity";

import { TankMovingComponent } from "../../Components/v2/physical";
import { NameableComponent } from "../../Components/v2/nameable";

import RandomMaleNames from "../../../NameGenerator";
import { DrawableComponent } from "../../Components/v2/drawable";

import { TileSize } from "../../../Constants";

import { Actor, bunnySprite, cylinder } from ".";

import { ArcadePhysicsComponent } from "../../Components/v2/arcadePhysics";
import { LightOutcastingComponent } from "../../Components/v1/casting/out";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { Component } from "../../../../engine/VECS.ts/Component";

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

    super(spe, [
      new TankMovingComponent(dx, dy),
      new LightOutcastingComponent(1),
      new LightIncastingComponent(1),
      new NameableComponent(name || RandomMaleNames.generate("male", spe)),
      new DrawableComponent(bunnySprite(), cylinder(), new Text("?")),

      new ArcadePhysicsComponent((ap: ArcadePhysics) => {
        const ball = ap.add.body(x * TileSize, y * TileSize);
        ball.setCircle((TileSize / 2) * 0.51);
        ball.setBounce(0.1);
        ball.setCollideWorldBounds(true);
        ball.setFriction(-1, -1);

        return ball;
      }),

      ...upgrades
    ]);
  }

}
