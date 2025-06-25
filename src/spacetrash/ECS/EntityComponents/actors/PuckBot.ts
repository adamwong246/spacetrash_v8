import * as Matter from "matter-js";
import { Text } from "pixi.js";

import { SpaceTrashEntity } from "../../Entity";

import {
  FloatPositionComponent,
  FloatMovingComponent,
} from "../../Components/v2/physical";

import { ClassificationComponent } from "../../Components/v2/classifiable";
import { DrawableComponent } from "../../Components/v2/drawable";

import { LightIncastingComponent } from "../../Components/casting/in";
import { Actor, bunnySprite, spike } from ".";
import { MatterComponent } from "../../Components/v2/matter";
import { MapSize, TileSize } from "../../../Constants";

export class PuckBot extends Actor {
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
      new FloatPositionComponent(x, y),
      // new DegreesDirectionComponent(r),
      new FloatMovingComponent(dx, dy),
      // // new LightOutcastingComponent(1),
      new LightIncastingComponent(1),
      // // new NameableComponent(name || RandomMaleNames.generate("male", spe)),
      new ClassificationComponent("PuckBot"),

      new MatterComponent(
        Matter.Bodies.circle(x * TileSize/4, y * TileSize/4, TileSize / 3 / 4, {
          isStatic: false,
          // collisionFilter: {
          //   category: 0,
          // },
          render: {
            fillStyle: "red",
            strokeStyle: "blue",
            lineWidth: 3,
          },
        })
      ),

      new DrawableComponent(bunnySprite(), spike(), new Text("?")),
    ]);
  }
}
