import { ArcadePhysics } from "arcade-physics";
import * as Matter from "matter-js";
import { Text } from "pixi.js";

import { SpaceTrashEntity } from "../../Entity";

import {
  FloatPositionComponent,
  FloatMovingComponent,
} from "../../Components/v2/physical";

import { ClassificationComponent } from "../../Components/v2/classifiable";
import { DrawableComponent } from "../../Components/v2/drawable";

import { Actor, bunnySprite, RandomExplorePattern, spike } from ".";
import { MapSize, SPEED_CONSTANT, TileSize } from "../../../Constants";
import { ArcadePhysicsComponent } from "../../Components/v2/arcadePhysics";
import { Kamkikaze } from "../../Components/v3/attack";
import { AiAgentComponent } from "../../Components/v3/ai";
import { LightIncastingComponent } from "../../Components/v1/casting/in";

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

    super(
      spe,
      [
        // new FloatPositionComponent(x, y),
        // new DegreesDirectionComponent(r),
        // new FloatMovingComponent(dx, dy),
        // // new LightOutcastingComponent(1),
        new LightIncastingComponent(1),
        // // new NameableComponent(name || RandomMaleNames.generate("male", spe)),
        new ClassificationComponent("PuckBot"),

        new DrawableComponent(bunnySprite(), spike(), new Text("?")),

        new ArcadePhysicsComponent((ap: ArcadePhysics) => {
          const ball = ap.add.body(x * TileSize, y * TileSize);
          ball.setCircle(TileSize * 0.4);
          ball.setCollideWorldBounds(true);
          return ball;
        }),

        new AiAgentComponent(
          "melee",
          "randomWalk",
          "suicideBomb",
          "acidCorpse",
          "heat",
          "sound",
          "fly",
          "vacuum",
          "explosive"
        ),
      ]

      // V2
      // {
      //   attackPattern: "melee",
      //   explorePattern: RandomExplorePattern(),
      //   defendPattern: "protectTheNest",
      //   diePattern: "explode",
      //   seekPattern: "FOV",
      //   repelPattern: "FOV",
      //   motion: "tank",
      //   weaknesses: "heat",
      //   strength: "heat",
      // }
    );
  }
}
