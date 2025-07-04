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
import { Circle, deg2rad } from "detect-collisions";
import { FloatMovingComponent } from "../../../../engine/game/physical";
import { SP_PhysicalComponent } from "../../../../engine/physics/SP_Physical";

export class PuckBot extends Actor {
  constructor(
    x: number = 0,
    y: number = 0,
    // aiAgentConfig: AiAgentComponent
  ) {
    const spe = new SpaceTrashEntity();

    const physical = new Circle({ x, y }, TileSize / 8);

    physical.setPosition(-x, -y, true);
    physical.setAngle(deg2rad((Math.random()-0.5)*260), true);
    physical.isStatic = false;

    super(
      spe,
      [
        new LightIncastingComponent(1),

        new PixiJsRenderableComponent(bunnySprite()),
        new ThreeJsRenderableComponent(spike()),
        // aiAgentConfig,

        new SP_PhysicalComponent(x, y, physical), 
        new FloatMovingComponent((Math.random()-0.5)*3, (Math.random()-0.5) * 3),
        
        // new FloatPositionComponent(x, y),
        // new DegreesDirectionComponent(r),
        
        // // new LightOutcastingComponent(1),

        // new NameableComponent(name || RandomMaleNames.generate("male", spe)),

        // new ArcadePhysicsComponent((ap: ArcadePhysics) => {
        //   const ball = ap.add.body(x * TileSize, y * TileSize);
        //   ball.setCircle(TileSize * 0.4);
        //   ball.setCollideWorldBounds(true);
        //   return ball;
        // }),

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
