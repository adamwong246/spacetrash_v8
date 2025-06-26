import { Text, TextStyle, Ticker } from 'pixi.js';


import { LightOutcastingComponent } from "../../Components/casting/out";
import { SpaceTrashEntity } from "../../Entity";

import { SpaceTrashEntityComponent } from "..";
import {
  FloatPositionComponent,
  DegreesDirectionComponent,
  FloatMovingComponent,
  TankMovingComponent,
} from "../../Components/v2/physical";
import { NameableComponent } from "../../Components/v2/nameable";

import RandomMaleNames from "../../../NameGenerator";
import { ClassificationComponent } from "../../Components/v2/classifiable";
import { DrawableComponent } from "../../Components/v2/drawable";
import { greenMaterial } from "../../../threejs";

import { degToRad } from "three/src/math/MathUtils.js";
import { ActorSize, SPEED_CONSTANT, TileSize } from "../../../Constants";
import { LightIncastingComponent } from "../../Components/casting/in";
import { SpaceTrash } from "../../..";
import { Actor, bunnySprite, cylinder } from '.';
import { ArcadePhysics } from 'arcade-physics';
import { ArcadePhysicsComponent } from '../../Components/v2/arcadePhysics';

export class SpaceTrashBot extends Actor {
  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
    name?: string
  ) {
    const spe = new SpaceTrashEntity();

    super(spe, [
      // new FloatPositionComponent(x, y),
      // new DegreesDirectionComponent(r),
      new TankMovingComponent(dx, dy),
      new LightOutcastingComponent(1),
      new LightIncastingComponent(1),
      new NameableComponent(name || RandomMaleNames.generate("male", spe)),
      new ClassificationComponent("SpaceTrashBot"),

      new DrawableComponent(
        bunnySprite(),
        cylinder(),
        new Text('?')
      ),

      new ArcadePhysicsComponent((ap: ArcadePhysics) => {
        const ball = ap.add.body(x * TileSize, y * TileSize);
        ball.setCircle((TileSize/2) * 0.51)
        ball.setBounce(0.1)
        ball.setCollideWorldBounds(true)
        ball.setFriction(-1, -1)

        return ball
      }),
        
    ]);
  }

  static name(
    bots: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
      6: number;
      7: number;
      8: number;
      9: number;
    },
    eidOfBot: string
  ) {
    return eidOfBot;
  }
}
