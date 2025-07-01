import { ArcadePhysics } from "../../../vendor/arcade-physics-main/src";

import { Text } from "pixi.js";

import { SpaceTrashEntity } from "../../Entity";

import { Actor, bunnySprite, spike } from ".";
import { TileSize } from "../../../Constants";

import { AiAgentComponent } from "../../Components/v3/ai";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { ArcadePhysicsComponent } from "../../Components/v4/PhaserArcade";
import { PixiJsRenderableComponent } from "../../../../engine/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../../engine/rendering/threejs";

export class PuckBot extends Actor {
  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
    name?: string,
    aiAgentConfig: AiAgentComponent
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

        // new DrawableComponent(bunnySprite(), spike(), new Text("?")),

        new PixiJsRenderableComponent(bunnySprite()),
        new ThreeJsRenderableComponent(spike()),

        new ArcadePhysicsComponent((ap: ArcadePhysics) => {
          const ball = ap.add.body(x * TileSize, y * TileSize);
          ball.setCircle(TileSize * 0.4);
          ball.setCollideWorldBounds(true);
          return ball;
        }),

        aiAgentConfig,

        // new MatterComponent(
        //   Matter.Bodies.circle(
        //     (x * TileSize) / 4,
        //     (y * TileSize) / 4,
        //     TileSize / 3 / 4,
        //     {
        //       isStatic: false,
        //       // collisionFilter: {
        //       //   category: 0,
        //       // },
        //       render: {
        //         fillStyle: "red",
        //         strokeStyle: "blue",
        //         lineWidth: 3,
        //       },
        //     }
        //   )
        // ),
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
